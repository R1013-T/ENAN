import Image from "next/image";

interface Props {
  headerType: "top" | "sub";
}

const Header = (props: Props) => {
  return (
    <div className="relative h-full">
      {props.headerType === "top" ? (
        <div className="absolute -bottom-7 right-1/2 flex translate-x-1/2 flex-wrap items-center justify-center">
          <Image
            src="/images/webar.svg"
            alt="WebAR推理ゲーム"
            width="250"
            height="200"
            className="mb-10 w-full"
          />
          <Image
            src="/images/enan_icon.png"
            alt={"enan_icon"}
            width="130"
            height="130"
          />
        </div>
      ) : (
        <div className="fixed left-6 top-7 z-40">
          <Image
            src="/images/webar.svg"
            alt="WebAR推理ゲーム"
            width="100"
            height="130"
          />
        </div>
      )}
    </div>
  );
};

export default Header;
