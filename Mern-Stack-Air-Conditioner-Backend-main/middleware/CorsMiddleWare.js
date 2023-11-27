// corsMiddleware.js
const setCorsHeaders = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://advancedairconditioner.netlify.app');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  };
  
  module.exports = { setCorsHeaders };
  