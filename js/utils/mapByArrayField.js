/**
 * Перетворює масив об'єктів у мапу по заданому полю
 * @param {Array} array - масив об'єктів
 * @param {string} keyField - ім'я поля для ключа
 * @param {Function} [transformFn] - опціональна функція трансформації значення
 * @returns {Object}
 */

const mapByArrayField = (array, keyField, transformFn = (item) => item) => {
  return array.reduce((acc, item) => {
    const key = item[keyField];
    if (key) {
      acc[key] = transformFn(item);
    }
    return acc;
  }, {});
}

export default mapByArrayField;