import { FC, ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";

type Title = {
  headerType: "top" | "sub";
  title: string;
  children: ReactNode;
};

export const Layout: FC<Title> = ({ headerType, children, title = "" }) => {
  return (
    <div className="h-screen bg-black overflow-hidden">
      <Head>
        <title>{`${title ? title + " - " : ""} 名探偵エナン`}</title>
      </Head>
      {headerType === "top" ? (
        <>
          <header className="h-2/5">
            <Header headerType={headerType} />
          </header>
          <main className="h-3/5 grid place-items-center">
            <div className="h-full w-full max-w-md">{children}</div>
          </main>
        </>
      ) : (
        <>
          <header className="h-12 absolute top-0 left-0 z-40">
            <Header headerType={headerType} />
          </header>
          <main className="main">
            <div className="h-full w-full max-w-md relative">{children}</div>
          </main>
        </>
      )}
    </div>
  );
};
