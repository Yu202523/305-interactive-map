# 305 Interactive Map

這個專案是用 React + Vite 製作的室內機器人互動地圖 demo。
目前階段以 SVG 靜態地圖與任務面板互動流程為主，地圖內容是根據 PPT 草圖整理而成。

## 目前已完成的功能

- 室內區域分區
- 障礙物與家具
- UWB anchors
- 機器人位置標記
- 任務指派控制面板
- 任務紀錄列表
- 地圖點選座標輸入

## 環境需求

- Node.js 24+
- npm

## 啟動方式

先進入專案資料夾：

```bash
cd indoor-map-demo
```

安裝套件：

```bash
npm install
```

如果 Windows PowerShell 擋住 `npm.ps1`，可以改用：

```bash
npm.cmd install
```

啟動開發伺服器：

```bash
npm run dev
```

如果 PowerShell 擋住 `npm`，可以改用：

```bash
npm.cmd run dev
```

## 打包建置

```bash
npm run build
```

如果在 Windows PowerShell 需要替代寫法：

```bash
npm.cmd run build
```

## 地圖結構

- `src/mapData.js`：存放 zones、obstacles、anchors、robot 等地圖資料。
- `src/components/IndoorMap.jsx`：負責 SVG 地圖繪製與任務面板互動。
- `src/App.css`：任務面板、任務紀錄、toast、地圖版面的樣式。
- 如果要調整地圖版面、區域大小或物件位置，請優先修改 `src/mapData.js`。

## 主要檔案

- `src/App.jsx`：地圖頁面的入口
- `src/components/IndoorMap.jsx`：SVG 地圖與任務面板邏輯
- `src/mapData.js`：地圖資料來源
- `src/App.css`：頁面與控制面板樣式
- `src/index.css`：全域樣式

## 任務面板功能

右側控制面板目前包含兩個 tab：

- `任務指派`
- `任務紀錄`

### 任務類型

目前支援三種任務：

- `GoTo`
- `ComeHere`
- `跑腿`

### 任務規則

- `GoTo`
  - 出發位置固定為機器人當前位置
  - 目的位置由使用者在地圖上點選

- `ComeHere`
  - 出發位置固定為機器人當前位置
  - 目的位置固定為使用者所在座標（目前為預留欄位，之後串接）

- `跑腿`
  - 第一次點地圖設定出發位置
  - 第二次點地圖設定目的位置

### 任務紀錄

- 任務建立後會自動切到 `任務紀錄`
- 右上角會出現短暫懸浮提示
- 任務清單支援捲動，不會無限往下延伸
- 任務可以手動切換狀態：
  - `待執行`
  - `執行中`
  - `已完成`
- 任務清單會依狀態優先排序：
  1. `執行中`
  2. `待執行`
  3. `已完成`

## 目前開發範圍

目前這個階段主要完成：

- SVG 室內地圖原型
- 任務面板互動流程
- 任務紀錄與狀態切換
- 地圖點擊輸入座標

目前尚未包含：

- 即時定位
- WebSocket 串接
- 真實 UWB 資料串接
- 路徑規劃
- 後端任務派送
- 資料庫持久化
- 動畫效果
