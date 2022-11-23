const findAllScope = (req, res, next) => {
  req.findAllScope = [
    {
      method: ["filter", req.multiQuery],
    },
    {
      method: ["expand", req.multiQuery],
    },
    {
      method: ["pagination", req.query],
    },
    {
      method: ["sort", req.query],
    },
    "defaultScope",
  ];

  next();
};
