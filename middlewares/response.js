module.exports = ((req, res, next) => {
  res.success = (data, message) => {
    res.status(200).json({
      success: true,
      message: message,
      data: data
    });
  },

    res.fail = (message) => {
      res.status(400).json({
        success: false,
        message: message,
      });
    };

  next();
});