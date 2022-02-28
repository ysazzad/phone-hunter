const searchPhone = () => {
    const searchText = document.getElementById("search-field").value
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(response => response.json())
        .then(data => loadPhone(data.data))
}

const loadPhone = (phones) => {
    const phoneDetails = document.getElementById("phone-details")
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement("div")
        div.classList.add("col")
        div.innerHTML = `
        <div class="card">
        <img class="w-50 mx-auto" src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center">${phone.phone_name}</h5>
            <p class="card-text text-center">${phone.brand}</p>
            <button class="btn btn-success text-center"> Explore</button>
        </div>
    </div>
        `
        phoneDetails.appendChild(div)
    })
}