import {
    shallowMount
} from '@vue/test-utils';
import ShowImage from "@/views/show/Images.vue"
import {
    showFormattedImageData
} from '../testing-data'
describe('ShowImage.vue', () => {
    const image = showFormattedImageData[0]
    const wrapper = shallowMount(ShowImage, {
        propsData: {
            image
        },
        stubs: ['router-link']
    })
    it('renders image', () => {
        expect(wrapper.find('.show-images').exists()).toBe(true)
        expect(wrapper.find('.show-images').html()).toBe(`<img src="${image.url}" alt="${image.id}" class="hover:opacity-75 text-sm transition ease-in-out duration-150 show-images w-full">`)
    })
})