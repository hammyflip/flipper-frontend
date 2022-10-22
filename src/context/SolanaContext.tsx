import FlipperSdk, { AUTHORITIES } from "@hammyflip/flipper-sdk";
import { Connection } from "@solana/web3.js";
import { Context, createContext, useMemo } from "react";
import {
  useWallet,
  WalletProvider as WalletProviderImport,
} from "@solana/wallet-adapter-react";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import getRpcUrl from "src/utils/solana/getRpcUrl";
import { Maybe } from "src/types/UtilityTypes";
import getEnvironment from "src/utils/env/getEnvironment";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const connection = new Connection(getRpcUrl(), {
  commitment: "confirmed",
});

export type SolanaContextData = {
  connection: Connection;
  flipperSdk: Maybe<FlipperSdk>;
};

export const SolanaContext: Context<SolanaContextData> =
  createContext<SolanaContextData>({
    connection,
    flipperSdk: null,
  });

type Props = {
  children: any;
};

function Inner({ children }: Props) {
  const wallet = useWallet();

  return (
    <SolanaContext.Provider
      value={{
        connection,
        flipperSdk:
          wallet == null
            ? null
            : new FlipperSdk({
                authority: AUTHORITIES[getEnvironment()],
                connection,
                wallet: {
                  publicKey: wallet.publicKey!,
                  signAllTransactions: wallet.signAllTransactions!,
                  signTransaction: wallet.signTransaction!,
                },
              }),
      }}
    >
      {children}
    </SolanaContext.Provider>
  );
}

export default function SolanaContextProvider({ children }: Props) {
  const wallets = useMemo(
    () => [
      new GlowWalletAdapter(),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <WalletProviderImport wallets={wallets} autoConnect>
      <WalletModalProvider>
        <Inner>{children}</Inner>
      </WalletModalProvider>
    </WalletProviderImport>
  );
}
