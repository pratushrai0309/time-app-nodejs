const timeForm = document.querySelector('form')
const address = document.getElementById('address')
const time = document.getElementById('time')


timeForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = address.value
    time.textContent = 'Loading....'
    fetch(`/time?address=${location}`).then((response) => {
  response.json().then((data) => {  
    if(data.error){
      time.textContent = data.error
    }else{
      time.textContent = 'Date & Time: ' + data.time
    }
  })
})

})