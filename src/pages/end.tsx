import { Layout } from "@/components/Layout";
import Decision from "@/components/end/Decision";
import PersonItem from "@/components/end/PersonItem";
import Title from "@/components/panel/Title";
import { Panel } from "@/components/panel/boxShadowPanel";
import { Frame } from "@/components/panel/downShadowFrame";
import { getPeople } from "@/hooks/supabase/usePeopleFunctions";
import { getUser } from "@/hooks/supabase/useUserFunctions";
import { usePeopleStore, useUserStore } from "@/libs/store";
import { Person, User } from "@/types/tableType";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { VscArrowRight } from "react-icons/vsc";

const End = () => {
  const storeUser = useUserStore((state) => state.user);
  const updateStoreUser = useUserStore((state) => state.updateUser);
  const storePeople = usePeopleStore((state) => state.people);
  const updateStorePeople = usePeopleStore((state) => state.updatePeople);

  const router = useRouter();
  const { id } = router.query;

  const [gotPeople, setGotPeople] = useState<Person[]>([]);
  const [decisionPerson, setDecisionPerson] = useState<
    Person | null | string
  >();

  const changeDecisionPerson = (person: Person | null | string) => {
    setDecisionPerson(person);
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (!id) {
      alert("2階 202教室 で開催中です！");
      router.push("/result/ranking");
    }

    init();
  }, [router.isReady]);

  const init = async () => {
    if (!id) return;
    console.log(id);

    let user: User | undefined;
    let getPeopleIds: string[] = [];
    let getPeopleInfo: Person[] = [];

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

    setGotPeople(getPeopleInfo);
  };

  return (
    <Layout
      headerType="sub"
      title="犯人決定"
      hideUnderButton={decisionPerson ? true : false}
    >
      <div className="h-screen overflow-y-scroll pb-28">
        <Title title="犯人決定" />
        <Frame>
          <p className="racking-widest mt-4 w-full text-center text-xs leading-5 text-theme-black ">
            犯人だと思う人を選んでください
          </p>
          {gotPeople.map((person: Person) => (
            <PersonItem
              key={person.id}
              person={person}
              changeDecisionPerson={changeDecisionPerson}
            />
          ))}
          <Panel>
            <div
              className="h-27 flex w-full justify-between overflow-hidden"
              onClick={() => changeDecisionPerson("none")}
            >
              <div className="w-13"></div>
              <div className="grid place-items-center text-center">
                <p>この中に犯人は居ない</p>
              </div>
              <div className="w-13 flex items-center justify-end px-3 py-4">
                <VscArrowRight size={30} />
              </div>
            </div>
          </Panel>
        </Frame>
        {decisionPerson ? (
          <Decision
            person={decisionPerson}
            changeDecisionPerson={changeDecisionPerson}
          />
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
};

export default End;
