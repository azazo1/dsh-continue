export const zh = {
  'settings.continueMessage.title': '继续消息',
  'settings.continueMessage.description': '输入框为空时点击继续按钮发送的内容',
} satisfies Record<string, string>

export type ContinueKey = keyof typeof zh

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    'dsh-continue': ContinueKey
  }
}

export const en = {
  'settings.continueMessage.title': 'Continue message',
  'settings.continueMessage.description': 'Message sent by the continue button when the composer is empty',
} satisfies Record<ContinueKey, string>

export const NS = 'dsh-continue'
