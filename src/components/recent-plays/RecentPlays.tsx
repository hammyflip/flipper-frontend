import styles from "@/css/recent-plays/RecentPlays.module.css";
import RecentPlaysRow from "src/components/recent-plays/RecentPlaysRow";
import ResponsiveContainer from "src/components/ResponsiveContainer";
import Header1 from "src/components/text/Header1";
import ColorClass from "src/types/enums/ColorClass";
import dayjs from "src/utils/dates/dayjsex";
import shortenAddress from "src/utils/solana/shortenAddress";

export default function RecentPlays() {
  return (
    <ResponsiveContainer>
      <div className={styles.container}>
        <Header1
          colorClass={ColorClass.Navy}
          textAlign="center"
          textTransform="uppercase"
        >
          Recent plays
        </Header1>
        <div className={styles.rows}>
          <RecentPlaysRow
            amountInSol={0.05}
            bettor={shortenAddress(
              "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E"
            )}
            didWin
            time={dayjs().subtract(dayjs.duration({ minutes: 0.54 }))}
          />
        </div>
      </div>
    </ResponsiveContainer>
  );
}
