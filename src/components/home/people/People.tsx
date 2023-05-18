import Title from "@/components/panel/Title";
import { Panel } from "@/components/panel/boxShadowPanel";
import { Frame } from "@/components/panel/downShadowFrame";
import { VscArrowRight } from "react-icons/vsc";

const People = () => {
  return (
    <div>
      <Title title="容疑者" />
      <Frame>
        <div className="w-full flex flex-wrap">
          <Panel>
            <div className="w-full h-27 overflow-hidden flex">
              <img
                src="/images/characters/1.png"
                className="w-24 mt-2"
                alt=""
              />
              <div className="grid place-items-center">
                <p className="text-xl w-full tracking-widest mb-2">
                  <span className="text-xs mb-1 text-theme-black tracking-wide block">
                    アイドル
                  </span>
                  よう子
                </p>
              </div>
              <div className="grid place-items-center ml-auto mr-3">
                <VscArrowRight size={30} />
              </div>
            </div>
          </Panel>
          <Panel>
            <div className="w-full h-27 overflow-hidden flex">
              <img
                src="/images/characters/1.png"
                className="w-24 mt-2"
                alt=""
              />
              <div className="grid place-items-center">
                <p className="text-xl w-full tracking-widest mb-2">
                  <span className="text-xs mb-1 text-theme-black tracking-wide block">
                    アイドル
                  </span>
                  よう子
                </p>
              </div>
              <div className="grid place-items-center ml-auto mr-3">
                <VscArrowRight size={30} />
              </div>
            </div>
          </Panel>
        </div>
      </Frame>
    </div>
  );
};

export default People;
