import { Clue } from "@/types/tableType";
import { useRouter } from "next/router";
import { useSounds } from "@/hooks/useSounds";

interface Props {
  clue: Clue;
}

const ClueItem = (props: Props) => {
  const router = useRouter();
  const { clue_detail } = useSounds();

  const handleClueDetail = () => {
    clue_detail();
    router.push({
      pathname: "/clue/" + props.clue.id,
      query: {
        id: router.query.id,
        story: props.clue.story_id,
        title: props.clue.name,
      },
    });
  };

  return (
    <div
      className="boxShadow mb-3 w-5/12 rounded-md"
      onClick={handleClueDetail}
    >
      <div className="relative w-full">
        <img
          src={`images/clues/${props.clue.id}.png`}
          className="p-4"
          alt="手がかり"
        />
        <div className="panelGradientBack absolute bottom-0 left-0 right-0 grid h-12 place-items-center rounded-md">
          <p className="text-center text-sm tracking-widest">
            {props.clue.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClueItem;
