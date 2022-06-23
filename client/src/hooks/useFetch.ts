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
  const { get, set } = useCache<ResourceType>(key);
  const data = get() as ResourceType;

  useEffect(() => {
    if (data !== null) return;

    let ignore = false;

    request().then((data: ResourceType) => {
      if (ignore === false) {
        set(data);
      }
    });

    return () => {
      ignore = true;
    };
  }, [request, data, set]);

  return {
    loading: data === null,
    data,
    update: (cb: (state: ResourceType) => ResourceType) => {
      set(cb(data));
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
export const useFetchEntries: Fetchable<Entry[]> = () =>
  useFetch<Entry[]>("entries", getEntries);
