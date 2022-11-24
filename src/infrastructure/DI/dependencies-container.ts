import { createInjector } from "typed-inject";

function Api1() {}

let api1;
api1 = new Api1();
const dependenciesContainer = {
  service: {
    service1: createInjector().provideClass("api1", api1),
  },

  apis: {
    api1: createInjector(),
  },
};

export default { ...dependenciesContainer };
