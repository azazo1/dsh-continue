import { useSyncExternalStore } from 'react'
import type { SettingsScope } from '@deepseek-ai/dsh-client-runtime/client'
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import type { ContinueSettings } from '../shared.ts'
import styles from './styles.module.css'

export type ContinueSettingProps = PropsLocale<'dsh-continue'> & {
  scope: SettingsScope<ContinueSettings>
}

export function ContinueSetting({ scope, t }: ContinueSettingProps): React.ReactNode {
  const message = useSyncExternalStore(
    (onChange) => scope.subscribe(onChange),
    () => scope.getSnapshot().value?.continueMessage ?? '',
  )

  return (
    <div className={styles.settingRow}>
      <div className={styles.settingCopy}>
        <div className={styles.settingTitle}>{t('settings.continueMessage.title')}</div>
        <div className={styles.settingDescription}>{t('settings.continueMessage.description')}</div>
      </div>
      <input
        className={styles.settingInput}
        type="text"
        value={message}
        placeholder="继续"
        aria-label={t('settings.continueMessage.title')}
        onChange={(event) => {
          void scope.set('continueMessage', event.currentTarget.value)
        }}
      />
    </div>
  )
}
