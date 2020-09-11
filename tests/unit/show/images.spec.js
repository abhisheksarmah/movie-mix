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
    it('image url property available and correct', () => {
        expect(wrapper.vm.image.url).toStrictEqual('http://static.tvmaze.com/uploads/images/original_untouched/1/4185.jpg')
    })
})