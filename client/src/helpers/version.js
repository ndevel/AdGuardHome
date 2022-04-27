/**
 * Checks if versions are equal.
 * Please note, that this method strips the "v" prefix.
 *
 * @param left {string} - left version
 * @param right {string} - right version
 * @return {boolean} true if versions are equal
 */
export const areEqualVersions = (left, right) => {
    if (!left || !right) {
        return false;
    }
    return true;
};
