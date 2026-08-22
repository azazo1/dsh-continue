# dsh-continue

为 DeepSeek Harness 增加一个可配置的继续按钮.

## 功能

- 保留 DSH 原来的输入框和发送按钮.
- 输入框为空且 Agent 没有工作时, 在发送按钮旁显示圆形播放三角按钮.
- 点击按钮发送配置中的继续消息.
- 设置入口位于设置 > 通用, 配置项使用原生设置行样式.
- 插件只使用 `conversation.input.right` 和 `settings.general.item` 两个 additive Slot.
- Agent 工作期间自动隐藏继续按钮.

## 安装

```shell
pnpm add dsh-continue
```

在 DSH 的插件组合中加入 `dsh-continue` 后重新加载 Web 页面.

## 开发

```shell
pnpm install
pnpm run check
pnpm run build
```

构建产物为 `index.mjs`, `client.js` 和 `client.js.map`.

## 配置

打开 DSH 设置中的通用设置, 修改继续消息. 配置值属于当前浏览器运行会话, 插件重载后恢复为默认值 `继续`.

## 许可证

MIT
