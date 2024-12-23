export function showError(input, message) {
    const errorElement = input.nextElementSibling;
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
    input.classList.add('error');
}

export function hideError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement) {
        errorElement.classList.add('hidden');
        errorElement.textContent = '';
    }
    input.classList.remove('error');
}

export function resetErrors(inputs) {
    inputs.forEach(input => hideError(input));
}
