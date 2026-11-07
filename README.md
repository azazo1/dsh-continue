# dsh-continue

为 DeepSeek Harness 增加一个可配置的继续按钮.

## 功能

- 保留 DSH 原来的输入框和发送按钮.
- 输入框为空且 Agent 没有工作时, 在发送按钮旁显示圆形播放三角按钮.
- 点击按钮发送配置中的继续消息.
- 继续消息由 Host 直接插到待发队列最前面, 排队中的旧消息不会被带进这一轮, 仍按原顺序留在后面.
- 设置入口位于设置 > 通用, 配置项使用原生设置行样式.
- 插件只使用 `conversation.input.right` 和 `settings.general.item` 两个 additive Slot.
- Agent 工作期间自动隐藏继续按钮.

## 实现

继续按钮不再复用输入框的提交路径, 而是 POST 到 Host 注册的 `/api/dsh-continue/continue`.

原因是 DSH 每轮第一个 step 都会领走待发队列的首条消息: 如果继续消息走普通提交, 排队中的旧消息会抢在它前面被这一轮领走. Host 侧把继续消息 prepend 到队首, 再用一条占位消息唤醒 driver 并立刻移除, 这一轮领到的就是继续消息本身.

路由挂在 `/api` 下, 因此 Host/Origin 校验和浏览器凭据校验都由 DSH 的 connection 层完成, 并且 exact fetch 路由只对 owner principal 开放.

## 兼容性

适配 DSH `0.2.0-rc.1` 及同系列更新版本.

## 安装

Web 端装进 `web` profile:

```shell
dsh plugin --profile web add azazo1/dsh-continue
```

装完重启 `dsh web`, 浏览器里刷新一次页面.

桌面端装进 `desktop` profile. 它由 Electron 应用独占管理, `dsh plugin` 会拒绝 `--profile desktop`, 所以要用应用内的插件管理器: 在插件页的安装入口填上面命令里对应的包名或本地目录. 装上后重启应用, 窗口刷新一次.

引擎版本线要求 `@deepseek-ai/dsh-*` 不低于 `0.2.0-rc.1`, 且仍在 `0.2.x` 上 (devDependencies 写作 `>=0.2.0-rc.1 <0.3.0`). 更早的引擎线装不上这个版本.

web 与 desktop 两个 profile 跑的是同一套 Web 应用, 桌面端只是多起一个 Host 子进程并给 `<html>` 打上平台标记, 所以同一份包在两边通用, 不需要分别构建.

## 开发

```shell
pnpm install
pnpm run check
pnpm run build
```

构建产物为 `index.mjs`, `client.js` 和 `client.js.map`.

## 配置

打开 DSH 设置中的通用设置, 修改继续消息. 配置值经 DSH Host settings 服务持久化, 页面刷新和插件重载后仍会保留. 清空输入框后点击继续按钮时, 插件发送当前保存的消息.

## 许可证

MIT
