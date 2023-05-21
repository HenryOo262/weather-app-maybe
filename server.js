require('dotenv').config()

const express    = require('express')
const axios      = require('axios')
const bodyParser = require('body-parser')
const app        = express()

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=16.871311&lon=96.199379&appid=${process.env.API}`)
    .then((response)=>{
        console.log(response.data)
        res.render('index',
        {
            data:response.data.main.temp, type:response.data.weather[0].main, 
            location:['Yangon','MM'], 
            icon:`/images/${response.data.weather[0].icon}.png`,
            info:[response.data.main.feels_like, response.data.main.pressure, response.data.main.humidity]
        })
    })
    .catch((error)=>{
        console.log(error)
    })
    .finally(()=>{
        console.log('response received')
    })
})

app.post('/',(req,res)=>{
    console.log(req.body.location)
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${req.body.location}&limit=1&appid=${process.env.API}`)
    .then((response)=>{
        //console.log(response.data)
        city = req.body.location
        country = response.data[0].country
        // start
        axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${response.data[0].lat}&lon=${response.data[0].lat}&appid=${process.env.API}`)
        .then((response)=>{
            console.log(response.data.weather[0])
            res.render('index',
            {
                data:response.data.main.temp, 
                type:response.data.weather[0].main, location:[city,country], 
                icon: `/images/${response.data.weather[0].icon}.png`,
                info:[response.data.main.feels_like, response.data.main.pressure, response.data.main.humidity]
            })
        })
        // end
    })
    .catch((error)=>{
        console.log(error)
    })
    .finally(()=>{
        console.log('succeed posting')
    })
})

app.use((req,res)=>{
    res.status(404).send("404 NOT FOUND")
})

app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log("Server runing on port " + process.env.PORT)
})