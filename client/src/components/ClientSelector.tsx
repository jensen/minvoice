import type { Client } from "../types.server";

interface IClientSelectorProps {
  value: number | null;
  onChange: (id: number) => void;
  clients: Client[];
}

export default function ClientSelector(props: IClientSelectorProps) {
  return (
    <>
      <label hidden htmlFor="clients">
        Current Client
      </label>
      <select
        className="input"
        name="clients"
        id="clients"
        value={props.value ?? undefined}
        onChange={(event) => props.onChange(Number(event.target.value))}
      >
        {props.clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>
    </>
  );
}
