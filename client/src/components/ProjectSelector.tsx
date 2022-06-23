import type { Client, Project } from "../types.server";
import { useState } from "react";
import cx from "classnames";
import { AngleDown } from "./shared/Icons";
import { useClients } from "../hooks/useSelector";

import "./projectSelector.css";

interface IClientItemProps {
  client: Client & { projects: Project[] };
  selected: number | null;
  onSelect: (id: number) => void;
}

const ClientItem = (props: IClientItemProps) => {
  return (
    <li>
      <h2 className="project-selector__list-client">{props.client.name}</h2>
      {props.client.projects.map((project) => (
        <h3
          key={project.id}
          className={cx("project-selector__list-project", {
            "project-selector__list-project--selected":
              project.id === props.selected,
          })}
          onMouseDown={(event) => {
            props.onSelect(project.id);
          }}
        >
          [{project.code}] {project.name}
        </h3>
      ))}
    </li>
  );
};

interface IProjectSelectorProps {
  value: number | null;
  onChange: (id: number) => void;
}

export default function ProjectSeletor(props: IProjectSelectorProps) {
  const clients = useClients();

  const [open, setOpen] = useState(false);

  const client = clients.find(
    (client) =>
      client.projects?.find((project) => project.id === props.value) !==
      undefined
  );
  const project = client?.projects.find(
    (project) => project.id === props.value
  );

  return (
    <div className="project-selector__container">
      <button
        type="button"
        className="project-selector__button"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <div className="project-selector__current">
          <h3 className="project-selector__client">
            {client ? client.name : "Choose"}
          </h3>
          <h2 className="project-selector__project">
            {project !== undefined
              ? `[${project.code}] ${project?.name}`
              : "Project"}
          </h2>
        </div>
        <AngleDown />
      </button>
      <ul
        className={cx("project-selector__list", {
          "project-selector__list--open": open,
        })}
      >
        {clients
          .filter((client) => client.projects.length > 0)
          .map((client) => (
            <ClientItem
              key={client.id}
              client={client}
              onSelect={props.onChange}
              selected={props.value}
            />
          ))}
      </ul>
    </div>
  );
}
