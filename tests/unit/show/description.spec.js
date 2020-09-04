import {
    shallowMount
} from '@vue/test-utils';
import ShowDescription from "@/views/show/Description.vue"
import {
    showDetails
} from '../testing-data'

describe('ShowDescription.vue', () => {
    const show = showDetails
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