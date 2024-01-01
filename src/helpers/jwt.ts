import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET: string =
  process.env.ACCESS_TOKEN_SECRET || 'AccessTokenSecret';
const ACCESS_TOKEN_EXPIRY: string = process.env.ACCESS_TOKEN_EXPIRY || '30m';

const REFRESH_TOKEN_SECRET: string =
  process.env.REFRESH_TOKEN_SECRET || 'RefreshTokenSecret';
const REFRESH_TOKEN_EXPIRY: string = process.env.REFRESH_TOKEN_EXPIRY || '1d';

const generateAccessToken = (data: any) => {
  return jwt.sign(data, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY
  });
};

export const generateAuthToken = (data: any) => {
  const accessToken = generateAccessToken(data);

  const refreshToken = jwt.sign(data, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY
  });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => {
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return new Error('Unauthorized', { cause: 401 });
    return user;
  });
};

export const verifyRefreshToken = (token: string) => {
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user: any) => {
    if (err) return new Error('Refresh token expired', { cause: 401 });

    const { iat, exp, ...data } = user;
    const accessToken = generateAccessToken(data);

    return { accessToken };
  });
};
