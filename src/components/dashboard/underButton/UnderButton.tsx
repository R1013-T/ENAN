const UnderButton = () => {
  return (
    <div className="fixed z-50 bottom-7 right-1/2 translate-x-1/2 w-11/12 rounded-2xl p-2 flex items-center justify-around bg-theme-black/50 backdrop-blur">
      <img src="/images/underButton/home_fill.svg" className="w-6" />
      <img src="/images/underButton/stories.svg" className="w-6" />
      <div className="bg-theme-red rounded-full p-2 -mx-3">
        <img
          src="/images/underButton/scan.svg"
          className="scanIconActive w-8 h-8"
        />
      </div>
      <img src="/images/underButton/hints.svg" className="w-6" />
      <img src="/images/underButton/end.svg" className="w-5" />
    </div>
  );
};

export default UnderButton;
