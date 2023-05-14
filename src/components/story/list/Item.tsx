import { Story } from "@/types/tableType";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { VscArrowRight } from "react-icons/vsc";

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

  const [person_id, setPersonId] = useState<number>(0);

  const handleClickStory = () => {
    let storyId = storyItemRef.current.id;

    router.push({
      pathname: "/story",
      query: { id: router.query.id, story: storyId },
    });
    props.startStory(storyItemRef.current.id);
  };

  useEffect(() => {
    let id: number;

    switch (props.story.person) {
      case "よう子":
        id = 1;
        break;
      case "佐々木":
        id = 2;
        break;
      case "ゆう美":
        id = 3;
        break;
      case "警察":
        id = 4;
        break;
      case "エナン":
        id = 5;
        break;
      default:
        id = 0;
    }

    setPersonId(id);
  }, []);

  return (
    <div
      className="boxShadow h-14 my-3 rounded-md cursor-pointer flex justify-between overflow-hidden"
      id={props.storyIds.id}
      ref={storyItemRef}
      onClick={handleClickStory}
    >
      <div className="flex">
        <div className="mx-2">
          <img
            src={`/images/characters/${person_id}.png`}
            alt=""
            className="h-14 w-14 scale-150 translate-y-3"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs text-theme-black">{props.story.person}</p>
          <p className=" text-base">{props.story.title}</p>
        </div>
      </div>
      <div className="px-3 grid place-items-center">
        <VscArrowRight size={20} />
      </div>
    </div>
  );
};

export default Item;
