const zones = [
  {
    id: "kitchen",
    name: "廚房區",
    x: 518,
    y: 50,
    width: 233,
    height: 304,
    color: "#fff3cd",
  },
  {
    id: "work-area",
    name: "工作區",
    x: 50,
    y: 50,
    width: 467,
    height: 304,
    color: "#d7ecff",
  },
  {
    id: "living-room",
    name: "客廳區",
    x: 50,
    y: 137,
    width: 301,
    height: 328,
    color: "#ffe0cc",
  },
  
  {
    id: "entrance-area",
    name: "入口區",
    x: 352,
    y: 354,
    width: 399,
    height: 109,
    color: "#d9f7d9",
  },
];

const obstacles = [
  {
    id: "sofa",
    name: "沙發",
    x: 125,
    y: 157,
    width: 188,
    height: 90,
  },
    {
    id: "sofa1",
    name: "沙發",
    x: 125,
    y: 247,
    width: 66,
    height: 125,
  },
  {
    id: "table",
    name: "桌子",
    x: 563,
    y: 163,
    width: 54,
    height: 180,
  },
  {
    id: "cabinet",
    name: "櫃子",
    x: 709,
    y: 50,
    width: 41,
    height: 286,
  },
    {
    id: "sink",
    name: "水槽",
    x: 652,
    y: 50,
    width: 58,
    height: 49,
  },
      {
    id: "desktop",
    name: "電腦桌",
    x: 365,
    y: 50,
    width: 142,
    height: 58,
  },
      {
    id: "desk-chair",
    name: "桌椅區",
    x: 391,
    y: 215,
    width: 66,
    height: 117,
  },
        {
    id: "robotic-arm",
    name: "機器手臂",
    x: 391,
    y: 178,
    width: 66,
    height: 37,
  },
];

const anchors = [
  { id: "A1", x: 70, y: 70 },
  { id: "A2", x: 730, y: 70 },
  { id: "A3", x: 70, y: 430 },
  { id: "A4", x: 730, y: 430 },
];

const robot = {
  id: "robot-a",
  name: "Robot A",
  x: 170,
  y: 420,
  status: "移動中",
};

const trajectory = [
  { x: 180, y: 350 },
  { x: 230, y: 320 },
  { x: 280, y: 290 },
  { x: 340, y: 250 },
  { x: 400, y: 220 },
];

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
          這是第一版靜態 SVG 地圖。你之後只要把 PPT 草稿量到的公分座標，
          依比例換成 x、y、width、height，就可以持續微調版面。
        </p>
        <div className="map-meta">
          <span>SVG: 800 x 500</span>
          <span>地圖比例可再依 PPT 修正</span>
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

          {/* <line x1="50" y1="270" x2="750" y2="270" stroke="#334155" strokeWidth="2" />
          <line x1="350" y1="270" x2="350" y2="400" stroke="#334155" strokeWidth="2" />
          <line x1="50" y1="400" x2="750" y2="400" stroke="#334155" strokeWidth="2" />
*/}
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
            <circle
              cx={robot.x}
              cy={robot.y}
              r="18"
              fill="#ef4444"
              stroke="#ffffff"
              strokeWidth="4"
            />
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
        <h2>下一步怎麼改</h2>
        <p>先把 PPT 上每個區域、家具、Anchor 的左上角和大小量出來。</p>
        <p>再把資料改進這個元件最上方的 arrays，就能慢慢逼近你的正式平面圖。</p>
      </div>
    </section>
  );
}

export default IndoorMap;
