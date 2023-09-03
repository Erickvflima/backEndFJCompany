const notFoundHandler = (req, res) => {
  res.status(404).send({
    status: 'error',
    message: "This endpoint wasn't found",
    document: [],
    rowsAffected: [],
  });
};

export default notFoundHandler;
