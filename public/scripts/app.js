const weatherForm = document.querySelector('form')
const msgOne = document.querySelector('#firstMsg')
const msgTwo = document.querySelector('#secondMsg')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const search = document.querySelector('input')
    msgTwo.textContent = ''
    msgOne.textContent = 'Loading ...'
    fetch('/weather?address='+ search.value).then((response) => {
    response.json().then((data) => {
        if(data.error){
            msgOne.textContent = data.error
        } else {
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
        }

    })
})
})