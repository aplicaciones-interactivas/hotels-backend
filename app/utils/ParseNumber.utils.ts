export abstract class ParseNumberUtils {
    static parseNums(obj: any, options: any): any {
        var result: any = Array.isArray(obj) ? [] : {},
            key,
            value,
            parsedValue;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                value = obj[key];
                parsedValue = options.parser.call(null, value, 10, key);
                if (typeof value === 'string' && !isNaN(parsedValue)) {
                    result[key] = parsedValue;
                } else if (value.constructor === Object || Array.isArray(value)) {
                    result[key] = this.parseNums(value, options);
                } else {
                    result[key] = value;
                }
            }
        }

        return result;
    }
}
