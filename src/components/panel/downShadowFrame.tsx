import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Frame: FC<Props> = (props) => {
  return (
    <div className="downShadow mt-4 mx-6 px-5 py-1.5 rounded-md bg-bg-black">
      {props.children}
    </div>
  );
};
