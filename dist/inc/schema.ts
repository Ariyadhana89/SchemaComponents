import { oas31 } from "openapi3-ts";

export function getEmptyObject<T>(schema: oas31.SchemaObject): T {
  const { properties = {} } = schema;
  return Object.keys(properties).reduce((prev, propName) => {
    const prop = properties[propName] as oas31.SchemaObject;
    let propValue: any;
    switch (prop.type) {
      case "string":
        propValue = prop.enum ? prop.enum[0] : prop.default || "";
        break;

      case "array":
        propValue = prop.default || [];
        break;

      case "number":
      case "integer":
        propValue = prop.default || 0;
        break;

      case "boolean":
        propValue = prop.default || false;
        break;

      case "object":
        propValue = prop.default || getEmptyObject(prop);
        break;

      // eslint-disable-next-line no-fallthrough
      default:
        console.log(prop);
        throw new Error("Unsupported property");
    }

    // @ts-ignore
    prev[propName] = propValue;
    return prev;
  }, {}) as T;
}
