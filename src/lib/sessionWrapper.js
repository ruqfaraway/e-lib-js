export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD, // Must be at least 32 characters
  cookieName: 'my-app-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};