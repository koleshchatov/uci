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
} from "recharts";

export default function Statistic() {
  const [newPidorStats, setNewPidorStats] = useState([]);
  const [newPidorPagination, setNewPidorPagination] = useState([]);
  const [page, setPage] = useState(1);
  const [pidorPerPage, setPidorPerPage] = useState(10);
  const [activeDiagramma, setActiveDiagramma] = useState("Line");
  const [totalPidor, setTotalPidor] = useState();

  useEffect(() => {
    async function getPidorPage() {
      const response = await fetch(
        `https://api-pidors.tucha-happy-birthsday.ru/api/v1/pidor?page=${page}&per_page=${pidorPerPage}&sort=asc`
      );
      const pidorPage = await response.json();
      setNewPidorPagination(pidorPage.items);
      setTotalPidor(pidorPage.pagination.total);
    }

    getPidorPage();
  }, [page, pidorPerPage]);

  useEffect(() => {
    async function getPidorStats() {
      const response = await fetch(
        "https://api-pidors.tucha-happy-birthsday.ru/api/v1/pidor_stats?sort=asc&start_date=2023-05-10T00:00:00"
      );
      const pidor = await response.json();
      setNewPidorStats(pidor.daily_stats);
    }
    getPidorStats();
  }, []);

  function handleClick(number) {
    setPage(number);
  }
  function handleChange(e) {
    setActiveDiagramma(e.target.value);
  }

  const DiagrammaBar = ({ data }) => {
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
          <Bar // сделать гибко исходя из массива цветов и запросу к /users
            dataKey="Ярик"
            fill="orange"
            activeBar={<Rectangle fill="orange" stroke="orange" />}
          />
          <Bar
            dataKey="Саня"
            fill="red"
            activeBar={<Rectangle fill="red" stroke="red" />}
          />
          <Bar
            dataKey="Малой"
            fill="green"
            activeBar={<Rectangle fill="green" stroke="green" />}
          />
          <Bar
            dataKey="Леха"
            fill="blue"
            activeBar={<Rectangle fill="blue" stroke="blue" />}
          />
          <Bar
            dataKey="Серега"
            fill="aquamarine"
            activeBar={<Rectangle fill="aquamarine" stroke="aquamarine" />}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const DiagrammaLine = ({ data }) => {
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
          }} // сделать гибко исходя из массива цветов и запросу к /users
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Ярик" stroke="orange" />
          <Line type="monotone" dataKey="Саня" stroke="red" />
          <Line type="monotone" dataKey="Малой" stroke="green" />
          <Line type="monotone" dataKey="Леха" stroke="blue" />
          <Line type="monotone" dataKey="Серега" stroke="aquamarine" />
        </LineChart>
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

  return (
    <>
      {activeDiagramma === "Line" ? (
        <DiagrammaLine data={newPidorStats} />
      ) : (
        <DiagrammaBar data={newPidorStats} />
      )}

      <RadioDiagramma />
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

      <Pagination pidorPerPage={pidorPerPage} totalPidor={totalPidor} />
    </>
  );
}
