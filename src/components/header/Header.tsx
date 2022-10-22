import ResponsiveContainer from "src/components/ResponsiveContainer";
import styles from "@/css/header/Header.module.css";
import Header0 from "src/components/text/Header0";
import ColorClass from "src/types/enums/ColorClass";
import TextButton from "src/components/buttons/TextButton";
import FontClass from "src/types/enums/FontClass";
import ConnectWalletButton from "src/components/buttons/ConnectWalletButton";

function Logo() {
  return (
    <Header0 textTransform="uppercase">
      <span className={ColorClass.Rust}>H</span>
      <span className={ColorClass.Yellow}>a</span>
      <span className={ColorClass.Navy}>m</span>
      <span className={ColorClass.Rust}>m</span>
      <span className={ColorClass.Pink}>y</span>
      <span className={ColorClass.Yellow}>f</span>
      <span className={ColorClass.WinterGreen}>l</span>
      <span className={ColorClass.Rust}>i</span>
      <span className={ColorClass.Navy}>p</span>
    </Header0>
  );
}

export default function Header() {
  return (
    <ResponsiveContainer className={styles.container}>
      <div className={styles.left}>
        <TextButton fontClass={FontClass.Header2} textTransform="uppercase">
          How it works
        </TextButton>
      </div>
      <Logo />
      <div className={styles.right}>
        <ConnectWalletButton />
      </div>
    </ResponsiveContainer>
  );
}
