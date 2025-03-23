import React, { useState, useEffect, Fragment } from "react";
import styles from "./StatisticTable.module.css";
import {
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { fetchData } from "./utils";
import { colors } from "./Colors";

export default function Statistic() {
  const [newPidorStats, setNewPidorStats] = useState([]);
  const [newPidorPagination, setNewPidorPagination] = useState([]);
  const [pidorWithColor, setPidorWithColor] = useState([]);
  const [pidorPie, setPidorPie] = useState([]);
  const [page, setPage] = useState(1);
  const [pidorPerPage, setPidorPerPage] = useState(10);
  const [activeDiagramma, setActiveDiagramma] = useState("Line");
  const [totalPidor, setTotalPidor] = useState();

  useEffect(() => {
    async function getPidorPage() {
      const pidor = await fetchData({
        path: "/pidor",
        urlParamsObject: { page: page, per_page: pidorPerPage, sort: "desc" },
      });

      setNewPidorPagination(pidor.data.items);
      setTotalPidor(pidor.data.pagination.total);
    }

    getPidorPage();
  }, [page, pidorPerPage]);

  useEffect(() => {
    async function getPidorStats() {
      const users = await fetchData({
        path: "/users",
      });
      const diagrammaStats = await fetchData({
        path: "/pidor_stats",
        urlParamsObject: { sort: "asc" },
      });
      // Получаем данные для круговой диаграммы с параметром full=true
      const pieStats = await fetchData({
        path: "/pidor_stats",
        urlParamsObject: { full: true },
      });

      console.log("pieStats >> ", pieStats.data.stats);

      const dataUsersColors = users.data.items;

      const usersColor = (value) => {
        const userColor = {};
        for (let i = 0; i < value.length; i++) {
          userColor[value[i].name] = colors[i];
        }
        return userColor;
      };

      const newUserColor = usersColor(dataUsersColors);
      setPidorWithColor(newUserColor);

      setNewPidorStats(diagrammaStats.data.daily_stats);

      setPidorPie(pieStats.data.stats);
    }

    getPidorStats();
  }, []);

  function handleClick(number) {
    setPage(number);
  }
  function handleChange(e) {
    setActiveDiagramma(e.target.value);
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
    console.log("data >> ", data);
    return (
      <ResponsiveContainer width="100%" aspect={2}>
        <PieChart
          width={500}
          height={300}
          margin={{
            top: 200,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
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
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={pidorColors[entry.name] || colors[index % colors.length]}
              />
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
            className={`${styles.paginationButton} ${
              page === number ? styles.active : ""
            }`}
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
          className={`${styles.paginationButton} ${
            page === 1 ? styles.active : ""
          }`}
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
          <span key="left-dots" className={styles.paginationDots}>
            ...
          </span>
        );
      } else if (page > 3) {
        items.push(
          <button
            key={2}
            onClick={() => handleClick(2)}
            className={`${styles.paginationButton} ${
              page === 2 ? styles.active : ""
            }`}
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
              className={`${styles.paginationButton} ${
                page === i ? styles.active : ""
              }`}
            >
              {i}
            </button>
          );
        }
      }

      // Добавляем многоточие справа, если нужно
      if (shouldShowRightDots) {
        items.push(
          <span key="right-dots" className={styles.paginationDots}>
            ...
          </span>
        );
      } else if (page < totalPages - 2) {
        items.push(
          <button
            key={totalPages - 1}
            onClick={() => handleClick(totalPages - 1)}
            className={`${styles.paginationButton} ${
              page === totalPages - 1 ? styles.active : ""
            }`}
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
            className={`${styles.paginationButton} ${
              page === totalPages ? styles.active : ""
            }`}
          >
            {totalPages}
          </button>
        );
      }

      return items;
    };

    return (
      <div className={styles.paginationContainer}>
        <button
          onClick={prevPage}
          className={`${styles.paginationButton} ${
            page === 1 ? styles.disabled : ""
          }`}
        >
          prev
        </button>

        {renderPaginationButtons()}

        <button
          onClick={nextPage}
          className={`${styles.paginationButton} ${
            page === pageNumbers.length ? styles.disabled : ""
          }`}
        >
          next
        </button>

        <select
          className={styles.paginationSelect}
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

  return (
    <>
      {activeDiagramma === "Line" ? (
        <DiagrammaLine data={newPidorStats} pidorColors={pidorWithColor} />
      ) : activeDiagramma === "Bar" ? (
        <DiagrammaBar data={newPidorStats} pidorColors={pidorWithColor} />
      ) : (
        <DiagrammaPie data={pidorPie} pidorColors={pidorWithColor} />
      )}

      <div className={styles.container}>
        <RadioDiagramma />
        <div className={styles.table}>
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
      </div>

      <Pagination pidorPerPage={pidorPerPage} totalPidor={totalPidor} />
    </>
  );
}
