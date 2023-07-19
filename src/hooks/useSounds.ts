import useSound from "use-sound";

export const useSounds = () => {
  const [playStart] = useSound("/sounds/open.wav");
  const [playClick] = useSound("/sounds/click.mp3");
  const [storyStart] = useSound("/sounds/story_start.mp3");
  const [person_detail] = useSound("/sounds/person_detail.mp3");
  const [clue_detail] = useSound("/sounds/clue_detail.mp3");
  const [click_scan] = useSound("/sounds/click_scan.mp3");
  const [scanning] = useSound("/sounds/scanning.wav");
  const [incorrect] = useSound("/sounds/incorrect.mp3");
  const [finish] = useSound("/sounds/finish.mp3");

  return {
    storyStart,
    playStart,
    playClick,
    person_detail,
    clue_detail,
    click_scan,
    scanning,
    incorrect,
    finish,
  };
};
