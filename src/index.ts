import type { Context } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { settingsNamespace } from '@deepseek-ai/dsh-settings'
import {
  CONTINUE_MESSAGE_FIELD,
  DEFAULT_CONTINUE_MESSAGE,
  SETTINGS_NAMESPACE,
} from './shared.ts'

export const name = 'dsh-continue'

export const ContinueSettingsSchema = z.object({
  [CONTINUE_MESSAGE_FIELD]: z.string().default(DEFAULT_CONTINUE_MESSAGE),
})

export function apply(ctx: Context): void {
  ctx.inject(['settings'], (settingsCtx) => {
    settingsCtx.settings.register(
      settingsNamespace(SETTINGS_NAMESPACE),
      ContinueSettingsSchema,
    )
  })
}
