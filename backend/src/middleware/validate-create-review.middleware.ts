import {
    Request,
    Response,
    NextFunction
} from "express";

export function validateCreateReview(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const {
        resourceId,
        userId,
        text,
        rating
    } = req.body;

    const errors: string[] = [];

    if (!resourceId) {
        errors.push("ResourceId is required");
    }

    if (!userId) {
        errors.push("UserId is required");
    }

    if (!text || text.length < 5) {
        errors.push(
            "Text must contain at least 5 characters"
        );
    }

    if (
        Number(rating) < 1 ||
        Number(rating) > 5
    ) {
        errors.push(
            "Rating must be from 1 to 5"
        );
    }

    if (errors.length > 0) {
        return res.status(400).json({
            error: {
                code: "VALIDATION_ERROR",
                message: "Invalid request body",
                details: errors
            }
        });
    }

    next();
}