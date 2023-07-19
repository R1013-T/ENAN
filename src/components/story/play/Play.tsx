import { useState } from "react";
import Back from "./Back";
import Talk from "./Talk";
import { useSounds } from "@/hooks/useSounds";

interface Props {
  person_id: number;
  personName: string;
  talkText: string;
  showTalk: boolean;
  nextStory: Function;
}

const Play = (props: Props) => {
  const [next, setNext] = useState(false);

  const { playClick } = useSounds();

  const nextStory = () => {
    // フェードアウトしてから次のストーリーをセットする。
    setNext(true);
    playClick();

    setTimeout(() => {
      props.nextStory();
      setNext(false);
    }, 300);
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Back person_id={props.person_id} showTalk={props.showTalk} next={next} />
      <div onClick={nextStory}>
        <Talk
          personName={props.personName}
          talkText={props.talkText}
          showTalk={props.showTalk}
          next={next}
        />
      </div>
    </div>
  );
};

export default Play;
