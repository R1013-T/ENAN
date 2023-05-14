import { Layout } from "@/components/Layout";
import List from "@/components/story/List";
import Play from "@/components/story/play/Play";
import { exchangeId } from "@/hooks/useCommaSeparatedIdsToArray";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Story = () => {
  // クエリパラメータからストリーのIdを取得
  const router = useRouter();
  const storyId = router.query.story;

  const [hideUnderButton, setHideUnderButton] = useState(false);
  const [currentStoryId, setCurrentStoryId] = useState<number>();

  let ids: number[] = [];

  // next/router の準備ができ次第
  useEffect(() => {
    if (!router.isReady) return;

    // クエリパラメータから取得したstorIdによって表示コンテンツを変える
    getStoryIds()

  }, [router.isReady]);

  const getStoryIds = () => {
    // クエリパラメータから取得したstorId
    if (storyId) {
      // ある場合は,区切りのstoryIdを配列に格納する。
      console.log("play")
      ids = exchangeId(storyId as string);

      // !!!! ストーリーをSupabaseかか取得する処理

      setCurrentStoryId(ids[0])
    } else {
      // ない場合はストーリーのリストを表示する。
      console.log("list")
      setCurrentStoryId(0);
    }
  }

  // currentStoryIdに応じてunderButton表示/非表示
  useEffect(() => {
    if (currentStoryId) {
      setHideUnderButton(true);
    } else {
      setHideUnderButton(false);
    }
  }, [currentStoryId]);

  return (
    <Layout
      headerType="sub"
      title="ストーリー"
      hideUnderButton={hideUnderButton}
    >
      {currentStoryId ? <Play talkText="" person_id={5} /> : <List />}
    </Layout>
  );
};

export default Story;
