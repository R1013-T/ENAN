import { useRouter } from "next/router";
import Item from "./Item";
import { useEffect } from "react";

const UnderButton = () => {
  const router = useRouter();

  const scanPage = () => {
    const params = {
      id: router.query.id as string,
    };
    const urlSearchParam = new URLSearchParams(params).toString();

    document.location.href = "/scan/?" + urlSearchParam;
  };

  return (
    <div className="fixed z-50 bottom-7 right-1/2 translate-x-1/2 w-11/12 rounded-2xl p-2 flex items-center justify-around bg-theme-black/50 backdrop-blur">
      <Item name="home" />
      <Item name="story" />
      <div className="bg-theme-red rounded-full p-2 -mx-3" onClick={scanPage}>
        <img
          src="/images/underButton/scan.svg"
          className={`w-8 h-8 opacity-60 ${
            router.pathname === "/scan" ? "scanIconActive" : ""
          }`}
        />
      </div>
      <Item name="hint" />
      <Item name="end" />
    </div>
  );
};

export default UnderButton;
