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
      className="boxShadow w-5/12 mb-3 rounded-md"
      onClick={handleClueDetail}
    >
      <div className="w-full relative">
        <img src={`images/clues/${props.clue.id}.png`} className="p-4" alt="手がかり" />
        <div className="absolute bottom-0 right-0 left-0 panelGradientBack h-12 rounded-md grid place-items-center">
          <p className="tracking-widest text-center text-sm">
            {props.clue.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClueItem;
