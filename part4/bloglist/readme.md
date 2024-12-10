so secrets are going to go in
utils/config.js

all routes to go in controllers/notes.js

and we have to add this in app.js file

const notesRouter = require('./controllers/notes')
app.use('/api/notes', notesRouter)

middleware has been moved to a new utils/middleware.js module
