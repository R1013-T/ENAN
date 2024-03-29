import { Layout } from "@/components/Layout";
import Title from "@/components/panel/Title";
import { useEffect, useState } from "react";
import { fetchRanking } from "@/hooks/supabase/useRankingFunctions";
import { supabase } from "@/libs/supabase";
import { useRouter } from "next/router";

export type RankingProps = {
  id: string;
  started_at: string;
  finished_at: string | null;
  user_id: string;
  user_name: string;
};

type RankingItemProps = {
  index: number;
  user: RankingProps;
};

const RankingItem = ({ index, user }: RankingItemProps) => {
  const rank = index! + 1;
  const { started_at, finished_at } = user;

  const [timeDiff, setTimeDiff] = useState(""); // 差分を保存するステート

  useEffect(() => {
    const startedTime = new Date(started_at);
    const finishedTime = new Date(finished_at as string);
    const diffInMs: number = finishedTime.getTime() - startedTime.getTime();

    // 時間の差を計算し、h/mm/ss 形式に整形する
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    const formattedTimeDiff = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    setTimeDiff(formattedTimeDiff);
  }, [started_at, finished_at]);

  if (rank == 1) {
    return (
      <div className="rank-first mx-2 mb-7 flex flex-wrap items-center justify-between text-2xl font-bold tabular-nums">
        <div className="flex items-center">
          <div className="w-6 text-right">
            1<span className="text-base">st</span>
          </div>
          <div className="ml-8">{user.user_name}</div>
        </div>
        <div>{timeDiff}</div>
      </div>
    );
  }

  if (rank == 2) {
    return (
      <div className="rank-second mx-2 mb-7 flex flex-wrap items-center justify-between text-xl font-bold tabular-nums">
        <div className="flex items-center">
          <div className="w-6 text-right">
            2<span className="text-base">nd</span>
          </div>
          <div className="ml-8">{user.user_name}</div>
        </div>
        <div>{timeDiff}</div>
      </div>
    );
  }

  if (rank == 3) {
    return (
      <div className="rank-third mx-2 mb-7 flex flex-wrap items-center justify-between text-lg font-bold tabular-nums">
        <div className="flex items-center">
          <div className="w-6 text-right">
            3<span className="text-base">rd</span>
          </div>
          <div className="ml-8">{user.user_name}</div>
        </div>
        <div>{timeDiff}</div>
      </div>
    );
  }

  return (
    <div className="mb-3 mr-2 flex flex-wrap items-center justify-between text-base tabular-nums">
      <div className="flex items-center">
        <div className="w-6 text-right font-bold">{rank}</div>
        <div className="ml-10">{user.user_name}</div>
      </div>
      <div>{timeDiff}</div>
    </div>
  );
};

const Ranking = () => {
  const router = useRouter();
  const { id } = router.query;

  const [users, setUsers] = useState<RankingProps[]>([]);
  const [sortedUsers, setSortedUsers] = useState<RankingProps[]>([]);

  useEffect(() => {
    (async () => {
      const users = await fetchRanking();
      setUsers(users as RankingProps[]);
    })();
    fetchRealtimeRanking();
  }, []);

  useEffect(() => {
    let sortedUsers: RankingProps[] = [];
    // finished_at が null のユーザーを除外する
    sortedUsers = users.filter((user) => user.finished_at !== null);

    // finished_at から started_at を引いた時間でソートする

    sortedUsers = sortedUsers.sort((a, b) => {
      const aTime =
        new Date(a.finished_at as string).getTime() -
        new Date(a.started_at).getTime();
      const bTime =
        new Date(b.finished_at as string).getTime() -
        new Date(b.started_at).getTime();
      return aTime - bTime;
    });
    setSortedUsers(sortedUsers);
  }, [users]);

  const fetchRealtimeRanking = () => {
    try {
      supabase
        .channel("ranking")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "play_times",
          },
          (payload) => {
            if (payload.eventType === "INSERT") {
              const { id, started_at, finished_at, user_id, user_name } =
                payload.new;
              setUsers((users) => [
                ...users,
                { id, started_at, finished_at, user_id, user_name },
              ]);
            }
            if (payload.eventType === "UPDATE") {
              const { id, started_at, finished_at, user_id, user_name } =
                payload.new;
              setUsers((users) =>
                users.map((user) =>
                  user.id === id
                    ? { id, started_at, finished_at, user_id, user_name }
                    : user
                )
              );
            }
            if (payload.eventType === "DELETE") {
              const { id } = payload.old;
              setUsers((users) => users.filter((user) => user.id !== id));
            }
          }
        )
        .subscribe();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout headerType="sub" title="ランキング" hideUnderButton={true}>
      <div className="h-screen w-full overflow-y-scroll">
        <Title title="ランキング" />
        <div className="pt-3">
          {sortedUsers.map((user, index) => (
            <div
              key={user.id}
              className={`mx-5 ${
                user.user_id === id && "rounded-xl bg-theme-red/60"
              }`}
            >
              <RankingItem index={index} user={user} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Ranking;
