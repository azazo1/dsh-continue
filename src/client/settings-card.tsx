/**
 * 插件页里 dsh-continue 卡片的配置页.
 *
 * 页面只在 Host 真的组合了本条目的期间注册 (configForms.whileServed).
 */
import { SettingsForm, SettingsValueField } from '@deepseek-ai/dsh-client-ui-primitives'
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import { CONTINUE_MESSAGE_FIELD, DEFAULT_CONTINUE_MESSAGE } from '../shared.ts'
import { formLabels } from './locales.ts'
import type { ContinueCardFace } from './settings-form.ts'

/** 卡片组件拿到的 props. */
export type ContinueSettingsCardProps =
  PropsRuntime<'plugins.bundle.config'>
  & PropsLocale<'dsh-continue'>
  & InjectFace<ContinueCardFace>

/**
 * 渲染卡片的一行简介或配置表单, 由插件页的 view 决定.
 * @param props - 页面要的视图, 字典, 表单快照与动作.
 * @returns 简介文本或配置表单.
 */
export function ContinueSettingsCard(props: ContinueSettingsCardProps) {
  const { t } = props
  const state = props.useContinueSettingsCard(snapshot => snapshot)
  if (props.view === 'summary') return t('description')

  return (
    <SettingsForm labels={formLabels(t)} state={state} onSave={props.save} onDiscard={props.discard}>
      <SettingsValueField
        id="plugin-config-continue-message"
        label={t('message')}
        hint={t('messageHint')}
        placeholder={DEFAULT_CONTINUE_MESSAGE}
        overriddenLabel={t('overridden')}
        resetLabel={t('reset')}
        invalidLabel={t('invalid')}
        disabled={!state.writable}
        {...state.continueMessage}
        onEdit={(text) => { props.edit(CONTINUE_MESSAGE_FIELD, text) }}
        onReset={() => { props.resetField(CONTINUE_MESSAGE_FIELD) }}
      />
    </SettingsForm>
  )
}
