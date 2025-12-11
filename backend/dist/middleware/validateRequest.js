export const validateRequest = (schema) => (req, res, next) => {
    const result = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query,
    });
    if (!result.success) {
        return res.status(400).json({
            error: "Validation failed",
            details: result.error.flatten(),
        });
    }
    next();
};
//# sourceMappingURL=validateRequest.js.map