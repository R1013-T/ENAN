import Title from "@/components/panel/Title";
import { Frame } from "@/components/panel/downShadowFrame";
import { Clue } from "@/types/tableType";
import { useEffect } from "react";

interface Props {
  gotClues: Clue[]
}

const Clues = (props: Props) => {
  
  useEffect(() => {
    console.log("gotClues", props.gotClues);
  },[])

  return (
    <div className="pb-28">
      <Title title="手がかり" />
      <Frame>
        <div className="flex flex-wrap justify-around pt-5">
          <div className="boxShadow w-5/12 mb-3 rounded-md">
            <div className="w-full relative">
              <img src="images/clues/key.png" className="p-4" alt="" />
              <div className="absolute bottom-0 right-0 left-0 panelGradientBack h-12 rounded-md grid place-items-center">
                <p className="tracking-widest text-center text-sm">
                  扉の鍵
                </p>
              </div>
            </div>
          </div>
          <div className="boxShadow w-5/12 mb-3 rounded-md">
            <div className="w-full relative">
              <img src="images/clues/knife.png" className="p-4" alt="" />
              <div className="absolute bottom-0 right-0 left-0 panelGradientBack h-12 rounded-md grid place-items-center">
                <p className="tracking-widest text-center text-sm">
                  包丁
                </p>
              </div>
            </div>
          </div>
          <div className="boxShadow w-5/12 mb-3 rounded-md">
            <div className="w-full relative">
              <img src="images/clues/controller.png" className="p-4" alt="" />
              <div className="absolute bottom-0 right-0 left-0 panelGradientBack h-12 rounded-md grid place-items-center">
                <p className="tracking-widest text-center text-sm">
                  リモコン
                </p>
              </div>
            </div>
          </div>
          <div className="boxShadow w-5/12 mb-3 rounded-md">
            <div className="w-full relative">
              <img src="images/clues/water.png" className="p-4" alt="" />
              <div className="absolute bottom-0 right-0 left-0 panelGradientBack h-12 rounded-md grid place-items-center">
                <p className="tracking-widest text-center text-sm">
                  濡れた跡
                </p>
              </div>
            </div>
          </div>
          <div className="boxShadow w-5/12 mb-3 rounded-md">
            <div className="w-full relative">
              <img src="images/clues/chair.png" className="p-4" alt="" />
              <div className="absolute bottom-0 right-0 left-0 panelGradientBack h-12 rounded-md grid place-items-center">
                <p className="tracking-widest text-center text-sm">
                  椅子
                </p>
              </div>
            </div>
          </div>
          <div className="boxShadow w-5/12 mb-3 rounded-md">
            <div className="w-full relative">
              <img src="images/clues/earring.png" className="p-4" alt="" />
              <div className="absolute bottom-0 right-0 left-0 panelGradientBack h-12 rounded-md grid place-items-center">
                <p className="tracking-widest text-center text-sm">
                  イヤリング
                </p>
              </div>
            </div>
          </div>
          <div className="w-5/12"></div>
        </div>
      </Frame>
    </div>
  );
};

export default Clues;
