import {
    shallowMount
} from '@vue/test-utils';
import ShowCard from "@/views/show/Card.vue"

describe('ShowCard.vue', () => {
    const show = {
        "id": 240,
        "url": "http://www.tvmaze.com/shows/240/cops",
        "name": "Cops",
        "type": "Reality",
        "language": "English",
        "genres": ["Action", "Crime"],
        "status": "Ended",
        "runtime": 30,
        "premiered": "1989-03-11",
        "officialSite": "http://www.cops.com",
        "schedule": {
            "time": "22:30",
            "days": ["Monday"]
        },
        "rating": {
            "average": 7.8
        },
        "weight": 98,
        "network": {
            "id": 34,
            "name": "Paramount Network",
            "country": {
                "name": "United States",
                "code": "US",
                "timezone": "America/New_York"
            }
        },
        "webChannel": null,
        "externals": {
            "tvrage": 3138,
            "thetvdb": 74709,
            "imdb": "tt0096563"
        },
        "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/4185.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/1/4185.jpg"
        },
        "summary": "<p><b>COPS</b> follows police officers, constables, and sheriff's deputies during patrols and various police activities by embedding camera crews with their units. The show's formula adheres to a classic <i>cinéma vérité</i> ethos. With no narration or scripted dialog, it depends entirely on the commentary of the officers and on the actions of the people with whom they come into contact.</p>",
        "updated": 1591767246,
        "_links": {
            "self": {
                "href": "http://api.tvmaze.com/shows/240"
            },
            "previousepisode": {
                "href": "http://api.tvmaze.com/episodes/1859522"
            }
        }
    }
    const wrapper = shallowMount(ShowCard, {
        propsData: {
            show
        },
        stubs: ['router-link']
    })
    it('renders show image', () => {
        expect(wrapper.find('.show-image').exists()).toBe(true)
        expect(wrapper.find('.show-image').html()).toBe(`<img src="${show.image.medium||show.image.original}" alt="${show.name}" class="hover:opacity-75 text-sm transition ease-in-out duration-150 show-image w-full">`)
    })
    it('display show average', () => {
        expect(wrapper.find('.show-average').exists()).toBe(true)
        expect(wrapper.find('.show-average').text()).toContain(show.rating.average)
    })
    it('display show premiered', () => {
        expect(wrapper.find('.show-premiered').exists()).toBe(true)
        expect(wrapper.find('.show-premiered').text()).toContain(show.premiered)
    })
    it('display show genres', () => {
        expect(wrapper.find('.show-genres').exists()).toBe(true)
        expect(wrapper.find('.show-genres').text()).toContain(show.genres.join(", "))
    })
})