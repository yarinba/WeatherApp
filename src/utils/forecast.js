const request = require("request")

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4b8aec375ceaff3677b2898c69e47e74&query=${lat},${long}`
    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            let weather = body.current.weather_descriptions[0]
            weather += ` - It is currently ${body.current.temperature} degrees out.`
            weather += ` It feels like ${body.current.feelslike} degrees.`
            callback(undefined, weather)
        }
    })
}

module.exports = forecast