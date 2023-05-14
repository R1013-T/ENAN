import { Layout } from "@/components/Layout";
import List from "@/components/story/list/List";
import Play from "@/components/story/play/Play";
import { getStories } from "@/hooks/supabase/useStoryFunctions";
import { exchangeId } from "@/hooks/useCommaSeparatedIdsToArray";
import { Story } from "@/types/tableType";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Story = () => {
  // クエリパラメータからストリーのIdを取得
  const router = useRouter();
  let storyId = "";

  const [isLoading, setIsLoading] = useState(true);
  const [hideUnderButton, setHideUnderButton] = useState(false);

  const [stories, setStories] = useState<Story[]>([]);
  const [currentStory, setCurrentStory] = useState<Story>();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [showTalk, setShowTalk] = useState(false);

  let ids: number[] = [];

  // next/router の準備ができ次第
  useEffect(() => {
    if (!router.isReady) return;

    // クエリパラメータから取得したstorIdをセットする。
    storyId = router.query.story as string;

    // クエリパラメータから取得したstorIdによって表示コンテンツを変える
    getStoryIds();
  }, [router.isReady]);

  const startStory = (ids?: string) => {
    if (ids) {
      storyId = ids;
    } else {
    }

    // クエリパラメータから取得したstorIdによって表示コンテンツを変える
    getStoryIds();
  };

  const getStoryIds = async () => {
    let stories: Story[] = [];

    // クエリパラメータから取得したstorId
    if (storyId) {
      // ある場合は、underButtonを表示する。
      setHideUnderButton(true);

      // ストーリidが複数の場合は配列に格納する。
      if (storyId.includes(",")) {
        ids = exchangeId(storyId as string);
      } else {
        ids = [Number(storyId)];
      }


      // storyを取得する。
      await getStories(ids).then((res) => {
        if (!res) return;
        stories = res;
      });

      setCurrentStoryIndex(0);

      // storyをセットする。
      setStories(stories);
      setCurrentStory(stories[0]);

      setIsLoading(false);
    } else {
      // ない場合はストーリーのリストを表示する。
      setHideUnderButton(false);
      setIsLoading(false);
    }
  };

  const nextStory = () => {
    // 次のストーリーをセットする。
    let storyIndex = currentStoryIndex + 1;

    if (storyIndex >= stories.length) {
      setHideUnderButton(false);
      setCurrentStory(undefined);
      setCurrentStoryIndex(0);
      router.push({
        pathname: "/story",
        query: { id: router.query.id },
      });
    }

    setCurrentStoryIndex(storyIndex);
    setCurrentStory(stories[storyIndex]);
  };

  useEffect(() => {
    // currentStoryが変更されたら、showTalkをfalseにしてからtrueにする。
    if (currentStory) {
      setShowTalk(false);

      setTimeout(() => {
        setShowTalk(true);
      }, 200);
    }
  }, [stories, currentStory]);

  return (
    <Layout
      headerType="sub"
      title="ストーリー"
      hideUnderButton={hideUnderButton}
      isLoading={isLoading}
    >
      {currentStory ? (
        <Play
          talkText={currentStory.content}
          person_id={currentStory.person_id}
          personName={currentStory.person}
          showTalk={showTalk}
          nextStory={nextStory}
        />
      ) : (
        <List startStory={startStory} />
      )}
    </Layout>
  );
};

export default Story;
