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
                response: {
                    id: 240,
                    image: {
                        medium: "http://static.tvmaze.com/uploads/images/medium_portrait/1/4185.jpg",
                        original: "http://static.tvmaze.com/uploads/images/original_untouched/1/4185.jpg",
                    },
                    name: "Cops",
                    rating: {
                        average: 7.8
                    },
                    premiered: "1989-03-11",
                    genres: ["Action", "Crime"],
                    summary: "<p><b>COPS</b> follows police officers, constables, and sheriff's deputies during patrols and various police activities by embedding camera crews with their units. The show's formula adheres to a classic <i>cinéma vérité</i> ethos. With no narration or scripted dialog, it depends entirely on the commentary of the officers and on the actions of the people with whom they come into contact.</p>",
                },
            });
        });

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [{
                    person: {
                        id: 36815,
                        url: "http://www.tvmaze.com/people/36815/harry-newman",
                        name: "Harry Newman",
                        country: null,
                        birthday: null,
                        deathday: null,
                        gender: "Male",
                        image: {
                            medium: "http://static.tvmaze.com/uploads/images/medium_portrait/125/312825.jpg",
                            original: "http://static.tvmaze.com/uploads/images/original_untouched/125/312825.jpg",
                        },
                        _links: {
                            self: {
                                href: "http://api.tvmaze.com/people/36815"
                            }
                        },
                    },
                    character: {
                        id: 275364,
                        url: "http://www.tvmaze.com/characters/275364/cops-narrator",
                        name: "Narrator",
                        image: null,
                        _links: {
                            self: {
                                href: "http://api.tvmaze.com/characters/275364"
                            },
                        },
                    },
                    self: false,
                    voice: true,
                }, ],
            });
        });

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request
                .respondWith({
                    status: 200,
                    response: [{
                            id: 4181,
                            type: "poster",
                            main: true,
                            resolutions: {
                                original: {
                                    url: "http://static.tvmaze.com/uploads/images/original_untouched/1/4185.jpg",
                                },
                                medium: {
                                    url: "http://static.tvmaze.com/uploads/images/medium_portrait/1/4185.jpg",
                                },
                            },
                        },
                        {
                            id: 200850,
                            type: "poster",
                            main: false,
                            resolutions: {
                                original: {
                                    url: "http://static.tvmaze.com/uploads/images/original_untouched/81/202639.jpg",
                                },
                                medium: {
                                    url: "http://static.tvmaze.com/uploads/images/medium_portrait/81/202639.jpg",
                                },
                            },
                        },
                        {
                            id: 200851,
                            type: "poster",
                            main: false,
                            resolutions: {
                                original: {
                                    url: "http://static.tvmaze.com/uploads/images/original_untouched/81/202640.jpg",
                                },
                                medium: {
                                    url: "http://static.tvmaze.com/uploads/images/medium_portrait/81/202640.jpg",
                                },
                            },
                        },
                        {
                            id: 310536,
                            type: "poster",
                            main: false,
                            resolutions: {
                                original: {
                                    url: "http://static.tvmaze.com/uploads/images/original_untouched/125/312807.jpg",
                                },
                                medium: {
                                    url: "http://static.tvmaze.com/uploads/images/medium_portrait/125/312807.jpg",
                                },
                            },
                        },
                        {
                            id: 310921,
                            type: "banner",
                            main: false,
                            resolutions: {
                                original: {
                                    url: "http://static.tvmaze.com/uploads/images/original_untouched/125/313193.jpg",
                                },
                                medium: {
                                    url: "http://static.tvmaze.com/uploads/images/medium_leaderboard/125/313193.jpg",
                                },
                            },
                        },
                        {
                            id: 444606,
                            type: "poster",
                            main: false,
                            resolutions: {
                                original: {
                                    url: "http://static.tvmaze.com/uploads/images/original_untouched/179/447691.jpg",
                                },
                                medium: {
                                    url: "http://static.tvmaze.com/uploads/images/medium_portrait/179/447691.jpg",
                                },
                            },
                        },
                        {
                            id: 554129,
                            type: "background",
                            main: false,
                            resolutions: {
                                original: {
                                    url: "http://static.tvmaze.com/uploads/images/original_untouched/223/557686.jpg",
                                },
                            },
                        },
                    ],
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
});