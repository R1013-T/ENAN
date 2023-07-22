import React from "react";
import Title from "@/components/panel/Title";
import { Frame } from "@/components/panel/downShadowFrame";
import { Panel } from "@/components/panel/boxShadowPanel";
import Image from "next/image";

type TechStackItem = {
  name: string;
  description: string;
  image?: string;
};

type TechStack = {
  Frontend: TechStackItem[];
  Backend: TechStackItem[];
  Infrastructure: TechStackItem[];
  Libraries: TechStackItem[];
  "Tools & Services": TechStackItem[];
};

const techStacks: TechStack = {
  Frontend: [
    {
      name: "Next.js",
      description: "React",
      image: "/nextjs.svg",
    },
    {
      name: "TypeScript",
      description: "JavaScript",
      image: "/typescript.svg",
    },
  ],
  Backend: [
    {
      name: "Supabase",
      description: "BaaS",
      image: "/supabase.svg",
    },
  ],
  Infrastructure: [
    {
      name: "Vercel",
      description: "PaaS",
      image: "/vercel.svg",
    },
  ],
  Libraries: [
    {
      name: "AR.js",
      description: "AR",
    },
    {
      name: "Three.js",
      description: "3D graphics",
    },
    {
      name: "Tailwind CSS",
      description: "CSS",
    },
    {
      name: "React Hook Form",
      description: "Form",
    },
    {
      name: "zod",
      description: "Validation",
    },
    {
      name: "zustand",
      description: "State management",
    },
    {
      name: "chart.js",
      description: "Chart",
    },
  ],
  "Tools & Services": [
    {
      name: "GitHub",
      description: "Version control",
    },
    {
      name: "GitHub Copilot",
      description: "AI pair programmer",
    },
    {
      name: "Figma",
      description: "Design",
    },
    {
      name: "Notion",
      description: "Document",
    },
    {
      name: "ChatGPT",
      description: "AI chatbot",
    },
    {
      name: "Photoshop",
      description: "Image editing",
    },
    {
      name: "Illustrator",
      description: "Vector graphics",
    },
    {
      name: "Adobe fonts",
      description: "Font",
    },
    {
      name: "Microsoft Teams",
      description: "Communication",
    },
    {
      name: "WebStorm",
      description: "IDE",
    },
    {
      name: "Visual Studio Code",
      description: "IDE",
    },
  ],
};

const TechStackItem = ({ name, description, image }: TechStackItem) => {
  return (
    <Panel>
      {image ? (
        <div className="flex w-full py-1">
          <div className="grid w-16 place-items-center ">
            <Image src={`/images/tech${image}`} alt="" width={30} height={30} />
          </div>
          <div className="flex flex-wrap items-center py-1">
            <p className="w-full text-sm tracking-wider text-white/80">
              {name}
            </p>
            <p className="text-xs text-theme-black/70">{description}</p>
          </div>
        </div>
      ) : (
        <div className="flex w-full px-3 py-1">
          <div className="flex flex-wrap items-center py-1">
            <p className="w-full text-sm tracking-wider text-white/80">
              {name}
            </p>
            <p className="text-xs text-theme-black/70">{description}</p>
          </div>
        </div>
      )}
    </Panel>
  );
};

const TechnicalStack = () => {
  return (
    <div>
      <Title title="Technical Stack" />
      <Frame>
        {Object.keys(techStacks).map((key) => (
          <div key={key} className="mb-5">
            <p className="racking-widest mt-4 w-full text-center text-xs text-theme-black">
              {key}
            </p>
            {techStacks[key as keyof TechStack].map((item) => (
              <TechStackItem key={item.name} {...item} />
            ))}
          </div>
        ))}
      </Frame>
    </div>
  );
};

export default TechnicalStack;
