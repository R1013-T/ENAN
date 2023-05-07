import Link from "next/link";

const Story = () => {
  return (
    <div>
      <h1>#story</h1>
      <Link href={"/dashboard"}>dashboard</Link>
    </div>
  );
}

export default Story;