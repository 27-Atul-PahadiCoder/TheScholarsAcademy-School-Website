import { logger } from "../utils/logger";
export const errorHandler = (err, _req, res, _next) => {
    const status = err.status ?? 500;
    if (status >= 500) {
        logger.error({ err }, "Unexpected server error");
    }
    res.status(status).json({
        error: err.message ?? "Unexpected error",
    });
};
//# sourceMappingURL=errorHandler.js.map