import { useWallet } from "@solana/wallet-adapter-react";
import ConnectWalletButton from "src/components/buttons/ConnectWalletButton";
import ResponsiveContainer from "src/components/ResponsiveContainer";
import ButtonTheme from "src/types/enums/ButtonTheme";
import FontClass from "src/types/enums/FontClass";
import styles from "@/css/pages/home/ConnectWalletOrPlay.module.css";

export default function ConnectWalletOrPlay() {
  const { publicKey } = useWallet();

  if (publicKey == null) {
    return (
      <ResponsiveContainer className={styles.container}>
        <ConnectWalletButton
          buttonTheme={ButtonTheme.WinterGreen}
          fontClass={FontClass.Header1}
        />
      </ResponsiveContainer>
    );
  }

  return <div>wat</div>;
}
