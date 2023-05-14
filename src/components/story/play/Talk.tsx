import { useEffect, useState } from "react";
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
          className={`mt-3 p-3 tracking-wider fadeIn opacity-0 ${
            props.next ? "fadeOut" : ""
          }`}
        >
          <p className="text-sm mt-3 mb-1 tracking-widest">
            {props.personName}
          </p>
          <p className={`usen text-base text-center`}>{props.talkText}</p>
          <div className="down w-full grid place-items-center mt-2">
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
