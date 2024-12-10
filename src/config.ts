export const config = {
    db: {
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'ai_text_api',
      password: process.env.DB_PASSWORD || '1235',
      port: Number(process.env.DB_PORT) || 5432,
    },
    jwtSecret: process.env.JWT_SECRET || '2e8b13e78f55f1a5c6b612f3b89ae94d8f77ae5b3e341dfc6cbd29cfcb7e65f3b448ccf6c9a0b3e5c6a59ec2e9a0d44c4912d56fa499a2fa7c10a6767cefffc8',
    jwtExpiration: process.env.JWT_EXPIRATION || '1h',
    apiKey: process.env.OPENAI_API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3YjEyMWFlLWUwZDYtNDliMi1iNjlmLTBkNzE3ODkzYjgzOSIsImlzRGV2ZWxvcGVyIjp0cnVlLCJpYXQiOjE3Mjc2OTA0MTgsImV4cCI6MjA0MzI2NjQxOH0.0_rVXKNuSCBP4MO6hBnTXAE0kE1h52xpwDSGPaR4vGM'
  };