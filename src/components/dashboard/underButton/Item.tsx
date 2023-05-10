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
    <div onClick={handleChangePage}>
      <img
        src={`images/underButton/${props.name}${
          router.pathname === "/" + props.name ? "_fill" : ""
        }.svg`}
        className="w-6"
      />
    </div>
  );
};

export default Item;
