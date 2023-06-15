import { Input } from "@/components/Input";

export default function Register() {
  return (
    <main className="flex flex-col p-10 justify-center gap-10 items-center bg-gray-50">
      <h1 className="text-2xl text-slate-700 font-bold">Cadastre-se</h1>
      <form className="flex flex-col justify-center items-center gap-5 w-full max-w-3xl bg-white p-10 rounded-lg border border-gray-300">
        <Input
          id="name"
          labelName="Nome completo"
          placeholder="Fulado de tal"
        />
        <Input
          id="email"
          labelName="Email"
          placeholder="FulanoDeTal@email.com"
          type="email"
        />
        <Input
          id="confEmail"
          labelName="Confirmar email"
          placeholder="FulanoDeTal@email.com"
          type="email"
        />
        <Input
          id="password"
          labelName="Senha"
          placeholder="**********"
          type="password"
        />
        <Input
          id="confPassword"
          labelName="Confirmar senha"
          placeholder="**********"
          type="password"
        />
        <Input id="birthdate" labelName="Aniversário" type="date" />
        <Input
          id="cpf"
          labelName="CPF"
          placeholder="123.123.123-12"
          type="text"
        />
        <button
          className="py-3 w-full flex justify-center items-center rounded-xl bg-blue-900 text-white font-bold hover:opacity-80 transition-all"
          type="submit"
        >
          Registrar-se
        </button>
      </form>
    </main>
  );
}
