import { useEffect, useState } from "react";
import { LocalStorageName } from "./../utils/localStorage";
export const useStorage = <T = any>(
  key: LocalStorageName,
  initialValue?: T
) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue ?? {};
    } catch (error) {
      return initialValue ?? {};
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.log(error);
    }
  },[key,storedValue]);

  return[storedValue,setStoredValue] as[T,(value:T)=>void]
};
