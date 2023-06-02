import { PresentationCard } from "@/components/PresentationCard";
import { api } from "@/lib/axios";
import { CompletedSessions } from "@/models/interfaces/Sessions";
import { Session } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// interface SessionProps {
//   room: Room;
//   session: Session;
//   movie: Movie;
// }

export default function Session() {
  // { movie, room, session }: SessionProps
  const [currentCompletedSession, setCurrentCompletedSession] = useState(
    {} as CompletedSessions
  );

  const { query } = useRouter();
  useEffect(() => {
    if (query.id) {
      getCurrentUniqueSession();
    }
  }, [query]);

  async function getCurrentUniqueSession() {
    const { data } = await api.post<CompletedSessions>(
      "/session/getUniqueSession",
      {
        id: query.id,
      }
    );

    setCurrentCompletedSession(data);
  }

  const timeParser = new Intl.DateTimeFormat("pt-br", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (currentCompletedSession.session) {
    return (
      <main className="flex flex-col justify-center pb-10 items-center">
        <PresentationCard title={currentCompletedSession.movie.name} />
        <div className="bg-sky-800 flex justify-center items-center text-white mt-5 rounded-3xl w-1/2">
          <div className="flex flex-col justify-center items-center h-10 px-3">
            SALA {currentCompletedSession.room.code}
          </div>
          <div className="flex flex-col gap-2 flex-1 px-3 py-2 bg-blue-950 ">
            <h1>Horários Hoje</h1>
            <span className="flex justify-center items-center rounded-xl py-1 px-2 bg-sky-500 w-fit">
              {timeParser.format(
                new Date(currentCompletedSession.session.hour)
              )}
            </span>
          </div>
          <div className="flex justify-center items-center text-center rounded-r-3xl rounded-e-3xl bg-slate-900 flex-1  py-7 px-2">
            <h1>Comprar ingressos no navegador</h1>
          </div>
        </div>
        <div className="flex flex-col justify-center px-5 items-start max-w-6xl gap-5">
          <h1 className="text-3xl font-semibold">Sinopse</h1>
          <hr className="bg-black h-1  w-full rounded-lg" />
          <p className="text-xl">{currentCompletedSession.movie.synapse}</p>
          <div className="flex gap-5">
            <img
              className="w-60 "
              src={`https://image.tmdb.org/t/p/w500/${currentCompletedSession.movie.posterPath}`}
              alt={currentCompletedSession.movie.name}
            />
            <div className="flex flex-col">
              <h1 className="font-semibold text-2xl">Ficha técnica</h1>
            </div>
          </div>
        </div>
      </main>
    );
  }
  return <h1>Carregando</h1>;
}
