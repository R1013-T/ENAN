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
    <div className="fixed z-50 bottom-6 right-6 left-6 h-16 rounded-md p-2 flex items-center justify-around bg-theme-black/20 backdrop-blur-md boxShadow">
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
      <Item name="progress" />
      <Item name="end" />
    </div>
  );
};

export default UnderButton;
