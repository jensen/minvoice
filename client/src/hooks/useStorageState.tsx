import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState, useCallback } from "react";

export default function useStorageState<T>(
  key: string,
  initialState: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    const existing = localStorage.getItem(key);

    if (existing !== null) {
      setState(JSON.parse(existing));
    }
  }, [key]);

  const updateState = useCallback(
    (state: T) => {
      localStorage.setItem(key, JSON.stringify(state));
      setState(state);
    },
    [key]
  ) as Dispatch<SetStateAction<T>>;

  return [state, updateState];
}
