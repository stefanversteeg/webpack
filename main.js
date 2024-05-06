// main.js
import queryString from 'query-string';

const cityListDiv = document.getElementById('city-list');
const prevLink = document.getElementById('prev');
const nextLink = document.getElementById('next');

let page = 1;

async function fetchCities(page) {
    const url = `https://demo-backendcities.azurewebsites.net/?cuid=hajIUIksk983LLP11112220&size=50&start=${(page - 1) * 50}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function renderCities(page) {
    const cities = await fetchCities(page);
    cityListDiv.innerHTML = ''; // Clear previous cities
    cities.forEach(city => {
        const cityName = document.createElement('p');
        cityName.textContent = city.name;
        cityListDiv.appendChild(cityName);
    });
}

prevLink.addEventListener('click', () => {
    if (page > 1) {
        page--;
        updateQueryString(page);
        renderCities(page);
    }
});

nextLink.addEventListener('click', () => {
    page++;
    updateQueryString(page);
    renderCities(page);
});

function updateQueryString(page) {
    const queryParams = { p: page };
    const newQueryString = queryString.stringify(queryParams);
    window.history.pushState({}, '', `?${newQueryString}`);
}

// On page load, check if there's a page number in the query string and render accordingly
window.onload = () => {
    const params = queryString.parse(window.location.search);
    if (params.p) {
        page = parseInt(params.p);
    }
    renderCities(page);
};
