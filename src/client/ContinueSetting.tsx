import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { SettingsScope } from '@deepseek-ai/dsh-client-ui-settings/client'
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import {
  CONTINUE_MESSAGE_FIELD,
  DEFAULT_CONTINUE_MESSAGE,
  type ContinueSettings,
} from '../shared.ts'
import styles from './styles.module.css'

export type ContinueSettingProps = PropsLocale<'dsh-continue'> & {
  scope: SettingsScope<ContinueSettings>
}

function readContinueMessage(scope: SettingsScope<ContinueSettings>): string {
  return scope.getSnapshot().value?.continueMessage ?? DEFAULT_CONTINUE_MESSAGE
}

export function ContinueSetting({ scope, t }: ContinueSettingProps): React.ReactNode {
  const persisted = useSyncExternalStore(
    (onChange) => scope.subscribe(onChange),
    () => readContinueMessage(scope),
  )
  const [draft, setDraft] = useState(persisted)
  const focusedRef = useRef(false)

  // Host 写入是异步的, 输入中不要用回写值覆盖 draft, 否则光标会被打到末尾.
  useEffect(() => {
    if (!focusedRef.current) setDraft(persisted)
  }, [persisted])

  return (
    <div className={styles.settingRow}>
      <div className={styles.settingCopy}>
        <div className={styles.settingTitle}>{t('settings.continueMessage.title')}</div>
        <div className={styles.settingDescription}>{t('settings.continueMessage.description')}</div>
      </div>
      <input
        className={styles.settingInput}
        type="text"
        value={draft}
        placeholder={DEFAULT_CONTINUE_MESSAGE}
        aria-label={t('settings.continueMessage.title')}
        onFocus={() => {
          focusedRef.current = true
        }}
        onChange={(event) => {
          const next = event.currentTarget.value
          setDraft(next)
          void scope.set(CONTINUE_MESSAGE_FIELD, next)
        }}
        onBlur={() => {
          focusedRef.current = false
          setDraft(readContinueMessage(scope))
        }}
      />
    </div>
  )
}
