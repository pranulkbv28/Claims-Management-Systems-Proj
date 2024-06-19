import jwt from "jsonwebtoken";

const generateAndAccessToken = (userID, res) => {
  const token = jwt.sign({ userID }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10d",
  });

  console.log(token);

  res.cookie("jwt", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};

export default generateAndAccessToken;
