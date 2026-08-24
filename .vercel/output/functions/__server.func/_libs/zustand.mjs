import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "./@floating-ui/react-dom+[...].mjs";
//#region node_modules/zustand/esm/vanilla.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var createStoreImpl = (createState) => {
	let state;
	const listeners = /* @__PURE__ */ new Set();
	const setState = (partial, replace) => {
		const nextState = typeof partial === "function" ? partial(state) : partial;
		if (!Object.is(nextState, state)) {
			const previousState = state;
			state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
			listeners.forEach((listener) => listener(state, previousState));
		}
	};
	const getState = () => state;
	const getInitialState = () => initialState;
	const subscribe = (listener) => {
		listeners.add(listener);
		return () => listeners.delete(listener);
	};
	const api = {
		setState,
		getState,
		getInitialState,
		subscribe
	};
	const initialState = state = createState(setState, getState, api);
	return api;
};
var createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);
//#endregion
//#region node_modules/zustand/esm/react.mjs
var identity = (arg) => arg;
function useStore(api, selector = identity) {
	const slice = import_react.useSyncExternalStore(api.subscribe, import_react.useCallback(() => selector(api.getState()), [api, selector]), import_react.useCallback(() => selector(api.getInitialState()), [api, selector]));
	import_react.useDebugValue(slice);
	return slice;
}
var createImpl = (createState) => {
	const api = createStore(createState);
	const useBoundStore = (selector) => useStore(api, selector);
	Object.assign(useBoundStore, api);
	return useBoundStore;
};
var create = ((createState) => createState ? createImpl(createState) : createImpl);
//#endregion
//#region node_modules/zustand/esm/middleware.mjs
var subscribeWithSelectorImpl = (fn) => (set, get, api) => {
	const origSubscribe = api.subscribe;
	api.subscribe = ((selector, optListener, options) => {
		let listener = selector;
		if (optListener) {
			const equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
			let currentSlice = selector(api.getState());
			listener = (state) => {
				const nextSlice = selector(state);
				if (!equalityFn(currentSlice, nextSlice)) {
					const previousSlice = currentSlice;
					optListener(currentSlice = nextSlice, previousSlice);
				}
			};
			if (options == null ? void 0 : options.fireImmediately) optListener(currentSlice, currentSlice);
		}
		return origSubscribe(listener);
	});
	return fn(set, get, api);
};
var subscribeWithSelector = subscribeWithSelectorImpl;
//#endregion
export { create as n, subscribeWithSelector as t };
