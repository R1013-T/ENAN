import Title from "@/components/panel/Title";
import { Frame } from "@/components/panel/downShadowFrame";
import { Clue } from "@/types/tableType";
import ClueItem from "./ClueItem";

interface Props {
  gotClues: Clue[];
}

const Clues = (props: Props) => {
  return (
    <div className="-mt-5 pb-28">
      <Title title="手がかり" />
      <Frame>
        <div className="flex flex-wrap justify-around pt-5">
          {props.gotClues.map((clue: Clue) => (
            <ClueItem key={clue.id} clue={clue} />
          ))}
          <div className="w-5/12"></div>
        </div>
      </Frame>
    </div>
  );
};

export default Clues;
