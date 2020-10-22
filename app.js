const request = require('request')
const geoCode = require('./geocode.js')
const geocode = require('./geocode.js')
const timecast = require('./time.js')
const time = require('./time.js')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const port = prcoess.env.PORT || 8080

const app = express()
const viewPath = path.join(__dirname,'/templates/views')
const partial = path.join(__dirname, '/templates/partials')
const staticPath = path.join(__dirname, '/templates/views')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partial)

app.use(express.static(staticPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Time',
        name: 'Pratush Rai'
    })
})

app.get('/about', (req, res) => { 
    res.render('about', {
        title: 'About',
        name: 'Pratush Rai'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Pratush Rai'
    })
})

app.get('/time', (req, res) => {
    if(req.query.address){
       geoCode(req.query.address, (error, {latitude, longitude} = {}) => {
           if(error){
               res.send({error: error})
           }
           else{

               timecast(latitude, longitude, (error, {time} = {}) => {
               if(error){
                   res.send({error: error})
               }
               else{
                   res.send({time: time})
               }
               })
           }
       })
    }
    else{
        res.send({error: 'You Should Provide A Location'})
    }
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        message: 'Page Not Found',
        name: 'Pratush Rai'
    })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})