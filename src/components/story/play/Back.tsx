interface Props {
  person_id: number;
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
        <img
          src={`/images/characters/${props.person_id}.png`}
          alt=""
          className="absolute bottom-0 -left-24 w-full"
        />
      </div>
    </div>
  );
};

export default Back;
