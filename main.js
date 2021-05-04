const APIURL = 'https://restcountries.eu/rest/v2/all';
const SEARCH = 'https://restcountries.eu/rest/v2/name/';

const countriesEl = document.getElementById('countries');
const filterBtn = document.getElementById('filter');
const filterRegions = filterBtn.querySelectorAll('li');
const searchEl = document.getElementById('search');
const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modal-close');

getCountries();

async function getCountries() {
    const resp = await fetch(APIURL);
    const data = await resp.json();

    displayCountries(data);
}

function displayCountries(data) {
    countriesEl.innerHTML = '';

    data.forEach(country => {
        const countryEl = document.createElement('div');
        countryEl.classList.add('card');

        countryEl.innerHTML = `
            <div class="card__header">
                <img src="${country.flag}" alt="Germany">
            </div>
            <div class="card__body">
                <h2 class="country-name">${country.name}</h2>
                <p>
                    <strong>Population:</strong> 
                    ${country.population}
                </p>
                <p class="country-region">
                    <strong>Region:</strong> 
                    ${country.region}
                </p>
                <p>
                    <strong>Capital:</strong> 
                    ${country.capital}
                </p>
            </div>
        `;

        countryEl.addEventListener('click', () => {
            modal.style.display = 'block';
            showCountryDetails(country);
        });

        countriesEl.appendChild(countryEl);
    });
}

// Show country details
function showCountryDetails(country) {
    const modalBody = modal.querySelector('.modal__body');
    const modalImg = modal.querySelector('.modal__img');
    
    modalImg.src = country.flag;

    modalBody.innerHTML = `
        <h2 class="country-name">${country.name}</h2>
        <p>
            <strong>Native name:</strong> 
            ${country.nativeName}
        </p>
        <p>
            <strong>Population:</strong> 
            ${country.population}
        </p>
        <p class="country-region">
            <strong>Region:</strong> 
            ${country.region}
        </p>
        <p>
            <strong>Subregion:</strong> 
            ${country.subregion}
        </p>
        <p>
            <strong>Capital:</strong> 
            ${country.capital}
        </p>
        <p>
            <strong>Currencies:</strong> 
            ${country.currencies.map(currency => ' ' + currency.code)}
        </p>
        <p>
            <strong>Languages:</strong> 
            ${country.languages.map(language => ' ' + language.name)}
        </p>        <p>
            <strong>Timezone:</strong> 
            ${country.timezones}
        </p>
    `;
}

// toggle open Filter by Region
filterBtn.addEventListener('click', () => {
    filterBtn.classList.toggle('open');
});

modalCloseBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// search countries with the input
searchEl.addEventListener('input', e => {
    const { value } = e.target;
    const countryName = document.querySelectorAll('.country-name');

    countryName.forEach(name => {
        if(name.innerText.toLowerCase().includes(value.toLowerCase())) {
            // card -> .card-body -> .country-name
            name.parentElement.parentElement.style.display = 'block';
        } else {
            name.parentElement.parentElement.style.display = 'none';
        }
    });
});

// filter countries by region on the li's inside the .dropdown
filterRegions.forEach(filter => {
    filter.addEventListener('click', () => {
        const value = filter.innerText;
        const countryRegion = document.querySelectorAll('.country-region');

        countryRegion.forEach(region => {
            if(region.innerText.includes(value) || value === 'All') {
                region.parentElement.parentElement.style.display = 'block';
            } else {
                region.parentElement.parentElement.style.display = 'none';
            }
        });
    });
});