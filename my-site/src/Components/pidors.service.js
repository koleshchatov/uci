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

export async function getAuthentication() {
  const response = await fetchData({
    path: "/auth/me",
  });
  return response.data;
}

export async function loginUser({ name, password }) {
  const response = await fetchData({
    path: "/auth/login",
    options: {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    },
  });
  console.log(response.data);
  return response.data;
}

export async function logoutUser() {
  const response = await fetchData({
    path: "/auth/logout",
    options: {
      method: "POST",
      headers: { "Content-type": "application/json" },
    },
  });
  return response.data;
}
