// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/lib/prisma";
import { CompletedSessions } from "@/models/interfaces/Sessions";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  sessions: CompletedSessions[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
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

  res.status(200).json({
    sessions: treatedSessions,
  });
}
