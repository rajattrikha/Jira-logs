exports.getPage = (req, res) => {
  console.log("fetching board...");
  try {
    res.render("about");
  } catch (err) {
    res.status(500).json({
      status: "Internal Server Error",
      message: err,
    });
  }
};
