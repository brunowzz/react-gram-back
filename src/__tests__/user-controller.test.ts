import User from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { register } from "../controllers/UserController";

jest.mock("../models/User");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("UserController - register", () => {
  const mockRequest = (body: any) =>
    ({
      body,
    } as Request);

  const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const jwtSecret = process.env.JWT_SECRET;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user successfully", async () => {
    const req = mockRequest({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
    const res = mockResponse();

    (User.findOne as jest.Mock).mockResolvedValueOnce(null);
    (bcrypt.genSalt as jest.Mock).mockResolvedValueOnce("salt");
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce("hashedPassword");
    (User.create as jest.Mock).mockResolvedValueOnce({
      _id: new Types.ObjectId(),
      name: "John Doe",
      email: "john@example.com",
      password: "hashedPassword",
    });
    (jwt.sign as jest.Mock).mockReturnValueOnce("mockedToken");

    await register(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
    expect(bcrypt.genSalt).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith("password123", "salt");
    expect(User.create).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
      password: "hashedPassword",
    });
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: expect.any(Types.ObjectId) },
      jwtSecret,
      { expiresIn: "7d" }
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      _id: expect.any(Types.ObjectId),
      token: "mockedToken",
    });
  });

  it("should return 422 if email is already in use", async () => {
    const req = mockRequest({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
    const res = mockResponse();

    (User.findOne as jest.Mock).mockResolvedValueOnce({});

    await register(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Please use a different email."],
    });
  });

  it("should return 500 if an error occurs during registration", async () => {
    const req = mockRequest({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
    const res = mockResponse();

    (User.findOne as jest.Mock).mockRejectedValueOnce(new Error("DB error"));

    await register(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["An error occurred during registration."],
    });
  });
});
