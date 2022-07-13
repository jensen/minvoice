import { useEffect } from "react";
import { getEntries, getClients, getProjects } from "../services/api";
import { useCache } from "../context/cache";

export default function useFetch<ResourceType>(
  key: string,
  request: () => Promise<ResourceType>
) {
  const { get, set, status } = useCache<ResourceType>(key);
  const data = get() as ResourceType;

  const currentStatus = status.current;

  useEffect(() => {
    if (data !== null || currentStatus[key] !== undefined) return;

    let ignore = false;

    currentStatus[key] = "caching";

    request().then((data) => {
      if (ignore === false) {
        set(data);
        currentStatus[key] = "cached";
      }
    });

    return () => {
      ignore = true;
      currentStatus[key] = undefined;
    };
  }, [request, data, set, key, currentStatus]);

  return {
    loading: data === null,
    data,
    update: (cb: (state: ResourceType) => ResourceType) => {
      set(cb);
    },
  };
}

export const useFetchProjects = () => useFetch("projects", getProjects);
export const useFetchClients = () => useFetch("clients", getClients);
export const useFetchEntries = () => {
  return useFetch("entries", getEntries);
};
