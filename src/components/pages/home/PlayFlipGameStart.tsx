import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import styles from "@/css/pages/home/PlayFlipGameStart.module.css";
import Header1 from "src/components/text/Header1";
import ColorClass from "src/types/enums/ColorClass";
import Header2 from "src/components/text/Header2";
import ButtonWithText from "src/components/buttons/ButtonWithText";
import FontClass from "src/types/enums/FontClass";
import ButtonTheme from "src/types/enums/ButtonTheme";
import HeadsIcon from "src/components/icons/HeadsIcon";
import TailsIcon from "src/components/icons/TailsIcon";
import formatDecimals from "src/utils/number/formatDecimals";
import usePlayFlipGameContext from "src/hooks/usePlayFlipGameContext";
import useSolanaContext from "src/hooks/useSolanaContext";
import invariant from "tiny-invariant";
import { useWallet } from "@solana/wallet-adapter-react";
import { WRAPPED_SOL_MINT } from "@hammyflip/flipper-sdk/dist/constants/AccountConstants";
import combineTransactions from "src/utils/solana/combineTransactions";
import filterNulls from "src/utils/array/filterNulls";
import PlayFlipGameGeneric from "src/components/pages/home/PlayFlipGameGeneric";
import processFlip from "src/utils/api/post/processFlip";
import useRecentPlaysQuery from "src/hooks/queries/useRecentPlaysQuery";

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
        <AmountButton amountInSol={0.2} />
        <AmountButton amountInSol={0.5} />
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
            <div className={styles.coin}>
              <HeadsIcon />
            </div>
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
            <div className={styles.coin}>
              <TailsIcon />
            </div>
            Tails
          </div>
        </ButtonWithText>
      </div>
    </div>
  );
}

export default function PlayFlipGameStart() {
  const { amountInSol, headsOrTails, setDidUserWinBet, setStep } =
    usePlayFlipGameContext();
  const { connection, flipperSdk } = useSolanaContext();
  const { publicKey, sendTransaction } = useWallet();
  const { refetch } = useRecentPlaysQuery();

  return (
    <PlayFlipGameGeneric fadeIn rowGap={48}>
      <Header1 colorClass={ColorClass.Navy} textTransform="uppercase">
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
              bets: headsOrTails === "heads" ? 0 : 1,
              numFlips: 1,
            }
          );
          const tx = combineTransactions(filterNulls([tx1, tx2]));

          setStep("sending_transaction");

          try {
            const txid = await sendTransaction(tx, connection);

            setStep("processing_transaction");

            const { didUserWinBet } = await processFlip(txid);
            setDidUserWinBet(didUserWinBet);

            refetch();

            setStep("results");
          } catch {
            // TODO: show error?
            setStep("choose_bet");
          }
        }}
        textTransform="uppercase"
        style={{ width: 300 }}
        width="100%"
      >
        Hammyflip
      </ButtonWithText>
    </PlayFlipGameGeneric>
  );
}
