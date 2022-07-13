import type { Project, Client } from "../types.server";
import { useFetchEntries, useFetchClients, useFetchProjects } from "./useFetch";
import { createIndex } from "../utils/selector";

export const useClients = () => {
  const clients = useFetchClients().data;
  const projects = useFetchProjects().data;

  if (clients === null || projects === null) {
    return [];
  }

  const indexed = createIndex(projects);

  return clients.map((client) => ({
    ...client,
    projects: client.projects.map((id: number) => indexed[id]),
  }));
};

interface Filter {
  year: number;
  month: number;
  day: number;
}

interface UseEntries {
  filter?: Filter;
}

export const useEntries = (args?: UseEntries) => {
  const entries = useFetchEntries().data;
  const clients = useFetchClients().data;
  const projects = useFetchProjects().data;

  if (entries === null || projects === null || clients === null) {
    return [];
  }

  const projectIndex = createIndex(projects);
  const clientIndex = createIndex(clients);

  return entries
    .filter((entry) => {
      if (args?.filter !== undefined) {
        const date = new Date(entry.date);

        return (
          date.getFullYear() === args.filter.year &&
          date.getMonth() === args.filter.month - 1 &&
          date.getDate() === args.filter.day
        );
      }

      return true;
    })
    .map((entry) => ({
      ...entry,
      project: {
        ...projectIndex[entry.projectId],
        client: clientIndex[projectIndex[entry.projectId].clientId],
      },
    }));
};
