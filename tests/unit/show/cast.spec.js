import {
    shallowMount
} from '@vue/test-utils';
import ShowCast from "@/views/show/Cast.vue"

describe('ShowCast.vue', () => {
    const cast = {
        "person": {
            "id": 35596,
            "url": "http://www.tvmaze.com/people/35596/justin-roiland",
            "name": "Justin Roiland",
            "country": {
                "name": "United States",
                "code": "US",
                "timezone": "America/New_York"
            },
            "birthday": "1980-02-21",
            "deathday": null,
            "gender": "Male",
            "image": {
                "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/3602.jpg",
                "original": "http://static.tvmaze.com/uploads/images/original_untouched/1/3602.jpg"
            },
            "_links": {
                "self": {
                    "href": "http://api.tvmaze.com/people/35596"
                }
            }
        },
        "character": {
            "id": 56241,
            "url": "http://www.tvmaze.com/characters/56241/rick-and-morty-rick-sanchez",
            "name": "Rick Sanchez",
            "image": {
                "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/105/262781.jpg",
                "original": "http://static.tvmaze.com/uploads/images/original_untouched/105/262781.jpg"
            },
            "_links": {
                "self": {
                    "href": "http://api.tvmaze.com/characters/56241"
                }
            }
        },
        "self": false,
        "voice": true
    }
    const wrapper = shallowMount(ShowCast, {
        propsData: {
            cast
        },
    })
    it('renders cast character image', () => {
        expect(wrapper.find('.cast-character-image').exists()).toBe(true)
        expect(wrapper.find('.cast-character-image').html()).toBe(`<img src="${cast.character.image.medium || cast.character.image.original}" alt="${cast.character.name}" class="hover:opacity-75 text-sm transition ease-in-out duration-150 cast-character-image">`)
    })
    it('display cast person name', () => {
        expect(wrapper.find('.cast-person-name').exists()).toBe(true)
        expect(wrapper.find('.cast-person-name').text()).toBe(cast.person.name)
        expect(wrapper.find('.cast-person-name').html()).toBe(`<a href="${cast.person.url}" target="_blank" class="text-lg mt-2 hover:text-gray-300 cast-person-name">${cast.person.name}</a>`)
    })
    it('display cast character name as', () => {
        expect(wrapper.find('.cast-character-name').exists()).toBe(true)
        expect(wrapper.find('.cast-character-name').text()).toBe(cast.character.name)
        expect(wrapper.find('.cast-character-name').html()).toBe(`<a href="${cast.character.url}" target="_blank" class="hover:text-gray-300 cast-character-name">${cast.character.name}</a>`)
    })
})