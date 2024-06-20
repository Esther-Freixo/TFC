import { NextFunction, Request, Response } from 'express';

class Validation {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static validateUser(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;
    const requiredKeys = ['email', 'password', 'name'];
    const notFoundKey = requiredKeys.find((key) => !(key in user));
    if (notFoundKey) {
      return res.status(400).json({ message: `${notFoundKey} is required` });
    }

    next();
  }
}

export default Validation;
