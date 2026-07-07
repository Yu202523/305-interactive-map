# 305 Interactive Map

這個專案是用 React + Vite 製作的室內互動地圖 demo，目前先完成第一版靜態 SVG 地圖，方便把 PPT 草稿逐步轉成網頁上的平面圖。

## 功能

- 顯示室內區域 `zones`
- 顯示障礙物 `obstacles`
- 顯示 UWB anchors
- 顯示機器人位置
- 顯示移動軌跡

## 開發環境

- Node.js 24+
- npm

## 安裝與啟動

先進入專案資料夾：

```bash
cd indoor-map-demo
```

安裝套件：

```bash
npm install
```

如果你在 Windows PowerShell 遇到 `npm.ps1` 被阻擋，也可以改用：

```bash
npm.cmd install
```

啟動開發伺服器：

```bash
npm run dev
```

如果 PowerShell 擋住 `npm`，改用：

```bash
npm.cmd run dev
```

啟動後打開終端機顯示的本機網址，就可以看到地圖畫面。

## 建置

```bash
npm run build
```

Windows PowerShell 版本：

```bash
npm.cmd run build
```

## 主要檔案

- `src/App.jsx`
  用來載入地圖元件。
- `src/components/IndoorMap.jsx`
  地圖主元件，包含區域、障礙物、anchors、機器人與軌跡資料。
- `src/App.css`
  頁面版型與地圖外觀樣式。
- `src/index.css`
  全域樣式。



## 目前階段

目前是第一版靜態展示地圖，還沒有加入：

- 即時定位
- WebSocket
- UWB 即時資料串接
- 路徑規劃
- 資料庫
- 動畫效果

