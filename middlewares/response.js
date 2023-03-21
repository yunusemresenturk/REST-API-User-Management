const responseMiddleware = (req, res, next) => {
  res.success = (data) => {
    res.status(200).send({ success: true, data: data })
  }

  res.fail = () => {
    res.status(400).send({ success: false, message: req.message })
  }

  next()
}

module.exports = responseMiddleware;
