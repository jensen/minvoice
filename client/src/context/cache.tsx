import type {
  PropsWithChildren,
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from "react";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";

/* https://github.com/microsoft/TypeScript/issues/37663 */
function isFunction<T extends (...args: unknown[]) => unknown>(
  value: unknown
): value is T {
  return typeof value === "function";
}

type CacheState = Record<string, unknown>;
type Status = Record<string, "caching" | "cached" | undefined>;

interface ICacheContext {
  cache: CacheState;
  setCache: Dispatch<SetStateAction<CacheState>>;
  status: MutableRefObject<Status>;
}

const CacheContext = createContext<ICacheContext>({
  cache: {},
  setCache: () => null,
  status: { current: {} },
});

export default function CacheProvider(props: PropsWithChildren) {
  const [cache, setCache] = useState<CacheState>({});
  const status = useRef<Status>({});

  return (
    <CacheContext.Provider
      value={{
        cache,
        setCache,
        status,
      }}
    >
      {props.children}
    </CacheContext.Provider>
  );
}

export function useCache<T>(key: string) {
  const { cache, setCache, status } = useContext<ICacheContext>(CacheContext);

  const get = useCallback(() => cache[key] ?? null, [key, cache]);

  const set = useCallback(
    (value: T | ((state: T) => T)) => {
      setCache((cache: CacheState) => {
        if (isFunction(value)) {
          return {
            ...cache,
            [key]: value(cache[key]),
          };
        } else {
          return {
            ...cache,
            [key]: value,
          };
        }
      });
    },
    [key, setCache]
  );

  return {
    get,
    set,
    status,
  };
}
