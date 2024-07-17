module.exports = (err, erq, res, next) => {
  const statusCode =  err.statusCode || res.statusCode  || 500;

console.log('errorhandlerdan error =', err)
  res.status(statusCode).json({
    error: false,
    message: err.message,
    cause: err.cause,
    //stack: err.stack, //?stacki yazmiyoruz, html kodu olarak hatayi getiriyor
  });
};
