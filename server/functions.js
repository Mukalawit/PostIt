const prisma = require('./client');

async function createUser(user){

    return await prisma.user.create({
        data:user
    })
}

module.exports = {
    createUser,
}