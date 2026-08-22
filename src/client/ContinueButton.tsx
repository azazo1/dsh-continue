import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import styles from './styles.module.css'

export type ContinueButtonProps = PropsRuntime<'conversation.input.right'>

export function ContinueButton({ input, inputActions, session }: ContinueButtonProps): React.ReactNode {
  if (input.draft.trim().length !== 0 || session.running) return null

  const send = (): void => {
    const message = '继续'
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
