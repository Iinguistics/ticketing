import _ from 'lodash';

const camelToSnake = (obj: any): { [key: string]: any } => {
	if (typeof obj !== 'object' || obj === null) {
		return obj;
	}

	return _.reduce(
		obj,
		(result: any, value: any, key: string) => {
			const newKey = _.snakeCase(key);
			if (typeof value === 'object' && !(value instanceof Date)) {
				result[newKey] = camelToSnake(value);
			} else {
				result[newKey] = value;
			}
			return result;
		},
		Array.isArray(obj) ? [] : {}
	);
};

export default camelToSnake;
