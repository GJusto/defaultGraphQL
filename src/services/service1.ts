import dependenciesContainer from "@/infrastructure/DI/dependencies-container";

class Api1 {}

class service1 /*implements IService1*/ {
  constructor(
    private _httpTransport: Api1 = dependenciesContainer.apis.api1.injectClass(
      Api1
    )
  ) {}
}

export default service1;
