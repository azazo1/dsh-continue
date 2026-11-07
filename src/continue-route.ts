/**
 * Host 侧继续入口: 一个挂在 `/api` 下的 exact fetch 路由.
 *
 * 鉴权交给 dsh 的 connection 层: exact route 只对 owner principal 开放, 其余
 * principal 一律 403, Host/Origin 与浏览器凭据校验也在同一层完成, 这里不重复
 * 实现.
 *
 * 为什么要在 Host 侧插队: 空闲 Agent 收到 followup 时, 下一轮第一个 step 会
 * 领走 `next-turn` 队首. 若直接 prompt, 排队中的旧消息会抢在继续消息前面被
 * 这一轮领走. 因此先把继续消息 prepend 到 `next-turn` 队首, 再用一条占位消息
 * 唤醒 driver, 唤醒后立刻移除占位消息. 这一轮领到的就是继续消息, 旧队列保持
 * 原顺序留在其后, 由后续轮次依次消费.
 */
import type { Context, Volatile } from '@deepseek-ai/cordis'
import type { Agent } from '@deepseek-ai/dsh-agent'
import type {} from '@deepseek-ai/dsh-client-connection'
import { createUserMessage } from '@deepseek-ai/dsh-llm/message'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import { CONTINUE_PATH } from './shared.ts'

/** 继续路由读取的配置. */
export interface ContinueRouteConfig {
  /** 继续按钮发送的消息文本. */
  readonly continueMessage: Volatile<string>
}

/** 继续请求体: 只带目标会话, 文本由 Host 读配置决定. */
interface ContinueRequest {
  readonly sessionId: string
}

/**
 * 构造一条用户消息.
 * @param text - 消息文本.
 * @returns 可放进 inbox 的用户消息.
 */
function userMessage(text: string): Parameters<Agent['inbox']['append']>[1] {
  return createUserMessage({ content: [{ type: 'text', text }], source: { kind: 'user' } })
}

/** 解析并校验请求体. */
async function readContinueRequest(request: Request): Promise<ContinueRequest | undefined> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return undefined
  }
  if (typeof body !== 'object' || body === null) return undefined
  const sessionId = (body as { sessionId?: unknown }).sessionId
  if (typeof sessionId !== 'string' || sessionId.trim() === '') return undefined
  return { sessionId }
}

/** 统一返回 JSON. */
function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })
}

/**
 * 把继续消息插到 `next-turn` 队首并唤醒 Agent.
 *
 * 空闲时 followup 会在返回前同步领走队首, 占位消息因此留在队列里轮不到被领走,
 * 直接移除即可; 工作中或维护中时唤醒被挂起, 占位消息同样在唤醒前被移除, 挂起
 * 的唤醒仍会因队列里还有继续消息而生效.
 * @param ctx - Host 插件上下文, 仅用于告警.
 * @param agent - 目标 Agent.
 * @param text - 继续消息文本.
 */
export function enqueueContinue(ctx: Context, agent: Agent, text: string): void {
  agent.inbox.prepend('next-turn', userMessage(text))
  const wake = userMessage('')
  agent.followup(wake)
  if (!agent.inbox.remove(wake.id)) {
    ctx.logger.warn(`dsh-continue: the wake placeholder for "${agent.id}" was already claimed`)
  }
}

/**
 * 注册继续路由.
 * @param ctx - Host 插件上下文.
 * @param config - 插件配置.
 */
export function registerContinueRoute(ctx: Context, config: ContinueRouteConfig): void {
  ctx.effect(() => ctx.connection.fetch.register({
    path: CONTINUE_PATH,
    methods: ['POST'],
    requestBody: 'buffered',
    fetch: async (request) => {
      const parsed = await readContinueRequest(request)
      if (parsed === undefined) return json(400, { error: 'invalid request body' })
      const agent = ctx.agents.get(parsed.sessionId as SessionId)
      if (agent === undefined) return json(404, { error: 'session is not attached' })
      const text = config.continueMessage.get().trim()
      if (text === '') return json(400, { error: 'continue message is empty' })
      try {
        enqueueContinue(ctx, agent, text)
      } catch (error: unknown) {
        ctx.logger.warn(`dsh-continue: could not enqueue the continue message for "${parsed.sessionId}": ${String(error)}`)
        return json(500, { error: 'could not enqueue the continue message' })
      }
      return json(200, { ok: true })
    },
  }), `dsh-continue: POST ${CONTINUE_PATH}`)
}
