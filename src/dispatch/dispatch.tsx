import * as React from 'react';

import { ErrorCode, UIKitError } from '../error';
import { asyncTask } from '../utils';
import type { DispatchApi, DispatchInit, Listener } from './types';

const DispatchContext = React.createContext<DispatchApi | undefined>(undefined);
DispatchContext.displayName = 'UIKitDispatchContext';

type DispatchContextProps = React.PropsWithChildren<{ value?: DispatchInit }>;

export function DispatchContextProvider({ children }: DispatchContextProps) {
  const map = new Map<string, Set<Listener>>();
  const v = {
    addListener: (key, listener) => {
      if (map.has(key)) {
        const s = map.get(key);
        if (s?.has(listener)) {
          throw new UIKitError({ code: ErrorCode.existed });
        }
        s?.add(listener);
      } else {
        const s = new Set<Listener>();
        s.add(listener);
        map.set(key, s);
      }
    },
    removeListener: (key, listener) => {
      if (map.has(key)) {
        const s = map.get(key);
        if (s?.has(listener)) {
          s.delete(listener);
        }
      }
    },
    emit: (key, ...args: any[]) => {
      const s = map.get(key);
      asyncTask(() => {
        s?.forEach((v) => {
          v?.(...args);
          // v.apply(null, [...args]);
          // v.call(null, ...args);
        });
      });
    },
    emitSync: (key, ...args: any[]) => {
      const s = map.get(key);
      s?.forEach((v) => {
        v?.(...args);
        // v.apply(null, [...args]);
        // v.call(null, ...args);
      });
    },
  } as DispatchApi;
  return (
    <DispatchContext.Provider value={v}>{children}</DispatchContext.Provider>
  );
}

export function useDispatchContext(): DispatchApi {
  const dis = React.useContext(DispatchContext);
  if (!dis) throw Error(`${DispatchContext.displayName} is not provided`);
  return dis;
}
