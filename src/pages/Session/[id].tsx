import { PresentationCard } from "@/components/PresentationCard";
import { api } from "@/lib/axios";
import { CompletedSessions } from "@/models/interfaces/Sessions";
import { Session } from "@prisma/client";
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
  if (currentCompletedSession.session) {
    return (
      <main className="flex flex-col justify-center pb-10 items-center">
        <PresentationCard title={currentCompletedSession.movie.name} />
        <div className="bg-sky-800 flex justify-center items-center">
          <div className="flex flex-col text-white">
            SALA {currentCompletedSession.room.code}
          </div>
        </div>
      </main>
    );
  }
  return <h1>Carregando</h1>;
}
