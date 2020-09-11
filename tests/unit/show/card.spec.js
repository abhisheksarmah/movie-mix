import {
    shallowMount
} from '@vue/test-utils';
import ShowCard from "@/views/show/Card.vue"
import {
    showDetails
} from '../testing-data'

describe('ShowCard.vue', () => {
    const show = showDetails
    const wrapper = shallowMount(ShowCard, {
        propsData: {
            show
        },
        stubs: ['router-link']
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