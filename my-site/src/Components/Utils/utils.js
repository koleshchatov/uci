import qs from "qs";
import { API_URL } from "../../../config";

export const fetchData = async ({
  path,
  urlParamsObject = {},
  options = {},
}) => {
  try {
    //это мы указываем путь к апи
    const url = API_URL;
    //тут мы преобразовываем обьекты в строку запроса, ну типа написали page, он его подставил в виде строки
    const queryString = qs.stringify(urlParamsObject);
    //проверяем есть ли кверистринг, если есть вставляем в url запроса
    const query = queryString ? `?${queryString}` : "";
    // Здесь вринципе уже получается формируем url запроса
    const requestUrl = `${url}${path}${query}`;
    // Здесь отправляем запрос
    const response = await fetch(requestUrl, options);
    //Здесь преобразуем полученные данные
    const responseData = await response?.json();
    //ну тут выводится нет ли ошибок, и возвращаем данные
    const data = { status: response.status, data: responseData };
    //Тут возвращаем предыдущую строку
    return data;
  } catch (error) {
    const timestamp = `[${new Date().toLocaleString()}]`;
    console.error(
      timestamp,
      "\nAn error occurred while fetching data",
      "\n" + error + "\n"
    );
    return {
      status: "default",
      data: { error: "An error occurred while fetching data" },
    };
  }
};
