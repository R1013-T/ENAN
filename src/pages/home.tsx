import { Layout } from "@/components/Layout";
import Clues from "@/components/home/clues/Clues";
import People from "@/components/home/people/People";
import { Clue, Person, User } from "@/types/tableType";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUser } from "@/hooks/supabase/useUserFunctions";
import { getPeople } from "@/hooks/supabase/usePeopleFunctions";
import { getClues } from "@/hooks/supabase/useClueFunctions";

const Dashboard = () => {
  const router = useRouter();
  const { id } = router.query;

  const [gotPeople, setGotPeople] = useState<Person[]>([]);
  const [gotClues, setGotClues] = useState<Clue[]>([]);

  useEffect(() => {
    if (!id) return;
    console.log(id);

    let user: User | undefined;
    let getPeopleIds: string[] = [];
    let getPeopleInfo: Person[] = [];
    let getClueIds: string[] = [];
    let getCluesInfo: Clue[] = [];

    // 即時関数で非同期処理
    (async () => {
      // ユーザー情報取得
      await getUser(id as string).then((res) => {
        if (!res.data) return;
        user = res.data[0] as User;
        getPeopleIds = user?.get_people?.split(",") as string[];
        getClueIds = user?.get_clues?.split(",") as string[];
      });

      // 容疑者情報取得
      if (getPeopleIds) {
        await getPeople(getPeopleIds).then((res: Person[]) => {
          if (!res) return;
          getPeopleInfo = res;
        });
      }

      // 手がかり情報取得
      if (getClueIds) {
        await getClues(getClueIds).then((res: Clue[]) => {
          if (!res) return;
          getCluesInfo = res;
        });
      }

      setGotPeople(getPeopleInfo);
      setGotClues(getCluesInfo);
    })();
  }, [id]);

  return (
    <Layout headerType="sub" title="ホーム">
      <div className="w-full h-screen overflow-y-scroll">
        {gotPeople[0] ? <People gotPeople={gotPeople} /> : ""}
        {gotClues[0] ? <Clues gotClues={gotClues} /> : ""}
      </div>
    </Layout>
  );
};

export default Dashboard;
