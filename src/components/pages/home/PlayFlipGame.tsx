import ResponsiveContainer from "src/components/ResponsiveContainer";
import styles from "@/css/pages/home/PlayFlipGame.module.css";
import Header1 from "src/components/text/Header1";
import ColorClass from "src/types/enums/ColorClass";

export default function PlayFlipGame() {
  return (
    <ResponsiveContainer>
      <div className={styles.container}>
        <Header1 colorClass={ColorClass.Navy} textTransform="uppercase">
          Double or nothing your SOL
        </Header1>
      </div>
    </ResponsiveContainer>
  );
}
