import type { FormEventHandler, MouseEventHandler } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/shared/Button";
import Modal from "../../components/shared/Modal";
import ProjectSelector from "../../components/ProjectSelector";
import useStorageState from "../../hooks/useStorageState";
import { formatWeekdayMonthDay, formatSeconds } from "../../utils/date";
import { createEntry, updateEntry, deleteEntry } from "../../services/api";
import { useFetchEntries } from "../../hooks/useFetch";
import { useNotification } from "../../context/notification";
import { useEntries } from "../../hooks/useSelector";

import "./createEntry.css";

interface ICreateEntryProps {}

export default function CreateEntry(props: ICreateEntryProps) {
  const params = useParams();
  const navigate = useNavigate();

  const entries = useEntries();
  const entry = entries.find((entry) => entry.id === Number(params.id));

  const { update } = useFetchEntries();

  const close = () => navigate("..");

  const remove = () =>
    deleteEntry(Number(params.id)).then((data) => {
      if (data.success === true) {
        update((state) =>
          state.filter((item) => item.id !== Number(params.id))
        );
      } else {
        throw data.errors;
      }
    });

  const create = (data: FormData) => {
    return createEntry(data).then((data) => {
      if (data.success === true) {
        update((state) => {
          return [...state, data.entry];
        });
      } else {
        throw data.errors;
      }
    });
  };

  const edit = (id: number, data: FormData) =>
    updateEntry(id, data).then((data) => {
      if (data.success === true) {
        update((state) =>
          state.map((item) =>
            item.id === id ? { ...item, ...data.entry } : item
          )
        );
      } else {
        throw data.errors;
      }
    });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    try {
      if (entry) {
        await edit(entry.id, data);
      } else {
        await create(data);
      }

      close();
    } catch (errors: unknown) {
      for (const error of errors as string[]) {
        addNotification("error", error);
      }
    }
  };

  const handleRemove: MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      await remove();

      close();
    } catch (errors: unknown) {
      for (const error of errors as string[]) {
        addNotification("error", error);
      }
    }
  };

  const [projectId, setProjectId] = useStorageState<number | null>(
    "projectId",
    null
  );

  const { addNotification } = useNotification();

  const date = new Date(
    Number(params.year),
    Number(params.month) - 1,
    Number(params.day)
  );

  return (
    <Modal onClose={close}>
      <form className="create-entry__container" onSubmit={handleSubmit}>
        <div className="create-entry__header">
          {`${entry ? "Edit" : "New"} entry for ${formatWeekdayMonthDay(date)}`}
        </div>
        <div className="create-entry__body">
          <ProjectSelector onChange={setProjectId} value={projectId} />
          <input type="hidden" name="projectId" value={projectId ?? 0} />
          <input type="hidden" name="date" value={date.toISOString()} />
          <div className="create-entry__details">
            <textarea
              className="input create-entry__description"
              name="description"
              placeholder="Notes"
              defaultValue={entry?.description ?? ""}
            />
            <input
              className="input create-entry__time"
              name="duration"
              placeholder="0:00"
              defaultValue={entry ? formatSeconds(entry.seconds) : ""}
            />
          </div>
        </div>
        <div className="create-entry__footer">
          <div className="button__group">
            <Button type="submit">Save</Button>
            <Button onClick={close} variant="secondary">
              Cancel
            </Button>
          </div>
          <div>
            {entry && (
              <Button onClick={handleRemove} variant="danger">
                Delete
              </Button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}
