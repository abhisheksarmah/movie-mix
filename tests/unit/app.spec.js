import {
    shallowMount,
    createLocalVue
} from "@vue/test-utils";
import App from "@/App.vue";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("App.vue", () => {
    let wrapper;
    wrapper = shallowMount(App, {
        localVue
    });

    it("display Movie Mix", () => {
        see('Movie Mix')
    });

    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;
        expect(wrap.html()).toContain(text);
    };
});