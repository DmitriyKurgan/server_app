const { body, validationResult } = require('express-validator');

// Middleware для валидации тела запроса
const validateRequest = [
    body('title').isString().isLength({ max: 40 }),
    body('author').isString().isLength({ max: 20 }),
    body('availableResolutions').isArray().notEmpty().custom((value:number) => {
        if (!Array.isArray(value) || value.length === 0) {
            throw new Error('At least one resolution should be added');
        }

        // Проверка, что все значения в массиве являются строками
        if (!value.every((resolution) => typeof resolution === 'string')) {
            throw new Error('All resolutions must be strings');
        }

        // Проверка, что значения соответствуют разрешенным значениям
        const allowedResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
        if (!value.every((resolution) => allowedResolutions.includes(resolution))) {
            throw new Error('Invalid resolution value');
        }

        return true;
    }),
];
