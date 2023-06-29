interface Props {
  title: string;
}

const Title = (props: Props) => {
  return (
    <h1 className="boxShadow mx-6 mb-5 mt-16 rounded-md py-2 text-center text-xl tracking-widest">
      {props.title}
    </h1>
  );
};

export default Title;
