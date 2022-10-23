import ButtonWithText from "src/components/buttons/ButtonWithText";
import PlayFlipGameGeneric from "src/components/pages/home/PlayFlipGameGeneric";
import Header1 from "src/components/text/Header1";
import usePlayFlipGameContext from "src/hooks/usePlayFlipGameContext";
import ButtonTheme from "src/types/enums/ButtonTheme";
import ColorClass from "src/types/enums/ColorClass";
import FontClass from "src/types/enums/FontClass";
import formatDecimals from "src/utils/number/formatDecimals";
import Image from "next/image";

export default function PlayFlipGameResults() {
  const { amountInSol, didUserWinBet, reset } = usePlayFlipGameContext();

  return (
    <PlayFlipGameGeneric rowGap={36}>
      <Image
        height={377}
        src={
          didUserWinBet === true
            ? "/images/won-flip.png"
            : "/images/lost-flip.png"
        }
        width={377}
      />
      <Header1
        colorClass={ColorClass.Navy}
        textAlign="center"
        textTransform="uppercase"
      >
        {didUserWinBet === true
          ? `You won ${formatDecimals(amountInSol ?? 0, 0)} SOL!`
          : "You lost 😢"}
      </Header1>
      <ButtonWithText
        buttonTheme={ButtonTheme.Yellow}
        fontClass={FontClass.Header1}
        onClick={reset}
        style={{ width: 300 }}
        width="100%"
      >
        Again!!!
      </ButtonWithText>
    </PlayFlipGameGeneric>
  );
}
