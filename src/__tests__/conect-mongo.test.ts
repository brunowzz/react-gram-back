import mongoose from "mongoose";
import { connection } from "../config/db";

jest.mock("mongoose");

describe("Database Connection", () => {
  it("should connect to the database successfully", async () => {
    (mongoose.connect as jest.Mock).mockResolvedValueOnce("MockedDBConnection");

    const db = await connection();

    expect(mongoose.connect).toHaveBeenCalledWith(
      expect.stringContaining("mongodb+srv://")
    );
    expect(db).toBe("MockedDBConnection");
  });

  it("should log an error if connection fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const error = new Error("Connection failed");
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(error);

    await connection();

    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    consoleErrorSpy.mockRestore();
  });
});
