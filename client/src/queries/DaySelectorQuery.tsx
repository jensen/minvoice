import { useEntries } from "../hooks/useSelector";
import DaySelector, { IDaySelectorProps } from "../components/DaySelector";

interface IDaySelectorQueryProps extends Omit<IDaySelectorProps, "entries"> {}

export default function DaySelectorQuery(props: IDaySelectorQueryProps) {
  const entries = useEntries();

  return <DaySelector {...props} entries={entries} />;
}
