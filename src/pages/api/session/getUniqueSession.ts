// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/lib/prisma";
import { CompletedSessions } from "@/models/interfaces/Sessions";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

// type Data = {
//   sessions: CompletedSessions[];
// };

const getSessionsByDateParser = z.object({
  id: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompletedSessions>
) {
  try {
    if (req.method !== "POST") {
      return res.status(405);
    }

    const { id } = getSessionsByDateParser.parse(req.body);

    const session = await prisma.session.findUnique({
      where: {
        id,
      },
      include: {
        movie: true,
        room: true,
      },
    });

    if (!session) {
      return res.status(403).end();
    }

    return res.status(200).json({
      movie: session.movie,
      room: session.room,
      session: {
        hour: session.hour,
        id: session.id,
        movieId: session.movieId,
        roomId: session.roomId,
        sessionTypes: session.sessionTypes,
      },
    });

    // return res.status(200).json({
    //   sessions: session,
    // });
  } catch (error) {
    console.log(error);

    return res.status(400);
  }
}
