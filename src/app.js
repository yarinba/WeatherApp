const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require("request")
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicPath = path.join(__dirname, '../public/')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Yarin Barnes'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yarin Barnes'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title:'Help',
        msg: 'help msg',
        name:'Yarin Barnes'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude , longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
                
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
        
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide search terms'
         })
    } 
    res.send({
        products: []
     })

    console.log(req.query)
})

app.get('/help/*', (req,res) => {
    res.render('404page', {
        title:'404 Page',
        name:'Yarin Barnes',
        errorMsg: 'Help article not found.'
    })
})

app.get('*', (req,res) => {
    res.render('404page', {
        title:'404 Page',
        name:'Yarin Barnes',
        errorMsg: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('server is up in port 3000')
})