import { FC, ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";
import UnderButton from "./underButton/UnderButton";
import { BiLoader } from "react-icons/bi";

type Title = {
  headerType: "top" | "sub";
  title: string;
  children: ReactNode;
  hideUnderButton?: boolean;
  isLoading?: boolean;
};

export const Layout: FC<Title> = (props) => {
  return (
    <div className="h-screen overflow-hidden bg-bg-black">
      <Head>
        <title>{`${
          props.title ? props.title + " - " : ""
        } WebAR推理ゲーム`}</title>
      </Head>
      {props.headerType === "top" ? (
        <>
          <header className="h-2/5">
            <Header headerType={props.headerType} />
          </header>
          <main className="grid h-3/5 place-items-center">
            <div className="h-full w-full max-w-md">{props.children}</div>
          </main>
        </>
      ) : (
        <>
          <header className="absolute left-0 top-0 z-40">
            <Header headerType={props.headerType} />
          </header>
          <main className="main">
            <div className="relative h-full w-full max-w-md">
              {props.children}
            </div>
            {props.hideUnderButton ? null : <UnderButton />}
            {props.isLoading ? (
              <div className="fixed bottom-0 left-0 right-0 top-0 z-30 grid place-items-center bg-black/20">
                <BiLoader className="rotationInfinite " size={20} />
              </div>
            ) : (
              ""
            )}
          </main>
        </>
      )}
    </div>
  );
};
