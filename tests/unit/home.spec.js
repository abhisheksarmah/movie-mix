import {
  shallowMount
} from "@vue/test-utils";
import moxios from "moxios";
import Home from "@/views/Home.vue";

describe("Home.vue", () => {
  let wrapper;

  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install();

    wrapper = shallowMount(Home, {
      stubs: ["router-link"],
    });
  });

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });

  it("mounted assigns loading, shows, popular", () => {
    expect(wrapper.vm.loading).not.toBe(undefined);
    expect(wrapper.vm.shows).not.toBe(undefined);
    expect(wrapper.vm.populars).not.toBe(undefined);
  });

  it("getting show list works", (done) => {
    expect(wrapper.vm.shows.length).toBe(0);
    expect(wrapper.vm.populars.length).toBe(0);
    expect(wrapper.vm.loading).toBe(true);

    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: [{
              id: 240,
              url: "http://www.tvmaze.com/shows/240/cops",
              name: "Cops",
              genres: ["Action", "Drama"],
              rating: {
                average: 7.8
              }
            },
            {
              id: 241,
              url: "http://www.tvmaze.com/shows/241/benched",
              name: "Benched",
              genres: ["Thriller", "Comedy"],
              rating: {
                average: 8.1
              }
            },
          ],
        })
        .then(function () {
          expect(wrapper.vm.shows.length).toBe(2);
          expect(wrapper.vm.populars.length).toBe(2);
          expect(wrapper.vm.loading).toBe(false);
          done();
        });
    });
  });

  it("compute genre titles", () => {
    wrapper.setData({
      shows: [{
          genres: ["Action", "Drama"],
          rating: {
            average: 8.1
          }
        },
        {
          genres: ["Thriller", "Comedy"],
          rating: {
            average: 7
          }
        },
        {
          genres: ["Action", "Cartoon"],
          rating: {
            average: 6.5
          }
        },
      ],
    });
    expect(wrapper.vm.genreTitles).toStrictEqual([
      "Action",
      "Drama",
      "Thriller",
      "Comedy",
      "Cartoon",
    ]);
  });

  it("compute genres", () => {
    wrapper.setData({
      shows: [{
          id: 1,
          genres: ["Action", "Drama"],
          rating: {
            average: 8.1
          }
        },
        {
          id: 2,
          genres: ["Thriller", "Action"],
          rating: {
            average: 7
          }
        },
      ],
    });
    expect(wrapper.vm.genres).toStrictEqual([{
        name: "Action",
        shows: [{
            genres: ["Action", "Drama"],
            id: 1,
            rating: {
              average: 8.1
            }
          },
          {
            genres: ["Thriller", "Action"],
            id: 2,
            rating: {
              average: 7
            }
          },
        ],
      },
      {
        name: "Drama",
        shows: [{
          genres: ["Action", "Drama"],
          id: 1,
          rating: {
            average: 8.1
          }
        }, ],
      },
      {
        name: "Thriller",
        shows: [{
          genres: ["Thriller", "Action"],
          id: 2,
          rating: {
            average: 7
          }
        }, ],
      },
    ]);
  });

  it('return mostly rated shows based on ratings', () => {
    let data = [{
        id: 1,
        genres: ["Action", "Drama"],
        rating: {
          average: 7
        }
      },
      {
        id: 2,
        genres: ["Thriller", "Action"],
        rating: {
          average: 8.1
        }
      },
      {
        id: 3,
        genres: ["Thriller", "Action"],
        rating: {
          average: null
        }
      }
    ]
    let sorted = wrapper.vm.mostlyRatedShows(data)

    expect(sorted).toStrictEqual([{
        id: 2,
        genres: ['Thriller', 'Action'],
        rating: {
          average: 8.1
        }
      },
      {
        id: 1,
        genres: ['Action', 'Drama'],
        rating: {
          average: 7
        }
      }
    ])
  })
});