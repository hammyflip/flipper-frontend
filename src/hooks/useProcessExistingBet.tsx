import {
  LAMPORTS_PER_SOL,
  ParsedTransactionWithMeta,
  PartiallyDecodedInstruction,
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import useSolanaContext from "src/hooks/useSolanaContext";
import { WRAPPED_SOL_MINT } from "@hammyflip/flipper-sdk/dist/constants/AccountConstants";
import { parsePlaceBetIx } from "@hammyflip/flipper-sdk";
import filterNulls from "src/utils/array/filterNulls";
import usePlayFlipGameContext from "src/hooks/usePlayFlipGameContext";
import NUMBER_TO_HEADS_OR_TAILS from "src/constants/NumberToHeadsOrTails";
import notify from "src/utils/toast/notify";
import notifyUnexpectedError from "src/utils/toast/notifyUnexpectedError";
import ExternalLink from "src/components/links/ExternalLink";

function isPlaceBetTx(tx: ParsedTransactionWithMeta) {
  const { instructions } = tx.transaction.message;
  const placeBetIx = instructions.find((ix) =>
    parsePlaceBetIx(ix as PartiallyDecodedInstruction)
  );
  return placeBetIx != null;
}

/**
 * If for some reason the user has an existing bet that has not
 * been processed, we should process it when they return to the page,
 * instead of allowing them to attempt to place another bet.
 */
export default function useProcessExistingBet() {
  const { publicKey } = useWallet();
  const { connection, flipperSdk } = useSolanaContext();
  const {
    processExistingAttemptFailed,
    processTxid,
    setAmountInSol,
    setHeadsOrTails,
    setProcessExistingAttemptFailed,
    step,
    setStep,
  } = usePlayFlipGameContext();

  useEffect(() => {
    console.log("useEffect", publicKey?.toString(), step);
    async function run() {
      if (
        publicKey == null ||
        flipperSdk == null ||
        processExistingAttemptFailed ||
        step !== "choose_bet"
      ) {
        return;
      }

      try {
        const bettorInfo = await flipperSdk.fetchBettorInfo(
          publicKey,
          WRAPPED_SOL_MINT
        );
        if (bettorInfo.account.amount.toNumber() > 0) {
          notify({
            description:
              "You have an existing bet that has not been processed yet",
            duration: 4,
            message: "Processing existing bet",
          });
          // A bet has already been placed
          const txs = await connection.getConfirmedSignaturesForAddress2(
            bettorInfo.pubkey
          );
          const txsParsed = filterNulls(
            await connection.getParsedTransactions(
              txs.map(({ signature }) => signature)
            )
          );
          const placeBetTx = txsParsed.find((tx) => isPlaceBetTx(tx));

          if (placeBetTx != null) {
            setAmountInSol(
              bettorInfo.account.amount.toNumber() / LAMPORTS_PER_SOL
            );
            setHeadsOrTails(NUMBER_TO_HEADS_OR_TAILS[bettorInfo.account.bets]);
            await processTxid(placeBetTx.transaction.signatures[0]);
          }
        }
      } catch {
        setProcessExistingAttemptFailed(true);
        notifyUnexpectedError(
          <>
            An unexpected error occurred while processing your existing bet.
            Please refresh and try again, or contact our{" "}
            <ExternalLink href="https://twitter.com/hammyflip">
              Twitter
            </ExternalLink>{" "}
            for support
          </>
        );
        setStep("choose_bet");
      }
    }

    run();
  }, []);
}
