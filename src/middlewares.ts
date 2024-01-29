import {NextFunction, Response} from "express";

const { body, validationResult } = require('express-validator');

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
    body('publicationDate').optional().isISO8601().custom((value:string) => {
        if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
            throw new Error('Invalid publicationDate format');
        }
        return true;
    }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            debugger
            const errorMessages = errors.array().map((error: any) => ({
                message: error.msg,
                field: error.path
            }));
            return res.status(400).json({ errorsMessages: errorMessages });
        }
        next();
    }
];

