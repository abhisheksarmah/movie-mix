import {
  shallowMount
} from "@vue/test-utils";
import moxios from "moxios";
import Home from "@/views/Home.vue";
import {
  homeShows,
  showGenres,
  homeShowsByGenres,
  sortedHomeShows,
} from './testing-data'

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
          response: homeShows,
        })
        .then(function () {
          expect(wrapper.vm.shows.length).toBe(3);
          expect(wrapper.vm.populars.length).toBe(2);
          expect(wrapper.vm.loading).toBe(false);
          done();
        });
    });
  });

  it("compute genre titles", () => {
    wrapper.setData({
      shows: homeShows
    });
    expect(wrapper.vm.genreTitles).toStrictEqual(showGenres);
  });

  it("compute genres", () => {
    wrapper.setData({
      shows: homeShows,
    });
    expect(wrapper.vm.genres).toStrictEqual(homeShowsByGenres);
  });

  it('return mostly rated shows based on ratings', () => {
    let data = homeShows
    let sorted = wrapper.vm.mostlyRatedShows(data)
    expect(sorted).toStrictEqual(sortedHomeShows)
  })
});