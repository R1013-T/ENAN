import React from "react";

type Props = {
  currentModel: string;
};
const GetButton = (props: Props) => {
  return (
    <div>
      <button className="boxShadow mb-3 flex w-full items-center justify-center rounded bg-theme-red py-2.5 text-lg tracking-widest">
        調べる
      </button>
    </div>
  );
};

export default GetButton;
