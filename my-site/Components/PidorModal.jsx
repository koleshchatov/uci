import { useState, useEffect, useRef } from "react";
import Button from "./Button.module";
import Modal from "./Modal";
import { ImageContainer } from "./Pictures/ImageContainer.jsx";
import styles from "./Modal.module.css";
import { fetchData } from "./utils";

// Функция для создания массива случайных картинок
function generateRandomImages(baseImages, count) {
  const keys = Object.values(baseImages);
  const result = [];
  for (let i = 0; i < count; i++) {
    const r = Math.floor(Math.random() * keys.length);
    result.push(keys[r]);
  }
  return result;
}

// Перемешивание массива (не обязательно, но можно)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// easing для плавного замедления
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function PidorModal({ todaysPidor, setTodaysPidor }) {
  const [ModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Текущий победитель по версии сервера
  const [championCandidate, setChampionCandidate] = useState(null);
  // Сообщение в заголовке
  const [message, setMessage] = useState("Идёт розыгрыш...");

  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Вспомогательные хранилища
  const [baseImages, setBaseImages] = useState([]); // исходный базовый список (неповторяющийся)
  const [repeatedImages, setRepeatedImages] = useState([]); // тройной список для прокрутки

  const requestRef = useRef(null);
  const startTimeRef = useRef(null);

  // Диапазон прокрутки
  const startIndexRef = useRef(0);
  const championIndexRef = useRef(0);

  // Параметры анимации
  const spinDuration = 5000; // 5 секунд
  const itemWidth = 150;
  const offsetCenter = 175;

  // При первом монтировании — подготовим картинки
  useEffect(() => {
    // Сгенерируем, например, 20 случайных фоток
    let arr = generateRandomImages(ImageContainer, 20);
    arr = shuffleArray(arr);

    // Сохраним базовый массив
    setBaseImages(arr);
    // Пока не крутим — repeatedImages делаем пустым.
  }, []);

  // Проверяем, является ли пидор сегодняшним
  function isTodaysPidorFromToday() {
    if (!todaysPidor || !todaysPidor.date) return false;
    const today = new Date().toISOString().split("T")[0];
    const pidorDate = todaysPidor.date.split("T")[0];
    return today === pidorDate;
  }

  // Возвращает реальный путь к изображению по имени
  function getPidorImage(name) {
    const map = {
      Саня: "alexandr",
      Леха: "aleksey",
      Малой: "dmitrii",
      Ярик: "yarik",
    };
    const key = map[name] || Object.keys(ImageContainer)[0];
    return ImageContainer[key];
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
        startRoulette(name);
      } else if (data.success) {
        const name = data.pidor?.name || null;
        setChampionCandidate(name);
        setTodaysPidor(data.pidor);
        setLoading(false);
        // Запускаем рулетку, передавая имя победителя
        startRoulette(name);
      }
    } catch (err) {
      setError("Ошибка при загрузке данных");
      console.error(err);
      setLoading(false);
    }
  }

  // Собственно запуск рулетки
  function startRoulette(forceChampionName) {
    if (isSpinning) return;

    let champion = forceChampionName || championCandidate || "Неизвестно";

    setIsSpinning(true);
    setCurrentIndex(0);
    setMessage("Идёт розыгрыш...");

    // Получаем изображение победителя
    const championImg = getPidorImage(champion);

    // Создаем копию базового массива для рулетки
    let rouletteImages = [...baseImages];

    // Проверяем, есть ли изображение чемпиона в массиве
    let championIndex = rouletteImages.findIndex((img) => img === championImg);

    // Если изображения чемпиона нет в массиве, добавляем его
    if (championIndex === -1) {
      // Добавляем изображение чемпиона в массив (можно в случайную позицию)
      const randomPosition = Math.floor(Math.random() * rouletteImages.length);
      rouletteImages.splice(randomPosition, 0, championImg);
      // Обновляем индекс после добавления
      championIndex = randomPosition;
    }

    // Создаем тройной массив для плавной прокрутки
    const triple = [...rouletteImages, ...rouletteImages, ...rouletteImages];
    setRepeatedImages(triple);

    // Стартуем со второго набора
    const startIndex = rouletteImages.length;
    // Заканчиваем на позиции чемпиона во втором наборе
    const championFinalIndex = startIndex + championIndex;

    startIndexRef.current = startIndex;
    championIndexRef.current = championFinalIndex;

    setCurrentIndex(startIndex);
  }

  // Добавляем useEffect для запуска анимации
  useEffect(() => {
    if (isSpinning && repeatedImages.length > 0) {
      startTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(animateRoulette);
    }
  }, [isSpinning, repeatedImages]); // Зависимости: isSpinning и repeatedImages

  // Анимация (через requestAnimationFrame)
  function animateRoulette(time) {
    if (!startTimeRef.current) {
      startTimeRef.current = time;
    }
    const elapsed = time - startTimeRef.current;
    let fraction = elapsed / spinDuration;
    if (fraction > 1) fraction = 1;

    const eased = easeOutCubic(fraction);
    const from = startIndexRef.current;
    const to = championIndexRef.current;
    const val = from + (to - from) * eased;

    setCurrentIndex(val);

    if (fraction < 1) {
      requestRef.current = requestAnimationFrame(animateRoulette);
    } else {
      // Финальное положение
      setCurrentIndex(to);
      stopRoulette();

      // Сообщение
      if (championCandidate) {
        setMessage(`${championCandidate} объявляется пидором дня!`);
      } else {
        // setMessage("Не удалось определить победителя");
      }
    }
  }

  // Остановка
  function stopRoulette() {
    setIsSpinning(false);
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  }

  // Закрыть модалку
  function closeModal() {
    setModalOpen(false);
    stopRoulette();
  }

  // Компонент рулетки
  function Roulette() {
    if (!repeatedImages.length) return null;

    // Считаем смещение с учётом дробной позиции
    // Это даёт плавный переход между картинками
    const offsetX = offsetCenter - currentIndex * itemWidth;

    return (
      <div className={styles.rouletteContainer}>
        <div className={styles.rouletteLine} />
        <div
          className={styles.rouletteImages}
          style={{ transform: `translateX(${offsetX}px)` }}
        >
          {repeatedImages.map((img, i) => (
            <div className={styles.rouletteItem} key={i}>
              <img src={img} alt={`slot-${i}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Шаблон модалки
  const ModalContent = (
    <div>
      <h2>{message}</h2>

      <Roulette />

      {!isSpinning && championCandidate && (
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
      <Modal open={ModalOpen}>{ModalContent}</Modal>
    </div>
  );
}
