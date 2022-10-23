/* eslint-disable react/jsx-no-constructed-context-values */

import { Context, createContext, useState } from "react";
import useRecentPlaysQuery from "src/hooks/queries/useRecentPlaysQuery";
import HeadsOrTails from "src/types/HeadsOrTails";
import { Maybe } from "src/types/UtilityTypes";
import processFlip from "src/utils/api/post/processFlip";
import emptyFunction from "src/utils/emptyFunction";
import emptyFunctionAsync from "src/utils/emptyFunctionAsync";

type Step =
  | "choose_bet"
  | "sending_transaction"
  | "processing_transaction"
  | "results";

export type PlayFlipGameContextData = {
  amountInSol: Maybe<number>;
  didUserWinBet: Maybe<boolean>;
  headsOrTails: Maybe<HeadsOrTails>;
  processTxid: (txid: string) => Promise<void>;
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
    processTxid: emptyFunctionAsync,
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
  const { refetch } = useRecentPlaysQuery();

  return (
    <PlayFlipGameContext.Provider
      value={{
        amountInSol,
        didUserWinBet,
        headsOrTails,
        processTxid: async (txid) => {
          try {
            setStep("processing_transaction");

            const { didUserWinBet } = await processFlip(txid);
            setDidUserWinBet(didUserWinBet);

            refetch();

            setStep("results");
          } catch {
            // TODO: show error?
            setStep("choose_bet");
          }
        },
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
