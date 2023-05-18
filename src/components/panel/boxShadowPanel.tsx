import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Panel: FC<Props> = (props) => {
  return (
    <div className="boxShadow w-full my-3 rounded-md">
      {props.children}
    </div>
  )
}
