/** 插件包名, 同时是 Client loader 注册 id 与插件页槽位的键. */
export const PLUGIN_ID = 'dsh-continue'

/** profile 条目 id: configForms 表单按它寻址, 与包名一致. */
export const ENTRY_ID = PLUGIN_ID

/** 继续消息字段名, 与 Host Config 的 volatile 键一致. */
export const CONTINUE_MESSAGE_FIELD = 'continueMessage'

/** 输入框为空时继续按钮发送的默认内容. */
export const DEFAULT_CONTINUE_MESSAGE = '继续'

/** 本插件暴露的配置字段. */
export interface ContinueSettings {
  /** 输入框为空时继续按钮发送的内容. */
  continueMessage: string
}
