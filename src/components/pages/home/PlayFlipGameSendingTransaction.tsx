import PlayFlipGameGeneric from "src/components/pages/home/PlayFlipGameGeneric";
import Header1 from "src/components/text/Header1";
import ColorClass from "src/types/enums/ColorClass";

export default function PlayFlipGameSendingTransaction() {
  return (
    <PlayFlipGameGeneric>
      <Header1
        colorClass={ColorClass.Navy}
        textAlign="center"
        textTransform="uppercase"
      >
        Sending deposit to Hammy...
      </Header1>
    </PlayFlipGameGeneric>
  );
}
