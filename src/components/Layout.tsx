import { FC, ReactNode, useEffect } from "react";
import Head from "next/head";
import Header from "./Header";
import UnderButton from "./underButton/UnderButton";

type Title = {
  headerType: "top" | "sub";
  title: string;
  children: ReactNode;
  hideUnderButton?: boolean;
};

export const Layout: FC<Title> = (props) => {
  useEffect(() => {
    console.log("hideUnderBUtton :", props.hideUnderButton);
  }, [props.hideUnderButton]);

  return (
    <div className="h-screen bg-black overflow-hidden">
      <Head>
        <title>{`${props.title ? props.title + " - " : ""} 名探偵エナン`}</title>
      </Head>
      {props.headerType === "top" ? (
        <>
          <header className="h-2/5">
            <Header headerType={props.headerType} />
          </header>
          <main className="h-3/5 grid place-items-center">
            <div className="h-full w-full max-w-md">{props.children}</div>
          </main>
        </>
      ) : (
        <>
          <header className="absolute top-0 left-0 z-40">
            <Header headerType={props.headerType} />
          </header>
          <main className="main">
            <div className="h-full w-full max-w-md relative">{props.children}</div>
            {props.hideUnderButton ? null : <UnderButton />}
          </main>
        </>
      )}
    </div>
  );
};
