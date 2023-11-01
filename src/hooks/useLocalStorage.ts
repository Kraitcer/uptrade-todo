import { useEffect } from "react";
import store from "../store/store";

export function useLocalStorage<T>(
  key: string,
  state: T[],
  dispatch: React.Dispatch<any>
) {
  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if (storedData && storedData.length > 0) {
      const parsedData = JSON.parse(storedData);
      dispatch({ type: `SET_${key.toUpperCase()}`, payload: parsedData });
    }
  }, [dispatch, key]);

  useEffect(() => {
    if (state && state.length > 0) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);
}
