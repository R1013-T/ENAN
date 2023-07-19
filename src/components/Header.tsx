import Image from "next/image";
import { VscMenu } from "react-icons/vsc";

interface Props {
  headerType: "top" | "sub";
}

const Header = (props: Props) => {
  return (
    <div className="relative h-full">
      <div className="fixed right-6 top-6 z-40">
        <VscMenu size={25} className="text-gray-300" />
      </div>
      {props.headerType === "top" ? (
        <div className="absolute -bottom-7 right-1/2 flex translate-x-1/2 flex-wrap items-center justify-center">
          <Image
            src="/images/webar.png"
            alt="WebAR推理ゲーム"
            width="250"
            height="200"
            className="mb-8 w-full"
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
            src="/images/webar.png"
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
