import { createReduxStore, register } from "@wordpress/data";
import { get } from "common/scripts/helpers";

const INITIAL_STATE = {
	roles: [],
};

const actions = {
	fetchOptions: () => ({
		type: "FETCH_OPTIONS",
	}),
	setOptions: (options) => ({
		type: "SET_OPTIONS",
		options,
	}),
};

const store = createReduxStore("bloc/options", {
	reducer(state = INITIAL_STATE, action) {
		switch (action.type) {
			case "SET_OPTIONS":
				return { ...state, roles: action.options.roles };
		}

		return state;
	},
	actions,
	selectors: {
		getOptions: (state, key) => state[key],
	},
	controls: {
		FETCH_OPTIONS() {
			return get("options");
		},
	},
	resolvers: {
		*getOptions() {
			const options = yield actions.fetchOptions();

			return actions.setOptions(options);
		},
	},
});

register(store);
