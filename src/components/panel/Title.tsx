interface Props {
  title: string;
}

const Title = (props: Props) => {
  return (
    <h1 className="mx-6 mt-16 mb-5 text-xl tracking-widest boxShadow text-center py-2 rounded-md">
      {props.title}
    </h1>
  );
};

export default Title;
