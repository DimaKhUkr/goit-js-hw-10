import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const singleEl = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSubmitInput, DEBOUNCE_DELAY));

function onSubmitInput(e) {
  //   e.currentTarget.value.trim();
  fetchCountries(e.target.value.trim())
    .then(data => {
      markupCountrie(data);
    })
    .catch(er => {
      singleEl.innerHTML = '';
      listEl.innerHTML = '';
      Notiflix.Notify.failure(`${er} Oops, there is no country with that name`);
    });
}

function markupCountrie(data) {
  console.log(data);
  if (data.length > 10) {
    singleEl.innerHTML = '';
    listEl.innerHTML = '';
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length <= 10 && data.length > 1) {
    listEl.innerHTML = createList(data);
    singleEl.innerHTML = '';
  } else {
    listEl.innerHTML = '';
    singleEl.innerHTML = createSingleCountry(data[0]);
  }
}

function createList(countriesData) {
  return countriesData
    .map(
      ({ flags, name }) =>
        `<li class="list">
        <img src="${flags.svg}" alt="${name.common}" width="30" class="img__list" />
        <p class="list__diskr">${name.common}</p>
      </li>`
    )
    .join('');
}

function createSingleCountry({ name, capital, population, flags, languages }) {
  return `<div class="country-flagTittle">
     <img src="${flags.svg}" alt="${
    name.common
  }" width="50" class="img__list" />
<p class="singl__diskr">${name.common}</p>
</div>
<p class="single__info">Capital:<span class="single__data">${capital}</span></p>
<p class="single__info">Population:<span class="single__data">${population}</span></p>
<p class="single__info">Languages:<span class="single__data">${Object.values(
    languages
  ).join(', ')}</span></p>
`;
}
