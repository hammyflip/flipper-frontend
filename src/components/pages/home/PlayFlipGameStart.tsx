import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import styles from "@/css/pages/home/PlayFlipGameStart.module.css";
import Header1 from "src/components/text/Header1";
import ColorClass from "src/types/enums/ColorClass";
import Header2 from "src/components/text/Header2";
import ButtonWithText from "src/components/buttons/ButtonWithText";
import FontClass from "src/types/enums/FontClass";
import ButtonTheme from "src/types/enums/ButtonTheme";
import formatDecimals from "src/utils/number/formatDecimals";
import usePlayFlipGameContext from "src/hooks/usePlayFlipGameContext";
import useSolanaContext from "src/hooks/useSolanaContext";
import invariant from "tiny-invariant";
import { useWallet } from "@solana/wallet-adapter-react";
import { WRAPPED_SOL_MINT } from "@hammyflip/flipper-sdk/dist/constants/AccountConstants";
import combineTransactions from "src/utils/solana/combineTransactions";
import filterNulls from "src/utils/array/filterNulls";
import PlayFlipGameGeneric from "src/components/pages/home/PlayFlipGameGeneric";
import HEADS_OR_TAILS_TO_NUMBER from "src/constants/HeadsOrTailsToNumber";
import notifyUnexpectedError from "src/utils/toast/notifyUnexpectedError";
import useBreakpoint from "src/hooks/useBreakpoint";
import Image from "next/image";

function AmountButton({ amountInSol }: { amountInSol: number }) {
  const { amountInSol: amountInSolContext, setAmountInSol } =
    usePlayFlipGameContext();

  return (
    <ButtonWithText
      buttonTheme={
        amountInSolContext === amountInSol
          ? ButtonTheme.WinterGreen
          : ButtonTheme.Beige
      }
      className={styles.chooseAmountButton}
      fontClass={FontClass.Header2}
      onClick={() => setAmountInSol(amountInSol)}
      width="100%"
    >
      {formatDecimals(amountInSol, 0)} SOL
    </ButtonWithText>
  );
}

function ChooseAmount() {
  return (
    <div className={styles.chooseAmount}>
      <Header2
        colorClass={ColorClass.Navy}
        textAlign="center"
        textTransform="uppercase"
      >
        Choose how much
      </Header2>
      <div className={styles.chooseAmountButtons}>
        <AmountButton amountInSol={0.05} />
        <AmountButton amountInSol={0.1} />
        <AmountButton amountInSol={0.5} />
        <AmountButton amountInSol={1.0} />
      </div>
    </div>
  );
}

function ChooseHammy() {
  const { headsOrTails, setHeadsOrTails } = usePlayFlipGameContext();

  return (
    <div className={styles.chooseHammy}>
      <Header2
        colorClass={ColorClass.Navy}
        textAlign="center"
        textTransform="uppercase"
      >
        Choose your hammy
      </Header2>
      <div className={styles.chooseHammyButtons}>
        <ButtonWithText
          borderRadius={24}
          buttonTheme={
            headsOrTails === "heads"
              ? ButtonTheme.WinterGreen
              : ButtonTheme.Beige
          }
          fontClass={FontClass.Header2}
          onClick={() => setHeadsOrTails("heads")}
          style={{ padding: "16px 24px" }}
          textTransform="uppercase"
        >
          <div className={styles.buttonContent}>
            <Image src="/images/heads.png" height={64} width={64} priority />
            Heads
          </div>
        </ButtonWithText>
        <ButtonWithText
          borderRadius={24}
          buttonTheme={
            headsOrTails === "tails"
              ? ButtonTheme.WinterGreen
              : ButtonTheme.Beige
          }
          fontClass={FontClass.Header2}
          onClick={() => setHeadsOrTails("tails")}
          style={{ padding: "16px 24px" }}
          textTransform="uppercase"
        >
          <div className={styles.buttonContent}>
            <Image src="/images/tails.png" height={64} width={64} priority />
            Tails
          </div>
        </ButtonWithText>
      </div>
    </div>
  );
}

export default function PlayFlipGameStart() {
  const { amountInSol, headsOrTails, processTxid, setStep } =
    usePlayFlipGameContext();
  const { connection, flipperSdk } = useSolanaContext();
  const { publicKey, sendTransaction } = useWallet();
  const { isTabletBreakpoint } = useBreakpoint();

  return (
    <PlayFlipGameGeneric fadeIn rowGap={isTabletBreakpoint ? 36 : 48}>
      <Header1
        colorClass={ColorClass.Navy}
        textAlign="center"
        textTransform="uppercase"
      >
        Double or nothing your SOL
      </Header1>
      <ChooseHammy />
      <ChooseAmount />
      <ButtonWithText
        buttonTheme={ButtonTheme.Yellow}
        disabled={amountInSol == null || headsOrTails == null}
        fontClass={FontClass.Header1}
        onClick={async () => {
          invariant(flipperSdk != null);
          invariant(publicKey != null);
          invariant(sendTransaction != null);
          invariant(headsOrTails != null);
          const tx1 = await flipperSdk.createBettorInfoIfNeededTx({
            bettor: publicKey,
            treasuryMint: WRAPPED_SOL_MINT,
          });
          const tx2 = await flipperSdk.placeBetTx(
            {
              bettor: publicKey,
              treasuryMint: WRAPPED_SOL_MINT,
            },
            {
              amount: amountInSol! * LAMPORTS_PER_SOL,
              bets: HEADS_OR_TAILS_TO_NUMBER[headsOrTails],
              numFlips: 1,
            }
          );
          const tx = combineTransactions(filterNulls([tx1, tx2]));

          setStep("sending_transaction");

          try {
            const txid = await sendTransaction(tx, connection);
            if (txid == null) {
              throw new Error("Failed to sign transaction");
            }

            await processTxid(txid);
          } catch (e: any) {
            const errorMessage = e.message;
            if (
              ![
                "Failed to sign transaction",
                "User rejected the request.",
                "You cancelled the transaction.",
              ].includes(errorMessage)
            ) {
              notifyUnexpectedError();
            }
            setStep("choose_bet");
          }
        }}
        textTransform="uppercase"
        style={{ width: isTabletBreakpoint ? 270 : 300 }}
        width="100%"
      >
        Hammyflip
      </ButtonWithText>
    </PlayFlipGameGeneric>
  );
}
