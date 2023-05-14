import { useRouter } from "next/router";
import Group from "./Group";
import { useEffect, useState } from "react";
import { getUser } from "@/hooks/supabase/useUserFunctions";
import { Story, User } from "@/types/tableType";
import { getStories } from "@/hooks/supabase/useStoryFunctions";
import { exchangeId } from "@/hooks/useCommaSeparatedIdsToArray";

interface Props {
  startStory: Function;
}

const List = (props: Props) => {
  const router = useRouter();

  const [user, setUser] = useState<User>();
  const [currentStories, setCurrentStories] = useState<Story[]>([]);
  const [groupList, setGroupList] = useState<string[]>([]);

  useEffect(() => {
    if (!router.isReady) return;
    useUser();
  }, [router.isReady]);

  const useUser = async () => {
    if (!router.isReady) return;

    // user情報を取得
    await getUser(router.query.id as string).then((res) => {
      if (!res.data) return;
      setUser(res.data[0] as User);
    });
  };

  const useStory = async (storyIds: number[]) => {
    // storyを取得
    await getStories(storyIds).then((res) => {
      if (!res) return;
      setCurrentStories(res);
    });
  };

  useEffect(() => {
    if (!user || !user.get_stories) return;
    // get_storiesを配列に変換
    const ids = user.get_stories.split(",").map((id) => Number(id));

    useStory(ids);
  }, [user]);

  useEffect(() => {
    if (!currentStories[0]) return;

    let groups: string[] = [];

    // currentStoriesをグループごとに分ける
    currentStories.forEach((story) => {
      let alreadyGroup = false;
      for (let i = 0; i <= groups.length; i++) {
        if (story.group === groups[i]) {
          alreadyGroup = true;
          break;
        }
      }

      if (!alreadyGroup) groups.push(story.group);
    });

    setGroupList(groups);
  }, [currentStories]);

  return (
    <div className="h-full px-6">
      <div className=" h-screen w-screen max-w-md -translate-x-6 pb-28 overflow-y-scroll">
        <h1 className="mx-6 mt-16 mb-5 text-xl tracking-widest boxShadow text-center py-2 rounded-md">
          ストーリー
        </h1>
        {groupList.map((group, index) => (
          <Group
            key={index}
            currenStories={currentStories}
            group={group}
            startStory={props.startStory}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
