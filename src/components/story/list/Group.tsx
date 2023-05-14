import { Story } from "@/types/tableType";
import Item from "./Item";
import { useEffect, useState } from "react";

interface Props {
  currenStories: Story[];
  group: string;
  startStory: Function;
}

interface StoryTitleId {
  title: string;
  id: string;
}

const Group = (props: Props) => {
  const [groupStories, setGroupStories] = useState<Story[]>([]);
  const [storyIds, setStoryIds] = useState<StoryTitleId[]>([]);

  useEffect(() => {
    if (!props.currenStories[0]) return;

    let stories: Story[] = [];
    let storyIds: StoryTitleId[] = [];

    // グループごとに分けられたストーリーをタイトルの重複をなくして配列に入れる
    props.currenStories.forEach((story) => {
      if (story.group === props.group) {
        let alreadyStory = false;
        stories.forEach((s) => {
          // すでに同じタイトルのストーリーがある場合は、idをカンマ区切りで追加する
          if (s.title === story.title) {
            alreadyStory = true;

            storyIds.forEach((id, index) => {
              if (id.title === story.title) {
                storyIds[index].id = `${id.id},${story.id}`;
              }
            });
          }
        });

        if (!alreadyStory) {
          stories.push(story);
          storyIds.push({ title: story.title, id: story.id.toString() });
        }
      }
    });

    setGroupStories(stories);
    setStoryIds(storyIds);
  }, []);

  return (
    <div className="downShadow mt-4 mx-6 px-5 pb-1 rounded-md">
      <p className="mt-4 tracking-widest text-theme-black text-xs">
        {props.group}
      </p>
      {groupStories.map((story, index) => (
        <Item
          key={index}
          story={story}
          storyIds={storyIds[index]}
          startStory={props.startStory}
        />
      ))}
    </div>
  );
};

export default Group;
