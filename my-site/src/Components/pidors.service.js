import { fetchData } from "./Utils/utils";

export async function pidorsData(page, perPage, sort) {
  const response = await fetchData({
    path: "/pidor",
    urlParamsObject: { page, per_page: perPage, sort },
  });
  return response.data;
}

export async function getUsers() {
  const response = await fetchData({
    path: "/users",
  });
  return response.data;
}

export async function getPidorStatsDiagramma(sort) {
  const response = await fetchData({
    path: "/pidor_stats",
    urlParamsObject: { sort },
  });
  return response.data;
}

export async function getTotalPidorStats(full) {
  const response = await fetchData({
    path: "/pidor_stats",
    urlParamsObject: { full },
  });
  return response.data;
}

export async function setPidorDay() {
  const response = await fetchData({
    path: "/day_pidor",
    options: {
      method: "POST",
      headers: { "Content-type": "application/json" },
    },
  });
  return response.data;
}
