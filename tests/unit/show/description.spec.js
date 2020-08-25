import {
    shallowMount
} from '@vue/test-utils';
import ShowDescription from "@/views/show/Description.vue"

describe('ShowDescription.vue', () => {
    const show = {
        "id": 243,
        "url": "http://www.tvmaze.com/shows/243/conan",
        "name": "Conan",
        "type": "Talk Show",
        "language": "English",
        "genres": ["Comedy"],
        "status": "Running",
        "runtime": 30,
        "premiered": "2010-11-08",
        "officialSite": "https://teamcoco.com",
        "schedule": {
            "time": "23:00",
            "days": ["Monday", "Tuesday", "Wednesday", "Thursday"]
        },
        "rating": {
            "average": 7.5
        },
        "weight": 86,
        "network": {
            "id": 32,
            "name": "TBS",
            "country": {
                "name": "United States",
                "code": "US",
                "timezone": "America/New_York"
            }
        },
        "webChannel": null,
        "externals": {
            "tvrage": 25927,
            "thetvdb": 194751,
            "imdb": "tt1637574"
        },
        "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/4583.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/1/4583.jpg"
        },
        "summary": "<p>The biggest celebrities, the hottest musical guests, the craziest sketches... and Andy Richter, to boot? Yes, some would say Conan O'Brien's talk show on TBS has everything a late night viewer could want.</p>",
        "updated": 1598312911,
        "_links": {
            "self": {
                "href": "http://api.tvmaze.com/shows/243"
            },
            "previousepisode": {
                "href": "http://api.tvmaze.com/episodes/1903090"
            },
            "nextepisode": {
                "href": "http://api.tvmaze.com/episodes/1917835"
            }
        }
    }
    const wrapper = shallowMount(ShowDescription, {
        propsData: {
            show
        },
    })
    it('renders show image', () => {
        expect(wrapper.find('.show-image').exists()).toBe(true)
        expect(wrapper.find('.show-image').html()).toBe(`<img src="${show.image.medium || show.image.original}" alt="${show.name}" class="w-full show-image">`)
    })
    it('display show name', () => {
        expect(wrapper.find('.show-name').exists()).toBe(true)
        expect(wrapper.find('.show-name').text()).toContain(show.name)
    })
    it('display show summary', () => {
        expect(wrapper.find('.show-summary').exists()).toBe(true)
        expect(wrapper.find('.show-summary').html()).toContain(show.summary)
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