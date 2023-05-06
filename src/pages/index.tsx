import Initial from "../../components/main/initial/View";
import Reasoning from "../../components/main/reasoning/View";

import { useState } from "react";
import Link from "next/link";


const index = () => {
  const [mainState, setMainState] = useState("initial");

  return (
    <>
      <div className="w-screen h-screen overflow-y-auto overflow-x-hidden bg-black">
        {/* mainStateの状態によって表示するコンポーネントを変更 */}
        {mainState === "initial" ? <Initial /> : ""}
        {mainState === "reasoning" ? <Reasoning /> : ""}

      </div>
      <div className="fixed bottom-10 right-10 ">
        <Link href="./scan">scan</Link>
      </div>
    </>
  );
};

export default index;
