import { createStore, compose } from 'redux';
import createReducer from './reducers';

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

    return store;
}
