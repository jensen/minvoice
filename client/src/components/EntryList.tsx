import type { Entry, Project, Client } from "src/types.server";
import { Link } from "react-router-dom";

import { formatSeconds } from "../utils/date";

import "./entryList.css";

interface ProjectWithClient extends Project {
  client: Client;
}

interface EntryWithProject extends Entry {
  project: ProjectWithClient;
}

export const EmptyEntries = () => (
  <div className="entry-list__container">
    <div className="entry-list__empty">
      There are no entries for this day.
      <h2>
        <Link to="new">Create One</Link>
      </h2>
    </div>
  </div>
);

interface IEntryItemProps {
  entry: EntryWithProject;
}

const EntryItem = (props: IEntryItemProps) => (
  <Link to={`edit/${props.entry.id}`}>
    <li className="entry-list__item">
      <div>
        <h2 className="entry-list__header">
          <span className="entry-list__project-name">
            [{props.entry.project.code}] {props.entry.project.name}
          </span>
          <span className="entry-list__client-name">
            ({props.entry.project.client.name})
          </span>
        </h2>
        <h3 className="entry-list__description">{props.entry.description}</h3>
      </div>
      <div className="entry-list__duration">
        {formatSeconds(props.entry.seconds)}
      </div>
    </li>
  </Link>
);

interface IEntryListProps {
  entries: EntryWithProject[];
}

export default function EntryList(props: IEntryListProps) {
  return (
    <ul className="entry-list__container">
      {props.entries.map((entry) => (
        <EntryItem key={entry.id} entry={entry} />
      ))}
    </ul>
  );
}
