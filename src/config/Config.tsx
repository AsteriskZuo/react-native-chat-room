import * as React from 'react';

import type { Config } from './types';

export const ConfigContext = React.createContext<Config | undefined>(undefined);
ConfigContext.displayName = 'UIKitConfigContext';

type ConfigContextProps = React.PropsWithChildren<{ value: Config }>;

export function ConfigContextProvider(props: ConfigContextProps) {
  const { children, value } = props;
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

export function useConfigContext(): Config {
  const config = React.useContext(ConfigContext);
  if (!config) throw Error(`${ConfigContext.displayName} is not provided`);
  return config;
}
