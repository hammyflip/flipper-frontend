import type { NextPage } from "next";
import Header from "src/components/header/Header";
import ConnectWalletOrPlay from "src/components/pages/home/ConnectWalletOrPlay";
import RecentPlays from "src/components/recent-plays/RecentPlays";
import styles from "@/css/pages/home/HomePage.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <div className={styles.body}>
        <ConnectWalletOrPlay />
        <RecentPlays />
      </div>
    </>
  );
};

export default Home;
