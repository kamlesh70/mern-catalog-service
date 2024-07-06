export const convertMapToObject = (map: Map<string, any>): any => {
  const obj: any = {};
  for (const [key, value] of map) {
    if (value instanceof Map) {
      convertMapToObject(value as Map<string, any>);
    } else {
      for (const objKey in value) {
        if (value[objKey] instanceof Map) {
          convertMapToObject(value[objKey] as Map<string, any>);
        } else {
          obj[key] = value;
        }
      }
    }
  }
  return obj;
};
