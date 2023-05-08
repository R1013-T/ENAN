import { ReactNode } from "react";
import Link from "next/link";
import { Layout } from "@/components/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "@/utils/validationSchema";
import { useRouter } from "next/router";
interface TopForm {
  name: string;
}

const Index = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TopForm>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data: TopForm) => {
    // if (errors.name) return;
    // // TODO: ユーザー名を保存する
    // // TODO: ユーザー名を保存したら、ストーリー画面に遷移する
    // router.push("/story");
  };

  return (
    <Layout headerType="top" title="名探偵エナン">
      <div className="h-full relative">
        <form
          className="absolute bottom-5 w-full px-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label
            htmlFor="name"
            className="block text-theme-black text-xs py-2 mb-1"
          >
            ユーザーネーム
          </label>
          <input
            id="name"
            type="text"
            className="w-full bg-transparent border border-theme-black text-base py-3 px-3 rounded outline-none tracking-wider placeholder:tracking-wider placeholder:text-sm"
            placeholder="User Name"
            {...register("name")}
          />
          <p className="text-xs text-red-300 h-1 py-5 mb-5">
            {errors.name?.message as ReactNode}
          </p>
          <button
            className={`w-full bg-theme-red py-2 mb-5 rounded tracking-widest text-lg transition-all ${
              (errors.name?.message as ReactNode) ? "opacity-40" : ""
            } `}
            type="submit"
          >
            START
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Index;
