import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  name: string;
}

const Item = (props: Props) => {
  const router = useRouter();

  const handleChangePage = () => {
    router.push({ pathname: "/" + props.name, query: { id: router.query.id } });
  };

  return (
    <div className="w-7 h-7 grid place-items-center" onClick={handleChangePage}>
      <img
        src={`images/underButton/${props.name}${
          router.pathname === "/" + props.name ? "_fill" : ""
        }.svg`}
        className={`${router.pathname === "/" + props.name ? "w-7" : "w-6"}`}
      />
    </div>
  );
};

export default Item;
