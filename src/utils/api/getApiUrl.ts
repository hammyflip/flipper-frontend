import { Environment } from "@hammyflip/flipper-sdk";
import assertUnreachable from "src/utils/assertUnreachable";
import getEnvironment from "src/utils/env/getEnvironment";

export default function getApiUrl(): string {
  const env = getEnvironment();
  switch (env) {
    case Environment.Local:
      return "http://localhost:4000";
    case Environment.Development:
      return "TODO";
    case Environment.Production:
      return "TODO";
    default:
      return assertUnreachable(env);
  }
}
