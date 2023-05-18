import { MovieCard } from "@/components/MovieCard";
import { api } from "@/lib/axios";
import { CompletedSessions, SessionsResponse } from "@/models/interfaces/Sessions";
import { Session } from "@prisma/client";
import { GetStaticProps } from "next";
import { ChangeEvent, useEffect, useState } from "react";

interface HomeProps {
  sessions: CompletedSessions[];
}

export default function Home({ sessions }: HomeProps) {
  const [pageSessions, setPageSessions] = useState<CompletedSessions[]>([])

  async function handleFilterSessions(dateToFilter: Date) {
    console.log(dateToFilter);
    
   const {data} = await api.post<SessionsResponse>("/session/getSessionsByDate", {
      date: dateToFilter.toISOString()
    })
    console.log(data.sessions);
    
    setPageSessions(data.sessions)
  }

  useEffect(()=>{

    setPageSessions(sessions)

  }, [sessions])

  return (
    <main className="flex flex-col gap-10 justify-center py-10 items-center">
      <div className="bg-[#5191C1] px-5  flex gap-4 rounded-3xl ">
        <h1 className="my-4">Programação do dia:</h1>
        <input
          className="bg-[#0A4B75] text-white py-4 px-2 w-32"
          type="date"
          name="day"
          defaultValue={new Date().toString()}
          id="day"
          onChange={(event: ChangeEvent<HTMLInputElement>)=>{
            
            handleFilterSessions(new Date(event.target.value))
          }}
        />
      </div>
      <div className="grid grid-cols-3 gap-5">
        {pageSessions.map(({ movie, room, session }) => (
          <MovieCard movie={movie} room={room} session={session}></MovieCard>
        ))}
      </div>
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
  const {data} = await api.get<SessionsResponse>("/session/getAllSessions")
  // console.log(data.sessions);
  

  // const sessions = await prisma.session.findMany();

  // const treatedSessions: CompletedSessions[] = await Promise.all(
  //   sessions.map(async (session) => {
  //     const currentMovie = await prisma.movie.findUnique({
  //       where: {
  //         id: session.movieId,
  //       },
  //     });
  //     const currentRoom = await prisma.room.findUnique({
  //       where: {
  //         id: session.roomId,
  //       },
  //     })!;
  //     return {
  //       movie: currentMovie!,
  //       room: currentRoom!,
  //       session: {
  //         ...session,
  //         hour: session.hour.toUTCString(),
  //       },
  //     };
  //   })
  // );

  return {
    props: {
      // teste: "dsa"
      sessions: data.sessions,
    },
  };
};
