import { Environment } from "@hammyflip/flipper-sdk";
import assertUnreachable from "src/utils/assertUnreachable";
import getEnvironment from "src/utils/env/getEnvironment";

export default function getRpcUrl(): string {
  const env = getEnvironment();
  switch (env) {
    case Environment.Development:
    case Environment.Local:
      return "https://solana-devnet.g.alchemy.com/v2/0PtPFnNoKnEHIiSRcpCQcghlcPQjLEXf";
    case Environment.Production:
      return "https://solana-mainnet.g.alchemy.com/v2/aUXAUP4gLtiYHVBYp4uGFi2QO8lIomFG";
    default:
      return assertUnreachable(env);
  }
}
