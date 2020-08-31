import {
    shallowMount
} from '@vue/test-utils';
import ShowImage from "@/views/show/Images.vue"

describe('ShowImage.vue', () => {
    const image = {
        "id": 3601,
        "url": "http://static.tvmaze.com/uploads/images/medium_portrait/1/3603.jpg"
    }
    const wrapper = shallowMount(ShowImage, {
        propsData: {
            image
        },
        stubs: ['router-link']
    })
    it('renders image', () => {
        expect(wrapper.find('.show-images').exists()).toBe(true)
        expect(wrapper.find('.show-images').html()).toBe(`<img src="${image.url}" alt="${image.id}" class="hover:opacity-75 text-sm transition ease-in-out duration-150 show-images">`)
    })
})