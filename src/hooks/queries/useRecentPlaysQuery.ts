import { useQuery } from "@tanstack/react-query";
import getApiUrl from "src/utils/api/getApiUrl";
import dayjs from "src/utils/dates/dayjsex";

export default function useRecentPlaysQuery() {
  return useQuery<{
    recentPlays: Array<{
      betAmount: number;
      flipsPrediction: number;
      flipsResult: number;
      id: string;
      timeCreated: string;
      txid1: string;
      txid2: string;
      user: {
        id: string;
      };
    }>;
  }>(
    ["recentPlays"],
    () =>
      fetch(`${getApiUrl()}/getRecentPlays?skip=0&take=10`).then((res) =>
        res.json()
      ),
    { refetchInterval: dayjs.duration({ seconds: 5 }).asMilliseconds() }
  );
}
