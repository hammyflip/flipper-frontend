import styles from "@/css/recent-plays/RecentPlaysRow.module.css";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import ExternalLink from "src/components/links/ExternalLink";
import Body1 from "src/components/text/Body1";
import ColorClass from "src/types/enums/ColorClass";
import formatDecimals from "src/utils/number/formatDecimals";
import getSolanaExplorerTxLink from "src/utils/solana/getSolanaExplorerTxLink";
import pluralize from "src/utils/string/pluralize";

function getTimeDifference(time: Dayjs) {
  const units = ["day", "hour", "minute", "second"] as const;

  for (let i = 0; i < units.length; i++) {
    const diffInUnits = dayjs().diff(time, units[i]);
    if (diffInUnits >= 1 || i === units.length - 1) {
      return `${diffInUnits} ${pluralize(units[i], diffInUnits)} ago`;
    }
  }

  return "";
}

function Coin() {
  return <Image src="/images/heads.png" height={36} width={36} />;
}

type Props = {
  amountInSol: number;
  bettor: string;
  didWin: boolean;
  time: Dayjs;
  txid: string;
};

export default function RecentPlaysRow({
  amountInSol,
  bettor,
  didWin,
  time,
  txid,
}: Props) {
  const txLink = (
    <ExternalLink href={getSolanaExplorerTxLink(txid)}>
      {didWin ? (
        <span className={ColorClass.Yellow}>doubled</span>
      ) : (
        <span className={ColorClass.Navy}>lost</span>
      )}
    </ExternalLink>
  );

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Coin />
        <Body1 colorClass={ColorClass.Navy}>
          Wallet {bettor} flipped {formatDecimals(amountInSol, 0)} SOL and{" "}
          {txLink}
        </Body1>
      </div>
      <Body1 className={styles.time} colorClass={ColorClass.Navy}>
        {getTimeDifference(time)}
      </Body1>
    </div>
  );
}
