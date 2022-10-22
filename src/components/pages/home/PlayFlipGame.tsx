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
        <ButtonWithText
          buttonTheme={ButtonTheme.Beige}
          className={styles.chooseAmountButton}
          fontClass={FontClass.Header2}
          width="100%"
        >
          0.05 SOL
        </ButtonWithText>
        <ButtonWithText
          buttonTheme={ButtonTheme.Beige}
          className={styles.chooseAmountButton}
          fontClass={FontClass.Header2}
          width="100%"
        >
          0.1 SOL
        </ButtonWithText>
        <ButtonWithText
          buttonTheme={ButtonTheme.Beige}
          className={styles.chooseAmountButton}
          fontClass={FontClass.Header2}
          width="100%"
        >
          0.2 SOL
        </ButtonWithText>
        <ButtonWithText
          buttonTheme={ButtonTheme.Beige}
          className={styles.chooseAmountButton}
          fontClass={FontClass.Header2}
          width="100%"
        >
          0.5 SOL
        </ButtonWithText>
      </div>
    </div>
  );
}

function ChooseHammy() {
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
          buttonTheme={ButtonTheme.Beige}
          fontClass={FontClass.Header2}
          style={{ padding: "16px 24px" }}
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
          buttonTheme={ButtonTheme.Beige}
          fontClass={FontClass.Header2}
          style={{ padding: "16px 24px" }}
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
  );
}
