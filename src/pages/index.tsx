import { prisma } from "@/lib/prisma";
import { CompletedSessions } from "@/models/interfaces/Sessions";
import { formatDate } from "@/utils/DateParser";
import { GetStaticProps } from "next";
import { useEffect } from "react";

interface HomeProps {
  sessions: CompletedSessions[];
}

export default function Home({ sessions }: HomeProps) {
  useEffect(() => {
    console.log(sessions);
  }, []);
  return (
    <main className="flex flex-col gap-10 justify-center items-center">
      <h1>Filmes</h1>
      {sessions.map(({ movie, room, session }) => (
        <section className="bg-slate-500 gap-3 group cursor-pointer hover:opacity-80 text-blue-50 max-w-xs flex flex-col justify-center items-start p-4 rounded-lg w-fit">
          <img
            className="object-cover w-full transition-all "
            src="https://upload.wikimedia.org/wikipedia/pt/3/3b/A_Viagem_de_Chihiro.JPG"
            alt="Não existe ainda"
          />
          <h1 className="text-xl font-bold">{movie.name}</h1>
          <div className="flex w-full justify-between items-center">
            <div className="flex justify-center items-center gap-3">
              <p className="font-bold text-sm">Nota:</p>
              <span className="text-red-100 bg-purple-600 rounded-lg p-2 font-bold text-xl">
                {movie.parentalRating}
              </span>
            </div>
            <span className="font-bold text-xl">
              {formatDate(session.hour)}
            </span>
          </div>
          <span className="font-bold text-sm">
            Duração: {movie.duration} Min
          </span>
          <p className="line-clamp-2 font-semibold bg-slate-600 rounded-lg px-2 py-1 opacity-90">
            {movie.synapse}
          </p>
        </section>
      ))}
    </main>
  );
}

interface StaticPropsReturn {
  sessions: CompletedSessions[];
}

export const getStaticProps: GetStaticProps<StaticPropsReturn> = async () => {
  // const dateParse = new Intl.DateTimeFormat("pt-br", {
  //   dateStyle: 'full'
  // })

  const sessions = await prisma.session.findMany();

  const treatedSessions: CompletedSessions[] = await Promise.all(
    sessions.map(async (session) => {
      const currentMovie = await prisma.movie.findUnique({
        where: {
          id: session.movieId,
        },
      });
      const currentRoom = await prisma.room.findUnique({
        where: {
          id: session.roomId,
        },
      })!;
      return {
        movie: currentMovie!,
        room: currentRoom!,
        session: {
          ...session,
          hour: session.hour.toUTCString(),
        },
      };
    })
  );

  return {
    props: {
      sessions: treatedSessions,
    },
  };
};
