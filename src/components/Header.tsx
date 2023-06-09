import Image from "next/image";
import { VscMenu } from "react-icons/vsc";

interface Props {
  headerType: "top" | "sub";
}

const Header = (props: Props) => {
  return (
    <div className="h-full relative">
      <div className="fixed z-40 top-6 right-6">
        <VscMenu size={25} className="text-gray-300" />
      </div>
      {props.headerType === "top" ? (
        <div className="absolute bottom-12 right-1/2 translate-x-1/2">
          <Image
            src="/images/enan_logo_mini.png"
            alt="enan"
            width="250"
            height="200"
          />
        </div>
      ) : (
        <div className="fixed z-40 top-6 left-6">
          <Image
            src="/images/enan_logo_mini.png"
            alt="enan"
            width="70"
            height="100"
          />
        </div>
      )}
    </div>
  );
};

export default Header;
