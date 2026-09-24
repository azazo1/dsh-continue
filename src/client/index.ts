import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type { ConfigForm as SettingsScope } from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-plugin-manager/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-ui-session/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import { createElement } from 'react'
import { ENTRY_ID, PLUGIN_ID, type ContinueSettings } from '../shared.ts'
import { ContinueButton } from './ContinueButton.tsx'
import { ContinueSettingsCard } from './settings-card.tsx'
import { ContinueSettingsForm } from './settings-form.ts'
import { en, NS, zh } from './locales.ts'

export const inject = ['slots', 'locale', 'configForms']

type InputRightProps = PropsRuntime<'conversation.input.right'> & {
  scope: SettingsScope<ContinueSettings>
}

export function apply(ctx: ClientContext): void {
  const scope = ctx.configForms.get<ContinueSettings>(ENTRY_ID)
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-continue: dictionaries')

  // 输入框右侧的继续按钮与插件页配置卡片共享同一份条目表单.
  ctx.slots.inject('conversation.input.right', () => ctx.slots.register(
    { name: 'conversation.input.right', id: PLUGIN_ID, order: 100, inject: () => ({ scope }) },
    (props: InputRightProps) => createElement(ContinueButton, props),
  ))

  const card = new ContinueSettingsForm(scope)
  ctx.effect(() => () => { card.dispose() }, 'dsh-continue: settings form')
  ctx.effect(() => ctx.configForms.whileServed([ENTRY_ID], () => ctx.slots.inject(
    'plugins.bundle.config',
    () => ctx.slots.register({
      name: 'plugins.bundle.config',
      key: PLUGIN_ID,
      locale: NS,
      inject: () => card.inject(),
    }, ContinueSettingsCard),
  )), 'dsh-continue: plugins page card')
}
