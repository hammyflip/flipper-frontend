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
  didUserWinBet: Maybe<boolean>;
  headsOrTails: Maybe<HeadsOrTails>;
  reset: () => void;
  step: Step;
  setAmountInSol: (val: Maybe<number>) => void;
  setDidUserWinBet: (val: Maybe<boolean>) => void;
  setHeadsOrTails: (val: Maybe<HeadsOrTails>) => void;
  setStep: (val: Step) => void;
};

export const PlayFlipGameContext: Context<PlayFlipGameContextData> =
  createContext<PlayFlipGameContextData>({
    amountInSol: null,
    didUserWinBet: null,
    headsOrTails: null,
    reset: emptyFunction,
    step: "choose_bet",
    setAmountInSol: emptyFunction,
    setDidUserWinBet: emptyFunction,
    setHeadsOrTails: emptyFunction,
    setStep: emptyFunction,
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export function PlayFlipGameContextProvider(props: ProviderProps): JSX.Element {
  const [amountInSol, setAmountInSol] = useState<Maybe<number>>(null);
  const [didUserWinBet, setDidUserWinBet] = useState<Maybe<boolean>>(null);
  const [headsOrTails, setHeadsOrTails] = useState<Maybe<HeadsOrTails>>(null);
  const [step, setStep] = useState<Step>("choose_bet");

  return (
    <PlayFlipGameContext.Provider
      value={{
        amountInSol,
        didUserWinBet,
        headsOrTails,
        reset: () => {
          setAmountInSol(null);
          setDidUserWinBet(null);
          setHeadsOrTails(null);
          setStep("choose_bet");
        },
        step,
        setAmountInSol,
        setDidUserWinBet,
        setHeadsOrTails,
        setStep,
      }}
    >
      {props.children}
    </PlayFlipGameContext.Provider>
  );
}
