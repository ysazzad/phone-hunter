const searchPhone = () => {
    const searchText = document.getElementById("search-field").value
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(response => response.json())
        .then(data => loadPhone(data.data))
}

const loadPhone = (phones) => {
    // console.log(phones);
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
    console.log(phones20);
    const phoneDetails = document.getElementById("phone-details")
    const errorMsg = document.getElementById("error-message")
    errorMsg.innerHTML = ''
    phones20.forEach(phone => {
        console.log(phone);
        const div = document.createElement("div")
        div.classList.add("col")
        div.innerHTML = `
        <div class="card">
        <img class="w-50 mx-auto" src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center">${phone.phone_name}</h5>
            <p class="card-text text-center">${phone.brand}</p>
            <button onclick="loadSinglePhone('${phone.slug}')" class="btn btn-success text-center"> Explore</button>
        </div>
    </div>
        `
        phoneDetails.appendChild(div)
    })
}

const loadSinglePhone = (phoneSlug) => {
    console.log(phoneSlug);
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneSlug}`)
        .then(response => response.json())
        .then(data => displaySinglePhone(data.data))
}
const displaySinglePhone = (info) => {

    // console.log(info.others);
    // console.log(info.mainFeatures.sensors);
    const singlePhone = document.getElementById("singlePhone")
    singlePhone.innerHTML = ''
    // const singlePhone = document.getElementById("singlePhone")
    const div = document.createElement("div")
    div.innerHTML = `
    <div class="card">
       <img class="w-25 mx-auto" src="${info.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title text-center">${info.brand}</h5>
        <p class="card-text text-center">${info.releaseDate ? info.releaseDate : 'no release date found'}</p>
        <p class="card-text text-center"> ${info.mainFeatures.storage}</p>
        <p class="card-text text-center"> ${info.mainFeatures.displaySize}</p>
        <p class="card-text text-center"> ${info.mainFeatures.chipSet}</p>
        <p class="card-text text-center"> ${info.mainFeatures.memory}</p>
    </div>
    </div>
    `
    singlePhone.appendChild(div)
    const sensors = info.mainFeatures.sensors
    sensors.forEach(data => {
        // console.log(data);
        const div = document.createElement("div")
        div.innerHTML = `
        <p> ${data} </p>
        `
        singlePhone.appendChild(div)
    })
    const othersInfo = info.others ? info.others : 'no result found'
    // console.log(othersInfo);
    const ul = document.createElement("ul")
    ul.innerHTML = `
    <h4> Others Info</h4>
    <p> ${othersInfo.WLAN ? othersInfo.WLAN : 'no result found'}</p>
    <p> ${othersInfo.Bluetooth ? othersInfo.Bluetooth : 'no result found'}</p>
    <p> ${othersInfo.GPS ? othersInfo.GPS : 'no result found'}</p>
    <p> ${othersInfo.NFC ? othersInfo.NFC : 'no result found'}</p>
    <p> ${othersInfo.Radio ? othersInfo.Radio : 'no result found'}</p>
    <p> ${othersInfo.USB ? othersInfo.USB : 'no result found'}</p>
    `
    singlePhone.appendChild(ul)

}

