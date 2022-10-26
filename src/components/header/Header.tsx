import ResponsiveContainer from "src/components/ResponsiveContainer";
import styles from "@/css/header/Header.module.css";
import Header0 from "src/components/text/Header0";
import ColorClass from "src/types/enums/ColorClass";
import TextButton from "src/components/buttons/TextButton";
import FontClass from "src/types/enums/FontClass";
import ConnectWalletButton from "src/components/buttons/ConnectWalletButton";
import ButtonTheme from "src/types/enums/ButtonTheme";
import DelayRender from "src/components/containers/DelayRender";
import Body1 from "src/components/text/Body1";
import Link from "next/link";
import { useRouter } from "next/router";

function LeftButtons() {
  const { asPath } = useRouter();

  return (
    <div className={styles.left}>
      <TextButton
        fontClass={FontClass.Header2}
        href="/info"
        textDecoration={asPath === "/info" ? "underline" : undefined}
        textTransform="uppercase"
        type="link_internal"
      >
        Info
      </TextButton>
      <TextButton
        fontClass={FontClass.Header2}
        href="/stats"
        textDecoration={asPath === "/stats" ? "underline" : undefined}
        textTransform="uppercase"
        type="link_internal"
      >
        Stats
      </TextButton>
    </div>
  );
}

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
      <div className={styles.row1}>
        <LeftButtons />
        <div className={styles.center}>
          <Link href="/">
            {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <Logo />
            </a>
          </Link>
        </div>
        <div className={styles.right}>
          <DelayRender>
            <ConnectWalletButton
              buttonTheme={ButtonTheme.Beige}
              fontClass={FontClass.Header2}
            />
          </DelayRender>
        </div>
      </div>
      <div className={styles.row2}>
        <Body1 colorClass={ColorClass.Navy} textAlign="center">
          Flip a coin to double your SOL
        </Body1>
      </div>
    </ResponsiveContainer>
  );
}
