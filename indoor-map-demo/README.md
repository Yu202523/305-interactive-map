# 305 Interactive Map

這個專案是用 React + Vite 製作的室內機器人互動地圖 demo。
目前階段以 SVG 靜態地圖與任務操作面板為主，地圖內容是根據 PPT 草圖整理而成。

## 功能內容

- 室內區域分區
- 障礙物與家具
- UWB anchors
- 機器人位置標記
- 任務設定面板
- 任務紀錄列表
- 點選地圖代入任務座標

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
- `src/components/IndoorMap.jsx`：負責 SVG 地圖繪製、任務面板互動與任務紀錄顯示。
- 如果要調整地圖版面、區域大小或物件位置，請優先修改 `src/mapData.js`。

## 主要檔案

- `src/App.jsx`：地圖頁面的入口
- `src/components/IndoorMap.jsx`：SVG 繪圖與控制面板邏輯
- `src/mapData.js`：地圖資料來源
- `src/App.css`：頁面與面板樣式
- `src/index.css`：全域樣式

## 目前開發範圍

目前已完成的功能包含：

- SVG 室內地圖顯示
- 區域、障礙物、anchors、機器人位置呈現
- 右側任務設定面板
- 任務類別切換：`GoTo`、`ComeHere`、`跑腿`
- 點選地圖代入任務出發位置或目的位置
- 任務指派與任務紀錄雙 tab 介面
- 任務紀錄列表顯示與捲動區塊

目前尚未包含：

- 即時定位
- WebSocket 串接
- 真實 UWB 資料串接
- 路徑規劃
- 後端任務派送
- 資料庫持久化
- 動畫效果
