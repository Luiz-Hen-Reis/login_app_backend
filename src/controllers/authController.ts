import { Request, Response } from "express";
import { userService } from "../services/userService";
import { User } from "../models";
import { jwtService } from "../services/jwtService";

export const authController = {
  register: async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, phone, location } = req.body;

    try {
      const userAlreadyExists = await userService.findByEmail(email);

      if (userAlreadyExists) throw new Error("E-mail já cadastrado.");

      const user = await userService.create({
        firstName,
        lastName,
        email,
        password,
        phone,
        location,
      });

      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await userService.findByEmail(email);

    try {
      if (!user)
        return res.status(404).json({ message: "E-mail não cadastrado." });

      user.checkPassword(password, (err, isSame) => {
        if (err) return res.status(400).json({ message: err.message });

        if (!isSame)
          return res.status(400).json({ message: "Senha incorreta." });

        const payload = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };

        const token = jwtService.signToken(payload, "7d");

        return res.status(200).json({ authenticated: true, ...payload, token });
      });
    } catch (error) {
      if (error instanceof Error)
        return res.json(400).json({ message: error.message });
    }
  },
};
