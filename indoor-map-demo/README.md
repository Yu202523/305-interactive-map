# 305 Interactive Map

This project is a React + Vite demo for drawing an indoor robot map with SVG.
The current version focuses on a static map prototype based on a PPT floor-plan sketch.

## Features

- Indoor zones
- Obstacles and furniture
- UWB anchors
- Robot marker
- Test trajectory

## Requirements

- Node.js 24+
- npm

## Getting Started

Move into the project folder:

```bash
cd indoor-map-demo
```

Install dependencies:

```bash
npm install
```

If Windows PowerShell blocks `npm.ps1`, use:

```bash
npm.cmd install
```

Start the dev server:

```bash
npm run dev
```

If PowerShell blocks `npm`, use:

```bash
npm.cmd run dev
```

## Build

```bash
npm run build
```

If needed on Windows PowerShell:

```bash
npm.cmd run build
```

## Map Structure

- `src/mapData.js`: stores zones, obstacles, anchors, robot, and trajectory data.
- `src/components/IndoorMap.jsx`: renders the SVG indoor map from the data file.
- To adjust map layout, update the coordinates in `src/mapData.js`.

## Main Files

- `src/App.jsx`: application entry for the map page
- `src/components/IndoorMap.jsx`: SVG rendering logic
- `src/mapData.js`: indoor map data source
- `src/App.css`: page-level styling
- `src/index.css`: global styling

## Current Scope

This phase is focused on the SVG map prototype only.
Not included yet:

- Real-time positioning
- WebSocket integration
- Live UWB data connection
- Path planning
- Database
- Motion animation
