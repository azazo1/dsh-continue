import {
  CONTINUE_MESSAGE_FIELD,
  DEFAULT_CONTINUE_MESSAGE,
  type ContinueSettings,
} from '../shared.ts'

export function decodeContinueSettings(section: unknown): ContinueSettings | undefined {
  if (typeof section !== 'object' || section === null) return undefined
  const value = (section as Record<string, unknown>)[CONTINUE_MESSAGE_FIELD]
  return typeof value === 'string'
    ? { continueMessage: value }
    : { continueMessage: DEFAULT_CONTINUE_MESSAGE }
}
