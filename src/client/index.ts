import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings-general/client'
import { ContinueButton } from './ContinueButton.tsx'
import { ContinueSetting } from './ContinueSetting.tsx'
import { createElement } from 'react'

export const inject = ['slots']

type InputRightProps = PropsRuntime<'conversation.input.right'>
type SettingProps = PropsRuntime<'settings.general.item'>

export function apply(ctx: ClientContext): void {
  ctx.slots.inject('conversation.input.right', () => ctx.slots.register(
    { name: 'conversation.input.right', id: 'dsh-continue', order: 100 },
    (props: InputRightProps) => createElement(ContinueButton, props),
  ))
  ctx.slots.inject('settings.general.item', () => ctx.slots.register(
    { name: 'settings.general.item', id: 'dsh-continue', order: -30 },
    (_props: SettingProps) => createElement(ContinueSetting, null),
  ))
}
