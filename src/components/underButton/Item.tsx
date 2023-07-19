import { useRouter } from "next/router";
import { useSounds } from "@/hooks/useSounds";

interface Props {
  name: string;
}

const Item = (props: Props) => {
  const router = useRouter();
  const { playClick } = useSounds();
  const handleChangePage = () => {
    playClick();
    router.push({ pathname: "/" + props.name, query: { id: router.query.id } });
  };

  return (
    <div className="grid h-7 w-7 place-items-center" onClick={handleChangePage}>
      <img
        src={`images/underButton/${props.name}${
          router.pathname === "/" + props.name ? "_fill" : ""
        }.svg`}
        className={`${router.pathname === "/" + props.name ? "w-6" : "w-6"}`}
      />
    </div>
  );
};

export default Item;
