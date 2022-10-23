import SolanaNetwork from "src/types/enums/SolanaNetwork";

export default function getSolanaNetwork(): SolanaNetwork {
  return process.env.REACT_APP_SOLANA_NETWORK as SolanaNetwork;
}
