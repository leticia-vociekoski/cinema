export default function Login() {
  return (
    <main className="w-screen flex flex-col mt-24 gap-5 justify-center items-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium text-slate-700">
          Entre com uma rede social
        </h1>
        <button className="bg-sky-500 rounded-md py-2 px-5 text-white">
          Google
        </button>
      </div>
      <hr className="bg-slate-500 rounded-full w-3/4 h-1" />
      <div className="flex justify-center w-full px-10 gap-10 items-center">
        <form className="flex flex-col justify-center items-center gap-4 flex-1">
          <h1 className="text-2xl font-medium text-slate-700">
            Entre como cliente See It
          </h1>
          <input
            className="w-full py-2 px-4 border border-l-8 border-gray-300 rounded-l-none rounded-md"
            type="text"
            placeholder="Usuário"
          />
          <input
            className="w-full py-2 px-4 border border-l-8 border-gray-300 rounded-l-none rounded-md"
            type="password"
            placeholder="Senha"
          />
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
        <div className="flex flex-col justify-center items-center gap-3 flex-1">
          <h1 className="text-2xl font-medium text-slate-700">
            Criar nova conta
          </h1>
          <button className="py-2 w-full rounded-xl bg-blue-900 text-white">
            Criar uma nova conta
          </button>
        </div>
      </div>
      <hr className="bg-slate-500 w-3/4 h-1 rounded-full " />
    </main>
  );
}
