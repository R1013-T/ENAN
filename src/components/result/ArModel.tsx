import React from "react";
import { Panel } from "@/components/panel/boxShadowPanel";

type ModelCredit = {
  title: string;
  title_link: string;
  sub: string;
  sub_link: string;
};

const modelCredits = [
  {
    title: "Door_Lock",
    title_link: "https://skfb.ly/oESAG",
    sub: "by David Wigforss",
    sub_link: "http://creativecommons.org/licenses/by-nc/4.0/",
  },
  {
    title: "Concave_knife_color",
    title_link:
      "https://sketchfab.com/3d-models/concave-knife-color-0c3b3a9a2a8a4747aacdf73be7da7906",
    sub: "by vo_w_ac",
    sub_link: "https://sketchfab.com/vo_w_ac",
  },
  {
    title: "Vitra Eames Plastic Chair",
    title_link:
      "https://sketchfab.com/3d-models/vitra-eames-plastic-chair-0a45955e2328459d95f403cb00c08b3a",
    sub: "by furnny",
    sub_link: "https://sketchfab.com/furnny",
  },
  {
    title: "Remote Controller",
    title_link:
      "https://sketchfab.com/3d-models/remote-controller-d72eebbf82be48f0a53e7e8b712e6a66",
    sub: "by dartuchiwa",
    sub_link: "https://sketchfab.com/dartuchiwa",
  },
  {
    title: "Monarch Chrysalis earring",
    title_link:
      "https://sketchfab.com/3d-models/monarch-chrysalis-earring-3d-print-simulation-aa93745d57c44a98a654aecf5ba5a09e",
    sub: "by orbytnz",
    sub_link: "https://sketchfab.com/orbytnz",
  },
  {
    title: "Kitchen Knife",
    title_link: "https://skfb.ly/6WZ9N",
    sub: "by calp1",
    sub_link: "http://creativecommons.org/licenses/by/4.0/",
  },
  {
    title: "Every drop you splash!",
    title_link:
      "https://www.cgtrader.com/free-3d-models/various/various-models/cc0-drops",
    sub: "by plaggy",
    sub_link: "https://www.cgtrader.com/plaggy",
  },
  {
    title: "Document Clipboard with Pen",
    title_link: "https://skfb.ly/oIqts",
    sub: "by Kami Rapacz",
    sub_link: "http://creativecommons.org/licenses/by/4.0/",
  },
];

const Item: React.FC<ModelCredit> = (modelCredit) => (
  <Panel>
    <div className="flex w-full px-3 py-1">
      <div className="flex flex-wrap items-center py-1">
        <a
          href={modelCredit.title_link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-sm tracking-wider text-white/80 hover:underline"
        >
          {modelCredit.title}
        </a>
        <a
          href={modelCredit.sub_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-theme-black/70 hover:underline"
        >
          {modelCredit.sub}
        </a>
      </div>
    </div>
  </Panel>
);

const ArModel = () => {
  return (
    <div>
      <p className="mt-4 w-full text-center text-xs text-theme-black">
        3D Models
      </p>
      {modelCredits.map((modelCredit) => (
        <Item key={modelCredit.title} {...modelCredit} />
      ))}
    </div>
  );
};

export default ArModel;
