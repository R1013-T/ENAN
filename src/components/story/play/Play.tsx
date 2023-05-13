import Back from "./Back";
import Talk from "./Talk";
import { useEffect } from "react";

interface Props {
  person_id: number;
  talkText: string;
}

const Play = (props: Props) => {
  return (
    <div className="relative h-full w-full">
      <Back person_id={props.person_id} />
      <Talk
        person_id={props.person_id}
        talkText="あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえお"
      />
    </div>
  );
};

export default Play;
