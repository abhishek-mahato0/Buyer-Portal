export const sendSuccess = (res: any, data: any, message = "Success") => {
  return res.json({
    success: true,
    message,
    data,
  });
};

export const sendError = (res: any, message = "Error", status = 400) => {
  return res.status(status).json({
    success: false,
    message,
  });
};
