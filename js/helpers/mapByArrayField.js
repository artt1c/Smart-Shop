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