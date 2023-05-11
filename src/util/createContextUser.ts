import { Context, useContext } from "react";

/**
 * Create a `useContext` function that throws if the context has not been provided yet.
 * @param context
 * @returns
 */
export const createContextUser =
  <TValue>(context: Context<TValue>) =>
  () => {
    const ctx = useContext(context);
    if (!ctx)
      throw new Error(`${context.displayName} must be provided before use`);
    return ctx as NonNullable<TValue>; // The "if" above actually makes this type implicit, but it does not work across lib/app boundaries so I've set an explicit type here to force it.
  };
