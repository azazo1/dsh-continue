import type { Context } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { registerContinueRoute } from './continue-route.ts'
import { CONTINUE_MESSAGE_FIELD, DEFAULT_CONTINUE_MESSAGE, type ContinueSettings } from './shared.ts'

export const name = 'dsh-continue'

/** Host 侧需要 dsh 的 connection (鉴权路由) 与 agents (队列操作) 服务. */
export const inject = ['connection', 'agents']

export const Config = z.object({
  [CONTINUE_MESSAGE_FIELD]: z.string().default(DEFAULT_CONTINUE_MESSAGE).volatile(),
})

/**
 * 注册继续路由.
 * @param ctx - Host 插件上下文.
 * @param config - 插件配置, 字段为 volatile 引用.
 */
export function apply(ctx: Context, config: ContinueSettings): void {
  registerContinueRoute(ctx, config)
}
