import { useEntries } from "../hooks/useSelector";
import EntryList, { EmptyEntries } from "../components/EntryList";

interface IEntryListQueryProps {
  year: number;
  month: number;
  day: number;
}

export default function EntryListQuery(props: IEntryListQueryProps) {
  const entries = useEntries({
    filter: {
      year: props.year,
      month: props.month,
      day: props.day,
    },
  });

  if (entries.length === 0) {
    return <EmptyEntries />;
  }

  return <EntryList entries={entries} />;
}
