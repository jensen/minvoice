import type { Project, Client, Entry } from "../types.server";
import { useEffect } from "react";
import { getEntries, getClients, getProjects } from "../services/api";
import { useCache } from "../context/cache";

interface ClientWithProjects extends Client {
  projects: number[];
}

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

    request().then((data: ResourceType) => {
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

export const useFetchProjects = () =>
  useFetch<Project[]>("projects", getProjects);
export const useFetchClients = () =>
  useFetch<ClientWithProjects[]>("clients", getClients);
export const useFetchEntries = () => {
  return useFetch<Entry[]>("entries", getEntries);
};
