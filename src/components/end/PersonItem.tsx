import { Person } from "@/types/tableType";
import { Panel } from "../panel/boxShadowPanel";
import { VscArrowRight } from "react-icons/vsc";
import { useSounds } from "@/hooks/useSounds";

interface Props {
  person: Person;
  changeDecisionPerson: Function;
}

const PersonItem = (props: Props) => {
  const { playClick } = useSounds();

  const changeDecisionPerson = () => {
    playClick();
    props.changeDecisionPerson(props.person);
  };

  return (
    <Panel key={props.person.id}>
      <div
        className="h-27 flex w-full overflow-hidden"
        onClick={() => changeDecisionPerson()}
      >
        <img
          src={`/images/characters/${props.person.id}.png`}
          className="mt-2 w-24"
          alt=""
        />
        <div className="grid place-items-center">
          <p className="mb-2 w-full text-xl tracking-widest">
            <span className="mb-1 block text-xs tracking-wide text-theme-black">
              {props.person.post}
            </span>
            {props.person.name}
          </p>
        </div>
        <div className="ml-auto mr-3 grid place-items-center">
          <VscArrowRight size={30} />
        </div>
      </div>
    </Panel>
  );
};

export default PersonItem;
