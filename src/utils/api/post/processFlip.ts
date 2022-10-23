import axios from "axios";
import getApiUrl from "src/utils/api/getApiUrl";

export default async function processFlip(txid: string): Promise<{
  didUserWinBet: boolean;
}> {
  const apiUrl = `${getApiUrl()}/processFlip`;
  const results = await axios.post(apiUrl, { txid });
  console.log("results", results);
  return results.data;
}
