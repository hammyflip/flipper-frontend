import Body1 from "src/components/text/Body1";
import Header2 from "src/components/text/Header2";
import ColorClass from "src/types/enums/ColorClass";
import styles from "@/css/pages/info/InfoPage.module.css";
import PageBody from "src/components/containers/PageBody";
import ResponsiveContainer from "src/components/ResponsiveContainer";

const ITEMS = [
  {
    description:
      "Hammyflip is a simple coin flip game that runs on Solana. If you win, you receive double the SOL you initally bet! We are working on more games that are coming soon!",
    title: "What is Hammyflip?",
  },
  {
    description: "You have a 50/50 chance of winning the coin flip.",
    title: "What are the odds of winning?",
  },
  {
    description:
      "Hammyflip takes a 3% fee on your coin flip bet (for example, betting 1 SOL costs 1.03 SOL).",
    title: "What fees do you charge?",
  },
  {
    description:
      "All transactions happen on-chain, and we are working on a Dune dashboard that shows historical win percentages based on the on-chain data.",
    title: "How do I know if Hammyflip is trustworthy?",
  },
  {
    description:
      "We plan to support other SPL tokens in the future! Along with other fun games besides just Hammyflip :)",
    title: "Will other tokens be supported?",
  },
];

function InfoItem({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <div className={styles.infoItem}>
      <Header2 colorClass={ColorClass.Navy} textAlign="center">
        {title}
      </Header2>
      <Body1 colorClass={ColorClass.Navy} textAlign="center">
        {description}
      </Body1>
    </div>
  );
}

export default function InfoPage() {
  return (
    <PageBody>
      <ResponsiveContainer>
        <div className={styles.container}>
          {ITEMS.map((item) => (
            <InfoItem
              key={item.title}
              description={item.description}
              title={item.title}
            />
          ))}
        </div>
      </ResponsiveContainer>
    </PageBody>
  );
}
