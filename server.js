const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '2f124280de814d948ce31c29c507a043',
    captureUncaught: true,
    captureUnhandledRejections: true
})


const app = express()
app.use(rollbar.errorHandler())

let students = []

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('Student added successfully', {author: 'Scott', type: 'manual entry'})

    res.status(200).send(students)
})



const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}!`))
