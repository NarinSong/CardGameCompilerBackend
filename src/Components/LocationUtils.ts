import { LocationResolver } from "../schemas/types.js";

export function coerceLocation(location: LocationResolver | undefined, type: 'PILE' | 'COUNTER' | 'BUTTON'): LocationResolver {
    if (!location) {
        location = {
            locationType: 'relative',
            location: `DEFAULT_${type}`
        }
    }

    return location;
}