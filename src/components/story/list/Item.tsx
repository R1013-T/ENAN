import { Panel } from "@/components/panel/boxShadowPanel";
import { Story } from "@/types/tableType";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { VscArrowRight } from "react-icons/vsc";
import { useSounds } from "@/hooks/useSounds";

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
  const { storyStart } = useSounds();

  const [person_id, setPersonId] = useState<number>(0);

  const handleClickStory = () => {
    let storyId = storyItemRef.current.id;
    const idArray = storyId.split(",");
    storyId = `${idArray[0]},${idArray[idArray.length - 1]}`;

    storyStart();

    router.push({
      pathname: "/story",
      query: { id: router.query.id, story: storyId },
    });
    props.startStory(storyId);
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
    <Panel>
      <div
        className="flex cursor-pointer justify-between overflow-hidden"
        id={props.storyIds.id}
        ref={storyItemRef}
        onClick={handleClickStory}
      >
        <div className="flex">
          <div className="ml-3 mr-2">
            {person_id ? (
              <img
                src={`/images/characters/${person_id}.png`}
                alt=""
                className="h-14 w-14 translate-y-3 scale-150"
              />
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs text-theme-black">{props.story.person}</p>
            <p className=" text-base">{props.story.title}</p>
          </div>
        </div>
        <div className="grid place-items-center px-3">
          <VscArrowRight size={20} />
        </div>
      </div>
    </Panel>
  );
};

export default Item;
