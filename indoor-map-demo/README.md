# 305 Interactive Map

這個專案是用 React + Vite 製作的室內機器人互動地圖 demo。
目前階段以 SVG 靜態地圖原型為主，地圖內容是根據 PPT 草圖整理而成。

## 功能內容

- 室內區域分區
- 障礙物與家具
- UWB anchors
- 機器人位置標記
- 測試用移動軌跡

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

- `src/mapData.js`：存放 zones、obstacles、anchors、robot、trajectory 等地圖資料。
- `src/components/IndoorMap.jsx`：根據資料檔內容繪製 SVG 室內地圖。
- 如果要調整地圖版面、區域大小或物件位置，請優先修改 `src/mapData.js`。

## 主要檔案

- `src/App.jsx`：地圖頁面的入口
- `src/components/IndoorMap.jsx`：SVG 繪圖邏輯
- `src/mapData.js`：地圖資料來源
- `src/App.css`：頁面樣式
- `src/index.css`：全域樣式

## 目前開發範圍

目前這個階段主要完成 SVG 地圖原型，以下內容暫時還不包含：

- 即時定位
- WebSocket 串接
- 真實 UWB 資料串接
- 路徑規劃
- 資料庫
- 動畫效果
