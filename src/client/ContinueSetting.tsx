import { useState } from 'react'
import styles from './styles.module.css'

let continueMessage = '继续'

export function ContinueSetting(): React.ReactNode {
  const [message, setMessage] = useState(continueMessage)
  const update = (event: React.ChangeEvent<HTMLInputElement>): void => {
    continueMessage = event.currentTarget.value
    setMessage(continueMessage)
  }

  return (
    <div className={styles.settingRow}>
      <div className={styles.settingCopy}>
        <div className={styles.settingTitle}>继续消息</div>
        <div className={styles.settingDescription}>输入框为空时点击继续按钮发送的内容</div>
      </div>
      <input
        className={styles.settingInput}
        type="text"
        value={message}
        placeholder="继续"
        aria-label="继续消息"
        onChange={update}
      />
    </div>
  )
}
