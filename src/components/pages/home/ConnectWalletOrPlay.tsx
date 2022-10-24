import { useWallet } from "@solana/wallet-adapter-react";
import ConnectWalletButton from "src/components/buttons/ConnectWalletButton";
import ResponsiveContainer from "src/components/ResponsiveContainer";
import ButtonTheme from "src/types/enums/ButtonTheme";
import FontClass from "src/types/enums/FontClass";
import styles from "@/css/pages/home/ConnectWalletOrPlay.module.css";
import PlayFlipGame from "src/components/pages/home/PlayFlipGame";
import Image from "next/image";

export default function ConnectWalletOrPlay() {
  const { publicKey } = useWallet();

  if (publicKey == null) {
    return (
      <ResponsiveContainer>
        <div className={styles.container}>
          <Image height={240} priority src="/images/coins.gif" width={547.2} />
          <ConnectWalletButton
            buttonTheme={ButtonTheme.WinterGreen}
            fontClass={FontClass.Header1}
          />
        </div>
      </ResponsiveContainer>
    );
  }

  return <PlayFlipGame />;
}
