interface Props {
  storyId: string | string[];
}

const Play = (props: Props) => {
  return (
    <div>
      <p>{props.storyId}</p>
    </div>
  );
};

export default Play;
