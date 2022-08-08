const request = require('request')

const geocode = (address, callback )=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2NvbmdpYSIsImEiOiJjbDZkbDF2aTkwMDZ4M2Ntc2F3NnNnbDJtIn0.P-NkJ-giGiWd6ZqIA7czJA'

    request({url, json: true},(error, {body})=>{
        // debugger
        if(error){
            callback('Ubable to connect to loation service', undefined)
        } else if(body.features.length === 0 ){
            callback('Unable to find location. Try another!')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode