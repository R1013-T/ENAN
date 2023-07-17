import { Layout } from "@/components/Layout";
import Clues from "@/components/home/clues/Clues";
import People from "@/components/home/people/People";
import { Clue, Person, User } from "@/types/tableType";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUser } from "@/hooks/supabase/useUserFunctions";
import { getPeople } from "@/hooks/supabase/usePeopleFunctions";
import { getClues } from "@/hooks/supabase/useClueFunctions";
import { useCluesStore, usePeopleStore, useUserStore } from "@/libs/store";

const Dashboard = () => {
  const storeUser = useUserStore((state) => state.user);
  const updateStoreUser = useUserStore((state) => state.updateUser);
  const storePeople = usePeopleStore((state) => state.people);
  const updateStorePeople = usePeopleStore((state) => state.updatePeople);
  const storeClues = useCluesStore((state) => state.clues);
  const updateStoreClues = useCluesStore((state) => state.updateClues);

  const router = useRouter();
  const { id } = router.query;

  const [gotPeople, setGotPeople] = useState<Person[]>([]);
  const [gotClues, setGotClues] = useState<Clue[]>([]);

  useEffect(() => {
    if (!id) {
      alert("2階 202教室 で開催中です！");
      router.push("/result/ranking");
    }

    let user: User | undefined;
    let getPeopleIds: string[] = [];
    let getPeopleInfo: Person[] = [];
    let getClueIds: string[] = [];
    let getCluesInfo: Clue[] = [];

    // 即時関数で非同期処理
    (async () => {
      // storeにuser情報があるか確認
      if (storeUser.id) {
        user = storeUser;
      } else {
        // ない場合はSPからuser情報を取得
        await getUser(router.query.id as string).then((res) => {
          if (!res.data) return;

          user = res.data[0] as User;
          // storeに保存
          updateStoreUser(res.data[0] as User);
        });
      }

      getPeopleIds = user?.get_people?.split(",") as string[];
      getClueIds = user?.get_clues?.split(",") as string[];

      // 容疑者情報取得
      if (getPeopleIds) {
        let peopleData: Person[] = [];

        // ストアにデータがあるか確認
        if (storePeople) {
          // ある場合はストアのデータを使用
          peopleData = storePeople;
        } else {
          // ない場合はSBから取得
          await getPeople().then((res: Person[] | undefined) => {
            if (!res) return;
            peopleData = res;
            updateStorePeople(res);
          });
        }

        // 現在の取得容疑者を取得
        peopleData.forEach((personData) => {
          getPeopleIds.forEach((getPersonId) => {
            if (personData.id == Number(getPersonId)) {
              getPeopleInfo.push(personData);
            }
          });
        });
      }

      // 手がかり情報取得
      if (getClueIds) {
        let cluesData: Clue[] = [];

        // ストアにデータがあるか確認
        if (storeClues) {
          // ある場合はストアのデータを使用
          cluesData = storeClues;
        } else {
          // ない場合はSBから取得
          await getClues(getClueIds).then((res: Clue[] | undefined) => {
            if (!res) return;
            cluesData = res;
            updateStoreClues(res);
          });
        }

        // 現在の取得容疑者を取得
        cluesData.forEach((clueData) => {
          getClueIds.forEach((clueId) => {
            if (clueData.id == Number(clueId)) {
              getCluesInfo.push(clueData);
            }
          });
        });
      }

      setGotPeople(getPeopleInfo);
      setGotClues(getCluesInfo);
    })();
  }, [id]);

  return (
    <Layout headerType="sub" title="ホーム">
      <div className="h-screen w-full overflow-y-scroll">
        {gotPeople[0] ? <People gotPeople={gotPeople} /> : ""}
        {gotClues[0] ? <Clues gotClues={gotClues} /> : ""}
      </div>
    </Layout>
  );
};

export default Dashboard;
