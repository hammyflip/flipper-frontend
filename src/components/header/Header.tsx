import HeaderDesktop from "src/components/header/HeaderDesktop";
import HeaderMobile from "src/components/header/HeaderMobile";
import useBreakpoint from "src/hooks/useBreakpoint";
import useIsSsr from "src/hooks/useIsSsr";

function Inner() {
  const { isMobileBreakpoint } = useBreakpoint();

  return isMobileBreakpoint ? <HeaderMobile /> : <HeaderDesktop />;
}

export default function Header() {
  const isSsr = useIsSsr();

  return isSsr ? null : <Inner />;
}
