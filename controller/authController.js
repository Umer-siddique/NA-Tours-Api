const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ id: _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPRES_IN,
  });
};

exports.signupUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword,role,passwordChangedAt } =
      req.body;
    const newUser = await User.signup(
      name,
      email,
      password,
      confirmPassword,
      role,
      passwordChangedAt
    );

    const token = createToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw Error("Please provide an email.");
    }

    if (!password) {
      throw Error("Please enter your password.");
    }

    const user = await User.findOne({ email }).select("+password");

    // const correctPassword=await user.isCorrectPassword(password,user.password)

    if (!user || !(await user.isCorrectPassword(password, user.password))) {
      throw Error("Incorrect email or password.");
    }

    const token = createToken(user._id);

    res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.authCheckMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  // CHECK USER IS AUTHORIZED OR NOT
  if (!authorization) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in. please log in to get access.",
    });
  }

  // FETCHED THE TOKEN
  let token;
  if (authorization) {
    token = authorization.split(" ")[1];
  }

  // VERIFY TOKEN
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // CHECK THE USER STILL EXIST IF DELETED AFTER LOGGED IN
  const freshUser = await User.findById({ _id: decoded.id });
  if (!freshUser) {
    res.status(401).json({
      status: "fail",
      message: "User no longer available! Please login again.",
    });
  }

  // CHECK IF THE PASSWORD CHANGED AFTER LOGGED IN
  const isPasswordChanged = await freshUser.passwordChangedAfter(decoded.iat);

  if (isPasswordChanged) {
    return res.status(401).json({
      status: "fail",
      message: "User recently changed their password! please login again.",
    });
  }

  req.user = freshUser;

  next();
};

exports.authPermissionMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
       return res.status(403).json({
        status: "fail",
        message: "You don't have permission to access this resource.",
      });
    }
    next();
  };
};
