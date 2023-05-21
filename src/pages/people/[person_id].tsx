import { Layout } from "@/components/Layout";
import Title from "@/components/panel/Title";
import DetailUnderButton from "@/components/underButton/DetailUnderButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PersonDetail = () => {
  const router = useRouter();

  let person_id: number = 0;

  const [personId, setPersonId] = useState<number>();
  const [personName, setPersonName] = useState<string>();
  const [storyId, setStoryId] = useState<string>();

  useEffect(() => {
    if (!router.isReady) return;

    person_id = Number(router.asPath.split("/")[2].substring(0, 1));
    setPersonName(router.query.title as string);
    setStoryId(router.query.story as string);

    if (person_id > 3)
      router.push({ pathname: "/home", query: { id: router.query.id } });

    setPersonId(person_id);
  }, [router.isReady]);

  return (
    <Layout title="手がかり" headerType="sub" hideUnderButton={true}>
      <Title title={personName as string } />

      {personId ? (
        <img
          src={`/images/characters/${personId}.png`}
          alt=""
          className="absolute bottom-0 h-4/5 object-cover"
        />
      ) : (
        ""
      )}

      <DetailUnderButton buttonText="話す" storyId={storyId as string} />
    </Layout>
  );
};

export default PersonDetail;
