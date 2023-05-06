import Initial from "../../components/main/initial/View";
import Reasoning from "../../components/main/reasoning/View";

import Link from "next/link";


const index = () => {

  return (
    <>
      <div className="fixed bottom-10 right-10 ">
        <Link href="./scan">scan</Link>
      </div>
    </>
  );
};

export default index;
