import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { SettingsScope } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings-general/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import { createElement } from 'react'
import type { ContinueSettings } from '../shared.ts'
import { ContinueButton } from './ContinueButton.tsx'
import { ContinueSetting } from './ContinueSetting.tsx'
import { decodeContinueSettings } from './settings.ts'
import { en, NS, zh } from './locales.ts'

export const inject = ['slots', 'locale', 'settingsScope']

type InputRightProps = PropsRuntime<'conversation.input.right'> & {
  scope: SettingsScope<ContinueSettings>
}
type SettingProps = PropsRuntime<'settings.general.item'> & PropsLocale<'dsh-continue'> & {
  scope: SettingsScope<ContinueSettings>
}

export function apply(ctx: ClientContext): void {
  const scope = ctx.settingsScope.bind({
    namespace: 'dsh-continue',
    decode: decodeContinueSettings,
  })
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-continue: dictionaries')
  ctx.slots.inject('conversation.input.right', () => ctx.slots.register(
    { name: 'conversation.input.right', id: 'dsh-continue', order: 100, inject: () => ({ scope }) },
    (props: InputRightProps) => createElement(ContinueButton, props),
  ))
  ctx.slots.inject('settings.general.item', () => ctx.slots.register(
    { name: 'settings.general.item', id: 'dsh-continue', order: 100, inject: () => ({ scope }), locale: NS },
    (_props: SettingProps) => createElement(ContinueSetting, _props),
  ))
}
