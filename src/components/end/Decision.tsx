import { VscArrowLeft } from "react-icons/vsc";
import Title from "../panel/Title";
import { Frame } from "../panel/downShadowFrame";
import { Person } from "@/types/tableType";
import { Panel } from "../panel/boxShadowPanel";

interface Props {
  person: Person;
  changeDecisionPerson: Function;
}

const Decision = (props: Props) => {
  return (
    <div className="fixed top-0 right-0 h-screen w-screen bg-bg-black/80 pb-5">
      <div className="w-full max-w-md mx-auto h-full relative grid place-items-center ">
        <Frame>
          <div className="bg-bg-black">
            <p className="my-4 w-full text-center racking-widest text-base mb-2 text-white">
              {props.person.name}
            </p>

            <Panel>
              <div className="pt-3">
                <img
                  src={`/images/characters/${props.person.id}.png`}
                  className="w-36 mt-2 mx-auto"
                  alt=""
                />
              </div>
            </Panel>
          </div>
        </Frame>

        <div className="absolute bottom-5 px-6 w-full flex justify-between">
          <button
            className="w-6/12 mr-2 py-2.5 rounded tracking-widest text-lg bg-theme-black flex justify-center items-center boxShadow"
            onClick={() => props.changeDecisionPerson(null)}
          >
            <div className="w-5 h-6 grid place-items-center">
              <VscArrowLeft size={20} />
            </div>
            <p className="px-2">戻る</p>
          </button>
          <button className="w-6/12 py-2.5 rounded tracking-widest text-lg bg-theme-red text-center block boxShadow">
            決定
          </button>
        </div>
      </div>
    </div>
  );
};

export default Decision;
