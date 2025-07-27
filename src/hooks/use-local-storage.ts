
"use client";

import { useState, useEffect, useCallback } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        setState(JSON.parse(storedValue));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
    setInitialized(true);
  }, [key]);

  const setLocalStorageState = useCallback((newValue: T | ((prevState: T) => T)) => {
    setState(prevState => {
      const valueToStore = newValue instanceof Function ? newValue(prevState) : newValue;
      try {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
      return valueToStore;
    });
  }, [key]);

  return [state, setLocalStorageState, isInitialized] as const;
}

export default useLocalStorage;
