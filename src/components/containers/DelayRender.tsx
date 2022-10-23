import styles from "@/css/containers/PageBody.module.css";
import { useEffect, useState } from "react";

type Props = {
  children: any;
};

// Delay render so that we know whether the wallet is
// connected or not
export default function DelayRender({ children }: Props) {
  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsShown(true), 100);
  }, []);

  if (!isShown) {
    return null;
  }
  return children;
}
