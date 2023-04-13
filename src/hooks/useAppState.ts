import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

/**
 * Hook that returns app state, and takes a callback that is called on active state changes
 *
 * @param callback Called with the "activating" parameter = true when entering active state,
 * false when leaving active state
 *
 * @returns one of 'active', 'background', 'inactive', or 'unknown'
 */
const useAppState: (callback?: (activating: boolean) => void) => AppStateStatus = (
  callback = undefined
) => {
  const callbackRef = useRef<typeof callback>();
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const cb = (activating: boolean) => callbackRef.current && callbackRef.current(activating);

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      // Foregrounding
      if (appState.current !== 'active' && nextAppState === 'active') {
        cb(true);
      }
      // Backgrounding
      if (appState.current === 'active' && nextAppState !== 'active') {
        cb(false);
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return appState.current;
};

export default useAppState;
