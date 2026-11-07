import type { Volatile } from '@deepseek-ai/cordis'

/** 插件包名, 同时是 Client loader 注册 id 与插件页槽位的键. */
export const PLUGIN_ID = 'dsh-continue'

/** profile 条目 id: configForms 表单按它寻址, 与包名一致. */
export const ENTRY_ID = PLUGIN_ID

/** 继续消息字段名, 与 Host Config 的 volatile 键一致. */
export const CONTINUE_MESSAGE_FIELD = 'continueMessage'

/** 输入框为空时继续按钮发送的默认内容. */
export const DEFAULT_CONTINUE_MESSAGE = '继续'

/**
 * Host 侧继续路由的绝对路径.
 *
 * 必须落在 `/api` 下: dsh 的 connection 层只给 `/api` 通道做 Host/Origin 与
 * 浏览器凭据校验, 并且 exact fetch 路由只对 owner principal 开放, 其他请求
 * 一律 403. 放在别的前缀下这条路由就是完全没有鉴权的裸接口.
 */
export const CONTINUE_PATH = '/api/dsh-continue/continue'

/** Host 侧的配置字段, 值是 volatile 引用. */
export interface ContinueSettings {
  /** 输入框为空时继续按钮发送的内容. */
  readonly continueMessage: Volatile<string>
}

/** Client 侧通过 configForms 读到的是解析后的普通值. */
export interface ContinueClientSettings {
  /** 输入框为空时继续按钮发送的内容. */
  readonly continueMessage: string
}
