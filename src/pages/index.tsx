import { MovieCard } from "@/components/MovieCard";
import { prisma } from "@/lib/prisma";
import { CompletedSessions } from "@/models/interfaces/Sessions";
import { formatDate } from "@/utils/DateParser";
import { GetStaticProps } from "next";
import { useEffect } from "react";

interface HomeProps {
  sessions: CompletedSessions[];
}

export default function Home({ sessions }: HomeProps) {
  return (
    <main className="flex flex-col gap-10 justify-center py-10 items-center">
      <div className="bg-[#5191C1] px-5  flex gap-4 rounded-3xl ">
        <h1 className="my-4">Programação do dia:</h1>
        <input
          className="bg-[#0A4B75] text-white py-4 px-2 w-32"
          type="date"
          name="day"
          id="day"
        />
      </div>
      <div className="grid grid-cols-3 gap-5">
        {sessions.map(({ movie, room, session }) => (
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
