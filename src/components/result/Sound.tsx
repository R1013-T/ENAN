import React from "react";
import { Panel } from "@/components/panel/boxShadowPanel";

type Credit = {
  title: string;
  title_link: string;
  sub: string;
  sub_link: string;
};

const Credits: Credit[] = [
  {
    title: "効果音ラボ",
    title_link: "https://soundeffect-lab.info/",
    sub: "https://soundeffect-lab.info/",
    sub_link: "https://soundeffect-lab.info/",
  },
  {
    title: "mixkit",
    title_link: "https://mixkit.co/free-sound-effects/",
    sub: "https://mixkit.co/free-sound-effects/",
    sub_link: "https://mixkit.co/free-sound-effects/",
  },
  {
    title: "魔王魂",
    title_link: "https://maou.audio/",
    sub: "https://maou.audio/",
    sub_link: "https://maou.audio/",
  },
];
const Sound = () => {
  return (
    <div>
      <p className="racking-widest mt-6 w-full text-center text-xs text-theme-black">
        Sound Effects
      </p>
      {Credits.map((credit, index) => (
        <Panel key={index}>
          <div className="flex w-full px-3 py-1">
            <div className="flex flex-wrap items-center py-1">
              <a
                href={credit.title_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-sm tracking-wider text-white/80 hover:underline"
              >
                {credit.title}
              </a>
              <a
                href={credit.sub_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-theme-black/70 hover:underline"
              >
                {credit.sub}
              </a>
            </div>
          </div>
        </Panel>
      ))}
    </div>
  );
};

export default Sound;
