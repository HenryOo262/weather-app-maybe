require('dotenv').config()

const express    = require('express')
const axios      = require('axios')
const bodyParser = require('body-parser')
const app        = express()

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    // get the weather data of city 
    axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=16.871311&lon=96.199379&appid=${process.env.API}`)
    .then((response)=>{
        // render the page
        res.render('index',
        {
            temp:response.data.main.temp, type:response.data.weather[0].main, 
            location:['Yangon','MM'], 
            icon:`/images/${response.data.weather[0].icon}.png`,
            info:[response.data.main.feels_like, response.data.main.pressure, response.data.main.humidity]
        })
    })
})

app.post('/',(req,res)=>{
    // get the lon and lat of the city
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${req.body.location}&limit=1&appid=${process.env.API}`)
    .then((response)=>{
        city = req.body.location
        country = response.data[0].country
        // get the weather data of the city using lon and lat
        // start
        axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${response.data[0].lat}&lon=${response.data[0].lat}&appid=${process.env.API}`)
        .then((response)=>{
            res.render('index',
            {
                temp:response.data.main.temp, 
                type:response.data.weather[0].main, location:[city,country], 
                icon: `/images/${response.data.weather[0].icon}.png`,
                info:[response.data.main.feels_like, response.data.main.pressure, response.data.main.humidity]
            })
        })
        // end
    })
})

app.get('/discover',(req,res)=>{
    res.render('discover')
    console.log('discover')
})

app.get('/discover/:city',(req,res)=>{
    switch(req.params.city){
        case 'fukuoka' :
            res.redirect('https://www.city.fukuoka.lg.jp/english/')
            break
        case 'paris' :
            res.redirect('https://www.paris.fr/')
            break
        case 'kyoto' :
            res.redirect('https://www.city.kyoto.lg.jp/')
            break
        default:
            break
    }
})

app.get('/surreal',(req,res)=>{
    res.render('surreal')
})

app.use((req,res)=>{
    res.status(404).send("404 NOT FOUND")
})

app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log("Server runing on port " + process.env.PORT)
})