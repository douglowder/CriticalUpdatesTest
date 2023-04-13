import { useEffect, useRef } from 'react';

/**
 * Hook that calls a callback periodically
 * Based on https://balavishnuvj.com/blog/using-callbacks-in-custom-hooks/
 *
 * @param callback The callback to be called
 * @param interval The interval between callbacks, in seconds
 */
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
    let id = setInterval(cb, interval * 1000);
    return () => clearInterval(id);
  }, [interval]);
};

export default useInterval;
