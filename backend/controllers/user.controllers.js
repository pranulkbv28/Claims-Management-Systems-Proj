import User from "../models/user.model.js";
import fieldValidation from "../utils/fieldValidation.js";
import generateAndAccessToken from "../utils/generateAndAccessToken.js";

export const loginUser = async (req, res) => {
  try {
    const { fullname, password } = req.body;

    const validInputs = fieldValidation({ fullname, password });

    if (!validInputs) {
      res.status(400).json({
        error: "Please enter all the fields",
      });
    }

    const user = await User.findOne({
      $and: [{ fullname }, { password }],
    });

    // console.log(user);

    if (!user) {
      res.status(400).json({
        error: "Invalid Credentials!!",
      });
    }

    generateAndAccessToken(user._id, res);
    const expiresAt = Date.now() + 10 * 24 * 60 * 60 * 1000; //(logged in time + 10 days) in miliseconds

    // console.log(
    //   "this is the cookie after generation: ",
    //   res.cookies?.jwt || "Where is the cookie"
    // );

    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      expiresAt,
    });
  } catch (error) {
    console.log("ERROR IN LOGIN USER: ", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const logoutUser = async (_, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({
      message: "Logged Out Successfull!!",
    });
  } catch (error) {
    console.log("ERROR IN LOGOUT USER: ", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const signupUser = async (req, res) => {
  try {
    const { fullname, phoneNumber, password } = req.body;

    const validResponse = fieldValidation({ fullname, phoneNumber, password });

    if (!validResponse) {
      return res.status(400).json({
        error: "Please enter the required fields",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ fullname }, { phoneNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists!!",
      });
    }

    const newUser = new User({
      fullname,
      phoneNumber,
      password,
    });

    if (newUser) {
      generateAndAccessToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        phoneNumber: newUser.phoneNumber,
      });
    }
  } catch (error) {
    console.log("ERROR IN SIGNUP USER: ", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
