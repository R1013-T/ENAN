import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Panel: FC<Props> = (props) => {
  return (
    <div className="boxShadow my-3 w-full rounded-md">{props.children}</div>
  );
};
