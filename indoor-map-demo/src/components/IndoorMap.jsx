import { anchors, obstacles, robot, trajectory, zones } from "../mapData";

function IndoorMap() {
  const trajectoryPoints = trajectory
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  return (
    <section className="map-page">
      <div className="map-copy">
        <p className="eyebrow">Indoor Robot Demo</p>
        <h1>室內機器人定位地圖</h1>
        <p className="map-description">
          這個版本把地圖資料抽成獨立檔案了。之後你只要修改
          <code> mapData.js </code>
          裡的座標，就能調整區域、障礙物、Anchor、機器人和軌跡，不用一直改整個
          SVG。
        </p>
        <div className="map-meta">
          <span>SVG: 800 x 500</span>
          <span>資料已從元件抽離</span>
        </div>
      </div>

      <div className="map-frame">
        <svg
          width="800"
          height="500"
          viewBox="0 0 800 500"
          role="img"
          aria-label="室內機器人定位地圖"
        >
          <rect
            x="50"
            y="50"
            width="700"
            height="414"
            fill="#ffffff"
            stroke="#333333"
            strokeWidth="3"
          />

          {zones.map((zone) => (
            <g key={zone.id}>
              <rect
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height={zone.height}
                fill={zone.color}
                stroke="#d1d5db"
                strokeWidth="1"
              />
              <text
                x={zone.x + zone.width / 2}
                y={zone.y + zone.height / 2}
                fontSize="22"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#334155"
              >
                {zone.name}
              </text>
            </g>
          ))}

          {obstacles.map((obstacle) => (
            <g key={obstacle.id}>
              <rect
                x={obstacle.x}
                y={obstacle.y}
                width={obstacle.width}
                height={obstacle.height}
                rx="8"
                fill="#94a3b8"
                stroke="#334155"
                strokeWidth="2"
              />
              <text
                x={obstacle.x + obstacle.width / 2}
                y={obstacle.y + obstacle.height / 2}
                fontSize="15"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#ffffff"
              >
                {obstacle.name}
              </text>
            </g>
          ))}

          <polyline
            points={trajectoryPoints}
            fill="none"
            stroke="#ef4444"
            strokeWidth="4"
            strokeDasharray="8 8"
          />

          {anchors.map((anchor) => (
            <g key={anchor.id}>
              <circle cx={anchor.x} cy={anchor.y} r="10" fill="#2563eb" />
              <text
                x={anchor.x}
                y={anchor.y + 28}
                fontSize="14"
                textAnchor="middle"
                fill="#2563eb"
              >
                {anchor.id}
              </text>
            </g>
          ))}

          <g>
            <text
              x={robot.x}
              y={robot.y}
              fontSize="35"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              R
            </text>
            <text
              x={robot.x}
              y={robot.y + 38}
              fontSize="16"
              textAnchor="middle"
              fill="#1f2937"
            >
              {robot.name}
            </text>
          </g>
        </svg>
      </div>

      <div className="map-notes">
        <h2>接下來怎麼改</h2>
        <p>地圖座標資料現在都在 <code>src/mapData.js</code>，後續請優先修改那個檔案。</p>
        <p>如果你要加新的家具、Anchor 或測試路徑，只要往對應的陣列新增物件就可以。</p>
      </div>
    </section>
  );
}

export default IndoorMap;
