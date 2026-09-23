import type { Context } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import {
  CONTINUE_MESSAGE_FIELD,
  DEFAULT_CONTINUE_MESSAGE,
} from './shared.ts'

export const name = 'dsh-continue'

export const Config = z.object({
  [CONTINUE_MESSAGE_FIELD]: z.string().default(DEFAULT_CONTINUE_MESSAGE).volatile(),
})

export function apply(_ctx: Context): void {}
