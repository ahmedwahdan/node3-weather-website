const request = require('request')


const geoCode = (address, callback) => {
    const geocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWhtZWR3YWhkYW4iLCJhIjoiY2tlZmlpMXEzMHF5ZDJ3bnRmdGlxeDVhcCJ9.ImWJrIqdNgzRWjgBa7_PBA&limit=1'
    
    request({url: geocodingUrl, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to the geoCoding service.', undefined)
        } else if (response.body.message){
            callback(response.body.message, undefined)
        } else if (response.body.features.length === 0){
            callback('Unable to find location!', undefined)
        } else {
            const longitude = response.body.features[0].center[0]
            const latitude  = response.body.features[0].center[1]
            const location  = response.body.features[0].place_name
            callback(undefined, {
                longitude: longitude,
                latitude: latitude,
                location: location
            })
        }
    
    })
}



module.exports = geoCode