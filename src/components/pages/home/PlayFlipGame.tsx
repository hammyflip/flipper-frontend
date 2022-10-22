import ResponsiveContainer from "src/components/ResponsiveContainer";
import styles from "@/css/pages/home/PlayFlipGame.module.css";
import Header1 from "src/components/text/Header1";
import ColorClass from "src/types/enums/ColorClass";
import Header2 from "src/components/text/Header2";
import ButtonWithText from "src/components/buttons/ButtonWithText";
import FontClass from "src/types/enums/FontClass";
import ButtonTheme from "src/types/enums/ButtonTheme";
import HeadsIcon from "src/components/icons/HeadsIcon";
import TailsIcon from "src/components/icons/TailsIcon";
import formatDecimals from "src/utils/number/formatDecimals";
import { PlayFlipGameContextProvider } from "src/context/PlayFlipGameContext";
import usePlayFlipGameContext from "src/hooks/usePlayFlipGameContext";

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

export default function PlayFlipGame() {
  return (
    <PlayFlipGameContextProvider>
      <ResponsiveContainer>
        <div className={styles.container}>
          <Header1 colorClass={ColorClass.Navy} textTransform="uppercase">
            Double or nothing your SOL
          </Header1>
          <ChooseHammy />
          <ChooseAmount />
          <ButtonWithText
            buttonTheme={ButtonTheme.Yellow}
            fontClass={FontClass.Header1}
            textTransform="uppercase"
          >
            Hammyflip
          </ButtonWithText>
        </div>
      </ResponsiveContainer>
    </PlayFlipGameContextProvider>
  );
}
