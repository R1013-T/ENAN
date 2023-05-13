import { useEffect, useState } from "react";

interface Props {
  person: string;
  talkText: string;
}

const Talk = (props: Props) => {
  const [text, setText] = useState("");
  const [finishShowText, setFinishShowText] = useState(false);

  useEffect(() => {
    showText();
  }, []);

  const showText = () => {
    setFinishShowText(false);
    let typeSpeed = 80;
    let i = 0;

    let typeInterval = setInterval(() => {
      if (i < props.talkText.length) {
        setText(props.talkText.slice(0, i + 1));
        i++;
      } else {
        setTimeout(() => {
          setFinishShowText(true);
        }, 500);
        clearInterval(typeInterval);
      }
    }, typeSpeed);
  };

  const handleNext = () => {
    console.log("next")
  }

  return (
    <div onClick={handleNext} className="absolute bottom-5 left-5 right-5 h-36 rounded bg-black/70 border">
      <div className="p-3 tracking-wide">
        <div>
          <p className="text-xs mb-1" >{props.person}</p>
          <p className={`text-sm ${finishShowText ? "finishTalk" : ""}`}>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Talk;
