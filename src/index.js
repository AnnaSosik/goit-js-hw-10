import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './js/cat_API.js';

axios.defaults.headers.common[
  'x-api-key'
] = `live_Z3nKbrIHqQNszgy3bN9dkMubAFP7Mq4NSWHKoSarK5tDotaXzTbe30ZsoUtQfCYv`;

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';



function hide_loader(){
	$("#cat-loader").removeClass("loader");}

const breedSelector = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const catLoader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

hiddenEl(errorEl);
hiddenEl(breedSelector);



breedSelector.addEventListener('change', onBreedChange);


fetchBreeds()
  .then(data => {
    const markupArr = data.map(
      element => `<option value="${element.id}">${element.name}</option>`
    );
    breedSelector.innerHTML = markupArr.join('');

    hiddenEl(breedSelector);
    hiddenEl(catLoader);

    new SlimSelect({
      select: '#single',
    });

  })

  .catch(
    error => (
      hiddenEl(errorEl),
      hiddenEl(catLoader),
      Notiflix.Report.failure('Error', `${error}`)
    )
  );

  
function onBreedChange(evt) {
  if (!evt.target.classList.contains('breed-select')) {
    return;
  } else {

    hiddenEl(catLoader);
    hiddenEl(catInfo);

    const catId = evt.target.value;
    fetchCatByBreed(catId)
      .then(data => {

        hiddenEl(catInfo);

        const { name, description, temperament } = data[0].breeds[0];
        catInfoMap(catInfo, data[0].url, name, description, temperament);

        hiddenEl(catLoader);
      })
      .catch(
        error => (

          hiddenEl(catLoader),
          hiddenEl(errorEl),

          Notiflix.Report.failure('Error', `${error}`)
        )
      );
  }
}

function hiddenEl(el) {
  return el.classList.toggle('hidden');
}

function catInfoMap(catInfo, url, name, description, temperament) {
  catInfo.innerHTML = `<img src="${url}" alt="cat ${name}" width='600' >
      <div class="cats-info">
        <h2 class="cat-name">${name}</h2>
        <p class="cat-description">${description}</p>
        <p class="cat-temperament">Temperament: <span class="temperament-span">${temperament}</span></p>
      </div>`;
}