import { useState, useEffect } from "react";
import Button from "./Button.module";
import Modal from "./Modal";
import { ImageContainer } from "./Pictures/ImageContainer.jsx";
import styles from "./Modal.module.css";
import { fetchData } from "./utils";
import RoulettePro from "react-roulette-pro";
import "react-roulette-pro/dist/index.css";

// Функция генерации уникальных ID
const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;

// Функция создания массива с повторяющимися элементами
const reproductionArray = (array = [], length = 0) => [
  ...Array(length)
    .fill("_")
    .map(() => array[Math.floor(Math.random() * array.length)]),
];

export default function PidorModal({ todaysPidor, setTodaysPidor }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [championCandidate, setChampionCandidate] = useState(null);
  const [message, setMessage] = useState("Идёт розыгрыш...");
  const [start, setStart] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [prizeList, setPrizeList] = useState([]);
  const [basePrizes, setBasePrizes] = useState([]);

  // Карта соответствия имен и ключей изображений
  const nameToKeyMap = {
    Саня: "alexandr",
    Леха: "aleksey",
    Малой: "dmitrii",
    Ярик: "yarik",
  };

  const keyToNameMap = {
    alexandr: "Саня",
    aleksey: "Леха",
    dmitrii: "Малой",
    yarik: "Ярик",
  };

  // Инициализация призов при первой загрузке
  useEffect(() => {
    // Создаем массив призов в формате для react-roulette-pro
    const prizes = Object.entries(ImageContainer).map(([key, imageUrl]) => {
      return {
        id: generateId(),
        image: imageUrl,
        text: keyToNameMap[key] || key,
        key: key, // Сохраняем ключ для поиска победителя
      };
    });

    setBasePrizes(prizes);

    // Создаем расширенный список призов для плавного вращения
    const reproducedPrizeList = [
      ...prizes,
      ...reproductionArray(prizes, prizes.length * 3),
      ...prizes,
      ...reproductionArray(prizes, prizes.length),
    ];

    const fullPrizeList = reproducedPrizeList.map((prize) => ({
      ...prize,
      id: generateId(),
    }));

    setPrizeList(fullPrizeList);
  }, []);

  // Проверяем, является ли пидор сегодняшним
  function isTodaysPidorFromToday() {
    if (!todaysPidor || !todaysPidor.date) return false;
    const today = new Date().toISOString().split("T")[0];
    const pidorDate = todaysPidor.date.split("T")[0];
    return today === pidorDate;
  }

  // Открытие модалки и запуск логики
  async function openModal() {
    setModalOpen(true);

    // Если есть уже «сегодняшний»
    if (todaysPidor && isTodaysPidorFromToday()) {
      setMessage(`${todaysPidor.name} уже пидор дня!`);
      setChampionCandidate(todaysPidor.name);
      return;
    }

    setLoading(true);
    setError(null);
    setMessage("Идёт розыгрыш...");
    setStart(false); // Сбрасываем состояние рулетки

    try {
      const response = await fetchData({
        path: "/day_pidor",
        options: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      });
      const data = response.data;

      if (data.error) {
        setError(data.error);
        const name = data.pidor?.name || null;
        setChampionCandidate(name);
        setTodaysPidor(data.pidor);
        setLoading(false);
        // Запускаем рулетку даже при ошибке, если pidor всё равно вернулся
        if (name) startRoulette(name);
      } else if (data.success) {
        const name = data.pidor?.name || null;
        setChampionCandidate(name);
        setTodaysPidor(data.pidor);
        setLoading(false);
        // Запускаем рулетку, передавая имя победителя
        if (name) startRoulette(name);
      }
    } catch (err) {
      setError("Ошибка при загрузке данных");
      console.error(err);
      setLoading(false);
    }
  }

  // Запуск рулетки
  function startRoulette(winnerName) {
    if (!basePrizes.length || start) return;

    // Получаем ключ изображения для победителя
    const imageKey = nameToKeyMap[winnerName];
    if (!imageKey) {
      console.error(`Неизвестное имя победителя: ${winnerName}`);
      return;
    }

    // Находим индекс приза с нужным ключом в базовом массиве
    const winnerIndex = basePrizes.findIndex((prize) => prize.key === imageKey);

    if (winnerIndex === -1) {
      console.error(`Приз для ${winnerName} (ключ: ${imageKey}) не найден`);
      return;
    }

    // Скорректированный индекс с учетом проблемы смещения
    // Мы отнимаем 1 от индекса для компенсации проблемы смещения
    const correctedIndex =
      winnerIndex > 0 ? winnerIndex - 1 : basePrizes.length - 1;

    // Выставляем индекс победителя по формуле из примера
    const finalPrizeIndex = basePrizes.length * 4 + correctedIndex;

    console.log(
      `Имя победителя: ${winnerName}, оригинальный индекс: ${winnerIndex}, скорректированный: ${correctedIndex}`
    );

    setPrizeIndex(finalPrizeIndex);

    // Запускаем рулетку с задержкой, чтобы UI успел обновиться
    setTimeout(() => {
      setStart(true);
    }, 100);
  }

  // Обработчик завершения вращения
  function handlePrizeDetermined() {
    if (championCandidate) {
      setMessage(`${championCandidate} объявляется пидором дня!`);
    }
  }

  // Закрытие модалки
  function closeModal() {
    setModalOpen(false);
    setStart(false);
  }

  // Шаблон модалки
  const ModalContent = (
    <div>
      <h2>{message}</h2>

      <div className={styles.rouletteContainer}>
        {prizeList.length > 0 && (
          <>
            <div className={styles.rouletteLine}></div>
            <div className={styles.rouletteWrapper}>
              <RoulettePro
                prizes={prizeList}
                prizeIndex={prizeIndex}
                start={start}
                onPrizeDefined={handlePrizeDetermined}
                spinningTime={5} // Время вращения в секундах
                designOptions={{
                  prizesWithText: true,
                  prizeItemWidth: 150,
                  prizeItemHeight: 150,
                  fontSize: 16,
                  fontColor: "#ffffff",
                  fontWeight: "bold",
                  prizeBackgroundColors: ["#111111", "#222222"],
                  borderColor: "#333333",
                  borderWidth: 2,
                  // Отключаем внутреннюю логику смещения, чтобы она не накладывалась на наше исправление
                  withoutAnimation: false,
                }}
                options={{
                  stopInCenter: true, // Важно: останавливаем элемент точно в центре
                  friction: 3, // Дополнительный параметр для настройки замедления
                }}
              />
            </div>
          </>
        )}
      </div>

      {!start && championCandidate && (
        <p style={{ marginTop: "1rem" }}>
          Пидор дня: <b>{championCandidate}</b>
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <br />
      <button onClick={closeModal}>Закрыть</button>
    </div>
  );

  return (
    <div>
      <Button
        onClick={openModal}
        disabled={loading || (todaysPidor && isTodaysPidorFromToday())}
      >
        {loading ? "Загрузка..." : "Узнать чемпиона!"}
      </Button>
      <Modal open={modalOpen}>{ModalContent}</Modal>
    </div>
  );
}
