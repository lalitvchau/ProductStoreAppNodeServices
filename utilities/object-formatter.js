const DELIMITER = ', ';
const NO_OF_TRAIL_CHARS = 2;

class ObjectFormatter {
    static format(obj) {
        if(!obj) {
            throw new Error('Invalid Obj Reference Provided!');
        }

        let message = '';

        for(let propertyIndex in obj) {
            let property = obj[propertyIndex];

            if(typeof property !== 'Function') {
                message += `${property}${DELIMITER}`;
            }
        }

        message = message.substr(0, message.length - NO_OF_TRAIL_CHARS);

        return message;
    }
}

export {
    ObjectFormatter
};
