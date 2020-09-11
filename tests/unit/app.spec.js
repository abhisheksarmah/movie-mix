import {
    shallowMount,
    createLocalVue
} from "@vue/test-utils";
import App from "@/App.vue";
import VueRouter from "vue-router";
import {
    routes
} from "@/router/index.js";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("App.vue", () => {
    let wrapper;
    const router = new VueRouter({
        routes,
    });

    wrapper = shallowMount(App, {
        localVue,
        router,
    });

    it("display Movie Mix", () => {
        see('Movie Mix')
    });

    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;
        expect(wrap.html()).toContain(text);
    };
});