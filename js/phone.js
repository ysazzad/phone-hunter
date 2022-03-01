// search phone using fatch 
const searchPhone = () => {
    const searchText = document.getElementById("search-field").value
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(response => response.json())
        .then(data => loadPhone(data.data))
}
// phone load and display phone on ui
const loadPhone = (phones) => {
    let phones20 = phones.slice(0, 20)
    if (phones20.length === 0) {
        const phoneDetails = document.getElementById("phone-details")
        phoneDetails.innerHTML = ''
        const errorMsg = document.getElementById("error-message")
        const div = document.createElement("div")
        div.innerHTML = `
        <div class="alert alert-danger text-center w-50 mx-auto" role="alert">
          No Phone Found
        </div>
        `
        errorMsg.appendChild(div)
        return
    }

    const phoneDetails = document.getElementById("phone-details")
    const errorMsg = document.getElementById("error-message")
    errorMsg.innerHTML = ''
    phones20.forEach(phone => {
        const div = document.createElement("div")
        div.classList.add("col")
        div.innerHTML = `
        <div class="card mt-2 shadow-lg">
            <img class="w-50 mx-auto" src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title ">${phone.phone_name}</h5>
            <p class="card-text ">${phone.brand}</p>
            <button onclick="loadSinglePhone('${phone.slug}')" class=" btn btn-secondary text-white"> Explore</button>
        </div>
        </div>
        `
        phoneDetails.appendChild(div)
    })
}
// load single phone 
const loadSinglePhone = (phoneSlug) => {

    fetch(`https://openapi.programming-hero.com/api/phone/${phoneSlug}`)
        .then(response => response.json())
        .then(data => displaySinglePhone(data.data))
}
// display single phone 
const displaySinglePhone = (info) => {
    const othersInfo = info.others ? info.others : 'no result found';
    const singlePhone = document.getElementById("singlePhone")
    singlePhone.innerHTML = ''
    const div = document.createElement("div")
    div.innerHTML = `
    <div class="card shadow-lg card-color">
       <img class="w-50 mx-auto" src="${info.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title text-white"><span class="fw-bold"> Brand</span>: ${info.brand}</h5>
        <p class="card-text text-white"><span class="fw-bold "> Release Date</span>: ${info.releaseDate ? info.releaseDate : 'no release date found'}</p>
        <p class="card-text text-white"><span class="fw-bold"> Storage</span>: ${info.mainFeatures.storage}</p>
        <p class="card-text text-white"><span class="fw-bold"> Display Size</span>: ${info.mainFeatures.displaySize}</p>
        <p class="card-text text-white"><span class="fw-bold"> Chipset</span>: ${info.mainFeatures.chipSet}</p>
        <p class="card-text text-white"> <span class="fw-bold"> Memory</span>: ${info.mainFeatures.memory}</p>
        <p class="card-text text-white"> <span class="fw-bold"> Sensors</span>: ${info.mainFeatures.sensors}</p>


        <h5 class="text-white"> Others Information:</h5>
        <p class="text-white"> <span class="fw-bold"> WLAN</span>: ${othersInfo.WLAN ? othersInfo.WLAN : 'no result found'}</p>
        <p class="text-white"> <span class="fw-bold"> Blutooth</span>: ${othersInfo.Bluetooth ? othersInfo.Bluetooth : 'no result found'}</p>
        <p class="text-white"><span class="fw-bold"> GPS</span>: ${othersInfo.GPS ? othersInfo.GPS : 'no result found'}</p>
        <p class="text-white"><span class="fw-bold"> NFC</span>: ${othersInfo.NFC ? othersInfo.NFC : 'no result found'}</p>
        <p class="text-white"><span class="fw-bold"> Radio</span>: ${othersInfo.Radio ? othersInfo.Radio : 'no result found'}</p>
        <p class="text-white"><span class="fw-bold"> USB</span>: ${othersInfo.USB ? othersInfo.USB : 'no result found'}</p>
        
    </div>
    </div>
    `
    singlePhone.appendChild(div)
}

