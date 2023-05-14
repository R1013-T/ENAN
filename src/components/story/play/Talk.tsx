import { useEffect, useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";

interface Props {
  person_id: number;
  talkText: string;
}

const Talk = (props: Props) => {
  // const [text, setText] = useState("");
  // const [finishShowText, setFinishShowText] = useState(false);
  const [personName, setPersonName] = useState("");

  useEffect(() => {
    // !
    setPersonName("エナン");
  }, []);

  // useEffect(() => {
  //   showText();
  // }, []);

  // const showText = () => {
  //   setFinishShowText(false);
  //   let typeSpeed = 50;
  //   let i = 0;

  //   let typeInterval = setInterval(() => {
  //     if (i < props.talkText.length) {
  //       setText(props.talkText.slice(0, i + 1));
  //       i++;
  //     } else {
  //       setTimeout(() => {
  //         setFinishShowText(true);
  //       }, 500);
  //       clearInterval(typeInterval);
  //     }
  //   }, typeSpeed);
  // };

  const handleNext = () => {
    console.log("next");
  };

  return (
    <div
      onClick={handleNext}
      className="gradientBack absolute bottom-0 left-0 right-0 h-48"
    >
      <div className="mt-3 p-3 tracking-wider">
        <div className="show opacity-0" >
          <p className="text-sm mt-3 mb-1 tracking-widest">{personName}</p>
          <p className={`usen text-base text-center`}>
            {props.talkText}
          </p>
          <div className="down w-full grid place-items-center mt-2">
            <VscTriangleDown size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Talk;
