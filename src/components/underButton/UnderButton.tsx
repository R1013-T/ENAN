import { useRouter } from "next/router";
import Item from "./Item";
import { useSounds } from "@/hooks/useSounds";

const UnderButton = () => {
  const router = useRouter();
  const { click_scan } = useSounds();

  const scanPage = () => {
    const params = {
      id: router.query.id as string,
    };
    const urlSearchParam = new URLSearchParams(params).toString();

    click_scan();
    setTimeout(() => {
      document.location.href = "/scan/?" + urlSearchParam;
    }, 300);
  };

  return (
    <div className="h-15 boxShadow fixed bottom-6 left-6 right-6 z-50 flex items-center justify-around rounded-md bg-theme-black/20 p-2 backdrop-blur-md">
      <Item name="home" />
      <Item name="story" />
      <div
        className="-mx-3 h-12 rounded-full bg-theme-red p-1.5"
        onClick={scanPage}
      >
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
