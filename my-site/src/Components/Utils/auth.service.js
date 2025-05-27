import { fetchData } from "./utils";

export async function getAuthentication() {
  const response = await fetchData({
    path: "/auth/me",
  });
  console.log(response);
  return response;
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
