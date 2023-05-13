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
    <div className="fixed z-50 bottom-6 right-1/2 translate-x-1/2 w-11/12 h-16 rounded-2xl p-2 flex items-center justify-around bg-theme-black/20 backdrop-blur-md">
      <Item name="home" />
      <Item name="story" />
      <div className="bg-theme-red rounded-full p-1.5 -mx-3" onClick={scanPage}>
        <img
          src={`/images/underButton/scan${
            router.pathname === "/scan" ? "_active" : ""
          }.svg`}
          className={`w-9 opacity-90 ${
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
