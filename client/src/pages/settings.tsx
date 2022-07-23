import type { Project } from "../types.server";
import { useClients } from "../hooks/useSelector";
import Card, { CardHeader } from "../components/shared/Card";
import Table from "../components/shared/Table";
import CreateClient from "../components/CreateClient";
import CreateProject from "../components/CreateProject";
import ClientSelector from "../components/ClientSelector";
import useStorageState from "../hooks/useStorageState";
import { useEffect } from "react";

export default function Settings() {
  const clients = useClients();

  const [selectedClientId, setSelectedClientId] = useStorageState<
    number | null
  >("clientId", null);

  useEffect(() => {
    if (selectedClientId === null && clients.length > 0) {
      setSelectedClientId(clients[0].id);
    }
  }, [clients, selectedClientId, setSelectedClientId]);

  const projects =
    clients.find((client) => client.id === selectedClientId)?.projects || [];

  return (
    <main className="page settings__container">
      <Card>
        <CardHeader>Clients</CardHeader>
        <CreateClient
          onCreate={(client) => {
            setSelectedClientId(client.id);
          }}
        />
        <ClientSelector
          clients={clients}
          value={selectedClientId}
          onChange={(id) => {
            setSelectedClientId(id);
          }}
        />
      </Card>
      <Card padding={false}>
        <div className="padding">
          <CardHeader>Projects</CardHeader>
          <CreateProject clientId={selectedClientId} />
        </div>
        <Table
          columns={[
            { label: "Code", accessor: "code", width: "20%" },
            { label: "Name", accessor: "name" },
          ]}
          rows={projects}
        />
      </Card>
    </main>
  );
}
