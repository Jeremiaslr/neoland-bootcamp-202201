require('dotenv').config()

const { mongoose: { connect, disconnect } } = require('data')
const express = require('express')
const { registerUser, 
        authenticateUser,
        retrieveUser,
        updateUser,
        updateUserPassword,
        deleteUser,
        createNote,
        listNotes,
        listPublicNotes,
        listPublicFromUser,
        retrieveNote,
        updateNote,
        deleteNote
} = require('./handlers')

const cors = require('cors')

const { env: { PORT, MONGODB_URL }} = process


connect(MONGODB_URL)
    .then(() => console.log('db connected'))
    .then(() => {
        const server = express()

        server.use(cors())

        const jsonBodyParser = express.json()

        const api = express.Router()

        api.post('/users', jsonBodyParser, registerUser)
        api.post('/users/auth', jsonBodyParser, authenticateUser)
        api.get('/users', retrieveUser)
        api.patch('/users', jsonBodyParser, updateUser)
        api.patch('/users/change-password', jsonBodyParser, updateUserPassword)
        api.delete('/users', jsonBodyParser, deleteUser)

        api.post('/notes', jsonBodyParser, createNote)
        api.get('/notes', listNotes)
        api.get('/notes/public', listPublicNotes)
        api.get('/users/:userId/notes/public', listPublicFromUser)
        api.get('/notes/:noteId', retrieveNote)
        api.patch('/notes/:noteId', jsonBodyParser, updateNote)
        api.delete('/notes/:noteId', jsonBodyParser, deleteNote)


        server.use('/api', api)

        server.listen(PORT, () => console.log('server started'))
    })