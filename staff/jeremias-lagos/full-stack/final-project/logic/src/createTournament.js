const { models: { User, Tournament } } = require('data')
const { validators: { validateId, validateString, validateDate } } = require('commons')

function createTournament(userId, title, description, location, image, date) {
    validateId(userId, 'user')
    validateString(title, 'title')
    validateString(description, 'description')
    validateString(location, 'location')
    validateString(image, 'image')
    validateDate(date, 'date')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)
            if (user.role !== 'admin') throw new Error(`user with id ${userId} is not an admin`)

            return Tournament.create({ user, title, description, location, image, date })
                .then(tournament => { })
        })
}

module.exports = createTournament