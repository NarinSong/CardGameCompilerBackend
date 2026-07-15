import { LocationResolver } from "../schemas/types.js";

/**
 * Ensures a LocationResolver exists for a given component type.
 * If no location is provided, defaults to a relative location using the component type's default key.
 * @param location - The location resolver to coerce, or undefined.
 * @param type - The type of component ('PILE', 'COUNTER', or 'BUTTON').
 * @returns A valid LocationResolver.
 */
export function coerceLocation(location: LocationResolver | undefined, type: 'PILE' | 'COUNTER' | 'BUTTON'): LocationResolver {
    if (!location) {
        location = {
            locationType: 'relative',
            location: `DEFAULT_${type}`
        }
    }

    return location;
}