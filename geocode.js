const request = require('request')


const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicHJhdHVzaHJhaTAzMDkiLCJhIjoiY2tmNnk0b2x1MTEyaDMyb2Z0bWtpaHdzMiJ9.47m9Cuqgfm_uROruuGQZHQ&limit=1`

  request({ url, json: true }, (error, {body} = {}) => {
       if(typeof callback == 'function'){
       if(error){
            callback('Unable to connect to internet', undefined)
       }else if(body.features.length === 0){
            callback('Unable to find the location', undefined)
       }else{
            callback(undefined,{
                 latitude: body.features[0].center[1],
                 longitude: body.features[0].center[0],
                 location: body.features[0].place_name
            })
       }
     }else{
          console.log('Program Failed');
     }
  })
}



module.exports = geocode