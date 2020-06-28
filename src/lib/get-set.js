export function get(object, path, defaultValue) {
    path = replaceArray(path)
    const parts = path.split(".").filter(Boolean)
    if (parts.length === 0) return object
    for (let i = 0, l = parts.length - 1; i < l; i++) {
        const part = parts[i]
        const current = object[part]
        if (current && typeof current === "object") {
            object = current
        } else if (current === undefined || current === null) {
            object = object[part] = {}
        } else {
            throw new Error("Invalid Path")
        }
    }
    let lastPart = parts[parts.length - 1]
    let value = object[lastPart]
    value = value !== undefined ? value : defaultValue
    object[lastPart] = value
    return value
}

export function replaceArray(path) {
    return path.replace(/^\./, "").replace(/\[/g, ".").replace(/]/g, "")
}

export function set(object, path, value) {
    const start = object
    path = replaceArray(path)
    const parts = path.split(".").filter(Boolean)
    if (parts.length === 0) return
    for (let i = 0, l = parts.length - 1; i < l; i++) {
        const part = parts[i]
        const current = object[part]
        if (current && typeof current === "object") {
            object = current
        } else if (current === undefined || current === null) {
            object = object[part] = {}
        } else {
            throw new Error("Invalid Path")
        }
    }
    object[parts[parts.length - 1]] = value
    return value
}
