import { useEffect, useRef, useState } from "react";

export function useDebounce<T>(val: T, delay: number) {
  const [debouncedVal, setDebouncedVal] = useState<T>(val);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    if (val === debouncedVal) {
      return;
    }
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setDebouncedVal(val), delay);
    return () => clearTimeout(timeout.current);
  }, [val, delay]);
  return debouncedVal;
}
