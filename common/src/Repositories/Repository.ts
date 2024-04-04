import Pagination from './Pagination';
import ScopeKey from './ScopeKey';

class Repository {
	static #scopes = {
		active: {
			active: { $eq: true },
		},
		activeNotDeleted: {
			active: { $eq: true },
			deleted_at: { $eq: null },
		},
		deleted: {
			deleted_at: { $ne: null },
		},
		notDeleted: {
			deleted_at: { $eq: null },
		},
	};

	static _scope(key: ScopeKey) {
		return Repository.#scopes[key] ?? {};
	}

	static _calcSkip(pagination: Pagination) {
		return Math.max(
			pagination.limit * (pagination.page - 1) + pagination.offset,
			0
		);
	}
}

export default Repository;
