import { useNavigate, Outlet } from "react-router-dom";
import Card from "../components/shared/Card";
import { Plus } from "../components/shared/Icons";
import Button from "../components/shared/Button";
import DaySelector from "../components/DaySelector";
import EntryList from "../components/EntryList";
import useRouterDate from "../hooks/useRouterDate";

interface ICurrentDateProps {
  day: number;
  month: number;
  year: number;
}

const CurrentDate = (props: ICurrentDateProps) => {
  const formatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(props.year, props.month - 1, props.day));

  return <span className="current-date__label">{formatted}</span>;
};

export default function Time() {
  const { day, month, year, handlePrevious, handleNext, handleSelect } =
    useRouterDate();
  const navigate = useNavigate();

  return (
    <main className="page time__container">
      <Card>
        <CurrentDate year={year} month={month} day={day} />
      </Card>
      <Card>
        <DaySelector
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSelect={handleSelect}
          day={day}
          month={month}
          year={year}
        />
      </Card>
      <Card padding={false}>
        <div className="padding">
          <Button onClick={() => navigate("new")}>
            <Plus />
            New Entry
          </Button>
        </div>
        <EntryList year={year} month={month} day={day} />
      </Card>
      <Outlet />
    </main>
  );
}
