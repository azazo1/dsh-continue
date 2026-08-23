window.__ModuleLoader__.load({
	id: "dsh-continue",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		//#region \0dsh-css:/Users/azazo1/pjs/dsh-plugins/dsh-continue/src/client/styles.module.css.mjs
		const css = ".opUrQG_continueAction{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);cursor:pointer;border-radius:50%;justify-content:center;align-items:center;width:28px;height:28px;padding:0;display:inline-flex}.opUrQG_continueAction:hover{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary)}.opUrQG_continueAction:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}.opUrQG_continueIcon{border-top:5px solid #0000;border-bottom:5px solid #0000;border-left:7px solid;width:0;height:0;margin-left:1px}.opUrQG_settingRow{align-items:center;gap:8px;margin-top:12px;padding:16px 0;display:flex;position:relative}.opUrQG_settingRow:before{background:var(--dsw-alias-border-l2);content:\"\";pointer-events:none;height:1px;position:absolute;top:0;left:0;right:0}.opUrQG_settingCopy{flex-direction:column;flex:1;gap:4px;min-width:0;padding-right:48px;display:flex}.opUrQG_settingTitle{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:400;line-height:22px}.opUrQG_settingDescription{color:var(--dsw-alias-label-tertiary);font-size:12px;font-weight:400;line-height:18px}.opUrQG_settingInput{background:var(--dsw-alias-bg-layer-2);box-sizing:border-box;color:var(--dsw-alias-label-primary);font:inherit;border:0;border-radius:18px;outline:0;width:min(280px,42%);height:36px;padding:0 14px}.opUrQG_settingInput:hover,.opUrQG_settingInput:focus{background:var(--dsw-alias-interactive-bg-hover)}@media (width<=640px){.opUrQG_settingRow{flex-direction:column;align-items:stretch}.opUrQG_settingCopy{padding-right:0}.opUrQG_settingInput{width:100%}}";
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
			"continueAction": "opUrQG_continueAction",
			"settingRow": "opUrQG_settingRow",
			"settingTitle": "opUrQG_settingTitle",
			"settingDescription": "opUrQG_settingDescription",
			"settingInput": "opUrQG_settingInput",
			"settingCopy": "opUrQG_settingCopy"
		};
		//#endregion
		//#region src/client/ContinueButton.tsx
		function ContinueButton({ input, inputActions, session }) {
			if (input.draft.trim().length !== 0 || session.running) return null;
			const send = () => {
				inputActions.setDraft("继续");
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
		let continueMessage = "继续";
		function ContinueSetting() {
			const [message, setMessage] = (0, react.useState)(continueMessage);
			const update = (event) => {
				continueMessage = event.currentTarget.value;
				setMessage(continueMessage);
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: styles_module_css_default.settingRow,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: styles_module_css_default.settingCopy,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: styles_module_css_default.settingTitle,
						children: "继续消息"
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: styles_module_css_default.settingDescription,
						children: "输入框为空时点击继续按钮发送的内容"
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
					className: styles_module_css_default.settingInput,
					type: "text",
					value: message,
					placeholder: "继续",
					"aria-label": "继续消息",
					onChange: update
				})]
			});
		}
		//#endregion
		//#region src/client/index.ts
		const inject = ["slots"];
		function apply(ctx) {
			ctx.slots.inject("conversation.input.right", () => ctx.slots.register({
				name: "conversation.input.right",
				id: "dsh-continue",
				order: 100
			}, (props) => (0, react.createElement)(ContinueButton, props)));
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "dsh-continue"
			}, (_props) => (0, react.createElement)(ContinueSetting, null)));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map