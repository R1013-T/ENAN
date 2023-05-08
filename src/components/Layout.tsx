import { FC, ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";

type Title = {
  headerType: "top" | "sub";
  title: string;
  children: ReactNode;
};

export const Layout: FC<Title> = ({
  headerType,
  children,
  title = "名探偵エナン",
}) => {
  return (
    <div className="h-screen bg-black overflow-hidden">
      <Head>
        <title>{title}</title>
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
          <header className="h-12">
            <Header headerType={headerType} />
          </header>
          <main className="main grid place-items-center">
            <div className="h-full w-full max-w-md">{children}</div>
          </main>
        </>
      )}
    </div>
  );
};
