const request = require('request')



const forecast = (lat, long, callback) => {
    const serviceUrl = 'http://api.weatherstack.com/current?access_key=99bd05e48d38e7f4c04e2b8d7badac10&query='+ encodeURIComponent(lat) +',' + encodeURIComponent(long)

    request({url: serviceUrl, json: true}  , (error, response) => {
        if(error){
            callback('Unable to connect to the weather service.', undefined)
        }
        else if(response.body.error){
            callback(response.body.error.info, undefined)
        }
        else {
            const temperature = response.body.current.temperature
            const feelslike = response.body.current.feelslike
            const _forecast =  response.body.current.weather_descriptions[0]
            callback(undefined, _forecast + ". It is " + temperature + ", and it feels like " + feelslike)
        }
    })
}



module.exports = forecast