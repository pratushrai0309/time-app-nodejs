const request = require("request")


const timecast = (latitude, longitude, callback) => {
  const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=MMU6E80W4MTE&format=json&by=position&lat=${latitude}&lng=${longitude}`

  request({url : url, json : true}, (error, {body} = {}) => {
    if(typeof callback == 'function'){
    if(error){
      callback('Unable to connect to internet', undefined)
    }
    else if(body.status == "FAILED"){
        callback('Unable to find the location to find time', undefined)
    }
    else{
        callback(undefined, {
          time: body.formatted
        })
    }
  }
  else{
    console.log('Program Failed');
  }
  })
}

module.exports = timecast