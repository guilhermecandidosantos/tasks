import auth from "config/auth";
import jwt from "jsonwebtoken";
import { AppError } from "shared/http/errors/AppError";

interface IReturn {
  accessToken: string;
  refreshToken: string;
}

interface IPayload {
  sub: string;
  avatarUrl: string;
}

interface IReturnDecoded{
  avatarUrl: string
  userId: string
}

export function generateTokens(userId: string, avatarUrl: string): IReturn {
  const accessToken = jwt.sign({ avatarUrl }, auth.secret_accessToken, { subject: userId, algorithm: "HS384", expiresIn: auth.expires_in_accessToken });

  const refreshToken = jwt.sign({ avatarUrl }, auth.secret_refreshToken, { subject: userId, algorithm: "HS512", expiresIn: auth.expires_in_refreshToken });

  return { accessToken, refreshToken };
}

export function generateNewRefreshToken(refreshToken: string): IReturn {
  const tokenInfo = jwt.verify(refreshToken, auth.secret_refreshToken, (err, decoded) => {
    if (err) {
      throw new AppError("Refresh Token invalid");
    }

    const { avatarUrl, sub: userId } = decoded as IPayload;

    return { avatarUrl, userId };
  });

  const { userId, avatarUrl } = tokenInfo as IReturnDecoded;

  const tokens = generateTokens(userId, avatarUrl);

  return tokens;
}

export function decodedToken(refreshToken: string): string {
  const tokenInfo = jwt.verify(refreshToken, auth.secret_refreshToken, (err, decoded) => {
    if (err) {
      throw new AppError("Refresh Token invalidd");
    }

    const { sub: userId } = decoded as IPayload;

    return { userId };
  });

  const { userId } = tokenInfo as IReturnDecoded;

  return userId;
}
