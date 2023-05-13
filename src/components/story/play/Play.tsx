import Back from "./Back";
import Talk from "./Talk";

interface Props {
  storyId: string | string[];
}

const Play = (props: Props) => {
  return (
    <div className="relative h-full w-full">
      <Back />
      <Talk talkText="あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえお" />
      <p>{props.storyId}</p>
    </div>
  );
};

export default Play;
