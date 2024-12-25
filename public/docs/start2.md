# aoyukmt

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)]([https://github.com/你的项目/releases](https://github.com/aoyu32/aoyukmt_pro/releases))
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/platform-Windows-lightgrey.svg)]()

aoyukmt 是一款高效键盘操作工具，专注于增强键盘功能、快捷操作和自定义配置，减少鼠标使用率。无论您是文本编辑、文件管理、还是日常系统操作，aoyukmt 都能帮助您提升操作效率！

## ✨ 功能亮点

- **模块化设计**：不同功能模块灵活可控，用户可按需开启或禁用。
- **快捷字符输入**：快速输入特殊字符，如 `!`, `@`, `#` 等。
- **方向键操作**：将方向键与 `space` 键组合，实现便捷的上下左右移动。
- **编辑操作**：快捷键控制复制、粘贴、撤销、全选等常用编辑功能。
- **磁盘和应用快捷启动**：一键打开指定磁盘，快速启动常用软件。
- **自定义热字符串**：通过短字符串快速输入常用内容，如邮箱、用户名等。
- **系统和窗口管理**：系统音量控制、任务管理、窗口最小化、最大化等操作一键完成。

## 📥 下载与安装

1. **下载**：前往 [Releases]([https://github.com/你的项目/releases](https://github.com/aoyu32/aoyukmt_pro/releases)) 页面，下载最新版安装包。
2. **安装**：点击运行下载的setup.exe安装包即可进行软件的安装。
3. **启动**：双击 `aoyukmt.exe` 启动程序，软件将自动加载配置文件。

## 🔧 配置文件

所有快捷键和功能配置都在安装位置的`conf` 目录下的 `aoyu_config.ini` 文件中定义，您可以根据自己的使用习惯自定义：

- **[Update]**：控制软件启动时的更新检测
- **[MasterControl]**：主控模块，控制各功能模块的启用状态
- **[CharacterInput]**：特殊字符快捷键定义
- **[DirectionKey]**：方向键操作定义
- **[EditControl]**：编辑快捷键定义
- **[OpenDisk]**：磁盘快捷启动
- **[RunApp]**：应用快捷启动
- **[RunWeb]**：常用网站快捷打开
- **[HotString]**：自定义热字符串
- **[SystemOperation]**：系统操作快捷键
- **[ExplorerOperation]**：文件管理快捷键
- **[WindowsOperation]**：窗口管理快捷键

> 详细配置说明请参考文档中的 `aoyu_config.ini` 示例。

## 🚀 快速上手

### 1. 启动应用

下载并解压后，运行 `aoyukmt.exe` 即可启动。初次启动时将加载默认配置，您可以随时编辑 `aoyu_config.ini` 以自定义快捷键和功能。

### 2. 常用快捷键示例

| 功能                 | 快捷键组合       | 说明                         |
|----------------------|------------------|------------------------------|
| 方向键上移           | `space + w`     | 控制方向键的上移             |
| 方向键下移           | `space + s`     | 控制方向键的下移             |
| 方向键左移           | `space + a`     | 控制方向键的左移             |
| 方向键右移           | `space + d`     | 控制方向键的右移             |
| 快速输入感叹号       | `space + 1`     | 快速输入 `!`                 |
| 打开 C 盘            | `RShift + c`    | 快速打开 C 盘                |
| 启动 Chrome 浏览器   | `LAlt + g`      | 快速启动 Chrome              |
| 复制                 | `space + c`     | 快捷键复制                   |
| 系统托盘控制         | `Win + u`       | 打开系统托盘                 |
| 窗口最小化           | `Win + n`       | 将当前窗口最小化             |

**更多快捷键功能请安装体验**

## 🐞 已知问题

1. **输入法提示问题**：在记事本中，无法检测当前输入法状态，以及切换输入法时实时提示。
2. **窗口移动问题**：在多显示器下移动窗口会出现窗口消失问题。

## 📄 许可

本项目基于 MIT 许可，详情参见 [LICENSE](https://github.com/你的项目/blob/main/LICENSE) 文件。

## 🙏 贡献

欢迎您为 aoyukmt 提供改进建议和反馈！您可以通过提交 [Issues](https://github.com/你的项目/issues) 或 Pull Requests 来帮助我们改进本项目。

---

感谢您使用 aoyukmt！我们将持续改进，为您提供更好的键盘操作体验。
