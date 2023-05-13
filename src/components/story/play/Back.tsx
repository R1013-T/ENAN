const Back = () => {
  return (
    <div className="absolute h-screen w-full">
      <div className="relative w-full h-full">
        <img
          src="/images/story_back.jpg"
          alt=""
          className="h-screen object-cover absolute top-0 left-0 w-full"
        />
        <img
          src="/images/characters/police.png"
          alt=""
          className="absolute bottom-0 -left-24 w-full"
        />
      </div>
    </div>
  );
};

export default Back;
