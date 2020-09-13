const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const port = process.env.PORT || 3000
const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ahmed Wahdan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ahmed Wahdan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Ahmed Wahdan",
        msg: "This is help message"
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'Location should be provided.'
        })
    }
    geocode(address, (error, {latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }
      
        forecast(latitude, longitude, (error, forecastData) => {
          if(error){
            return res.send({ error })
          } 
          
          return res.send({ 
              location : location,
              forecast: forecastData,
              address: address
           })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        msg: 'Help artilce not found.',
        name: 'Wahdan'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        msg: 'Page not found',
        name: 'Wahdan'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})
