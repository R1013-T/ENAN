import React from "react";
import ArModel from "@/components/result/ArModel";
import Character from "@/components/result/Character";
import Sound from "@/components/result/Sound";
import Title from "@/components/panel/Title";
import { Frame } from "@/components/panel/downShadowFrame";

const Resources = () => {
  return (
    <div className="-mt-8 mb-5">
      <Title title="Resources" />
      <Frame>
        <ArModel />
        <Character />
        <Sound />
      </Frame>
    </div>
  );
};

export default Resources;
