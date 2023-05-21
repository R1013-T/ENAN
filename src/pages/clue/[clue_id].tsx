import { Layout } from "@/components/Layout";
import Title from "@/components/panel/Title";
import DetailUnderButton from "@/components/underButton/DetailUnderButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ClueDetail = () => {
  const router = useRouter();

  let clue_id: number = 0;

  const [clueId, setClueId] = useState<number>();
  const [clueName, setClueName] = useState<string>();
  const [storyId, setStoryId] = useState<string>();

  useEffect(() => {
    if (!router.isReady) return;

    clue_id = Number(router.asPath.split("/")[2].substring(0, 1));
    setClueName(router.query.title as string);
    setStoryId(router.query.story as string);

    if (clue_id > 7)
      router.push({ pathname: "/home", query: { id: router.query.id } });

    setClueId(clue_id);
  }, [router.isReady]);

  useEffect(() => {
    console.log(clueId);
  }, [clueId]);

  const handleTest = () => {

    let array1 = [1, 2, 3]
    let array2 = [4, 5, 6]
    
    array1 = array1.concat(array2)
    console.log(array1)

  };

  return (
    <Layout title="手がかり" headerType="sub" hideUnderButton={true}>
      <Title title={clueName as string} />

      {clueId ? (
        <img
          src={`/images/clues/${clueId}.png`}
          alt=""
          className="absolute top-32 w-3/5 right-1/2 translate-x-1/2 object-cover"
        />
      ) : (
        ""
      )}

      <button onClick={handleTest}>aa</button>

      <DetailUnderButton buttonText="調べる" storyId={storyId as string} />
    </Layout>
  );
};

export default ClueDetail;
