window.__ModuleLoader__.load({
	id: "dsh-continue",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/shared.ts
		const SETTINGS_NAMESPACE = "dsh-continue";
		const CONTINUE_MESSAGE_FIELD = "continueMessage";
		const DEFAULT_CONTINUE_MESSAGE = "继续";
		//#endregion
		//#region \0dsh-css:/Users/azazo1/pjs/dsh-plugins/dsh-continue/src/client/styles.module.css.mjs
		const css = ".opUrQG_continueAction{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);cursor:pointer;border-radius:50%;justify-content:center;align-items:center;width:28px;height:28px;padding:0;display:inline-flex}.opUrQG_continueAction:hover{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary)}.opUrQG_continueAction:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}.opUrQG_continueIcon{border-top:5px solid #0000;border-bottom:5px solid #0000;border-left:7px solid;width:0;height:0;margin-left:1px}.opUrQG_settingRow{border-bottom:1px solid var(--dsw-alias-border-l2);align-items:center;gap:8px;margin-bottom:16px;padding:16px 0;display:flex;position:relative}.opUrQG_settingCopy{flex-direction:column;flex:1;gap:4px;min-width:0;padding-right:48px;display:flex}.opUrQG_settingTitle{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:400;line-height:22px}.opUrQG_settingDescription{color:var(--dsw-alias-label-tertiary);font-size:12px;font-weight:400;line-height:18px}.opUrQG_settingInput{background:var(--dsw-alias-bg-module-platform);box-sizing:border-box;color:var(--dsw-alias-label-primary);font:inherit;border:1px solid #0000;border-radius:18px;outline:0;width:min(280px,42%);height:36px;padding:0 14px}.opUrQG_settingInput:hover{background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l2)}.opUrQG_settingInput:focus-visible{background:var(--dsw-alias-bg-module-platform);border-color:var(--dsw-alias-brand-primary);outline:0}@media (width<=640px){.opUrQG_settingRow{flex-direction:column;align-items:stretch}.opUrQG_settingCopy{padding-right:0}.opUrQG_settingInput{width:100%}}";
		const tagId = "dsh-continue/styles.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-continue";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var styles_module_css_default = {
			"continueIcon": "opUrQG_continueIcon",
			"settingDescription": "opUrQG_settingDescription",
			"settingTitle": "opUrQG_settingTitle",
			"continueAction": "opUrQG_continueAction",
			"settingRow": "opUrQG_settingRow",
			"settingCopy": "opUrQG_settingCopy",
			"settingInput": "opUrQG_settingInput"
		};
		//#endregion
		//#region src/client/ContinueButton.tsx
		function ContinueButton({ input, inputActions, session, scope }) {
			if (input.draft.trim().length !== 0 || session.running) return null;
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
		//#region src/client/ContinueSetting.tsx
		function ContinueSetting({ scope, t }) {
			const message = (0, react.useSyncExternalStore)((onChange) => scope.subscribe(onChange), () => scope.getSnapshot().value?.continueMessage ?? "");
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: styles_module_css_default.settingRow,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: styles_module_css_default.settingCopy,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: styles_module_css_default.settingTitle,
						children: t("settings.continueMessage.title")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: styles_module_css_default.settingDescription,
						children: t("settings.continueMessage.description")
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
					className: styles_module_css_default.settingInput,
					type: "text",
					value: message,
					placeholder: "继续",
					"aria-label": t("settings.continueMessage.title"),
					onChange: (event) => {
						scope.set("continueMessage", event.currentTarget.value);
					}
				})]
			});
		}
		//#endregion
		//#region src/client/settings.ts
		function decodeContinueSettings(section) {
			if (typeof section !== "object" || section === null) return void 0;
			const value = section[CONTINUE_MESSAGE_FIELD];
			return typeof value === "string" ? { continueMessage: value } : { continueMessage: DEFAULT_CONTINUE_MESSAGE };
		}
		//#endregion
		//#region src/client/locales.ts
		const zh = {
			"settings.continueMessage.title": "继续消息",
			"settings.continueMessage.description": "输入框为空时点击继续按钮发送的内容"
		};
		const en = {
			"settings.continueMessage.title": "Continue message",
			"settings.continueMessage.description": "Message sent by the continue button when the composer is empty"
		};
		const NS = "dsh-continue";
		//#endregion
		//#region src/client/index.ts
		const inject = [
			"slots",
			"locale",
			"settingsScope"
		];
		function apply(ctx) {
			const scope = ctx.settingsScope.bind({
				namespace: SETTINGS_NAMESPACE,
				decode: decodeContinueSettings
			});
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "dsh-continue: dictionaries");
			ctx.slots.inject("conversation.input.right", () => ctx.slots.register({
				name: "conversation.input.right",
				id: "dsh-continue",
				order: 100,
				inject: () => ({ scope })
			}, (props) => (0, react.createElement)(ContinueButton, props)));
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "dsh-continue",
				order: 100,
				inject: () => ({ scope }),
				locale: NS
			}, (_props) => (0, react.createElement)(ContinueSetting, _props)));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map