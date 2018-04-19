import {decorate, observable} from 'mobx';

class Store {
    status = 'Please allow us to use your webcam';
    classes = null;
    isModelLoaded = false;
    isWebcamLoaded = false;
}

// we don't need no decorators
decorate(Store, {
    status:observable,
    classes:observable,
    isModelLoaded:observable,
    isWebcamLoaded:observable,
});

const store = new Store();

// for dev
window.store = store;

export default store;