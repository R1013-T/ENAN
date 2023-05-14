import { useRouter } from "next/router";

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
    <div>
      <p>list</p>
      <button onClick={tmp78}>7,8</button>
    </div>
  );
};

export default List;
