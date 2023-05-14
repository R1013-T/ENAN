import { useRouter } from "next/router";
import Group from "./Group";

interface Props {
  startStory: Function;
}

const List = (props: Props) => {
  const router = useRouter();

  const tmp78 = () => {
    router.push({
      pathname: "/story",
      query: { id: router.query.id, story: "7,8" },
    });
    props.startStory("7,8");
  };

  return (
    <div className="h-full px-6">
      <div className=" h-screen w-screen max-w-md -translate-x-6 pb-28 overflow-y-scroll">
        <h1 className="mx-6 mt-16 mb-5 text-xl tracking-widest boxShadow text-center py-2 rounded-md">
          ストーリー
        </h1>
        <Group />
      </div>
    </div>
  );
};

export default List;
