import PlayFlipGameGeneric from "src/components/pages/home/PlayFlipGameGeneric";
import Header1 from "src/components/text/Header1";
import ColorClass from "src/types/enums/ColorClass";

export default function PlayFlipGameProcessingTransaction() {
  return (
    <PlayFlipGameGeneric rowGap={36}>
      <Header1
        colorClass={ColorClass.Navy}
        textAlign="center"
        textTransform="uppercase"
      >
        Hammyflip commencing...
      </Header1>
    </PlayFlipGameGeneric>
  );
}
