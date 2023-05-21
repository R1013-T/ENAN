import Link from "next/link";
import { useRouter } from "next/router";
import { VscArrowLeft } from "react-icons/vsc";

interface Props {
  buttonText: string;
  storyId: string;
}

const DetailUnderButton = (props: Props) => {
  const router = useRouter();

  return (
    <div className="absolute bottom-6 right-6 left-6">
      <Link
        href={{
          pathname: "/story",
          query: { id: router.query.id, story: props.storyId },
        }}
        className="w-full py-2.5 rounded tracking-widest text-lg bg-theme-red text-center block boxShadow"
      >
        {props.buttonText}
      </Link>
      <Link
        href={{ pathname: "/home", query: { id: router.query.id } }}
        className="w-full py-2.5 mt-3 rounded tracking-widest text-lg bg-theme-black flex justify-center items-center boxShadow"
      >
        <div className="w-6 h-6 grid place-items-center">
          <VscArrowLeft size={20} />
        </div>
        <p className="px-3">戻る</p>
        <div className="w-6"></div>
      </Link>
    </div>
  );
};

export default DetailUnderButton;
