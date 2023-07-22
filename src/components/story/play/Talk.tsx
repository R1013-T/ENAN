import { VscTriangleDown } from "react-icons/vsc";

interface Props {
  personName: string;
  talkText: string;
  showTalk: boolean;
  next: boolean;
}

const Talk = (props: Props) => {
  return (
    <div className="gradientBack absolute bottom-0 left-0 right-0 h-48">
      {props.showTalk ? (
        <div
          className={`fadeIn mt-3 p-3 tracking-wider opacity-0 ${
            props.next ? "fadeOut" : ""
          }`}
        >
          <p className="mb-1 mt-3 text-sm tracking-widest">
            {props.personName}
          </p>
          <p className={`usen text-center text-base`}>{props.talkText}</p>
          <div className="down mt-2 grid w-full place-items-center">
            <VscTriangleDown size={20} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Talk;
