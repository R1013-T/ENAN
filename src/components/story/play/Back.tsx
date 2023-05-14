interface Props {
  person_id: number;
  showTalk: boolean;
  next: boolean;
}

const Back = (props: Props) => {
  return (
    <div className="absolute h-screen w-full">
      <div className="relative w-full h-full">
        <img
          src="/images/story_back.jpg"
          alt=""
          className="h-screen object-cover absolute top-0 left-0 w-full"
        />
        {props.person_id && props.showTalk ? (
          <img
            src={`/images/characters/${props.person_id}.png`}
            alt=""
            className={`fadeIn opacity-0 absolute bottom-0 -left-24 w-full ${props.next ? "fadeOut" : ""}`}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Back;
