import {NextFunction, Response} from "express";

const { body, validationResult } = require('express-validator');

// export const validateRequest = [
//     body('title').isString().isLength({ max: 40 }),
//     body('author').isString().isLength({ max: 20 }),
//     body('canBeDownloaded').optional().isBoolean(), // Поле может быть опциональным и должно быть булевым
//     body('minAgeRestriction').optional().isInt({ min: 1, max: 18 }), // Поле может быть опциональным и должно быть целым числом от 1 до 18
//     body('availableResolutions').isArray().notEmpty().custom((value: string[]) => {
//         if (!Array.isArray(value) || value.length === 0) {
//             throw new Error('At least one resolution should be added');
//         }
//
//         // Проверка, что все значения в массиве являются строками
//         if (!value.every((resolution) => typeof resolution === 'string')) {
//             throw new Error('All resolutions must be strings');
//         }
//
//         // Проверка, что значения соответствуют разрешенным значениям
//         const allowedResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
//         if (!value.every((resolution) => allowedResolutions.includes(resolution))) {
//             throw new Error('Invalid resolution value');
//         }
//
//         return true;
//     }),
//     body('publicationDate').optional().isISO8601(), // Поле может быть опциональным и должно быть в формате даты и времени ISO 8601
//     (req: Request, res: Response, next: NextFunction) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             const errorMessages = errors.array().map((error: any) => ({
//                 message: error.msg,
//                 field: error.param
//             }));
//             return res.status(400).json({ errorsMessages: errorMessages });
//         }
//         next();
//     }
// ];

export const validateRequest = [
    body('title').isString().isLength({ max: 40 }).withMessage('Invalid title value'),
    body('author').isString().isLength({ max: 20 }).withMessage('Invalid author value'),
    body('canBeDownloaded').optional().isBoolean().withMessage('Invalid canBeDownloaded value'),
    body('minAgeRestriction').optional().isInt({ min: 1, max: 18 }).withMessage('Invalid minAgeRestriction value'),
    body('availableResolutions').isArray().notEmpty().custom((value: string[]) => {
        if (!Array.isArray(value) || value.length === 0) {
            throw new Error('At least one resolution should be added');
        }

        if (!value.every((resolution) => typeof resolution === 'string')) {
            throw new Error('All resolutions must be strings');
        }

        const allowedResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
        if (!value.every((resolution) => allowedResolutions.includes(resolution))) {
            throw new Error('Invalid resolution value');
        }

        return true;
    }).withMessage('Invalid availableResolutions value'),
    body('publicationDate').optional().isISO8601().withMessage('Invalid publicationDate value'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error: any) => ({
                message: error.msg,
                field: error.param
            }));
            return res.status(400).json({ errorsMessages: errorMessages });
        }
        next();
    }
];

