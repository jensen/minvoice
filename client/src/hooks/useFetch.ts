import type { Project, Client, Entry } from "../types.server";
import { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (data !== null || status.current[key] !== undefined) return;

    let ignore = false;

    status.current[key] = "caching";

    request().then((data: ResourceType) => {
      if (ignore === false) {
        set(data);
        status.current[key] = "cached";
      }
    });

    return () => {
      ignore = true;
      status.current[key] = undefined;
    };
  }, [request, data, set, key, status]);

  return {
    loading: data === null,
    data,
    update: (cb: (state: ResourceType) => ResourceType) => {
      set(cb);
    },
  };
}

type Fetchable<T> = () => {
  loading: boolean;
  data: T;
  update: (cb: (state: T) => T) => void;
};

export const useFetchProjects: Fetchable<Project[]> = () =>
  useFetch<Project[]>("projects", getProjects);
export const useFetchClients: Fetchable<ClientWithProjects[]> = () =>
  useFetch<ClientWithProjects[]>("clients", getClients);
export const useFetchEntries: Fetchable<Entry[]> = () => {
  return useFetch<Entry[]>("entries", getEntries);
};
