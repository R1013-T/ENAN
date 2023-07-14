import { useRouter } from "next/router";
import Group from "./Group";
import { useEffect, useState } from "react";
import { getUser } from "@/hooks/supabase/useUserFunctions";
import { Story, User } from "@/types/tableType";
import { getStories } from "@/hooks/supabase/useStoryFunctions";
import Title from "@/components/panel/Title";
import { useGetStoriesStore, useUserStore } from "@/libs/store";

interface Props {
  startStory: Function;
}

const List = (props: Props) => {
  const storeUser = useUserStore((state) => state.user);
  const updateStoreUser = useUserStore((state) => state.updateUser);
  const storeGetStories = useGetStoriesStore((state) => state.getStories);
  const updateStoreGetStories = useGetStoriesStore(
    (state) => state.updateGetStories
  );

  const router = useRouter();

  const [user, setUser] = useState<User>();
  const [currentStories, setCurrentStories] = useState<Story[]>([]);
  const [groupList, setGroupList] = useState<string[]>([]);

  useEffect(() => {
    if (!router.isReady) return;
    getUserInfo();
  }, [router.isReady]);

  const getUserInfo = async () => {
    if (!router.isReady) return;

    // storeにuser情報があるか確認
    if (storeUser.id) {
      setUser(storeUser);
    } else {
      // ない場合はSPからuser情報を取得
      await getUser(router.query.id as string).then((res) => {
        if (!res.data) return;

        setUser(res.data[0] as User);
        // storeに保存
        updateStoreUser(res.data[0] as User);
      });
    }
  };

  const getStory = async (storyIds: number[]) => {
    // storeにgetStories情報があるか確認
    if (storeGetStories) {
      setCurrentStories(storeGetStories);
    } else {
      // ない場合はSBから取得
      await getStories(storyIds).then((res) => {
        if (!res) return;
        setCurrentStories(res);
        updateStoreGetStories(res);
      });
    }
  };

  useEffect(() => {
    if (!user || !user.get_stories) return;
    // get_storiesを配列に変換
    const ids = user.get_stories.split(",").map((id) => Number(id));

    getStory(ids);
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
      <div className=" h-screen w-screen max-w-md -translate-x-6 overflow-y-scroll pb-28">
        <Title title="ストーリー" />
        {groupList[0]
          ? groupList.map((group, index) => (
              <Group
                key={index}
                currenStories={currentStories}
                group={group}
                startStory={props.startStory}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default List;
