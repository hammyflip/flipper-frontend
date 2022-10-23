import { Environment } from "@hammyflip/flipper-sdk";
import assertUnreachable from "src/utils/assertUnreachable";
import getEnvironment from "src/utils/env/getEnvironment";

export default function getRpcUrl(): string {
  const env = getEnvironment();
  switch (env) {
    case Environment.Development:
    case Environment.Local:
      // TODO: replace
      return "https://winter-multi-sun.solana-devnet.quiknode.pro/2ef5345a13a31471acbe5b9a39105dd3a66688d5/";
    case Environment.Production:
      return "https://solana-mainnet.g.alchemy.com/v2/aUXAUP4gLtiYHVBYp4uGFi2QO8lIomFG";
    default:
      return assertUnreachable(env);
  }
}
