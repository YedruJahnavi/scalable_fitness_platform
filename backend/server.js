require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const crypto = require('crypto');
const connectDB = require('./config/database');
const mongoose = require('mongoose');
const { validateEnvironment } = require('./config/env');
const { corsOptions, globalIpRateLimiter, allowedOrigins } = require('./middleware/security');

const path = require('path');
const apiRoutes = require('./routes');
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorHandler');
const app = express();
let envConfig;
try {
  envConfig = validateEnvironment();
} catch (error) {
  console.error('❌ Startup validation failed:', error.message);
  process.exit(1);
}

// Connect MongoDB
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}
app.set('trust proxy', envConfig.trustProxy);

// ============ SECURITY MIDDLEWARE ============
app.use(helmet()); // Security headers
app.use(compression()); // Response compression
app.disable('x-powered-by');

app.use(cors(corsOptions));
// Remove the redundant OPTIONS handler as the cors middleware handles it
app.use(globalIpRateLimiter);
app.use((req, res, next) => {
  req.requestId = req.headers['x-request-id'] || crypto.randomUUID();
  res.setHeader('X-Request-Id', req.requestId);
  next();
});
morgan.token('request_id', (req) => req.requestId);
morgan.token('client_ip', (req) => req.ip);
const productionLogFormat = JSON.stringify({
  time: ':date[iso]',
  requestId: ':request_id',
  method: ':method',
  path: ':url',
  status: ':status',
  responseTimeMs: ':response-time',
  contentLength: ':res[content-length]',
  ip: ':client_ip',
  userAgent: ':user-agent',
});
app.use(morgan(envConfig.isProduction ? productionLogFormat : 'dev', {
  skip: (req) => req.path === '/health' || req.path === '/health/live',
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/health/live', (req, res) => {
  res.json({
    status: 'UP',
    service: 'fitpulse-api',
    timestamp: new Date().toISOString(),
  });
});
app.get('/health', (req, res) => {
  const dbReady = mongoose.connection.readyState === 1;
  const status = dbReady ? 'UP' : 'DEGRADED';

  res.status(dbReady ? 200 : 503).json({
    status,
    service: 'fitpulse-api',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    checks: {
      database: dbReady ? 'UP' : 'DOWN',
    },
  });
});

app.use('/api', apiRoutes);

// ============ FRONTEND SERVING ============
// Serve static frontend files in production
if (process.env.NODE_ENV === 'production') {
  const frontendDistPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendDistPath));
  
  // Catch-all route to serve React's index.html for client-side routing
  // Using Regex instead of '*' to avoid Express 5.x path-to-regexp error
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

// ============ ERROR HANDLING ============
// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || '0.0.0.0';

if (require.main === module) {
  app.listen(PORT, HOST, () => {
    console.log(`🚀 FitPulse API → http://${HOST}:${PORT}`);
    console.log(`✅ CORS Allowed Origins: ${allowedOrigins.join(', ')}`);
    console.log(`✅ Environment: ${envConfig.nodeEnv}`);
    console.log(`✅ Trust Proxy: ${envConfig.trustProxy}`);
  });
}

module.exports = app;
