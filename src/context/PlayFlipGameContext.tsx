/* eslint-disable react/jsx-no-constructed-context-values */

import { Context, createContext, useState } from "react";
import { Maybe } from "src/types/UtilityTypes";
import emptyFunction from "src/utils/emptyFunction";

type HeadsOrTails = "heads" | "tails";
type Step =
  | "choose_bet"
  | "sending_transaction"
  | "processing_transaction"
  | "results";

export type PlayFlipGameContextData = {
  amountInSol: Maybe<number>;
  headsOrTails: Maybe<HeadsOrTails>;
  step: Step;
  setAmountInSol: (val: Maybe<number>) => void;
  setHeadsOrTails: (val: Maybe<HeadsOrTails>) => void;
  setStep: (val: Step) => void;
};

export const PlayFlipGameContext: Context<PlayFlipGameContextData> =
  createContext<PlayFlipGameContextData>({
    amountInSol: null,
    headsOrTails: null,
    step: "choose_bet",
    setAmountInSol: emptyFunction,
    setHeadsOrTails: emptyFunction,
    setStep: emptyFunction,
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export function PlayFlipGameContextProvider(props: ProviderProps): JSX.Element {
  const [amountInSol, setAmountInSol] = useState<Maybe<number>>(null);
  const [headsOrTails, setHeadsOrTails] = useState<Maybe<HeadsOrTails>>(null);
  const [step, setStep] = useState<Step>("choose_bet");

  return (
    <PlayFlipGameContext.Provider
      value={{
        amountInSol,
        headsOrTails,
        step,
        setAmountInSol,
        setHeadsOrTails,
        setStep,
      }}
    >
      {props.children}
    </PlayFlipGameContext.Provider>
  );
}
