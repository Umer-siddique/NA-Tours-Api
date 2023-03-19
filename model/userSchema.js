const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter you name."],
      minlength: [3, "Name should be atleast three character long"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email."],
      validate: [
        validator.isEmail,
        "Invalid email! Please provide a valid email.",
      ],
      lowercase: true,
      unique: true,
    },
    photo: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzPb_pSj-ir-9eB6mi0lVJdQP1KKHiB8fRBS1CbmOXGd9Z1FEGMJHbEKhahwhWLGSaEXY&usqp=CAU",
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [8, "Password should be atleast 8 character long."],
      validate: [validator.isStrongPassword, "Password is not strong enough."],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password."],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Password mismatch!",
      },
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// MONGOOSE HASHING DOCUMENT MIDDLEWARE
userSchema.pre("save", async function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

// MONGOOSE STATISTICS METHOD FOR SIGNUP
userSchema.statics.signup = async function (
  name,
  email,
  password,
  confirmPassword,
  passwordChangedAt
) {
  const userExist = await this.findOne({ email });
  if (userExist) {
    throw Error("User already associated with this email!");
  }
  const _user = await this.create({ name, email, password, confirmPassword,passwordChangedAt });
  return _user;
};

// MONGOOSE INSTANCE (METHODS) FOR COMPARE HASHED PASSWORD
userSchema.methods.isCorrectPassword = async function (
  enteredPassowrd,
  userPassword
) {
  return await bcrypt.compare(enteredPassowrd, userPassword);
};

userSchema.methods.passwordChangedAfter = function(jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const _passwordChangedAt= parseInt(this.passwordChangedAt.getTime()/1000 ,10);
    return jwtTimeStamp < _passwordChangedAt;
  }
  return false;
};

module.exports = mongoose.model("User", userSchema);