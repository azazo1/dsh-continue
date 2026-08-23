import type { SettingsScope } from '@deepseek-ai/dsh-client-runtime/client'
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { ContinueSettings } from '../shared.ts'
import styles from './styles.module.css'

export type ContinueButtonProps = PropsRuntime<'conversation.input.right'> & {
  scope: SettingsScope<ContinueSettings>
}

export function ContinueButton({ input, inputActions, session, scope }: ContinueButtonProps): React.ReactNode {
  if (input.draft.trim().length !== 0 || session.running) return null

  const send = (): void => {
    const message = scope.getSnapshot().value?.continueMessage ?? '继续'
    inputActions.setDraft(message)
    inputActions.submit()
  }

  return (
    <button
      type="button"
      className={styles.continueAction}
      title="继续"
      aria-label="继续"
      onClick={send}
    >
      <span className={styles.continueIcon} aria-hidden="true" />
    </button>
  )
}
