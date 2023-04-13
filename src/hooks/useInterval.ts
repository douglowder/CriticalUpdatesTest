import { useEffect, useRef } from 'react';

const useInterval: (callback: () => void, interval: number) => void = (callback, interval) => {
  const callbackRef = useRef<typeof callback>();
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  // Set up the interval.
  useEffect(() => {
    function cb() {
      callbackRef.current && callbackRef.current();
    }
    let id = setInterval(cb, interval);
    return () => clearInterval(id);
  }, [interval]);
};

export default useInterval;
