const request = require('request')

const forecast = (longitude, latitude, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=4bd7d6f4ef983d88757a49bfbfe4e662&&query=' + latitude + ',' + longitude

    request({url, json: true },(error,{body})=>{
        // debugger
        if(error){
            callback('Unable to connect to weather service!',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            const forecast =  body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + 
                     ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' +  body.current.humidity
            data = {
                forecast,
                icons : body.current.weather_icons
            }
            callback(undefined,data)
        }
    })
}

module.exports = forecast