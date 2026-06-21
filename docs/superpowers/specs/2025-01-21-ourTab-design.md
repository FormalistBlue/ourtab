# ourTab 设计文档

## 概述

ourTab 是一个现代化的浏览器主页应用，支持自托管，提供类似 iTab/WeTab/Infinity 的标签页样式和操作模式。

### 核心特性

- 顶部搜索栏，支持多搜索引擎
- 标签网格布局，支持拖拽排序
- 文件夹标签，点击展开显示内部标签
- 侧边栏切换标签分组，支持滚轮切换
- 右键菜单操作（新建标签、编辑、删除等）
- 多主题支持，整体风格可切换
- 多语言支持（中文、英文）
- 自定义背景壁纸
- 数据导入导出
- Docker 一键部署

## 技术栈

| 层级 | 技术选择 |
|------|----------|
| 前端框架 | Nuxt 3 + Vue 3 |
| UI 组件库 | shadcn-vue |
| 状态管理 | Pinia |
| 动画 | GSAP |
| 拖拽 | VueDraggablePlus |
| 右键菜单 | vue3-context-menu |
| 工具库 | VueUse |
| 后端 | Nuxt 3 API Routes + Nitro |
| 数据库 | SQLite + Drizzle ORM |
| 国际化 | @nuxtjs/i18n |
| 部署 | Docker |

## 架构设计

### 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                        用户浏览器                            │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Nuxt 3 前端                        │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │   │
│  │  │ 搜索栏  │ │ 标签网格 │ │ 侧边栏  │ │ 设置弹框│   │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐               │   │
│  │  │ 右键菜单│ │ 文件夹弹│ │ 导入导出 │               │   │
│  │  └─────────┘ └─────────┘ └─────────┘               │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │ API 调用                        │
│                           ▼                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │               Nuxt 3 API Routes                     │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │   │
│  │  │标签 CRUD│ │分组 CRUD│ │设置 CRUD│ │导入导出 │   │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│                           ▼                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              SQLite + Drizzle ORM                    │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐               │   │
│  │  │tabs表   │ │groups表 │ │settings表│               │   │
│  │  └─────────┘ └─────────┘ └─────────┘               │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 目录结构

```
ourTab/
├── app/                          # 前端应用
│   ├── components/               # Vue 组件
│   │   ├── layout/               # 布局组件
│   │   │   ├── Sidebar.vue       # 侧边栏
│   │   │   ├── SearchBar.vue     # 搜索栏
│   │   │   └── MainContent.vue   # 主内容区
│   │   ├── tabs/                 # 标签相关组件
│   │   │   ├── TabGrid.vue       # 标签网格
│   │   │   ├── TabItem.vue       # 单个标签
│   │   │   ├── FolderTab.vue     # 文件夹标签
│   │   │   └── FolderModal.vue   # 文件夹弹框
│   │   ├── settings/             # 设置相关组件
│   │   │   ├── SettingsModal.vue # 设置弹框
│   │   │   ├── SearchSettings.vue# 搜索设置
│   │   │   ├── ThemeSettings.vue # 主题设置
│   │   │   └── LangSettings.vue  # 语言设置
│   │   ├── context-menu/         # 右键菜单
│   │   └── common/               # 通用组件
│   ├── composables/              # 组合式函数
│   │   ├── useTabs.ts            # 标签逻辑
│   │   ├── useGroups.ts          # 分组逻辑
│   │   ├── useSettings.ts        # 设置逻辑
│   │   ├── useTheme.ts           # 主题逻辑
│   │   └── useDragDrop.ts        # 拖拽逻辑
│   ├── stores/                   # Pinia 状态
│   │   ├── tabs.ts               # 标签状态
│   │   ├── groups.ts             # 分组状态
│   │   ├── settings.ts           # 设置状态
│   │   └── theme.ts              # 主题状态
│   ├── layouts/                  # 布局
│   │   └── default.vue           # 默认布局
│   ├── pages/                    # 页面
│   │   └── index.vue             # 首页
│   ├── assets/                   # 静态资源
│   │   ├── themes/               # 主题文件
│   │   └── icons/                # 图标
│   ├── i18n/                     # 国际化
│   │   ├── locales/              # 语言文件
│   │   │   ├── zh-CN.json
│   │   │   └── en-US.json
│   │   └── i18n.config.ts        # i18n 配置
│   └── plugins/                  # 插件
│       └── gsap.client.ts        # GSAP 客户端插件
├── server/                       # 后端服务
│   ├── api/                      # API 路由
│   │   ├── tabs.ts               # 标签 API
│   │   ├── groups.ts             # 分组 API
│   │   ├── settings.ts           # 设置 API
│   │   └── import-export.ts      # 导入导出 API
│   ├── database/                 # 数据库
│   │   ├── schema.ts             # Drizzle schema
│   │   ├── index.ts              # 数据库连接
│   │   └── migrations/           # 迁移文件
│   └── utils/                    # 工具函数
│       └── favicon.ts            # 图标获取工具
├── public/                       # 公共静态资源
├── docker/                       # Docker 配置
│   ├── Dockerfile
│   └── docker-compose.yml
├── nuxt.config.ts                # Nuxt 配置
├── tailwind.config.ts            # Tailwind 配置
├── package.json
└── README.md
```

## 数据模型

### 数据库表设计

#### 1. groups 表 - 标签分组

```sql
CREATE TABLE groups (
  id          TEXT PRIMARY KEY,        -- UUID
  name        TEXT NOT NULL,           -- 分组名称
  icon        TEXT,                    -- 分组图标
  sort_order  INTEGER NOT NULL DEFAULT 0,  -- 排序顺序
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
```

#### 2. tabs 表 - 标签

```sql
CREATE TABLE tabs (
  id          TEXT PRIMARY KEY,        -- UUID
  group_id    TEXT NOT NULL,           -- 所属分组 ID
  name        TEXT NOT NULL,           -- 标签名称
  url         TEXT NOT NULL,           -- 标签网址
  icon        TEXT,                    -- 图标 URL 或文字图标
  icon_type   TEXT NOT NULL DEFAULT 'auto',  -- 图标类型: auto | text | custom
  is_folder   INTEGER NOT NULL DEFAULT 0,   -- 是否是文件夹: 0 | 1
  folder_id   TEXT,                    -- 如果是文件夹内的标签，指向文件夹 ID
  sort_order  INTEGER NOT NULL DEFAULT 0,   -- 排序顺序
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
  FOREIGN KEY (folder_id) REFERENCES tabs(id) ON DELETE CASCADE
);
```

#### 3. settings 表 - 系统设置

```sql
CREATE TABLE settings (
  key         TEXT PRIMARY KEY,        -- 设置键名
  value       TEXT NOT NULL,           -- 设置值 (JSON 字符串)
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
```

### Drizzle Schema 定义

```typescript
// server/database/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const groups = sqliteTable('groups', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  icon: text('icon'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
});

export const tabs = sqliteTable('tabs', {
  id: text('id').primaryKey(),
  groupId: text('group_id').notNull().references(() => groups.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  url: text('url').notNull(),
  icon: text('icon'),
  iconType: text('icon_type').notNull().default('auto'),  // auto | text | custom
  isFolder: integer('is_folder').notNull().default(0),     // 0 | 1
  folderId: text('folder_id').references((): any => tabs.id, { onDelete: 'cascade' }),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
});

export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
});
```

### 默认设置数据

```typescript
const defaultSettings = {
  search_engine: 'google',           // 默认搜索引擎
  search_engines: [                  // 搜索引擎列表
    { name: 'Google', url: 'https://www.google.com/search?q=' },
    { name: 'Bing', url: 'https://www.bing.com/search?q=' },
    { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
  ],
  theme: 'default',                  // 当前主题
  language: 'zh-CN',                 // 当前语言
  background: {                      // 背景设置
    type: 'gradient',                // gradient | image | color
    value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  sidebar_collapsed: false,          // 侧边栏是否折叠
};
```

## 前端组件设计

### 核心组件层级

```
index.vue (首页)
├── DefaultLayout (默认布局)
│   ├── Sidebar.vue (侧边栏)
│   │   ├── GroupList.vue (分组列表)
│   │   └── GroupItem.vue (分组项)
│   ├── MainContent.vue (主内容区)
│   │   ├── SearchBar.vue (搜索栏)
│   │   ├── TabGrid.vue (标签网格)
│   │   │   ├── TabItem.vue (单个标签)
│   │   │   └── FolderTab.vue (文件夹标签)
│   │   └── FolderModal.vue (文件夹弹框)
│   └── ContextMenu.vue (右键菜单)
├── SettingsModal.vue (设置弹框)
│   ├── SettingsSidebar.vue (设置侧边栏)
│   └── SettingsContent.vue (设置内容)
│       ├── SearchSettings.vue
│       ├── ThemeSettings.vue
│       ├── LanguageSettings.vue
│       └── BackgroundSettings.vue
└── ImportExportModal.vue (导入导出弹框)
```

### 组件职责说明

#### 1. Sidebar.vue - 侧边栏
- 显示所有标签分组列表
- 支持点击切换分组
- 支持鼠标滚轮滚动切换分组
- 可折叠/展开
- 右键菜单：新建分组、编辑分组、删除分组

#### 2. SearchBar.vue - 搜索栏
- 顶部居中显示
- 支持选择搜索引擎（下拉菜单）
- 输入关键词后回车或点击搜索
- 搜索引擎可在设置中配置

#### 3. TabGrid.vue - 标签网格
- 显示当前分组的所有标签
- 支持拖拽排序（VueDraggablePlus）
- 响应式布局：根据屏幕宽度自动调整列数
- 右键空白区域：新建标签、打开设置

#### 4. TabItem.vue - 单个标签
- 显示图标、名称
- 点击在新标签页打开网址
- 支持拖拽
- 右键菜单：编辑、删除、移动到文件夹

#### 5. FolderTab.vue - 文件夹标签
- 显示文件夹图标、名称
- 点击打开 FolderModal
- 支持拖拽
- 右键菜单：编辑、删除

#### 6. FolderModal.vue - 文件夹弹框
- 模态框显示文件夹内所有标签
- 支持拖拽排序
- 可以编辑、删除、新增标签
- 点击标签在新标签页打开网址

#### 7. SettingsModal.vue - 设置弹框
- 左右布局：左侧菜单，右侧内容
- 菜单项：搜索设置、主题设置、语言设置、背景设置
- 支持实时预览

### 状态管理设计

```typescript
// stores/tabs.ts
export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<Tab[]>([]);
  const currentGroupId = ref<string>('');

  // 获取当前分组的标签
  const currentTabs = computed(() => 
    tabs.value.filter(tab => tab.groupId === currentGroupId.value)
  );

  // CRUD 操作
  async function fetchTabs() { ... }
  async function createTab(tab: CreateTabInput) { ... }
  async function updateTab(id: string, data: UpdateTabInput) { ... }
  async function deleteTab(id: string) { ... }
  async function reorderTabs(orderedIds: string[]) { ... }

  return { tabs, currentGroupId, currentTabs, fetchTabs, createTab, updateTab, deleteTab, reorderTabs };
});

// stores/groups.ts
export const useGroupsStore = defineStore('groups', () => {
  const groups = ref<Group[]>([]);
  const currentGroupId = ref<string>('');

  async function fetchGroups() { ... }
  async function createGroup(group: CreateGroupInput) { ... }
  async function updateGroup(id: string, data: UpdateGroupInput) { ... }
  async function deleteGroup(id: string) { ... }

  return { groups, currentGroupId, fetchGroups, createGroup, updateGroup, deleteGroup };
});

// stores/settings.ts
export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<Settings>({});

  async function fetchSettings() { ... }
  async function updateSetting(key: string, value: any) { ... }

  return { settings, fetchSettings, updateSetting };
});

// stores/theme.ts
export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<string>('default');
  const themes = ref<Theme[]>([]);

  function applyTheme(themeName: string) { ... }

  return { currentTheme, themes, applyTheme };
});
```

## API 设计

### REST API 端点

#### 标签相关

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/tabs` | 获取所有标签 |
| GET | `/api/tabs/:id` | 获取单个标签 |
| POST | `/api/tabs` | 创建标签 |
| PUT | `/api/tabs/:id` | 更新标签 |
| DELETE | `/api/tabs/:id` | 删除标签 |
| PUT | `/api/tabs/reorder` | 批量更新标签排序 |

#### 分组相关

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/groups` | 获取所有分组 |
| GET | `/api/groups/:id` | 获取单个分组 |
| POST | `/api/groups` | 创建分组 |
| PUT | `/api/groups/:id` | 更新分组 |
| DELETE | `/api/groups/:id` | 删除分组 |
| PUT | `/api/groups/reorder` | 批量更新分组排序 |

#### 设置相关

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/settings` | 获取所有设置 |
| PUT | `/api/settings/:key` | 更新单个设置 |

#### 导入导出

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/export` | 导出所有数据 |
| POST | `/api/import` | 导入数据 |

### API 请求/响应示例

#### 创建标签

```typescript
// POST /api/tabs
// Request
{
  "groupId": "group-uuid",
  "name": "GitHub",
  "url": "https://github.com",
  "iconType": "auto",  // auto | text | custom
  "icon": null,        // auto 时自动获取，text 时为文字，custom 时为 URL
  "isFolder": false,
  "folderId": null
}

// Response
{
  "id": "tab-uuid",
  "groupId": "group-uuid",
  "name": "GitHub",
  "url": "https://github.com",
  "icon": "https://github.com/favicon.ico",
  "iconType": "auto",
  "isFolder": false,
  "folderId": null,
  "sortOrder": 0,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### 批量更新排序

```typescript
// PUT /api/tabs/reorder
// Request
{
  "items": [
    { "id": "tab-1", "sortOrder": 0 },
    { "id": "tab-2", "sortOrder": 1 },
    { "id": "tab-3", "sortOrder": 2 }
  ]
}
```

#### 导出数据

```typescript
// GET /api/export
// Response
{
  "version": "1.0",
  "exportedAt": "2024-01-01T00:00:00Z",
  "groups": [...],
  "tabs": [...],
  "settings": {...}
}
```

### 图标自动获取

当 `iconType` 为 `auto` 时，后端通过以下方式获取图标：

```typescript
// server/utils/favicon.ts
export async function fetchFavicon(url: string): Promise<string> {
  const domain = new URL(url).hostname;
  
  // 优先尝试 Google Favicon API
  const googleFavicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  
  // 备用：直接获取网站 favicon
  const directFavicon = `https://${domain}/favicon.ico`;
  
  return googleFavicon;
}
```

## 主题系统

### 主题架构

主题系统采用 CSS 变量 + Tailwind 配置的方式，支持多套主题风格。与 shadcn-vue 的主题系统统一，以 shadcn-vue 的 CSS 变量为基础，扩展自定义变量。

#### 主题文件结构

```
assets/themes/
├── default.json      # 默认主题
├── dark.json         # 暗色主题
├── minimal.json      # 极简主题
├── glass.json        # 玻璃拟态主题
└── neon.json         # 霓虹主题
```

#### 主题配置格式

```typescript
// types/theme.ts
interface ThemeConfig {
  name: string;
  label: string;
  
  // 颜色系统
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  
  // 组件样式
  components: {
    sidebar: {
      width: string;
      background: string;
      blur: string;
      borderRadius: string;
    };
    searchBar: {
      width: string;
      height: string;
      background: string;
      borderRadius: string;
      shadow: string;
    };
    tabItem: {
      width: string;
      height: string;
      background: string;
      borderRadius: string;
      shadow: string;
      hoverEffect: string;
    };
    folderModal: {
      background: string;
      blur: string;
      borderRadius: string;
    };
    settingsModal: {
      width: string;
      background: string;
      blur: string;
    };
  };
  
  // 动画配置
  animations: {
    tabHover: string;
    tabClick: string;
    modalEnter: string;
    modalLeave: string;
    sidebarToggle: string;
  };
}
```

### 主题切换实现

```typescript
// composables/useTheme.ts
export function useTheme() {
  const settingsStore = useSettingsStore();
  
  const currentTheme = computed(() => settingsStore.settings.theme || 'default');
  
  function applyTheme(themeName: string) {
    const theme = themes[themeName];
    if (!theme) return;
    
    // 设置 CSS 变量
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // 设置组件样式变量
    Object.entries(theme.components).forEach(([component, styles]) => {
      Object.entries(styles).forEach(([key, value]) => {
        root.style.setProperty(`--${component}-${key}`, value);
      });
    });
    
    // 更新设置
    settingsStore.updateSetting('theme', themeName);
  }
  
  return { currentTheme, applyTheme };
}
```

### 背景系统

背景支持三种类型：

1. **渐变背景**：CSS 渐变
2. **图片背景**：用户上传或选择预设
3. **纯色背景**：单色

```typescript
// composables/useBackground.ts
export function useBackground() {
  const settingsStore = useSettingsStore();
  
  const background = computed(() => settingsStore.settings.background || {
    type: 'gradient',
    value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  });
  
  function setBackground(type: 'gradient' | 'image' | 'color', value: string) {
    settingsStore.updateSetting('background', { type, value });
    applyBackground();
  }
  
  function applyBackground() {
    const root = document.documentElement;
    if (background.value.type === 'image') {
      root.style.setProperty('--background', `url(${background.value.value})`);
    } else {
      root.style.setProperty('--background', background.value.value);
    }
  }
  
  return { background, setBackground };
}
```

## 国际化 (i18n)

### i18n 架构

使用 `@nuxtjs/i18n` 模块，第一版支持简体中文和英文。

#### 语言文件结构

```
i18n/
├── locales/
│   ├── zh-CN.json    # 简体中文
│   └── en-US.json    # 英文
└── i18n.config.ts    # i18n 配置
```

#### 语言文件示例

```json
// i18n/locales/zh-CN.json
{
  "common": {
    "add": "添加",
    "edit": "编辑",
    "delete": "删除",
    "save": "保存",
    "cancel": "取消",
    "confirm": "确认",
    "close": "关闭",
    "loading": "加载中...",
    "success": "成功",
    "error": "错误"
  },
  "sidebar": {
    "title": "标签分组",
    "addGroup": "新建分组",
    "editGroup": "编辑分组",
    "deleteGroup": "删除分组",
    "deleteConfirm": "确定要删除这个分组吗？"
  },
  "search": {
    "placeholder": "搜索网页...",
    "engines": {
      "google": "Google",
      "bing": "Bing",
      "duckduckgo": "DuckDuckGo"
    }
  },
  "tabs": {
    "addTab": "新建标签",
    "editTab": "编辑标签",
    "deleteTab": "删除标签",
    "deleteConfirm": "确定要删除这个标签吗？",
    "name": "名称",
    "url": "网址",
    "icon": "图标",
    "iconTypes": {
      "auto": "自动获取",
      "text": "文字图标",
      "custom": "自定义"
    }
  },
  "folder": {
    "title": "文件夹",
    "addTab": "添加标签",
    "empty": "文件夹为空"
  },
  "settings": {
    "title": "设置",
    "search": "搜索设置",
    "theme": "主题设置",
    "language": "语言设置",
    "background": "背景设置",
    "searchEngine": "默认搜索引擎",
    "searchEngines": "搜索引擎列表",
    "currentTheme": "当前主题",
    "currentLanguage": "当前语言",
    "backgroundType": "背景类型",
    "backgroundTypes": {
      "gradient": "渐变",
      "image": "图片",
      "color": "纯色"
    }
  },
  "importExport": {
    "title": "导入导出",
    "export": "导出数据",
    "import": "导入数据",
    "exportSuccess": "导出成功",
    "importSuccess": "导入成功",
    "importError": "导入失败，请检查文件格式"
  }
}
```

## 部署方案

### Docker 部署

#### Dockerfile

```dockerfile
# docker/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# 安装依赖
COPY package*.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install

# 复制源代码
COPY . .

# 构建应用
RUN pnpm build

# 生产镜像
FROM node:20-alpine AS production

WORKDIR /app

# 安装生产依赖
COPY package*.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --prod

# 复制构建产物
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/server/database ./server/database

# 创建数据目录
RUN mkdir -p /app/data

# 设置环境变量
ENV DATABASE_PATH=/app/data/ourtab.db
ENV NODE_ENV=production

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", ".output/server/index.mjs"]
```

#### docker-compose.yml

```yaml
# docker/docker-compose.yml
version: '3.8'

services:
  ourtab:
    build:
      context: ..
      dockerfile: docker/Dockerfile
    container_name: ourtab
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    environment:
      - DATABASE_PATH=/app/data/ourtab.db
      - NODE_ENV=production
    restart: unless-stopped
```

#### 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `DATABASE_PATH` | SQLite 数据库文件路径 | `/app/data/ourtab.db` |
| `NODE_ENV` | 运行环境 | `production` |
| `PORT` | 服务端口 | `3000` |

### 部署步骤

```bash
# 1. 克隆项目
git clone https://github.com/your-username/ourTab.git
cd ourTab

# 2. 使用 Docker Compose 启动
cd docker
docker-compose up -d

# 3. 访问
# 浏览器打开 http://localhost:3000
```
