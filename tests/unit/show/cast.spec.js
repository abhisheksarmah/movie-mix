import {
    shallowMount
} from '@vue/test-utils';
import ShowCast from "@/views/show/Cast.vue"
import {
    showCast
} from '../testing-data'

describe('ShowCast.vue', () => {
    const cast = showCast
    const wrapper = shallowMount(ShowCast, {
        propsData: {
            cast
        },
    })
    it('renders cast character image', () => {
        expect(wrapper.find('.cast-character-image').exists()).toBe(true)
        expect(wrapper.find('.cast-character-image').html()).toBe(`<img src="${cast.character.image.medium || cast.character.image.original}" alt="${cast.character.name}" class="hover:opacity-75 text-sm transition ease-in-out duration-150 cast-character-image w-full">`)
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