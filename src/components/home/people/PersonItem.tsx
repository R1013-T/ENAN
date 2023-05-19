import { Panel } from "@/components/panel/boxShadowPanel";
import { Person } from "@/types/tableType";
import { VscArrowRight } from "react-icons/vsc";

interface Props {
  person: Person;
}

const PersonItem = (props: Props) => {

  const handlePersonDetail = () => {
    console.log("personDetail", props.person)
  }

  return (
    <Panel>
      <div className="w-full h-27 overflow-hidden flex" onClick={handlePersonDetail}>
        <img src={`/images/characters/${props.person.id}.png`} className="w-24 mt-2" alt="" />
        <div className="grid place-items-center">
          <p className="text-xl w-full tracking-widest mb-2">
            <span className="text-xs mb-1 text-theme-black tracking-wide block">
              {props.person.post}
            </span>
            {props.person.name}
          </p>
        </div>
        <div className="grid place-items-center ml-auto mr-3">
          <VscArrowRight size={30} />
        </div>
      </div>
    </Panel>
  );
};

export default PersonItem;
