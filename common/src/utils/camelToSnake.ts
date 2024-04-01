import _ from 'lodash';

export const camelToSnake = (obj: any): { [key: string]: any } => {
	if (typeof obj !== 'object' || obj === null) {
		return obj;
	}

	return _.reduce(
		obj,
		(result: any, value: any, key: string) => {
			const newKey = _.snakeCase(key);
			result[newKey] = camelToSnake(value);
			return result;
		},
		Array.isArray(obj) ? [] : {}
	);
};
