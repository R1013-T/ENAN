import { Panel } from "@/components/panel/boxShadowPanel";
import { Person } from "@/types/tableType";
import { useRouter } from "next/router";
import { VscArrowRight } from "react-icons/vsc";
import { useSounds } from "@/hooks/useSounds";

interface Props {
  person: Person;
}

const PersonItem = (props: Props) => {
  const router = useRouter();
  const { person_detail } = useSounds();

  const handlePersonDetail = () => {
    person_detail();
    router.push({
      pathname: "/people/" + props.person.id,
      query: {
        id: router.query.id,
        story: props.person.conversation_story_id,
        title: props.person.name,
      },
    });
  };

  return (
    <Panel>
      <div
        className="w-full h-27 overflow-hidden flex"
        onClick={handlePersonDetail}
      >
        <img
          src={`/images/characters/${props.person.id}.png`}
          className="w-24 mt-2"
          alt=""
        />
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
