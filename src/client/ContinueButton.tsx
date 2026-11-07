import type { ConfigForm as SettingsScope } from '@deepseek-ai/dsh-client-ui-settings/client'
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import { useState } from 'react'
import type { ContinueClientSettings } from '../shared.ts'
import { CONTINUE_PATH } from '../shared.ts'
import styles from './styles.module.css'

export type ContinueButtonProps = PropsRuntime<'conversation.input.right'> & {
  scope: SettingsScope<ContinueClientSettings>
}

/**
 * 请求 Host 投递一条继续消息.
 *
 * 继续消息由 Host 直接插到 `next-turn` 队首再唤醒 Agent, 因此不会把排队中的
 * 旧消息带到这一轮前面. 鉴权由 dsh 的 connection 层处理, 这里只需带上会话.
 * @param sessionId - 当前会话.
 * @returns 是否投递成功.
 */
async function postContinue(sessionId: SessionId): Promise<boolean> {
  try {
    const response = await fetch(CONTINUE_PATH, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
    return response.ok
  } catch {
    return false
  }
}

export function ContinueButton({ useInput, useSession, inputActions: _inputActions, scope }: ContinueButtonProps): React.ReactNode {
  const draft = useInput((s: { draft: string }) => s.draft)
  const running = useSession((s: { running: boolean }) => s.running)
  const sessionId = useSession((s: { sessionId: SessionId }) => s.sessionId)
  const [busy, setBusy] = useState(false)
  if (draft.trim().length !== 0 || running || busy) return null

  const send = (): void => {
    if (busy) return
    setBusy(true)
    void postContinue(sessionId).finally(() => { setBusy(false) })
  }

  const label = scope.getSnapshot().value?.continueMessage ?? '继续'

  return (
    <button
      type="button"
      className={styles.continueAction}
      title={label}
      aria-label={label}
      onClick={send}
    >
      <span className={styles.continueIcon} aria-hidden="true" />
    </button>
  )
}
