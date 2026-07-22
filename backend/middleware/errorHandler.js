const notFoundHandler = (req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
};

const globalErrorHandler = (err, req, res, next) => {
  console.error('Unhandled error', {
    requestId: req.requestId,
    path: req.path,
    method: req.method,
    message: err.message,
  });
  
  // CORS errors
  if (err.message.includes('CORS')) {
    return res.status(403).json({ error: 'CORS policy violation' });
  }
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

module.exports = {
  notFoundHandler,
  globalErrorHandler
};
