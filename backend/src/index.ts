// I spam here whichever small part of code i need to "test" quickly

import prisma from "./client";

// Testing if incredibly intuitive connections in prisma do really work
const pokus = async () => {
  var pokus = await prisma.userDetails.findUnique({
    where: {
      username: "admin",
    },
    select: {
      credentials: {
        select: {
          passwordHash: true,
        }
      }
    }
  })
  console.log(pokus);
}

pokus()