import { createStore, compose } from 'redux';
import createReducer from './reducers';
import _ from 'lodash';

export default function configureStore() {

    const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            shouldHotReload: false
        })
        : compose;

    const store = createStore(createReducer(), composeEnhancers());

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(createReducer());
        });
    }

    store.subscribe(_.throttle(() => {
        sessionStorage.setItem('tasks', JSON.stringify(store.getState().app.tasks))
    }), 1000)

    return store;
}
