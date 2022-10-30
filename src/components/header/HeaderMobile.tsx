import ResponsiveContainer from "src/components/ResponsiveContainer";
import styles from "@/css/header/HeaderMobile.module.css";
import ColorClass from "src/types/enums/ColorClass";
import Body1 from "src/components/text/Body1";
import Link from "next/link";
import HeaderLogo from "src/components/header/HeaderLogo";
import MenuIcon from "src/components/icons/MenuIcon";
import ColorValue from "src/types/enums/ColorValue";
import { Popover } from "antd";
import PlainButton from "src/components/buttons/PlainButton";
import GlobalClass from "src/types/enums/GlobalClass";
import TextButton from "src/components/buttons/TextButton";
import FontClass from "src/types/enums/FontClass";
import { useRouter } from "next/router";
import ConnectWalletButton from "src/components/buttons/ConnectWalletButton";
import ButtonTheme from "src/types/enums/ButtonTheme";
import { useWallet } from "@solana/wallet-adapter-react";

function PopoverContent() {
  const { asPath } = useRouter();
  const { disconnect, publicKey } = useWallet();

  return (
    <div className={styles.popoverContent}>
      {publicKey == null ? (
        <ConnectWalletButton
          buttonTheme={ButtonTheme.Beige}
          fontClass={FontClass.Header2}
        />
      ) : (
        <TextButton
          fontClass={FontClass.Header2}
          onClick={disconnect}
          textTransform="uppercase"
        >
          Disconnect wallet
        </TextButton>
      )}
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

export default function HeaderMobile() {
  return (
    <ResponsiveContainer className={styles.container}>
      <div className={styles.row1}>
        <div className={styles.left}>
          <Popover
            placement="bottomLeft"
            content={<PopoverContent />}
            trigger="click"
          >
            <PlainButton className={GlobalClass.HideText}>
              <MenuIcon colorValue={ColorValue.Navy} />
            </PlainButton>
          </Popover>
        </div>
        <div className={styles.center}>
          <Link href="/">
            {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <HeaderLogo />
            </a>
          </Link>
        </div>
        <div className={styles.right}>
          <MenuIcon colorValue={ColorValue.Navy} />
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
