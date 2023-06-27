import auth from "config/auth";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";

async function ensureAuthentication(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    try {
      throw new AppError("Unauthorized", 403);
    } catch (error) {
      response.status(error.statusCode).json({ message: error.message });
    }
  }

  const [, accessToken] = authHeader.split(" ");

  let userId = "";

  try {
    const decodedJwt = verify(accessToken, auth.secret_accessToken, (err, decoded) => {
      if (err) {
        response.status(403).json({ message: "Unauthorized" });
        throw new AppError("Unauthorized", 403);
      }
      return decoded.sub as string;
    });

    userId = String(decodedJwt);

    request.user = { id: userId };

    next();
  } catch (error) {
    response.status(error.statusCode).json({ message: error.message });
  }
}

export { ensureAuthentication };
