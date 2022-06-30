import { Entry } from "../types.server";
import { useEffect } from "react";
import cx from "classnames";
import { ArrowLeft, ArrowRight } from "./shared/Icons";
import {
  getDayLabel,
  getFirstDayOfWeek,
  getWeek,
  isSameDay,
  formatSeconds,
} from "../utils/date";

import "./daySelector.css";

interface IDayItemProps {
  day: number;
  month: number;
  year: number;
  duration: number;
  isSelected: boolean;
  onSelect: (year: number, month: number, day: number) => void;
}

const DayItem = (props: IDayItemProps) => {
  return (
    <button
      className={cx("day-selector__day", {
        "day-selector__day--active": props.isSelected,
      })}
      onClick={() => props.onSelect(props.year, props.month, props.day)}
    >
      {getDayLabel(new Date(props.year, props.month - 1, props.day))}
      <br />
      {formatSeconds(props.duration)}
    </button>
  );
};

export interface IDaySelectorProps {
  day: number;
  month: number;
  year: number;
  entries: Entry[];
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (year: number, month: number, day: number) => void;
}

export default function DaySelector(props: IDaySelectorProps) {
  const { day, month, year } = props;

  const current = new Date(year, month - 1, day);

  const days = getWeek(getFirstDayOfWeek(year, month, day));

  const { onPrevious, onNext } = props;

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    document.addEventListener("keyup", handleKeyPress);

    return () => {
      document.removeEventListener("keyup", handleKeyPress);
    };
  }, [onPrevious, onNext]);

  return (
    <div className="day-selector__container">
      <button className="day-selector__previous" onClick={props.onPrevious}>
        <ArrowLeft />
      </button>
      <div className="day-selector__week">
        {days.map((day) => (
          <DayItem
            key={day.toString()}
            year={day.getFullYear()}
            month={day.getMonth() + 1}
            day={day.getDate()}
            duration={props.entries
              .filter((entry) => isSameDay(new Date(entry.date), day))
              .reduce((seconds, entry) => seconds + entry.seconds, 0)}
            isSelected={day.getDate() === current.getDate()}
            onSelect={props.onSelect}
          />
        ))}
      </div>
      <button className="day-selector__next" onClick={props.onNext}>
        <ArrowRight />
      </button>
    </div>
  );
}
