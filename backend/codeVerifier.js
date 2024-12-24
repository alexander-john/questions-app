// codeVerifier.js
const vm = require('vm');

/**
 * Verifies if the submitted code correctly assigns a value to a variable.
 * @param {string} code - The user-submitted code.
 * @param {string} variableName - The expected variable name.
 * @param {*} expectedValue - The expected value assigned to the variable.
 * @returns {Object} - { valid: boolean, error: string|null }
 */
function verifyCode(code, variableName, expectedValue) {
  const sandbox = {};
  const context = vm.createContext(sandbox);

  try {
    // Append the variable name to retrieve its value
    const script = new vm.Script(`${code}\n${variableName};`);
    const result = script.runInContext(context, { timeout: 1000 });

    // Check if the result matches the expected value
    if (result === expectedValue) {
      return { valid: true, error: null };
    } else {
      return {
        valid: false,
        error: `Variable '${variableName}' has value '${result}', expected '${expectedValue}'.`,
      };
    }
  } catch (err) {
    if (err instanceof ReferenceError) {
      return { valid: false, error: `Variable '${variableName}' is not defined.` };
    } else {
      return { valid: false, error: err.message };
    }
  }
}

module.exports = { verifyCode };
