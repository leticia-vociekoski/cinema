import { Input } from "@/components/Input";
import Link from "next/link";

export default function Login() {
  return (
    <main className="w-screen flex flex-col mt-24 gap-5 justify-center items-center">
      <div className="flex flex-col max-sm:w-full max-sm:px-10 gap-4">
        <h1 className="text-2xl font-medium text-slate-700">
          Entre com uma rede social
        </h1>
        <button className="bg-sky-500 rounded-md py-2 px-5 text-white">
          Google
        </button>
      </div>
      <hr className="bg-slate-500 rounded-full w-3/4 h-1" />
      <div className="flex justify-center w-full px-10 gap-10 items-center max-sm:flex-col">
        <form className="flex flex-col max-sm:w-full justify-center items-center gap-4 flex-1">
          <h1 className="text-2xl font-medium text-slate-700">
            Entre como cliente See It
          </h1>
          <Input type="text" placeholder="Usuário" />
          <Input placeholder="Senha" type="password" />
          <p>
            <a className="text-sky-500" href="#">
              Políticas de serviço
            </a>{" "}
            e{" "}
            <a className="text-sky-500" href="#">
              Termos de Serviço
            </a>
          </p>
          <button
            className="py-2 w-full rounded-xl bg-blue-900 text-white"
            type="submit"
          >
            Entrar
          </button>
        </form>
        <div className="flex flex-col max-sm:w-full justify-center items-center gap-3 flex-1">
          <h1 className="text-2xl font-medium text-slate-700">
            Criar nova conta
          </h1>
          <Link
            href={"/auth/register"}
            className="py-2 w-full flex justify-center items-center rounded-xl bg-blue-900 text-white"
          >
            Criar uma nova conta
          </Link>
        </div>
      </div>
      <hr className="bg-slate-500 w-3/4 h-1 rounded-full " />
    </main>
  );
}
