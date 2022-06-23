import type { Project, Client } from "../types.server";
import { useFetchEntries, useFetchClients, useFetchProjects } from "./useFetch";
import { createIndex } from "../utils/selector";

export const useClients = () => {
  const clients = useFetchClients().data;
  const projects = useFetchProjects().data;

  if (clients === null || projects === null) {
    return [];
  }

  const indexed = createIndex<Project>(projects);

  return clients.map((client) => ({
    ...client,
    projects: client.projects.map((id: number) => indexed[id]),
  }));
};

export const useEntries = ({
  filter,
}: {
  filter?: { year: number; month: number; day: number };
} = {}) => {
  const entries = useFetchEntries().data;
  const clients = useFetchClients().data;
  const projects = useFetchProjects().data;

  if (entries === null || projects === null || clients === null) {
    return [];
  }

  const projectIndex = createIndex<Project>(projects);
  const clientIndex = createIndex<Client>(clients);

  return entries
    .filter((entry) => {
      if (filter) {
        const date = new Date(entry.date);

        return (
          date.getFullYear() === filter.year &&
          date.getMonth() === filter.month - 1 &&
          date.getDate() === filter.day
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
