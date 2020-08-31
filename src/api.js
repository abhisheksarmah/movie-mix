import axios from 'axios'

const URL = 'http://api.tvmaze.com/'

export function getAllShows() {
    return axios.get(URL + 'shows');
}

export function getShowDetails(showId) {
    return axios.get(URL + 'shows/' + showId)
}

export function getShowCasts(showId) {
    return axios.get(URL + 'shows/' + showId + '/cast')
}

export function getShowImages(showId) {
    return axios.get(URL + 'shows/' + showId + '/images')
}

export function searchShows(query) {
    return axios.get(URL + `search/shows?q=${query}`)
}