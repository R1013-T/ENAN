import { Layout } from "@/components/Layout";
import List from "@/components/story/List";
import Play from "@/components/story/play/Play";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Story = () => {
  const router = useRouter();
  const storyId = router.query.story;

  const [hideUnderButton, setHideUnderButton] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    if (storyId) {
      setHideUnderButton(true)
    } else {
      setHideUnderButton(false)
    }

    console.log(storyId);
  }, [router.isReady]);

  return (
    <Layout headerType="sub" title="ストーリー" hideUnderButton={hideUnderButton}>
      {storyId ? <Play storyId={storyId} /> : <List />}
    </Layout>
  );
};

export default Story;
