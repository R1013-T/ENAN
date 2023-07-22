interface Props {
  person_id: number;
  showTalk: boolean;
  next: boolean;
}

const Back = (props: Props) => {
  return (
    <div className="absolute h-screen w-full">
      <div className="relative h-full w-full">
        <img
          src="/images/story_back.jpg"
          alt=""
          className="absolute left-0 top-0 h-screen w-full object-cover"
        />
        {props.person_id && props.showTalk ? (
          <img
            src={`/images/characters/${props.person_id}.png`}
            alt=""
            className={`fadeIn absolute -left-24 bottom-0 w-full opacity-0 ${
              props.next ? "fadeOut" : ""
            }`}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Back;
