import { useState } from "react";
import { anchors, obstacles, robot, zones } from "../mapData";

const TASK_TYPES = [
  { id: "goto", label: "GoTo" },
  { id: "come-here", label: "ComeHere" },
  { id: "errand", label: "跑腿" },
];

const PANEL_TABS = [
  { id: "assign", label: "任務指派" },
  { id: "history", label: "任務紀錄" },
];

const USER_LOCATION_LABEL = "使用者所在座標（之後串接）";

function formatPoint(point) {
  if (!point) {
    return "尚未選擇";
  }

  return `(${point.x}, ${point.y})`;
}

function createTaskRecord({ taskType, start, destination }) {
  return {
    id: `task-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
    taskType,
    start,
    destination,
    createdAt: new Date().toLocaleString("zh-TW", {
      hour12: false,
    }),
    status: "待執行",
  };
}

function IndoorMap() {
  const [activeTab, setActiveTab] = useState("assign");
  const [taskType, setTaskType] = useState(TASK_TYPES[0].id);
  const [gotoDestination, setGotoDestination] = useState(null);
  const [errandStart, setErrandStart] = useState(null);
  const [errandDestination, setErrandDestination] = useState(null);
  const [taskHistory, setTaskHistory] = useState([]);
  const [taskMessage, setTaskMessage] = useState("請先設定一筆任務。");

  const handleTaskTypeChange = (event) => {
    const nextTaskType = event.target.value;
    setTaskType(nextTaskType);
    setGotoDestination(null);
    setErrandStart(null);
    setErrandDestination(null);
    setTaskMessage("已切換任務類別，請重新確認任務內容。");
  };

  const handleMapClick = (event) => {
    const svg = event.currentTarget;
    const bounds = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;

    const x = Math.round(((event.clientX - bounds.left) / bounds.width) * viewBox.width);
    const y = Math.round(((event.clientY - bounds.top) / bounds.height) * viewBox.height);
    const point = { x, y };

    if (taskType === "goto") {
      setGotoDestination(point);
      setTaskMessage(`GoTo 目的位置已選為 ${formatPoint(point)}。`);
      return;
    }

    if (taskType === "errand") {
      if (!errandStart) {
        setErrandStart(point);
        setTaskMessage(`跑腿任務出發位置已選為 ${formatPoint(point)}。`);
        return;
      }

      setErrandDestination(point);
      setTaskMessage(`跑腿任務目的位置已選為 ${formatPoint(point)}。`);
    }
  };

  const resetSelectedPoints = () => {
    setGotoDestination(null);
    setErrandStart(null);
    setErrandDestination(null);
    setTaskMessage("已清除目前選點。");
  };

  const taskInstruction =
    taskType === "goto"
      ? "請在地圖上點一下目的座標。"
      : taskType === "come-here"
        ? "ComeHere 會直接以前往使用者位置為目的地。"
        : !errandStart
          ? "請先在地圖上點選跑腿任務的出發位置。"
          : "請再點一次地圖，選擇跑腿任務的目的位置。";

  const taskStartValue =
    taskType === "errand" ? formatPoint(errandStart) : `機器人當前位置 ${formatPoint(robot)}`;

  const taskDestinationValue =
    taskType === "goto"
      ? formatPoint(gotoDestination)
      : taskType === "come-here"
        ? USER_LOCATION_LABEL
        : formatPoint(errandDestination);

  const canSubmitTask =
    (taskType === "goto" && gotoDestination) ||
    taskType === "come-here" ||
    (taskType === "errand" && errandStart && errandDestination);

  const handleAddTask = () => {
    if (!canSubmitTask) {
      setTaskMessage("任務資訊還沒填完整，請先完成必要選點。");
      return;
    }

    const start =
      taskType === "errand"
        ? errandStart
        : { x: robot.x, y: robot.y, label: "機器人當前位置" };

    const destination =
      taskType === "goto"
        ? gotoDestination
        : taskType === "come-here"
          ? { label: USER_LOCATION_LABEL }
          : errandDestination;

    const nextTask = createTaskRecord({
      taskType: TASK_TYPES.find((task) => task.id === taskType)?.label ?? taskType,
      start,
      destination,
    });

    setTaskHistory((current) => [nextTask, ...current]);
    setTaskMessage("任務已加入紀錄列表。");
    setActiveTab("history");
  };

  return (
    <section className="map-page">
      <div className="map-copy">
        <p className="eyebrow">Indoor Robot Demo</p>
        <h1>室內機器人定位地圖</h1>
        <p className="map-description">
          右側控制面板現在分成任務指派與任務紀錄兩個 tab。你可以先建立任務，
          再在同一塊區域用列表查看過去指派的內容。
        </p>
      </div>

      <div className="map-layout">
        <div className="map-main">
          <div className="map-frame">
            <svg
              width="800"
              height="500"
              viewBox="0 0 800 500"
              role="img"
              aria-label="室內機器人定位地圖"
              onClick={handleMapClick}
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

              {gotoDestination && taskType === "goto" && (
                <g>
                  <circle cx={gotoDestination.x} cy={gotoDestination.y} r="12" fill="#f59e0b" />
                  <text
                    x={gotoDestination.x}
                    y={gotoDestination.y - 20}
                    fontSize="14"
                    textAnchor="middle"
                    fill="#b45309"
                  >
                    目的地
                  </text>
                </g>
              )}

              {errandStart && taskType === "errand" && (
                <g>
                  <circle cx={errandStart.x} cy={errandStart.y} r="12" fill="#14b8a6" />
                  <text
                    x={errandStart.x}
                    y={errandStart.y - 20}
                    fontSize="14"
                    textAnchor="middle"
                    fill="#0f766e"
                  >
                    起點
                  </text>
                </g>
              )}

              {errandDestination && taskType === "errand" && (
                <g>
                  <circle cx={errandDestination.x} cy={errandDestination.y} r="12" fill="#f97316" />
                  <text
                    x={errandDestination.x}
                    y={errandDestination.y - 20}
                    fontSize="14"
                    textAnchor="middle"
                    fill="#c2410c"
                  >
                    終點
                  </text>
                </g>
              )}

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

          <p className="map-hint">{taskInstruction}</p>
        </div>

        <aside className="map-sidebar">
          <div className="panel-card panel-card-tall">
            <div className="panel-tabs" role="tablist" aria-label="任務面板">
              {PANEL_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`panel-tab ${activeTab === tab.id ? "is-active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "assign" ? (
              <div className="task-form">
                <label className="task-field">
                  <span>任務類別</span>
                  <select value={taskType} onChange={handleTaskTypeChange}>
                    {TASK_TYPES.map((task) => (
                      <option key={task.id} value={task.id}>
                        {task.label}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="task-field">
                  <span>出發位置</span>
                  <div className="task-value">{taskStartValue}</div>
                </div>

                <div className="task-field">
                  <span>目的位置</span>
                  <div className="task-value">{taskDestinationValue}</div>
                </div>

                <p className="task-message">{taskMessage}</p>

                <div className="task-actions">
                  <button type="button" className="task-primary" onClick={handleAddTask}>
                    確定加入任務
                  </button>
                  <button type="button" className="task-reset" onClick={resetSelectedPoints}>
                    清除目前選點
                  </button>
                </div>
              </div>
            ) : (
              <div className="task-history">
                {taskHistory.length === 0 ? (
                  <p className="task-history-empty">目前還沒有任務紀錄。</p>
                ) : (
                  <ul className="task-history-list">
                    {taskHistory.map((task) => (
                      <li key={task.id} className="task-history-item">
                        <div className="task-history-row">
                          <strong>{task.taskType}</strong>
                          <span>{task.status}</span>
                        </div>
                        <div className="task-history-row">
                          <span>出發：{task.start.label ?? formatPoint(task.start)}</span>
                        </div>
                        <div className="task-history-row">
                          <span>目的：{task.destination.label ?? formatPoint(task.destination)}</span>
                        </div>
                        <div className="task-history-row task-history-time">
                          <span>{task.createdAt}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="panel-card">
            <h2>目前狀態</h2>
            <div className="map-meta map-meta-column">
              <span>狀態：{robot.status}</span>
              <span>座標：({robot.x}, {robot.y})</span>
              <span>機器人：{robot.name}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default IndoorMap;
