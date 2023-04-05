const express = require('express');
const morgan = require('morgan')
const app =  express(); 

// const userRoute = require('./routes/userRoutes')
const eventRoute = require('./routes/eventRoutes')
const ticketRoute = require('./routes/ticketRoutes')
const userRoute = require('./routes/userRoutes')

app.use(express.json())

app.use(morgan('dev'));


app.use('/api/v1/users', userRoute)
app.use('/api/v1/events', eventRoute)
app.use('/api/v1/tickets', ticketRoute)





module.exports = app;