import { MovieDbResponse } from "@/models/interfaces/MovieDbResponse";
import { PrismaClient } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
const prisma = new PrismaClient();
async function main() {
  try {
    // await prisma.client.deleteMany()
    // await prisma.movie.deleteMany()
    // await prisma.room.deleteMany()
    // await prisma.sell.deleteMany()
    // await prisma.session.deleteMany()

    const movies = await axios.get<MovieDbResponse>(
      "https://api.themoviedb.org/3/trending/movie/week",
      {
        params: {
          api_key: "869f0db30f3cdfad3f8b4bc91b4eca0d",
        },
      }
    );
    const savedMovies = Promise.all(
      movies.data.results.map(async (movie) => {
        return await prisma.movie.create({
          data: {
            director: "diretor aleatorio",
            duration: 125,
            name: movie.title,
            parentalRating: "12",
            synapse: movie.overview,
            posterPath: movie.poster_path,
          },
        });
      })
    );
    const user = await prisma.client.create({
      data: {
        birth: new Date(),
        cpf: "14428919980",
        name: "Laranja",
      },
    });
    // const movie = await prisma.movie.create({
    //   data: {
    //     director: "Hayao Miyazaki",
    //     duration: 125,
    //     name: "A Viagem de Chihiro",
    //     parentalRating: "10",
    //     posterPath: ""
    //     synapse:
    //       "A Viagem de Chihiro é um longa-metragem do Studio Ghibli de 2001 escrito e dirigido por Hayao Miyazaki e vencedor do Oscar de Melhor Animação.",
    //   },
    // });
    const room = await prisma.room.create({
      data: {
        capacity: 78,
        code: "2AB",
      },
    });
    // const session = await prisma.session.create({
    //   data: {
    //     hour: new Date(),
    //     roomId: room.id,
    //     movieId: movie.id,
    //   },
    // });
    Promise.all(
      (await savedMovies).map(async (movie) => {
        const currentDate = new Date();
        currentDate.setHours(Math.round(Math.random()) * 100);
        await prisma.session.create({
          data: {
            hour: currentDate,
            sessionTypes: '["3D", "DUB"]',
            movieId: movie.id,
            roomId: room.id,
          },
        });
      })
    );
    // const sell = await prisma.sell.create({
    //   data: {
    //     paymentMethod: "Dinheiro",
    //     ticketType: "Deficiente",
    //     clientId: user.id,
    //     sessionId: session.id,
    //   },
    // });
  } catch (error) {
    console.log(error);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
