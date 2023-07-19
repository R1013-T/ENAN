import React from "react";
import { Panel } from "@/components/panel/boxShadowPanel";

const Character = () => {
  return (
    <div>
      <p className="racking-widest mt-6 w-full text-center text-xs text-theme-black">
        Character Images
      </p>
      <Panel>
        <div className="flex w-full px-3 py-1">
          <div className="flex flex-wrap items-center py-1">
            <a
              href={"https://carlmary.jp/gallery/materials-300/"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-sm tracking-wider text-white/80 hover:underline"
            >
              TRPG用フリー立ち絵素材
            </a>
            <a
              href={"https://carlmary.jp/"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-theme-black/70 hover:underline"
            >
              by Carlmary
            </a>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default Character;
