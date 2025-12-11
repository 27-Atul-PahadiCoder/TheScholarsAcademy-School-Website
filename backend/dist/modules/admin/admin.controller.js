import { AdminService } from "./admin.service";
import { sendSuccess } from "../../utils/http";
const service = new AdminService();
export const AdminController = {
    login: async (req, res) => {
        const result = await service.login(req.body.email, req.body.password);
        if (!result) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        return sendSuccess(res, result);
    },
    seed: async (_req, res) => {
        const user = await service.ensureSeedUser();
        return sendSuccess(res, user);
    },
};
//# sourceMappingURL=admin.controller.js.map