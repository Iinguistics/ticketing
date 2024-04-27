import states from './states';

const isValidState = (value: string): boolean => {
	return states.includes(value.toLowerCase());
};

export default isValidState;
