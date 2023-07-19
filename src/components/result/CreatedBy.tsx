import React from "react";
import Image from "next/image";
import Title from "@/components/panel/Title";
import { Frame } from "@/components/panel/downShadowFrame";
import { Panel } from "@/components/panel/boxShadowPanel";

type Creator = {
  name: string;
  role: string;
  image: string;
};

const creatorItems: Creator[] = [
  {
    name: "高橋 龍之介",
    role: "Lead Developer",
    image: "ryut",
  },
  {
    name: "金井 雪華",
    role: "3D Model Creator",
    image: "yuki",
  },
  {
    name: "矢板橋 翔",
    role: "Preparation",
    image: "",
  },
  {
    name: "高橋 健太",
    role: "Preparation",
    image: "",
  },
];

const Item: React.FC<Creator> = (creator) => (
  <Panel>
    <div className="flex w-full py-1">
      <div className="grid w-16 place-items-center ">
        <Image
          src={`/images/creator/${creator.image}.png`}
          alt=""
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-wrap items-center py-1">
        <p className="w-full text-sm tracking-wider text-white/80">
          {creator.name}
        </p>
        <p className="text-xs text-theme-black/70">{creator.role}</p>
      </div>
    </div>
  </Panel>
);

const CreatedBy = () => {
  return (
    <div className="-mt-8">
      <Title title="Created by" />
      <Frame>
        <div className="">
          <p className="racking-widest mt-4 w-full text-center text-xs text-theme-black">
            スーパーITエンジニア専攻 2年
          </p>
          <Item {...creatorItems[0]} />
          <Item {...creatorItems[1]} />
          <Item {...creatorItems[2]} />
          <p className="racking-widest mt-6 w-full text-center text-xs text-theme-black">
            プログラマー専攻 2年
          </p>
          <Item {...creatorItems[3]} />
        </div>
      </Frame>
    </div>
  );
};

export default CreatedBy;
