import { fetchData } from "../utils";

export default async function getTotalUsersOhuel(full) {
  const response = await fetchData({
    path: "/ohuel_stats",
    urlParamsObject: { full },
  });

  return response.data;
}
