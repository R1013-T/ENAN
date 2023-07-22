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
        className="h-27 flex w-full overflow-hidden"
        onClick={handlePersonDetail}
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
