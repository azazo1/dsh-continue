window.__ModuleLoader__.load({
	id: "dsh-continue",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		//#region src/shared.ts
		/** 插件包名, 同时是 Client loader 注册 id 与插件页槽位的键. */
		const PLUGIN_ID = "dsh-continue";
		/** profile 条目 id: configForms 表单按它寻址, 与包名一致. */
		const ENTRY_ID = PLUGIN_ID;
		/** 继续消息字段名, 与 Host Config 的 volatile 键一致. */
		const CONTINUE_MESSAGE_FIELD = "continueMessage";
		/** 输入框为空时继续按钮发送的默认内容. */
		const DEFAULT_CONTINUE_MESSAGE = "继续";
		//#endregion
		//#region \0dsh-css:/Users/azazo1/pjs/dsh-plugins/dsh-continue/src/client/styles.module.css.mjs
		const css = ".opUrQG_continueAction{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);cursor:pointer;border-radius:50%;justify-content:center;align-items:center;width:28px;height:28px;padding:0;display:inline-flex}.opUrQG_continueAction:hover{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary)}.opUrQG_continueAction:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}.opUrQG_continueIcon{border-top:5px solid #0000;border-bottom:5px solid #0000;border-left:7px solid;width:0;height:0;margin-left:1px}";
		const tagId = "dsh-continue/styles.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-continue";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var styles_module_css_default = {
			"continueAction": "opUrQG_continueAction",
			"continueIcon": "opUrQG_continueIcon"
		};
		//#endregion
		//#region src/client/ContinueButton.tsx
		function ContinueButton({ useInput, useSession, inputActions, scope }) {
			const draft = useInput((s) => s.draft);
			const running = useSession((s) => s.running);
			if (draft.trim().length !== 0 || running) return null;
			const send = () => {
				const message = scope.getSnapshot().value?.continueMessage ?? "继续";
				inputActions.setDraft(message);
				inputActions.submit();
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: styles_module_css_default.continueAction,
				title: "继续",
				"aria-label": "继续",
				onClick: send,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: styles_module_css_default.continueIcon,
					"aria-hidden": "true"
				})
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/** 本插件字典的命名空间, 与包名一致. */
		const NS = "dsh-continue";
		/** English copy. */
		const en = {
			title: "Continue button",
			description: "Add a continue action beside the send button, whose message you can set here.",
			message: "Continue message",
			messageHint: "Sent by the continue button while the composer is empty.",
			overridden: "Overridden",
			reset: "Reset to default",
			invalid: "Enter the message to send, or leave blank to use the default.",
			readOnly: "This deployment stores settings read-only.",
			unavailable: "This plugin is not loaded, so it cannot be configured right now.",
			save: "Save",
			saving: "Saving...",
			saveFailed: "The deployment did not accept these values; they were left for you to correct."
		};
		/** Simplified Chinese copy. */
		const zh = {
			title: "继续按钮",
			description: "在发送按钮旁加一个继续动作, 继续时发送的内容可在此设置.",
			message: "继续消息",
			messageHint: "输入框为空时点击继续按钮发送的内容.",
			overridden: "已覆盖",
			reset: "恢复默认",
			invalid: "请填写要继续发送的内容; 留空表示使用默认值.",
			readOnly: "本部署的设置为只读.",
			unavailable: "该插件当前未加载, 暂时无法配置.",
			save: "保存",
			saving: "保存中...",
			saveFailed: "本部署没有接受这些值, 已保留供你修改."
		};
		/**
		* 表单框架要的文案, 从本插件字典取.
		* @param t - 本插件字典的读取函数.
		* @returns 共享设置表单渲染的标签.
		*/
		function formLabels(t) {
			return {
				unavailable: t("unavailable"),
				readOnly: t("readOnly"),
				saveFailed: t("saveFailed"),
				save: t("save"),
				saving: t("saving")
			};
		}
		//#endregion
		//#region src/client/settings-card.tsx
		/**
		* 插件页里 dsh-continue 卡片的配置页.
		*
		* 页面只在 Host 真的组合了本条目的期间注册 (configForms.whileServed).
		*/
		/**
		* 渲染卡片的一行简介或配置表单, 由插件页的 view 决定.
		* @param props - 页面要的视图, 字典, 表单快照与动作.
		* @returns 简介文本或配置表单.
		*/
		function ContinueSettingsCard(props) {
			const { t } = props;
			const state = props.useContinueSettingsCard((snapshot) => snapshot);
			if (props.view === "summary") return t("description");
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.SettingsForm, {
				labels: formLabels(t),
				state,
				onSave: props.save,
				onDiscard: props.discard,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.SettingsValueField, {
					id: "plugin-config-continue-message",
					label: t("message"),
					hint: t("messageHint"),
					placeholder: DEFAULT_CONTINUE_MESSAGE,
					overriddenLabel: t("overridden"),
					resetLabel: t("reset"),
					invalidLabel: t("invalid"),
					disabled: !state.writable,
					...state.continueMessage,
					onEdit: (text) => {
						props.edit(CONTINUE_MESSAGE_FIELD, text);
					},
					onReset: () => {
						props.resetField(CONTINUE_MESSAGE_FIELD);
					}
				})
			});
		}
		//#endregion
		//#region src/client/settings-form.ts
		/** 把本插件条目的配置表单桥接成卡片页的暂存表单. */
		var ContinueSettingsForm = class {
			form;
			store;
			/**
			* @param scope - 本插件 profile 条目的共享配置表单 (ctx.configForms.get).
			*/
			constructor(scope) {
				this.form = new _deepseek_ai_dsh_client_ui_primitives.SettingsFormModel(scope, [(0, _deepseek_ai_dsh_client_ui_primitives.settingsTextField)(CONTINUE_MESSAGE_FIELD)]);
				this.store = this.form.bind(() => ({
					...this.form.shell(),
					continueMessage: this.form.field(CONTINUE_MESSAGE_FIELD)
				}));
			}
			/**
			* 构造 slot 注册要注入的面.
			* @returns 快照 hook 与表单动作.
			*/
			inject() {
				return {
					hooks: { continueSettingsCard: this.store },
					...this.form.actions()
				};
			}
			/** 释放对配置表单的订阅. */
			dispose() {
				this.form.dispose();
			}
		};
		//#endregion
		//#region src/client/index.ts
		const inject = [
			"slots",
			"locale",
			"configForms"
		];
		function apply(ctx) {
			const scope = ctx.configForms.get(ENTRY_ID);
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "dsh-continue: dictionaries");
			ctx.slots.inject("conversation.input.right", () => ctx.slots.register({
				name: "conversation.input.right",
				id: PLUGIN_ID,
				order: 100,
				inject: () => ({ scope })
			}, (props) => (0, react.createElement)(ContinueButton, props)));
			const card = new ContinueSettingsForm(scope);
			ctx.effect(() => () => {
				card.dispose();
			}, "dsh-continue: settings form");
			ctx.effect(() => ctx.configForms.whileServed([ENTRY_ID], () => ctx.slots.inject("plugins.bundle.config", () => ctx.slots.register({
				name: "plugins.bundle.config",
				key: PLUGIN_ID,
				locale: NS,
				inject: () => card.inject()
			}, ContinueSettingsCard))), "dsh-continue: plugins page card");
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map