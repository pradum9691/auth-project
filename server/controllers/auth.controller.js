import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashPass,
      isVerified: false,
    });

    const verificationToken = jwt.sign(
      { userid: newUser._id },
      process.env.JWT_RAW_KEY,
      { expiresIn: "1h" }
    );

    const verificationLink = `http://localhost:5173/verify/${verificationToken}`;

    await sendEmail({
      email,
      subject: "Email Verification",
      html: `<h3>Hello ${name}</h3>
      <p>Click below to verify:</p>
      <a href="${verificationLink}">Verify Email</a>`,
    });

    res.status(201).json({
      message: "Registered successfully. Please verify email.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_RAW_KEY);

    const user = await UserModel.findById(decoded.userid);

    if (!user)
      return res.status(400).json({ message: "Invalid token" });

    if (user.isVerified)
      return res.json({ message: "Already verified" });

    user.isVerified = true;
    await user.save();

    res.json({
      message: "Email verified successfully. Now login.",
    });
  } catch {
    res.status(400).json({ message: "Verification failed" });
  }
};


export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.isVerified)
      return res.status(401).json({ message: "Verify email first" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(403).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch {
    res.status(500).json({ message: "Login error" });
  }
};

export const profileController = async (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email,
    isVerified: req.user.isVerified,
  });
};
