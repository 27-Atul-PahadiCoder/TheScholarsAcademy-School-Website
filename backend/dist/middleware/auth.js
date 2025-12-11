import jwt from "jsonwebtoken";
import { env } from "../config/env";
export const requireAdmin = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ error: "Missing authorization header" });
    }
    const [, token] = header.split(" ");
    try {
        const payload = jwt.verify(token, env.JWT_SECRET);
        if (payload.role !== "admin") {
            return res.status(403).json({ error: "Insufficient permissions" });
        }
        req.user = payload;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
//# sourceMappingURL=auth.js.map