exports.validateURL = {
    type: 'object',
    properties: {
        url: {
            type: 'string',
            required: true,
            minLength: 5,
        }
    }
};