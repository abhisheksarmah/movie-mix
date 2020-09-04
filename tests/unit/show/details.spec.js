import {
    shallowMount,
    createLocalVue
} from "@vue/test-utils";
import VueRouter from "vue-router";
import moxios from "moxios";
import ShowDetails from "@/views/show/Details.vue";
import {
    routes
} from "@/router/index.js";
import {
    showDetails,
    showCast,
    showImages,
    showFormattedImageData
} from '../testing-data'

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("ShowDetails.vue", () => {
    const router = new VueRouter({
        routes,
    });
    let wrapper;

    beforeEach(function () {
        // import and pass your custom axios instance to this method
        moxios.install();

        wrapper = shallowMount(ShowDetails, {
            localVue,
            router,
        });
    });

    afterEach(function () {
        // import and pass your custom axios instance to this method
        moxios.uninstall();
    });

    it('should trigger a beforeRouteUpdate event', function () {
        const beforeRouteUpdate = wrapper.vm.$options.beforeRouteUpdate[0];
        let nextFun = jest.fn();
        beforeRouteUpdate.call(wrapper.vm, {
            params: 123
        }, "fromObj", nextFun);
    });

    it('mounted assigns show, casts, images, loading', () => {
        expect(wrapper.vm.show).not.toBe(undefined)
        expect(wrapper.vm.casts).not.toBe(undefined)
        expect(wrapper.vm.images).not.toBe(undefined)
        expect(wrapper.vm.loading).not.toBe(undefined)
    })

    it("getting show list works", (done) => {
        expect(Object.keys(wrapper.vm.show).length).toBe(0)
        expect(wrapper.vm.casts.length).toBe(0)
        expect(wrapper.vm.images.length).toBe(0)
        expect(wrapper.vm.loading).toBe(true)

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: showDetails
            });
        });

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [showCast],
            });
        });

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request
                .respondWith({
                    status: 200,
                    response: showImages
                })
                .then(function () {
                    expect(Object.keys(wrapper.vm.show).length).toBe(7)
                    expect(wrapper.vm.casts.length).toBe(1)
                    expect(wrapper.vm.images.length).toBe(5)
                    expect(wrapper.vm.loading).toBe(false)
                    done();
                });
        });
    });

    test('return original if no medium image', () => {
        let data = showImages
        let formatted = wrapper.vm.formatImages(data)
        expect(formatted).toStrictEqual(showFormattedImageData)
    })
});