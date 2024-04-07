"use client";
import { useEffect, useReducer } from "react";

type State<T> = {
  loading: boolean;
  error: any;
  data: T | null;
};

type Action<T> =
  | { type: "start" }
  | { type: "finish"; value: T }
  | { type: "error"; error: any };

const initialState: State<any> = { loading: true, error: null, data: null };

const stateReducer = <T>(_: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case "start":
      return { loading: true, error: null, data: null };
    case "finish":
      return { loading: false, error: null, data: action.value };
    case "error":
      return { loading: false, error: action.error, data: null };
  }
};

const useAsync = <T>(fn: (...args: any) => Promise<T>, isRun?: boolean) => {
  const [state, dispatch] = useReducer(stateReducer<T>, initialState);

  const asyncFunc = async (...args: any) => {
    try {
      dispatch({ type: "start" });
      const value = await fn(...args);
      dispatch({ type: "finish", value });
    } catch (error: any) {
      dispatch({ type: "error", error });
    }
  };

  useEffect(() => {
    if (isRun) {
      dispatch({ type: "finish", value: null as T });
      return;
    }
    asyncFunc();
  }, []);

  const run = async (callback?: (..._: any) => Promise<T>) => {
    try {
      dispatch({ type: "start" });
      const value = callback ? await callback() : await fn();
      dispatch({ type: "finish", value });
      return value;
    } catch (error) {
      dispatch({ type: "error", error });
      return error;
    }
  };

  return { ...state, run };
};

export default useAsync;
