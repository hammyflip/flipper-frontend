import ButtonWithText from "src/components/buttons/ButtonWithText";
import PlayFlipGameGeneric from "src/components/pages/home/PlayFlipGameGeneric";
import Header1 from "src/components/text/Header1";
import usePlayFlipGameContext from "src/hooks/usePlayFlipGameContext";
import ButtonTheme from "src/types/enums/ButtonTheme";
import ColorClass from "src/types/enums/ColorClass";
import FontClass from "src/types/enums/FontClass";
import formatDecimals from "src/utils/number/formatDecimals";
import Image from "next/image";
import TextButton from "src/components/buttons/TextButton";
import TextButtonTheme from "src/types/enums/TextButtonTheme";
import TwitterIcon from "src/components/icons/TwitterIcon";
import ColorValue from "src/types/enums/ColorValue";

function getTwitterImage(amountInSol: number, didUserWinBet: boolean) {
  if (didUserWinBet) {
    switch (amountInSol) {
      case 0.05:
        return "https://twitter.com/hammylotto/status/1587244841431232513/photo/1";
      case 0.1:
        return "https://twitter.com/hammylotto/status/1587251980916981760/photo/1";
      case 0.5:
        return "https://twitter.com/hammylotto/status/1587252012575752193/photo/1";
      case 1:
        return "https://twitter.com/hammylotto/status/1587252037955485696/photo/1";
      default:
        return "https://twitter.com/hammylotto/status/1587244841431232513/photo/1";
    }
  }

  switch (amountInSol) {
    case 0.05:
      return "https://twitter.com/hammylotto/status/1587252139004334081/photo/1";
    case 0.1:
      return "https://twitter.com/hammylotto/status/1587252364108435456/photo/1";
    case 0.5:
      return "https://twitter.com/hammylotto/status/1587252388502511616/photo/1";
    case 1:
      return "https://twitter.com/hammylotto/status/1587252413680869376/photo/1";
    default:
      return "";
  }
}

function getTwitterText(didUserWinBet: boolean) {
  return didUserWinBet
    ? "Just doubled my SOL on @hammyflip 🐹"
    : "Just lost my SOL on @hammyflip 😭🐹";
}

export default function PlayFlipGameResults() {
  const { amountInSol, didUserWinBet, reset } = usePlayFlipGameContext();

  return (
    <PlayFlipGameGeneric rowGap={36}>
      <Image
        height={377}
        priority
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
        textTransform="uppercase"
        width="100%"
      >
        Again!!!
      </ButtonWithText>
      <TextButton
        buttonTheme={TextButtonTheme.Navy}
        fontClass={FontClass.Header2}
        href={`https://twitter.com/intent/tweet?text=${getTwitterText(
          didUserWinBet!
        )} ${getTwitterImage(amountInSol!, didUserWinBet!)}`}
        icon={<TwitterIcon colorValue={ColorValue.Navy} />}
        target="_blank"
        textTransform="uppercase"
        type="link_external"
      >
        Share on Twitter
      </TextButton>
    </PlayFlipGameGeneric>
  );
}
