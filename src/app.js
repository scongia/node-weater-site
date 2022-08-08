const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Sergio Congia'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Sergio Congia'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        helpText: 'This is some helpful text',
        name:'Sergio Congia'
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    const address = req.query.address
    // res.send(
    //     {
    //         forecast: 'weather is warm',
    //         location: 'Dubai',
    //         address: address
    //     }
    // )
    geocode(address,(error,{latitude, longitude, location} = {}) =>{
        if(error){
            // return console.log('Error: ', error)
            return res.send({error})
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send(
                {
                    forecast: forecastData,
                    location,
                    address: address
                }
            )
        })
    })

})

app.get('/products',(req,res)=>{   
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Error',
        errorMessage: 'Help article not found',
        name:'Sergio Congia'})
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 'Error',
        errorMessage: 'Page not found',
        name:'Sergio Congia'})
})

app.listen(port, ()=>{
    console.log('Server is running on port ' + port)
})