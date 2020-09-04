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