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
            data = body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + 
                     ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.'
            callback(undefined,data)
        }
    })
}

module.exports = forecast