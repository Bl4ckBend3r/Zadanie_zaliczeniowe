export function restoreDefaults(key, defaultData) {
    const storedData = JSON.parse(localStorage.getItem(key));
    if (!Array.isArray(storedData) || storedData.length === 0) {
        console.log(`Restoring default data for "${key}"`);
        localStorage.setItem(key, JSON.stringify(defaultData));
        return defaultData;
    }
    return storedData;
}
