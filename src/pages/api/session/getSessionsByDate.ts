// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/lib/prisma";
import { CompletedSessions } from "@/models/interfaces/Sessions";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

type Data = {
  sessions: CompletedSessions[];
};

const getSessionsByDateParser = z.object({
  date: z.string()
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    try {
      
      if (req.method !== "POST") {
        return res.status(405)
      }
      
      const {date: DateInString } = getSessionsByDateParser.parse(req.body)
      const dateInLastTime = new Date(DateInString)
      
      const date = new Date(DateInString)
      
      date.setUTCHours(0)
      date.setUTCMinutes(0)
      date.setUTCMilliseconds(0)
      date.setUTCSeconds(0)
      dateInLastTime.setUTCHours(23)
      dateInLastTime.setUTCMinutes(59)
      dateInLastTime.setUTCMilliseconds(999)
      dateInLastTime.setUTCSeconds(59)
      

      
      const sessions = await prisma.session.findMany({
        where: {
          hour: {
            gte:date,
            lte: dateInLastTime
          }
        }
      });
      
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
 return res.status(200).json({
    sessions: treatedSessions,
  });
} catch (error) {
  console.log(error);
  
  return res.status(400);
}

  
}
