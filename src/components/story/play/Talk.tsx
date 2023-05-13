import { useEffect, useState } from "react";

interface Props {
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
    <div onClick={handleNext} className="absolute bottom-5 left-5 right-5 h-32 rounded bg-black/70 border">
      <div className="p-3 tracking-wide text-sm">
        <div>
          <p className={` ${finishShowText ? "finishTalk" : ""}`}>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Talk;
