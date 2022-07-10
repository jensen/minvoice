import type { Client } from "../types.server";
import { useNotification } from "../context/notification";
import Button from "../components/shared/Button";
import { useFetchClients } from "../hooks/useFetch";
import { createClient } from "../services/api";

import "./createClient.css";

interface ICreateClientProps {
  onCreate: (client: Client) => void;
}

export default function CreateClient(props: ICreateClientProps) {
  const { loading, update } = useFetchClients();
  const { addNotification } = useNotification();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;

        createClient(new FormData(event.currentTarget)).then((data) => {
          if (data.success === true) {
            update((state) => [...state, data.client]);

            props.onCreate(data.client);
            form.reset();
          } else {
            for (const error of data.errors) {
              addNotification("error", error);
            }
          }
        });
      }}
      className="create-client__container"
    >
      <label className="label__container">
        <span className="label__content">Name</span>
        <input
          className="input"
          name="name"
          type="text"
          aria-label="Client Name"
        />
      </label>
      <Button type="submit" disabled={loading}>
        Add Client
      </Button>
    </form>
  );
}
