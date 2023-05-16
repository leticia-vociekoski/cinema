import { formatDate } from "@/utils/DateParser";
import { Movie, Room, Session } from "@prisma/client";
import { useEffect, useState } from "react";

interface MovieCardProps {
  movie: Movie;
  session: Session;
  room: Room;
}

export function MovieCard({ movie, session, room }: MovieCardProps) {
  const [sessionTypes, setSessionTypes] = useState<string[]>();

  useEffect(() => {
    setSessionTypes(JSON.parse(session.sessionTypes));
  }, []);

  return (
    <section className="bg-[#46484B] gap-3 group cursor-pointer hover:opacity-80 text-blue-50 max-w-xs flex flex-col justify-start rounded-lg w-fit">
      <img
        className="object-cover w-full transition-all "
        src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
        alt="Não existe ainda"
      />
      <div className="px-4 pb-2 flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          {sessionTypes?.map((type) => (
            <span className=" bg-[#8CA315] px-2 py-1  font-bold text-xs rounded-xl ">
              {type}
            </span>
          ))}
        </div>
        <h1 className="text-xl font-bold">{movie.name}</h1>
        <div className="flex w-full justify-between items-center">
          <div className="flex justify-center items-center gap-3">
            {/* <p className="font-bold text-sm">Nota:</p> */}
            <span className="text-red-100 bg-purple-600 rounded-lg p-2 font-bold text-xl">
              {movie.parentalRating}
            </span>
          </div>
          <span className="font-bold text-lg">{formatDate(session.hour)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold text-sm">
            Duração: {movie.duration} Min
          </span>
          <span className="font-bold text-sm">Sala: {room.code}</span>
        </div>
        <p className="line-clamp-2 font-semibold bg-slate-600 rounded-lg px-2 py-1 opacity-90">
          {movie.synapse}
        </p>
      </div>
    </section>
  );
}
