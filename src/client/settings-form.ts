/**
 * dsh-continue 插件页卡片的暂存表单.
 *
 * 表单是 profile 条目 volatile Config 的投影: 草稿只留在卡片页, 保存才写回 profile 的 patch 层.
 */
import type { SnapshotStore } from '@deepseek-ai/dsh-client-store'
import {
  SettingsFormModel, settingsTextField,
  type SettingsFieldState, type SettingsFormActions, type SettingsFormScope, type SettingsFormShell,
} from '@deepseek-ai/dsh-client-ui-primitives'
import { CONTINUE_MESSAGE_FIELD, type ContinueSettings } from '../shared.ts'

/** 卡片读到的状态. */
export interface ContinueCardState extends SettingsFormShell {
  /** 继续消息字段. */
  continueMessage: SettingsFieldState
}

/** 卡片注册时注入给组件的面. */
export interface ContinueCardFace extends SettingsFormActions {
  hooks: {
    /** 组件通过它读快照 (useContinueSettingsCard). */
    continueSettingsCard: SnapshotStore<ContinueCardState>
  }
}

/** 把本插件条目的配置表单桥接成卡片页的暂存表单. */
export class ContinueSettingsForm {
  private readonly form: SettingsFormModel<ContinueSettings>
  private readonly store: SnapshotStore<ContinueCardState>

  /**
   * @param scope - 本插件 profile 条目的共享配置表单 (ctx.configForms.get).
   */
  constructor(scope: SettingsFormScope<ContinueSettings>) {
    this.form = new SettingsFormModel(scope, [settingsTextField(CONTINUE_MESSAGE_FIELD)])
    this.store = this.form.bind(() => ({
      ...this.form.shell(),
      continueMessage: this.form.field(CONTINUE_MESSAGE_FIELD),
    }))
  }

  /**
   * 构造 slot 注册要注入的面.
   * @returns 快照 hook 与表单动作.
   */
  inject(): ContinueCardFace {
    return { hooks: { continueSettingsCard: this.store }, ...this.form.actions() }
  }

  /** 释放对配置表单的订阅. */
  dispose(): void {
    this.form.dispose()
  }
}
