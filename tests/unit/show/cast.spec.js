import {
    shallowMount
} from '@vue/test-utils';
import ShowCast from "@/views/show/Cast.vue"
import {
    showCast
} from '../testing-data'
import Vue from 'vue';

describe('ShowCast.vue', () => {
    const cast = showCast
    const wrapper = shallowMount(ShowCast, {
        propsData: {
            cast
        },
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

    it('returns character image when available', () => {
        expect(wrapper.vm.castImage).toStrictEqual(cast.character.image.medium || cast.character.image.original);
    })

    it('returns person image when character image not available', () => {
        const cast = showCast
        delete cast.character.image
        const wrapper = shallowMount(ShowCast, {
            propsData: {
                cast
            },
        })
        expect(wrapper.vm.castImage).toStrictEqual(cast.person.image.medium || cast.person.image.original);
    })

    it('returns null when no cast image available', () => {
        const cast = showCast
        delete cast.character.image
        delete cast.person.image
        const wrapper = shallowMount(ShowCast, {
            propsData: {
                cast
            },
        })
        expect(wrapper.vm.castImage).toStrictEqual(null);
    })
})