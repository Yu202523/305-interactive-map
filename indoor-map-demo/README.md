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

## 如何修改地圖

目前地圖資料寫在 `src/components/IndoorMap.jsx`。

### 1. 修改區域

找到：

```js
const zones = [
  {
    id: "living-room",
    name: "客廳區",
    x: 50,
    y: 50,
    width: 700,
    height: 220,
    color: "#fff3cd",
  },
];
```

你可以調整：

- `x`, `y`：左上角座標
- `width`, `height`：區域大小
- `color`：區域顏色

### 2. 修改障礙物

找到：

```js
const obstacles = [
  {
    id: "sofa",
    name: "沙發",
    x: 120,
    y: 110,
    width: 160,
    height: 60,
  },
];
```

你可以把桌子、沙發、櫃子等家具整理成這種格式後直接加入。

### 3. 修改 anchors

找到：

```js
const anchors = [
  { id: "A1", x: 70, y: 70 },
  { id: "A2", x: 730, y: 70 },
];
```

把每個 Anchor 的位置改成你的實際座標即可。

### 4. 修改機器人與軌跡

找到：

```js
const robot = {
  id: "robot-a",
  name: "Robot A",
  x: 400,
  y: 220,
  status: "移動中",
};

const trajectory = [
  { x: 180, y: 350 },
  { x: 230, y: 320 },
];
```

你可以修改機器人目前位置，或增加更多軌跡點。

## PPT 轉 SVG 座標建議

如果你已經在 PPT 畫好草稿，建議先量出每個元素的：

- `x`
- `y`
- `width`
- `height`

再把資料填進 `zones` 或 `obstacles` 陣列。

建議先完成：

1. 區域
2. 障礙物
3. anchors
4. 機器人與軌跡

## 目前階段

目前是第一版靜態展示地圖，還沒有加入：

- 即時定位
- WebSocket
- UWB 即時資料串接
- 路徑規劃
- 資料庫
- 動畫效果

這些可以等地圖座標和版面穩定後再往下接。
