import styles from "@/css/pages/home/PlayFlipGameGeneric.module.css";
import ResponsiveContainer from "src/components/ResponsiveContainer";

type Props = {
  children: any;
};

export default function PlayFlipGameGeneric({ children }: Props) {
  return (
    <ResponsiveContainer>
      <div className={styles.container}>{children}</div>
    </ResponsiveContainer>
  );
}
