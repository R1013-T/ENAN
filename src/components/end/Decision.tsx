import { VscArrowLeft } from "react-icons/vsc";
import { Frame } from "../panel/downShadowFrame";
import { Person } from "@/types/tableType";
import { Panel } from "../panel/boxShadowPanel";
import { useRouter } from "next/router";
import { useIsFinishedStore, useUserStore } from "@/libs/store";
import { updatePlayTime } from "@/hooks/supabase/usePlayTimeFunctions";
import { updateUserFinishedAt } from "@/hooks/supabase/useUserFunctions";
import { useSounds } from "@/hooks/useSounds";
import confetti from "canvas-confetti";

interface Props {
  person: Person | string;
  changeDecisionPerson: Function;
}

const Decision = (props: Props) => {
  const user = useUserStore((state) => state.user);
  const isFinished = useIsFinishedStore((state) => state);
  const router = useRouter();
  const { incorrect, playClick, finish } = useSounds();

  const handleEnd = async () => {
    if (typeof props.person === "string") {
      if (!isFinished.isFinished) {
        if (user.finished_at) {
          isFinished.updateIsFinished(true);
        } else {
          // play_timesに追加
          await updateUserFinishedAt(
            user.id,
            new Date().toISOString().slice(0, 19)
          );
          await updatePlayTime(user.id, new Date().toISOString().slice(0, 19));
          isFinished.updateIsFinished(true);
        }
      }

      router.push({
        pathname: "/result",
        query: { id: router.query.id },
      });

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      setTimeout(() => {
        let i = 0;
        const playConfetti = setInterval(function () {
          i += 1;
          if (i > 7) clearInterval(playConfetti);
          finish();
          confetti({
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            particleCount: randomInRange(50, 100),
            origin: {y: 0.6},
          });
        }, 100);

        const playConfettiInfinite = setInterval(function () {
          if (window.location.pathname === "/result") {
            finish();

            confetti({
              angle: randomInRange(55, 125),
              spread: randomInRange(50, 70),
              particleCount: randomInRange(50, 100),
              origin: {y: 0.6},
            });
          } else {
            clearInterval(playConfettiInfinite);
          }
        }, 1000);
      }, 500);
    } else {
      incorrect();
      router.push({
        pathname: "/story",
        query: { id: router.query.id, story: "42,43" },
      });
    }
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-screen bg-bg-black/80">
      <div className="relative mx-auto grid h-full w-full max-w-md place-items-center ">
        <Frame>
          <div className="bg-bg-black">
            {typeof props.person === "string" ? (
              <p className="mx-4 my-5">この中に犯人は居ない</p>
            ) : (
              <>
                <p className="racking-widest my-4 mb-2 w-full text-center text-base text-white">
                  {props.person.name}
                </p>

                <Panel>
                  <div className="pt-3">
                    <img
                      src={`/images/characters/${props.person.id}.png`}
                      className="mx-auto mt-2 w-2/3"
                      alt=""
                    />
                  </div>
                </Panel>
              </>
            )}
          </div>
        </Frame>

        <div className="absolute bottom-6 flex w-full justify-between px-6">
          <button
            className="h-15 boxShadow mr-2 flex w-6/12 items-center justify-center rounded bg-theme-black py-2.5 text-lg tracking-widest"
            onClick={() => {
              props.changeDecisionPerson(null);
              playClick();
            }}
          >
            <div className="grid h-6 w-5 place-items-center">
              <VscArrowLeft size={20} />
            </div>
            <p className="px-2">戻る</p>
          </button>
          <button
            className="h-15 boxShadow block w-6/12 rounded bg-theme-red py-2.5 text-center text-lg tracking-widest"
            onClick={handleEnd}
          >
            決定
          </button>
        </div>
      </div>
    </div>
  );
};

export default Decision;
