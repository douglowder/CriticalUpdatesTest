import { useEffect, useRef } from 'react';

/**
 * Hook that calls a callback periodically
 * Based on https://balavishnuvj.com/blog/using-callbacks-in-custom-hooks/
 *
 * @param callback The callback to be called
 * @param interval The interval between callbacks, in milliseconds
 */
export const useInterval: (callback: () => void, interval: number) => void = (
  callback,
  interval
) => {
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

/**
 * Promise wrapper for setTimeout()
 * @param {delay} timeout Timeout in ms
 * @returns a Promise that resolves after the timeout has elapsed
 */
export const delay = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
