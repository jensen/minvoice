const post = (url: string, data: FormData) =>
  fetch(url, {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(Object.fromEntries(data)),
  }).then((response) => response.json());

const put = (url: string, data: FormData) =>
  fetch(url, {
    method: "put",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(Object.fromEntries(data)),
  }).then((response) => response.json());

const remove = (url: string) =>
  fetch(url, {
    method: "delete",
  }).then((response) => response.json());

export const getEntries = async () => {
  const response = await fetch("/api/entries");
  const json = await response.json();

  return json.entries;
};

export const createEntry = async (data: FormData) => {
  return post("/api/entries", data);
};

export const updateEntry = async (id: number, data: FormData) => {
  return put(`/api/entries/${id}`, data);
};

export const deleteEntry = async (id: number) => {
  return remove(`/api/entries/${id}`);
};

export const getClients = async () => {
  const response = await fetch("/api/clients");
  const json = await response.json();

  return json.clients;
};

export const createClient = async (data: FormData) => {
  return post("/api/clients", data);
};

export const getProjects = async () => {
  const response = await fetch("/api/projects");
  const json = await response.json();

  return json.projects;
};

export const createProject = async (data: FormData) => {
  return post("/api/projects", data);
};
