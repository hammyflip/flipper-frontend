import styles from "@/css/recent-plays/RecentPlays.module.css";
import ResponsiveContainer from "src/components/ResponsiveContainer";
import Header1 from "src/components/text/Header1";
import ColorClass from "src/types/enums/ColorClass";

export default function RecentPlays() {
  return (
    <ResponsiveContainer>
      <div className={styles.container}>
        <Header1
          colorClass={ColorClass.Navy}
          textAlign="center"
          textTransform="uppercase"
        >
          Recent plays
        </Header1>
      </div>
    </ResponsiveContainer>
  );
}
