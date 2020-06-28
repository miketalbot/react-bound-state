/**
 * @callback ExtractSortValue
 * @param sortItem - the item being sorted
 * @returns the value to sort on
 */

/**
 * Creates a function for Array.sort that will call a function
 * to extract the values to compare
 * @param {ExtractSortValue} extract - the function to extract a value
 * @returns {Function} a sort function for array sort
 */
export function sortByExtraction(extract) {
    return function (a, b) {
        const va = extract(a)
        const vb = extract(b)
        return vb > va ? -1 : va === vb ? 0 : 1
    }
}

/**
 * Returns a property of an object
 * @param {string} property - property to extract
 * @returns {Function} a function to extract the value from an object
 */
export function pick(property) {
    return function(object) {
        return object[property]
    }

}

/**
 * A sort function to sort items by a priority field or 0 if missing
 * @function
 */
export const inPriorityOrder = sortByExtraction((v) => v.priority || 0)
