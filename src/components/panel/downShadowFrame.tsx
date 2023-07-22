import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Frame: FC<Props> = (props) => {
  return (
    <div className="downShadow mx-6 mt-4 rounded-md bg-bg-black px-5 py-1.5">
      {props.children}
    </div>
  );
};
