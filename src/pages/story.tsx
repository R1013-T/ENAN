import { Layout } from "@/components/Layout";
import List from "@/components/dashboard/stories/List";
import Play from "@/components/dashboard/stories/Play";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Story = () => {
  const router = useRouter();
  const storyId = router.query.story;

  useEffect(() => {
    if (!router.isReady) return;

    console.log(storyId);
  }, [router.isReady]);

  return (
    <Layout headerType="sub" title="ストーリー">
      {storyId ? <Play storyId={storyId} /> : <List />}
    </Layout>
  );
};

export default Story;
