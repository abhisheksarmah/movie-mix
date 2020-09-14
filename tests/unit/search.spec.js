import {
    shallowMount,
    mount,
    createLocalVue
} from "@vue/test-utils";
import moxios from "moxios";
import Search from "@/views/Search.vue";
import {
    closable
} from "@/directives";
import {
    searchShows
} from './testing-data'

const localVue = createLocalVue();
localVue.directive("closable", closable);

describe("Search.vue", () => {
    let wrapper;

    beforeEach(function () {
        // import and pass your custom axios instance to this method
        moxios.install();

        wrapper = mount(Search, {
            localVue,
            stubs: ["router-link"],
        });
    });

    afterEach(function () {
        // import and pass your custom axios instance to this method
        moxios.uninstall();
    });

    it("has a search input", () => {
        let searchInput = wrapper.find('input[type="text"]');
        expect(searchInput.exists()).toBe(true);
    })

    it("input data is correct", () => {
        let searchInput = wrapper.find('input[type="text"]');
        searchInput.setValue("parasite");
        expect(wrapper.vm.searchQuery).toBe("parasite");
    })

    it("when focused, search list reopens", () => {
        wrapper.setData({
            isOpen: false
        })
        expect(wrapper.vm.isOpen).toBe(false);
        wrapper.vm.$refs.search.focus()
        expect(wrapper.vm.isOpen).toBe(true);
    })

    it("pressing /, focuses search input", async () => {
        const mockMethod = jest.spyOn(Search.methods, 'keyDownFocus')
        const div = document.createElement('div')
        document.body.appendChild(div)
        let wrapper = await mount(Search, {
            attachTo: div
        })
        let searchInput = wrapper.find('input[type="text"]');

        wrapper.trigger('keydown', {
            'keyCode': 190
        })
        expect(mockMethod).toHaveBeenCalled()
        expect(searchInput.element).not.toBe(document.activeElement);

        wrapper.trigger('keydown', {
            'keyCode': 191
        })
        expect(mockMethod).toHaveBeenCalled()
        expect(searchInput.element).toBe(document.activeElement);
    })

    it("do not call search api when search term is not more than equal 3", () => {
        const mockMethod = jest.spyOn(Search.methods, 'searchData')
        let wrapper = mount(Search)
        wrapper.find('input[type="text"]').setValue("pa");
        expect(mockMethod).not.toHaveBeenCalled()
    })

    it("getting a show list when inputed search term", (done) => {
        let searchInput = wrapper.find('input[type="text"]');
        searchInput.setValue("parasite");

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();

            request
                .respondWith({
                    status: 200,
                    response: searchShows,
                })
                .then(function () {
                    expect(wrapper.vm.shows.length).toBe(2);
                    see("Cops");
                    see("Benched");
                    notSee("No results for parasite")
                    done();
                })
        }, 600);
    });

    it("showing no results when search term not matched", (done) => {
        let searchInput = wrapper.find('input[type="text"]');
        expect(searchInput.exists()).toBe(true);
        searchInput.setValue("parasite");
        expect(wrapper.vm.searchQuery).toBe("parasite");

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();

            request
                .respondWith({
                    status: 200,
                    response: [],
                })
                .then(function () {
                    expect(wrapper.vm.shows.length).toBe(0);
                    notSee("Cops");
                    notSee("Benched");
                    see(`No results for "${wrapper.vm.searchQuery}"`)
                    done();
                })
        }, 600);
    });

    it("on close set open to false", () => {
        expect(wrapper.vm.isOpen).toBe(true);
        wrapper.vm.onClose()
        expect(wrapper.vm.isOpen).toBe(false);
    })

    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;
        expect(wrap.html()).toContain(text);
    };

    let notSee = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;
        expect(wrap.html()).not.toContain(text);
    };
});