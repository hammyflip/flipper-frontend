import type { NextPage } from "next";
import Header from "src/components/header/Header";
import ConnectWalletOrPlay from "src/components/pages/home/ConnectWalletOrPlay";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <ConnectWalletOrPlay />
    </>
  );
};

export default Home;
