import Back from "./Back";
import Talk from "./Talk";

interface Props {
  person_id: number;
  talkText: string;
}

const Play = (props: Props) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Back person_id={props.person_id} />
      <Talk
        person_id={props.person_id}
        talkText="まずは事件の説明をしよう。今をときめく 人気アイドルよう子が マネージャー佐々木と帰宅。家の鍵を開け、中に入ろうとすると、中で男が死んでいた。"
      />
    </div>
  );
};

export default Play;
