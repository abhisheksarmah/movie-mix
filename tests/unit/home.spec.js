import { shallowMount } from "@vue/test-utils";
import moxios from "moxios";
import Home from "@/views/Home.vue";

describe("Home.vue", () => {
  let wrapper;

  beforeEach(function() {
    // import and pass your custom axios instance to this method
    moxios.install();

    wrapper = shallowMount(Home, {
      stubs: ["router-link"],
    });
  });

  afterEach(function() {
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

    moxios.wait(function() {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: [
            {
              id: 240,
              url: "http://www.tvmaze.com/shows/240/cops",
              name: "Cops",
              genres: ["Action", "Drama"],
            },
            {
              id: 241,
              url: "http://www.tvmaze.com/shows/241/benched",
              name: "Benched",
              genres: ["Thriller", "Comedy"],
            },
          ],
        })
        .then(function() {
          expect(wrapper.vm.shows.length).toBe(2);
          expect(wrapper.vm.populars.length).toBe(2);
          expect(wrapper.vm.loading).toBe(false);
          done();
        });
    });
  });

  it("compute genre titles", () => {
    wrapper.setData({
      shows: [
        {
          genres: ["Action", "Drama"],
        },
        {
          genres: ["Thriller", "Comedy"],
        },
        {
          genres: ["Action", "Cartoon"],
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
      shows: [
        {
          id: 1,
          genres: ["Action", "Drama"],
        },
        {
          id: 2,
          genres: ["Thriller", "Action"],
        },
      ],
    });
    expect(wrapper.vm.genres).toStrictEqual([
      {
        name: "Action",
        shows: [
          {
            genres: ["Action", "Drama"],
            id: 1,
          },
          {
            genres: ["Thriller", "Action"],
            id: 2,
          },
        ],
      },
      {
        name: "Drama",
        shows: [
          {
            genres: ["Action", "Drama"],
            id: 1,
          },
        ],
      },
      {
        name: "Thriller",
        shows: [
          {
            genres: ["Thriller", "Action"],
            id: 2,
          },
        ],
      },
    ]);
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
