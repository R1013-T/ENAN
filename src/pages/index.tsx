import Link from "next/link";
import { Layout } from "@/components/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "@/utils/validationSchema";
import { useRouter } from "next/router";
import { createUser } from "@/hooks/supabase/useUserFunctions";
import { v4 as uuidv4 } from "uuid";
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

  const onSubmit = async (data: TopForm) => {
    if (errors.name) return;
    console.log(data.name);

    const id = uuidv4();

    await createUser(id, data.name)
      .then(() => {
        console.log("success");
        console.log(id);

        router.push({
          pathname: "/story",
          query: { id: id },
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Layout headerType="top" title="">
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
            {errors.name?.message}
          </p>
          <button
            className={`w-full bg-theme-red py-2 mb-5 rounded tracking-widest text-lg transition-all ${
              errors.name?.message ? "opacity-40" : ""
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
