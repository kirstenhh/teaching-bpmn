const saveToLocalStorage = (prefix, data, storageKey) => {
	return new Promise((resolve) => {
		if (typeof prefix === 'undefined') {
			prefix = '';
		} else {
			prefix = prefix + '_'
		};
		console.debug(data, `saving to local storage `)
		localStorage.setItem(storageKey, data)
		resolve(`Saved "${storageKey}" to localStorage`)
	})

};

const getFromLocalStorage = (storageKey) => {
	return new Promise((resolve) => {
		let data = localStorage.getItem(storageKey);
			//console.debug(`localStorage "${storageKey}" = ${data}`)
			resolve(data) // is null if key does not exist
	})
}

const removeFromLocalStorage = (storageKey) => {
	return new Promise((resolve) => {
		localStorage.removeItem(storageKey);
		resolve(`Removed ${storageKey} from localStorage`)
	})
}

const storagemodule = {
	save: saveToLocalStorage,
	get: getFromLocalStorage,
	remove: removeFromLocalStorage
}

export default storagemodule
