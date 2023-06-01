import { Movie, Room, Session } from "@prisma/client";

export interface CompletedSessions {
  movie: Movie;
  room: Room;
  session: Session;
}

export interface SessionsResponse {
  sessions: CompletedSessions[];
}
