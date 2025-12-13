export const postQuestion = async (req, res) => {
  try {
    const { question, options, answer } = req.body;
    console.log(question, options, answer);
    return res.status(200).json({
      message: "Data fetched!",
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(400).json({
      message: "Server error!",
    });
  }
};
