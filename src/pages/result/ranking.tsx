import { useRouter } from "next/router";
import { useEffect } from "react";

const Ranking = () => {

  const router = useRouter();

  useEffect(() => {
    console.log(router.pathname);
  }, []);

  return <div>Ranking</div>;
};

export default Ranking;
