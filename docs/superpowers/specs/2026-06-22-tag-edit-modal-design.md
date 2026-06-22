# 标签编辑/新增弹框设计

## 概述

为ourTab项目实现标签编辑和新增功能，包括：
1. 标签编辑弹框（TabEditModal）
2. 空白区域右键菜单（新增标签、设置）
3. 图标选择与配置功能

## 整体架构

### 新增组件
- `TabEditModal.vue`：标签编辑/新增弹框组件
  - 使用 `<Teleport to="body">` + CSS 模态框（遵循项目规范）
  - 支持编辑和新增两种模式

### 修改组件
- `TabGrid.vue`：处理编辑事件，调用现有API
- `MainContent.vue`：添加空白区域右键菜单

### 数据流
1. **编辑模式**：TabGrid → TabEditModal (props: tab) → 保存 → TabGrid → updateTab API
2. **新增模式**：MainContent → TabEditModal (props: groupId) → 保存 → TabGrid → createTab API

## TabEditModal 组件设计

### Props
```typescript
interface TabEditModalProps {
  tab?: Tab          // 编辑模式
  groupId: string    // 新增模式
  open: boolean      // 控制显示
}
```

### Emits
```typescript
interface TabEditModalEmits {
  'update:open': [value: boolean]
  'save': [tab: Tab]
}
```

### 功能设计

#### 1. 表单字段
- **名称**：`<n-input>` 输入框
- **URL**：`<n-input>` 输入框
- **图标类型选择**：`<n-radio-group>` 单选组
  - 自动抓取favicon
  - 字体图标

#### 2. 图标配置
- **自动抓取模式**：
  - 显示favicon预览
  - 前端JavaScript抓取网站favicon
  - 常见路径：`/favicon.ico`, `/apple-touch-icon.png` 等
  - 需要处理CORS问题

- **字体图标模式**：
  - 图标选择：文字图标（名称第一个字）或图标库图标
  - 字体颜色选择：`<n-color-picker>` 支持透明度
  - 背景颜色选择：`<n-color-picker>` 支持透明度

#### 3. 操作按钮
- 取消：关闭弹框
- 保存：验证表单，调用API，触发save事件

## 空白区域右键菜单设计

### 触发位置
- `MainContent` 组件（主内容区域空白处）
- 排除侧边栏区域
- 排除标签和文件夹区域（标签有自己的右键菜单）

### 菜单项
1. **新增标签**：打开TabEditModal（新增模式）
2. **设置**：打开现有SettingsModal

### 实现方式
- 使用现有ContextMenu库（`@imengyu/vue3-context-menu`）
- 在MainContent中添加`@contextmenu`事件处理
- 需要确保事件不会冒泡到标签组件（标签有自己的右键菜单）

## 数据模型和API

### 扩展字段
现有Tab接口已有`iconType`字段：`'auto' | 'text' | 'custom'`

需要扩展Tab接口：
```typescript
interface Tab {
  // ... 现有字段
  iconColor?: string              // 字体颜色，支持透明度
  iconBackgroundColor?: string    // 背景颜色，支持透明度
}
```

### 数据库更新
需要更新数据库schema，添加`icon_color`和`icon_background_color`字段。

### API调用
- **编辑**：使用现有`updateTab` API，确保支持新字段
- **新增**：使用现有`createTab` API，确保支持新字段
- 需要更新API的Zod验证schema以支持新字段

### 前端favicon抓取
- 使用JavaScript抓取网站favicon
- 常见路径：`/favicon.ico`, `/apple-touch-icon.png` 等
- 可能需要处理CORS问题
- 可以使用第三方服务或直接请求

## 国际化

### 新增i18n键值
```json
{
  "tabEdit": {
    "title": {
      "edit": "编辑标签",
      "add": "新增标签"
    },
    "name": "名称",
    "url": "URL",
    "iconType": "图标类型",
    "iconType.auto": "自动抓取favicon",
    "iconType.text": "字体图标",
    "iconColor": "字体颜色",
    "iconBackgroundColor": "背景颜色",
    "save": "保存",
    "cancel": "取消"
  },
  "contextMenu": {
    "addTag": "新增标签",
    "settings": "设置"
  }
}
```

### 更新语言文件
- `zh-CN.json`
- `en-US.json`

## 实现步骤

### 1. 扩展数据模型
- 更新Tab接口，添加`iconColor`和`iconBackgroundColor`字段
- 更新数据库schema，添加`icon_color`和`icon_background_color`字段
- 生成并运行数据库迁移

### 2. 创建TabEditModal组件
- 实现表单和图标选择逻辑
- 实现favicon抓取功能
- 集成n-color-picker组件

### 3. 修改TabGrid组件
- 处理编辑事件，打开TabEditModal
- 处理保存事件，调用API更新

### 4. 修改MainContent组件
- 添加空白区域右键菜单
- 实现新增标签功能

### 5. 更新国际化文件
- 添加所有新增的i18n键值

### 6. 测试和验证
- 测试编辑和新增功能
- 测试右键菜单
- 测试图标选择和颜色配置

## 遵循的规范

1. **Vue组件**：使用`<script setup lang="ts">` + Composition API
2. **弹框**：使用`<Teleport to="body">` + CSS模态框
3. **状态管理**：通过props和events通信，不引入新的store
4. **国际化**：所有显示文字使用`$t('key')`
5. **样式**：使用Tailwind CSS v4，语义化颜色CSS变量
6. **API调用**：使用现有`createTab`和`updateTab` API