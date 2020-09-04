import {
    shallowMount,
} from "@vue/test-utils";
import PageNotFound from "@/views/PageNotFound.vue";

describe("PageNotFound.vue", () => {
    let wrapper;
    wrapper = shallowMount(PageNotFound);

    it("display page not found", () => {
        see('Page you are looking for could not be found')
    });

    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;
        expect(wrap.html()).toContain(text);
    };
});