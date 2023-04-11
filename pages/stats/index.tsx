import type { NextPage } from "next";
import Header from "src/components/header/Header";
import StatsPage from "src/components/pages/stats/StatsPage";

// eslint-disable-next-line react/function-component-definition
const Stats: NextPage = () => (
  <>
    <Header />
    <StatsPage />
  </>
);

export default Stats;
