import type { PropsWithChildren, Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState, useCallback } from "react";

type CacheState = Record<string, unknown>;

interface ICacheContext {
  cache: CacheState;
  setCache: Dispatch<SetStateAction<CacheState>>;
}

const CacheContext = createContext<ICacheContext>({
  cache: {},
  setCache: () => null,
});

export default function CacheProvider(props: PropsWithChildren) {
  const [cache, setCache] = useState<CacheState>({});

  return (
    <CacheContext.Provider
      value={{
        cache,
        setCache,
      }}
    >
      {props.children}
    </CacheContext.Provider>
  );
}

export function useCache<T>(key: string) {
  const { cache, setCache } = useContext<ICacheContext>(CacheContext);

  const get = useCallback(() => cache[key] ?? null, [key, cache]);

  const set = useCallback(
    (value: T) => setCache((cache: CacheState) => ({ ...cache, [key]: value })),
    [key, setCache]
  );

  return {
    get,
    set,
  };
}
