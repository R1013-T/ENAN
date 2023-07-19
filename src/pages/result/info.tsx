import { Layout } from "@/components/Layout";
import CreatedBy from "@/components/result/CreatedBy";
import Resources from "@/components/result/Resources";

const Info = () => {
  return (
    <Layout headerType="sub" title="情報" hideUnderButton={true}>
      <div className="mt-7 h-screen w-full overflow-y-scroll pb-10">
        <CreatedBy />
        <Resources />
      </div>
    </Layout>
  );
};

export default Info;
