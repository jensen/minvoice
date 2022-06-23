import { useNotification } from "src/context/notification";
import Button from "../components/shared/Button";
import { useFetchProjects, useFetchClients } from "../hooks/useFetch";
import { createProject } from "../services/api";

import "./createProject.css";

interface ICreateProjectProps {
  clientId: number | null;
}

export default function CreateProject(props: ICreateProjectProps) {
  const { update: updateProjects } = useFetchProjects();
  const { update: updateClients } = useFetchClients();
  const { addNotification } = useNotification();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;

        createProject(new FormData(event.currentTarget)).then((data) => {
          if (data.success === true) {
            updateProjects((state) => [...state, data.project]);
            updateClients((state) => {
              return state.map((client) =>
                client.id === props.clientId
                  ? {
                      ...client,
                      projects: [...client.projects, data.project.id],
                    }
                  : client
              );
            });

            form.reset();
          } else {
            for (const error of data.errors) {
              addNotification("error", error);
            }
          }
        });
      }}
      className="create-project__container"
    >
      <label className="label__container">
        <span className="label__content">Code</span>
        <input className="input" type="text" id="code" name="code" />
      </label>
      <label className="label__container">
        <span className="label__content">Name</span>
        <input className="input" type="text" id="name" name="name" />
      </label>
      <input
        className="input"
        type="hidden"
        name="clientId"
        value={props.clientId ?? 0}
      />
      <Button type="submit">Add Project</Button>
    </form>
  );
}
