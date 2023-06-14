import { Input } from "@/components/Input";

export default function Register() {
  return (
    <main className="flex flex-col p-10 justify-center items-center">
      <h1 className="text-2xl text-slate-700 font-bold">Cadastre-se</h1>
      <form className="flex flex-col justify-center items-center gap-5 w-full">
        <Input placeholder="Nome completo" />
        <Input placeholder="Email de cadastro" type="email" />
        <Input placeholder="Confirmar email de cadastro" type="email" />
        <Input placeholder="Senha" type="password" />
        <Input placeholder="Confirmar senha" type="password" />
        <Input placeholder="Aniversário" type="date" />
        <Input placeholder="CPF" type="text" />
      </form>
    </main>
  );
}
