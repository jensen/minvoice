import type { Client } from "../types.server";

interface IClientSelectorProps {
  value: number | null;
  onChange: (id: number) => void;
  clients: Client[];
}

export default function ClientSelector(props: IClientSelectorProps) {
  return (
    <select
      className="input"
      name="clients"
      value={props.value ?? undefined}
      onChange={(event) => props.onChange(Number(event.target.value))}
    >
      {props.clients.map((client) => (
        <option key={client.id} value={client.id}>
          {client.name}
        </option>
      ))}
    </select>
  );
}
