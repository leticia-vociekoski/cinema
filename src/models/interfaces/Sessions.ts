import { Movie, Room, Session, SessionHourInString } from "@prisma/client";

export interface CompletedSessions {
  movie: Movie;
  room: Room;
  session: SessionHourInString;
}
