import React, { useState, useEffect, Fragment } from "react";
import styles from "./StatisticTable.module.css";
import {
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ohuelData,
  getTotalUsersOhuel,
} from "../../../services/ohuel.service.js";

import { colors } from "../../../configs/colors.js";
import {
  getUsers,
  getPidorStatsDiagramma,
  getTotalPidorStats,
  pidorsData,
} from "../../../services/pidors.service.js";
import Loader from "../../Loader/index.jsx";

export default function Statistic() {
  const [pidorPie, setPidorPie] = useState([]);
  const [page, setPage] = useState(1);
  const [pidorPerPage, setPidorPerPage] = useState(10);
  const [activeDiagramma, setActiveDiagramma] = useState("Line");
  const [isLoading, setIsLoading] = useState(false);
  // для охуел
  const [isButtonStatisticClass, setIsButtonStatisticClass] = useState("Pidor");
  const [totalPidor, setTotalPidor] = useState();
  const [newPidorPagination, setNewPidorPagination] = useState([]);
  const [pidorWithColor, setPidorWithColor] = useState([]);
  const [newPidorStats, setNewPidorStats] = useState([]);

  useEffect(() => {
    async function getPidorPage() {
      setIsLoading(true);
      const pidor = await pidorsData(page, pidorPerPage, "desc");
      setIsLoading(false);
      setNewPidorPagination(pidor.items);
      setTotalPidor(pidor.pagination.total);
    }
    async function getOhuelPage() {
      setIsLoading(true);
      const ohuel = await ohuelData(page, pidorPerPage, "desc");
      setIsLoading(false);
      setNewPidorPagination(ohuel.items);
      setTotalPidor(ohuel.pagination.total);
    }
    isButtonStatisticClass === "Pidor" ? getPidorPage() : getOhuelPage();
  }, [page, pidorPerPage, isButtonStatisticClass]);

  useEffect(() => {
    async function getPidorStats() {
      setIsLoading(true);
      const users = await getUsers();
      const diagrammaStats = await getPidorStatsDiagramma("asc");
      const totalPidorPie = await getTotalPidorStats("true");
      setIsLoading(false);
      const dataUsersColors = users.items;

      const dataUsersPie = totalPidorPie.stats;

      const usersColor = (value) => {
        const userColor = {};
        let colorsCount = 0;
        for (let i = 0; i < value.length; i++) {
          const name = value[i].name;
          userColor[name] = colors[colorsCount % colors.length];
          colorsCount++;
        }
        return userColor;
      };

      const newUserColor = usersColor(dataUsersColors);

      setPidorWithColor(newUserColor);
      setNewPidorStats(diagrammaStats.daily_stats);
      setPidorPie(dataUsersPie);
    }
    async function getOhuelStats() {
      setIsLoading(true);
      const users = await ohuelData(page, pidorPerPage, "desc");

      const daily = await getTotalUsersOhuel("false");
      const diagrammaOhuelStats = users.items;

      const usersColor = (value) => {
        const userColor = {};
        let colorsCount = 0;
        for (let i = 0; i < value.length; i++) {
          const name = value[i].user.name;
          if (!userColor[name]) {
            userColor[name] = colors[colorsCount % colors.length];
            colorsCount++;
          }
        }
        return userColor;
      };

      const newUserColor = usersColor(diagrammaOhuelStats);

      setPidorWithColor(newUserColor);
      setNewPidorStats(daily.daily_stats);
      setIsLoading(false);
    }

    isButtonStatisticClass === "Pidor" ? getPidorStats() : getOhuelStats();
  }, [page, pidorPerPage, isButtonStatisticClass]);

  function handleClick(number) {
    setPage(number);
  }
  function handleChange(e) {
    setActiveDiagramma(e.target.value);
  }

  function handleClickPidorStats(e) {
    setIsButtonStatisticClass(e.target.className);
  }

  const DiagrammaBar = ({ data, pidorColors }) => {
    return (
      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 200,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.entries(pidorColors).map(([key, value]) => (
            <Bar
              dataKey={key}
              fill={value}
              activeBar={<Rectangle fill={value} stroke={value} />}
              key={key}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const DiagrammaLine = ({ data, pidorColors }) => {
    return (
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 200,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.entries(pidorColors).map(([key, value]) => (
            <Line type="monotone" dataKey={key} stroke={value} key={key} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const DiagrammaPie = ({ data, pidorColors }) => {
    return (
      <ResponsiveContainer width="100%" aspect={2}>
        <PieChart width={400} height={400}>
          <Tooltip />
          <Legend />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={250}
            fill="#8884d8"
            dataKey="count"
          >
            {Object.entries(data).map(([key, value]) => (
              <Cell key={key} fill={pidorColors[value.name]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const RadioDiagramma = () => {
    return (
      <form id="mainForm" name="mainForm">
        <input
          type="radio"
          name="diagramma"
          value="Line"
          checked={activeDiagramma === "Line"}
          onChange={handleChange}
        ></input>
        <input
          type="radio"
          name="diagramma"
          value="Bar"
          checked={activeDiagramma === "Bar"}
          onChange={handleChange}
        ></input>
        <input
          type="radio"
          name="diagramma"
          value="Pie"
          checked={activeDiagramma === "Pie"}
          onChange={handleChange}
        ></input>
      </form>
    );
  };

  const Pagination = ({ pidorPerPage, totalPidor }) => {
    const pageNumbers = [];
    const siblingCount = 1;

    const nextPage = () => {
      if (page !== pageNumbers.length) setPage(page + 1);
    };
    const prevPage = () => {
      if (page !== 1) setPage(page - 1);
    };

    for (let i = 1; i <= Math.ceil(totalPidor / pidorPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPaginationButtons = () => {
      const totalPages = Math.ceil(totalPidor / pidorPerPage);

      // Если страниц мало, показываем все
      if (totalPages <= 3) {
        return pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            style={{
              backgroundColor: page === number ? "#555" : "grey",
              margin: "0 5px",
              padding: "5px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {number}
          </button>
        ));
      }

      // Иначе показываем с многоточием
      const items = [];

      // Всегда показываем первую страницу
      items.push(
        <button
          key={1}
          onClick={() => handleClick(1)}
          style={{
            backgroundColor: page === 1 ? "#555" : "grey",
            margin: "0 5px",
            padding: "5px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          1
        </button>
      );

      // Вычисляем диапазон страниц вокруг текущей
      const leftSiblingIndex = Math.max(page - siblingCount, 1);
      const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

      // Нужно ли показывать многоточие в начале
      const shouldShowLeftDots = leftSiblingIndex > 2;

      // Нужно ли показывать многоточие в конце
      const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

      // Добавляем многоточие слева, если нужно
      if (shouldShowLeftDots) {
        items.push(
          <span key="left-dots" style={{ margin: "0 5px", fontSize: "40px" }}>
            ...
          </span>
        );
      } else if (page > 3) {
        items.push(
          <button
            key={2}
            onClick={() => handleClick(2)}
            style={{
              backgroundColor: page === 2 ? "#555" : "grey",
              margin: "0 5px",
              padding: "5px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            2
          </button>
        );
      }

      // Добавляем страницы вокруг текущей
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        // Пропускаем первую и последнюю страницы, т.к. они добавляются отдельно
        if (i !== 1 && i !== totalPages) {
          items.push(
            <button
              key={i}
              onClick={() => handleClick(i)}
              style={{
                backgroundColor: page === i ? "#555" : "grey",
                margin: "0 5px",
                padding: "5px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {i}
            </button>
          );
        }
      }

      // Добавляем многоточие справа, если нужно
      if (shouldShowRightDots) {
        items.push(
          <span key="right-dots" style={{ margin: "0 5px", fontSize: "40px" }}>
            ...
          </span>
        );
      } else if (page < totalPages - 2) {
        items.push(
          <button
            key={totalPages - 1}
            onClick={() => handleClick(totalPages - 1)}
            style={{
              backgroundColor: page === totalPages - 1 ? "#555" : "grey",
              margin: "0 5px",
              padding: "5px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {totalPages - 1}
          </button>
        );
      }

      // Всегда показываем последнюю страницу
      if (totalPages > 1) {
        items.push(
          <button
            key={totalPages}
            onClick={() => handleClick(totalPages)}
            style={{
              backgroundColor: page === totalPages ? "#555" : "grey",
              margin: "0 5px",
              padding: "5px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {totalPages}
          </button>
        );
      }

      return items;
    };

    return (
      <div
        style={{
          display: "flex",
          fontSize: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          onClick={prevPage}
          style={{
            padding: "5px 15px",
            borderRadius: "5px",
            margin: "0 10px",
            cursor: page === 1 ? "not-allowed" : "pointer",
            opacity: page === 1 ? 0.5 : 1,
          }}
        >
          prev
        </button>

        {renderPaginationButtons()}

        <button
          onClick={nextPage}
          style={{
            padding: "5px 15px",
            borderRadius: "5px",
            margin: "0 10px",
            cursor: page === pageNumbers.length ? "not-allowed" : "pointer",
            opacity: page === pageNumbers.length ? 0.5 : 1,
          }}
        >
          next
        </button>
        <select
          style={{
            width: 400,
            height: 100,
            fontSize: 40,
            backgroundColor: "grey",
            textAlign: "center",
            marginLeft: 30,
            justifyContent: "center",
            borderRadius: 10,
          }}
          value={pidorPerPage}
          onChange={(e) => {
            setPage(1);
            setPidorPerPage(Number(e.target.value));
          }}
        >
          <option value={10}>10 pidorа на page</option>
          <option value={20}>20 pidorа на page</option>
          <option value={30}>30 pidorа на page</option>
        </select>
      </div>
    );
  };

  function PidorStats() {
    return (
      <>
        {isLoading ? (
          <Loader />
        ) : activeDiagramma === "Line" ? (
          <DiagrammaLine data={newPidorStats} pidorColors={pidorWithColor} />
        ) : activeDiagramma === "Bar" ? (
          <DiagrammaBar data={newPidorStats} pidorColors={pidorWithColor} />
        ) : (
          <DiagrammaPie data={pidorPie} pidorColors={pidorWithColor} />
        )}

        <RadioDiagramma />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.container}>
            <div className={styles.id}>Id</div>
            <div className={styles.time}>Time</div>
            <div className={styles.name}>Name</div>
            {newPidorPagination.map((pidor) => {
              return (
                <Fragment key={pidor.id}>
                  <div>{pidor.id}</div>
                  <div>{new Date(pidor.date).toLocaleString()}</div>
                  <div>{pidor.user.name}</div>
                </Fragment>
              );
            })}
          </div>
        )}

        <Pagination pidorPerPage={pidorPerPage} totalPidor={totalPidor} />
      </>
    );
  }

  function OhuelStats() {
    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <DiagrammaLine data={newPidorStats} pidorColors={pidorWithColor} />
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.container}>
            <div className={styles.id}>Id</div>
            <div className={styles.time}>Time</div>
            <div className={styles.name}>Name</div>
            {newPidorPagination.map((ohuel) => {
              return (
                <Fragment key={ohuel.id}>
                  <div>{ohuel.id}</div>
                  <div>{new Date(ohuel.date).toLocaleString()}</div>
                  <div>{ohuel.user.name}</div>
                </Fragment>
              );
            })}
          </div>
        )}
        <Pagination pidorPerPage={pidorPerPage} totalPidor={totalPidor} />
      </>
    );
  }

  return (
    <>
      <div>
        <button
          className="Pidor"
          onClick={handleClickPidorStats}
          style={{ marginTop: 200, marginRight: 30 }}
        >
          Статистика пидоров
        </button>
        <button
          className="Ohuel"
          onClick={handleClickPidorStats}
          style={{ marginTop: 200, marginRight: 30 }}
        >
          Статистика охуевших
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : isButtonStatisticClass === "Pidor" ? (
        <PidorStats />
      ) : (
        <OhuelStats />
      )}
    </>
  );
}
