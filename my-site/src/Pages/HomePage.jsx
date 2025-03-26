import Picture from "/Components/Pictures/Picture.jsx";
import { ImageContainer } from "/Components/Pictures/ImageContainer.jsx";
import React, { useState, useEffect } from "react";
import PidorModal from "/Components/PidorModal.jsx";
import Title from "/Components/Title.jsx";
import { fetchData } from "../../Components/utils";

export default function HomePage() {
  const [todaysPidor, setTodaysPidor] = useState(null);

  useEffect(() => {
    // Проверяем пидора дня при загрузке страницы
    async function checkTodaysPidor() {
      try {
        // Проверяем последнюю запись
        const response = await fetchData({
          path: "/pidor",
          urlParamsObject: { page: 1, per_page: 1, sort: "desc" },
        });

        const lastPidor = response.data.items[0];
        if (
          lastPidor &&
          new Date(lastPidor.date).getDate() === new Date().getDate()
        ) {
          setTodaysPidor({ name: lastPidor.user.name, date: lastPidor.date });
        }
      } catch (err) {
        console.error("Error checking today's pidor:", err);
      }
    }

    checkTodaysPidor();
  }, []);

  // Вспомогательная функция для конвертации имени в ключ
  const getKeyByName = (name) => {
    const nameToKey = {
      Саня: "alexandr",
      Алеша: "aleksey",
      Малой: "dmitrii",
      Ярик: "yarik",
    };
    return nameToKey[name] || null;
  };

  // Вспомогательная функция для проверки, является ли пидор сегодняшним
  const isPidorFromToday = () => {
    if (!todaysPidor || !todaysPidor.date) return false;

    // Получаем сегодняшнюю дату в формате YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];
    // Получаем дату пидора в формате YYYY-MM-DD
    const pidorDate = todaysPidor.date.split("T")[0];
    return today === pidorDate;
  };

  return (
    <>
      <div className="home-container">
        <Title />

        <div className="photoGrid">
          {Object.entries(ImageContainer).map(([key, value]) => (
            <Picture
              image={value}
              key={key}
              isChampion={
                todaysPidor &&
                isPidorFromToday() &&
                getKeyByName(todaysPidor.name) === key
              }
            />
          ))}
        </div>

        <PidorModal todaysPidor={todaysPidor} setTodaysPidor={setTodaysPidor} />
      </div>
    </>
  );
}
