import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getSqlClient } from "../../config/sqlClient";
import { env } from "../../config/env";

export class AdminService {
  async ensureSeedUser() {
    const db = getSqlClient();
    const existing = await db("admin_users").first();
    if (existing) return existing;

    const hashed = await bcrypt.hash("ChangeMe123!", 12);
    const [user] = await db("admin_users")
      .insert({
        email: "founder@school.com",
        name: "Super Admin",
        password_hash: hashed,
        role: "admin",
      })
      .returning(["id", "email", "name", "role"]);

    return user;
  }

  async login(email: string, password: string) {
    const db = getSqlClient();
    const user = await db("admin_users").where({ email }).first();
    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return null;
    }

    const token = this.generateToken(user.id, user.role);
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  private generateToken(id: string, role: string) {
    return jwt.sign({ sub: id, role }, env.JWT_SECRET, { expiresIn: "8h" });
  }
}
