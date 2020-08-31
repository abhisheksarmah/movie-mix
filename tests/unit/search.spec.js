import {
    shallowMount,
    createLocalVue
} from "@vue/test-utils";
import moxios from "moxios";
import Search from "@/views/Search.vue";
import {
    closable
} from "@/directives";

const localVue = createLocalVue();
localVue.directive("closable", closable);

describe("Search.vue", () => {
    let wrapper, clock;

    beforeEach(function () {
        // import and pass your custom axios instance to this method
        moxios.install();

        wrapper = shallowMount(Search, {
            localVue,
            stubs: ["router-link"],
        });
    });

    afterEach(function () {
        // import and pass your custom axios instance to this method
        moxios.uninstall();
    });

    it("getting a show list when inputed search term", (done) => {
        let searchInput = wrapper.find('input[type="text"]');
        expect(searchInput.exists()).toBe(true);
        searchInput.setValue("parasite");
        expect(wrapper.vm.searchQuery).toBe("parasite");

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();

            request
                .respondWith({
                    status: 200,
                    response: [{
                            score: 99,
                            show: {
                                id: 240,
                                url: "http://www.tvmaze.com/shows/240/cops",
                                name: "Cops",
                                genres: ["Action", "Drama"],
                            },
                        },
                        {
                            score: 98,
                            show: {
                                id: 241,
                                url: "http://www.tvmaze.com/shows/241/benched",
                                name: "Benched",
                                genres: ["Thriller", "Comedy"],
                            },
                        },
                    ],
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

    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;
        expect(wrap.html()).toContain(text);
    };

    let notSee = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;
        expect(wrap.html()).not.toContain(text);
    };
});