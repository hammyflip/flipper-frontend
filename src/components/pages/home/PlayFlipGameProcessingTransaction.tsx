import PlayFlipGameGeneric from "src/components/pages/home/PlayFlipGameGeneric";
import Header1 from "src/components/text/Header1";
import ColorClass from "src/types/enums/ColorClass";
import Image from "next/image";

export default function PlayFlipGameProcessingTransaction() {
  return (
    <PlayFlipGameGeneric rowGap={36}>
      <Image
        height={377}
        priority
        src="/images/processing-transaction.gif"
        width={377}
      />
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
