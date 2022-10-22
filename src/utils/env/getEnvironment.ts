import { Environment } from "@hammyflip/flipper-sdk";
import isDevSubdomain from "src/utils/env/isDevSubdomain";
import isLocalhost from "src/utils/env/isLocalhost";

export default function getEnvironment() {
  if (isLocalhost()) {
    return Environment.Local;
  }

  if (isDevSubdomain()) {
    return Environment.Development;
  }

  return Environment.Production;
}
