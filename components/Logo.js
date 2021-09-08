import React from "react";
import { ROUTER } from "../untils/router";
import Image from "next/image";
import LinkCustom from "./LinkCustom";

function Logo() {
  return (
    <LinkCustom
      href={ROUTER.home}
      content={<Image src="/logonotext.png" alt="null" width={80} height={80} />}
    />
  );
}
export default Logo;
