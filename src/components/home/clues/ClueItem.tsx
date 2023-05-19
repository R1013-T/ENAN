import { Clue } from "@/types/tableType";

interface Props {
  clue: Clue;
}

const ClueItem = (props: Props) => {

  const handleClueDetail = () => {
    console.log("clueDetail", props.clue)
  }

  return (
    <div className="boxShadow w-5/12 mb-3 rounded-md" onClick={handleClueDetail} >
      <div className="w-full relative">
        <img src={`images/clues/${props.clue.id}.png`} className="p-4" alt="" />
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
