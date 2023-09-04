import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
    return axios.get(`${BASE_URL}/breeds`)
        .then(resp => {
            return resp.data;
        })
        .catch(err => {
            throw new Error(err.message);
        });

}

export function fetchCatByBreed(breedId) {
    return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
        .then(resp => {
            return resp.data;
        })
        .catch(err => {
            throw new Error(err.message);
      
        });

}