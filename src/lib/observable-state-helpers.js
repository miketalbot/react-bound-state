import { useEffect } from 'react'
import Events from "./emitter"
import { replaceArray } from './get-set'


export const targetIds = new WeakMap()

function ensureArray(v) {
    return (Array.isArray(v) ? v : [v]).filter(Boolean)
}

export function getPath(property) {
    return replaceArray(property).split(".").filter(Boolean)
}

const patterns = new Map()

export function getPatterns(target, path) {
    const id = `${targetIds.get(target)}`
    const key = `${id}.${path.join(".")}`
    if (patterns.has(key)) return patterns.get(key)
    const output = []
    let current = path[0]
    output.push(`${current}`)
    for (let i = 1, l = path.length; i < l; i++) {
        current = `${current}.${path[i]}`
        output.push(current)
    }
    patterns.set(key, output)
    return output
}

export function standardExtract(event) {
    if (!event) return
    if (event.target) return event.target.value
    return event
}

export function returnValue(v) {
    return v
}
