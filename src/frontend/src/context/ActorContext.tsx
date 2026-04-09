/**
 * ActorContext — single shared actor instance for the entire app.
 *
 * All hooks that need backend access consume useSharedActor() from here
 * so that the admin role assigned during login is visible to every hook
 * (no separate actor instances with their own principal context).
 */
import { createActor } from "@/backend";
import type { backendInterface } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { type ReactNode, createContext, useContext } from "react";

interface ActorContextValue {
  actor: backendInterface | null;
  isFetching: boolean;
}

const ActorContext = createContext<ActorContextValue>({
  actor: null,
  isFetching: true,
});

export function ActorProvider({ children }: { children: ReactNode }) {
  const { actor, isFetching } = useActor(createActor);
  return (
    <ActorContext.Provider
      value={{ actor: actor as backendInterface | null, isFetching }}
    >
      {children}
    </ActorContext.Provider>
  );
}

/** Use this in every hook instead of calling useActor(createActor) independently. */
export function useSharedActor() {
  return useContext(ActorContext);
}
