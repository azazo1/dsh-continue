/** dsh-continue 插件页配置卡片的文案. */
import type { SettingsFormLabels } from '@deepseek-ai/dsh-client-ui-primitives'

/** 本插件字典的命名空间, 与包名一致. */
export const NS = 'dsh-continue'

/** 本插件用到的文案键. */
export type ContinueKey =
  | 'title' | 'description'
  | 'message' | 'messageHint'
  | 'overridden' | 'reset' | 'invalid'
  | 'readOnly' | 'unavailable' | 'save' | 'saving' | 'saveFailed'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** 本插件配置卡片的文案. */
    'dsh-continue': ContinueKey
  }
}

/** English copy. */
export const en: Record<ContinueKey, string> = {
  title: 'Continue button',
  description: 'Add a continue action beside the send button, whose message you can set here.',
  message: 'Continue message',
  messageHint: 'Sent by the continue button while the composer is empty.',
  overridden: 'Overridden',
  reset: 'Reset to default',
  invalid: 'Enter the message to send, or leave blank to use the default.',
  readOnly: 'This deployment stores settings read-only.',
  unavailable: 'This plugin is not loaded, so it cannot be configured right now.',
  save: 'Save',
  saving: 'Saving...',
  saveFailed: 'The deployment did not accept these values; they were left for you to correct.',
}

/** Simplified Chinese copy. */
export const zh: Record<ContinueKey, string> = {
  title: '继续按钮',
  description: '在发送按钮旁加一个继续动作, 继续时发送的内容可在此设置.',
  message: '继续消息',
  messageHint: '输入框为空时点击继续按钮发送的内容.',
  overridden: '已覆盖',
  reset: '恢复默认',
  invalid: '请填写要继续发送的内容; 留空表示使用默认值.',
  readOnly: '本部署的设置为只读.',
  unavailable: '该插件当前未加载, 暂时无法配置.',
  save: '保存',
  saving: '保存中...',
  saveFailed: '本部署没有接受这些值, 已保留供你修改.',
}

/**
 * 表单框架要的文案, 从本插件字典取.
 * @param t - 本插件字典的读取函数.
 * @returns 共享设置表单渲染的标签.
 */
export function formLabels(t: (key: ContinueKey) => string): SettingsFormLabels {
  return {
    unavailable: t('unavailable'),
    readOnly: t('readOnly'),
    saveFailed: t('saveFailed'),
    save: t('save'),
    saving: t('saving'),
  }
}
