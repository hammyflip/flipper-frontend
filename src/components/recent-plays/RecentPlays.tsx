import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import styles from "@/css/recent-plays/RecentPlays.module.css";
import RecentPlaysRow from "src/components/recent-plays/RecentPlaysRow";
import ResponsiveContainer from "src/components/ResponsiveContainer";
import Header1 from "src/components/text/Header1";
import ColorClass from "src/types/enums/ColorClass";
import dayjs from "src/utils/dates/dayjsex";
import shortenAddress from "src/utils/solana/shortenAddress";
import { Suspense } from "react";
import LoadingSpinner from "src/components/loading/LoadingSpinner";
import ColorValue from "src/types/enums/ColorValue";
import useRecentPlaysQuery from "src/hooks/queries/useRecentPlaysQuery";

function Rows() {
  // TODO: refetch when new play occurs
  const { data, isLoading } = useRecentPlaysQuery();

  if (isLoading) {
    return (
      <LoadingSpinner
        className={styles.loadingSpinner}
        colorValue={ColorValue.Navy}
      />
    );
  }

  return (
    <>
      {(data ?? { recentPlays: [] }).recentPlays.map((datum) => (
        <RecentPlaysRow
          amountInSol={datum.betAmount / LAMPORTS_PER_SOL}
          bettor={shortenAddress(datum.user.id)}
          didWin={datum.flipsPrediction === datum.flipsResult}
          time={dayjs(datum.timeCreated)}
        />
      ))}
    </>
  );
}

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
          <Suspense fallback={null}>
            <Rows />
          </Suspense>
        </div>
      </div>
    </ResponsiveContainer>
  );
}
