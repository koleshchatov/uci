import { fetchData } from "../utils";

export async function getTotalUsersOhuel(full) {
  const response = await fetchData({
    path: "/ohuel_stats",
    urlParamsObject: { full },
  });

  return response.data;
}

export async function ohuelData(page, perPage, sort) {
  const response = await fetchData({
    path: "/ohuel",
    urlParamsObject: {
      page,
      per_page: perPage,
      sort,
    },
  });
  return response.data;
}

export async function getOhuel() {
  const response = await fetchData({
    path: "/ohuel",
    urlParamsObject: {},
  });
  return response.data;
}

export async function getOhuelStatsDiagramma(sort) {
  const response = await fetchData({
    path: "/ohuel",
    urlParamsObject: { sort },
  });
  return response.data;
}

export async function getOhuelStatsDaily() {
  const response = await fetchData({
    path: "/ohuel_stats",
    urlParamsObject: {},
  });
  return response.data;
}
