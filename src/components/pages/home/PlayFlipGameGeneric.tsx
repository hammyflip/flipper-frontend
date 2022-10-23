import styles from "@/css/pages/home/PlayFlipGameGeneric.module.css";
import ResponsiveContainer from "src/components/ResponsiveContainer";

type Props = {
  children: any;
  rowGap: number;
};

export default function PlayFlipGameGeneric({ children, rowGap }: Props) {
  return (
    <ResponsiveContainer>
      <div className={styles.container} style={{ rowGap }}>
        {children}
      </div>
    </ResponsiveContainer>
  );
}
