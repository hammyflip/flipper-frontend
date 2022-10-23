import { useQuery } from "@tanstack/react-query";
import getApiUrl from "src/utils/api/getApiUrl";

export default function useRecentPlaysQuery() {
  return useQuery<{
    recentPlays: Array<{
      betAmount: number;
      flipsPrediction: number;
      flipsResult: number;
      timeCreated: string;
      user: {
        id: string;
      };
    }>;
  }>(
    ["key"],
    () =>
      fetch(`${getApiUrl()}/getRecentPlays?skip=0&take=10`).then((res) =>
        res.json()
      ),
    { refetchInterval: 5000 }
  );
}
