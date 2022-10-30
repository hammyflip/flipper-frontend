import Header0 from "src/components/text/Header0";
import ColorClass from "src/types/enums/ColorClass";

export default function HeaderLogo() {
  return (
    <Header0 textTransform="uppercase">
      <span className={ColorClass.Rust}>H</span>
      <span className={ColorClass.Yellow}>a</span>
      <span className={ColorClass.Navy}>m</span>
      <span className={ColorClass.Rust}>m</span>
      <span className={ColorClass.Pink}>y</span>
      <span className={ColorClass.Yellow}>f</span>
      <span className={ColorClass.WinterGreen}>l</span>
      <span className={ColorClass.Rust}>i</span>
      <span className={ColorClass.Navy}>p</span>
    </Header0>
  );
}
