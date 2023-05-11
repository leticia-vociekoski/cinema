import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    try {
        await prisma.client.deleteMany()
        await prisma.movie.deleteMany()
        await prisma.room.deleteMany()
        await prisma.sell.deleteMany()
        await prisma.session.deleteMany()

        const user = await prisma.client.create({
            data: {
                birth: new Date(),
                cpf: "14428919980",
                name: "Laranja",
            }
        })
        const movie = await prisma.movie.create({
            data: {
                director: "Hayao Miyazaki",
                duration: 125,
                gender: "Anime",
                name: "A Viagem de Chihiro",
                parentalRating: "9.9",
                synapse: "A Viagem de Chihiro é um longa-metragem do Studio Ghibli de 2001 escrito e dirigido por Hayao Miyazaki e vencedor do Oscar de Melhor Animação."
            }
        })
        const room = await prisma.room.create({
            data: {
                capacity: 78,
                code: "2AB",
            }
        })
        const session = await prisma.session.create({
            data: {
                hour: new Date(),
                roomId: room.id,
                movieId: movie.id,
            }
        })
        const sell = await prisma.sell.create({
            data: {
                paymentMethod: "Dinheiro",
                ticketType: "Deficiente",
                clientId: user.id,
                sessionId: session.id
            }
        })
    } catch (error) {
        console.log(error);

    }


}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })