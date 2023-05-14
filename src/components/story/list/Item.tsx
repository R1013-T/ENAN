import { Story } from "@/types/tableType";
import { useRouter } from "next/router";
import { useRef } from "react";

interface Props {
  story: Story;
  storyIds: StoryTitleId;
  startStory: Function;
}

interface StoryTitleId {
  title: string;
  id: string;
}

const Item = (props: Props) => {
  const router = useRouter();
  const storyItemRef = useRef<any>(null);

  const handleClickStory = () => {

    let storyId = storyItemRef.current.id

    router.push({
      pathname: "/story",
      query: { id: router.query.id, story: storyId },
    });
    props.startStory(storyItemRef.current.id);
  };

  return (
    <>
      <div
        className="boxShadow h-12 my-3 rounded-md cursor-pointer"
        id={props.storyIds.id}
        ref={storyItemRef}
        onClick={handleClickStory}
      >
        {props.story.title}
      </div>
    </>
  );
};

export default Item;
