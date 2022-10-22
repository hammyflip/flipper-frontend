import FlipperSdk from "@hammyflip/flipper-sdk";
import { Connection } from "@solana/web3.js";
import { Context, createContext, useMemo } from "react";
import { WalletProvider as WalletProviderImport } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import getRpcUrl from "src/utils/solana/getRpcUrl";
import { Maybe } from "src/types/UtilityTypes";

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
        <SolanaContext.Provider value={{ connection, flipperSdk: null }}>
          {children}
        </SolanaContext.Provider>
      </WalletModalProvider>
    </WalletProviderImport>
  );
}
