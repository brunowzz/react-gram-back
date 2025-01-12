import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Error hashing password");
  }
}
