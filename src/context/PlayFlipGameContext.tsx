/* eslint-disable react/jsx-no-constructed-context-values */

import { Context, createContext, useState } from "react";
import { Maybe } from "src/types/UtilityTypes";
import emptyFunction from "src/utils/emptyFunction";

type HeadsOrTails = "heads" | "tails";

export type PlayFlipGameContextData = {
  amountInSol: Maybe<number>;
  headsOrTails: Maybe<HeadsOrTails>;
  setAmountInSol: (val: Maybe<number>) => void;
  setHeadsOrTails: (val: Maybe<HeadsOrTails>) => void;
};

export const PlayFlipGameContext: Context<PlayFlipGameContextData> =
  createContext<PlayFlipGameContextData>({
    amountInSol: null,
    headsOrTails: null,
    setAmountInSol: emptyFunction,
    setHeadsOrTails: emptyFunction,
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export function PlayFlipGameContextProvider(props: ProviderProps): JSX.Element {
  const [amountInSol, setAmountInSol] = useState<Maybe<number>>(null);
  const [headsOrTails, setHeadsOrTails] = useState<Maybe<HeadsOrTails>>(null);

  return (
    <PlayFlipGameContext.Provider
      value={{
        amountInSol,
        headsOrTails,
        setAmountInSol,
        setHeadsOrTails,
      }}
    >
      {props.children}
    </PlayFlipGameContext.Provider>
  );
}
