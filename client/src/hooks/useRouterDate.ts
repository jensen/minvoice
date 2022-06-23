import { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function useRouterDate() {
  const { day, month, year } = useParams();
  const navigate = useNavigate();

  const handlePrevious = useCallback(() => {
    const date = new Date(Number(year), Number(month) - 1, Number(day) - 1);

    navigate(
      `/time/day/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    );
  }, [day, month, year, navigate]);

  const handleNext = useCallback(() => {
    const date = new Date(Number(year), Number(month) - 1, Number(day) + 1);

    navigate(
      `/time/day/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    );
  }, [day, month, year, navigate]);

  const handleSelect = (year: number, month: number, day: number) => {
    navigate(`/time/day/${year}/${month}/${day}`);
  };

  return {
    day: Number(day),
    month: Number(month),
    year: Number(year),
    handlePrevious,
    handleNext,
    handleSelect,
  };
}
