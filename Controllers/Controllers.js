import User from "../Models/User.js";
import bcrypt from "bcryptjs";




// find user from database, if not found: message
export const getAllUsers = async (req, res, next) => {
  let patients;
  try {
    patients = await User.find();
  } catch (err) {
    console.log(err);
  };
// Message
  if(!patients) {
    return res.status(404).json({
      message: "Patient Not Found"
    });
  };

  //patient found: show user details.
return res.status(200).json({
    patients
  });
};



//Register and save new patient if User model conditions are met
export const registerNewPatient = async (req, res, next) => {
  const { userName, email, phoneNumber, idNumber, password } = req.body;

  let existingPatient;
// Check if patient exists by ID Number
  try {
    existingPatient = await User.findOne({ idNumber });
  } catch (err) {
    console.log(err);
  };

  if(existingPatient) {
    return res.status(400).json({
      message: "User Already Exists, Kindly proceed to Log In or use another ID"
    });
  }

  //Password hashing; encryption
  const hashedPassword = bcrypt.hashSync(password);

  const newPatient = new User({
    userName,
    email,
    phoneNumber,
    idNumber,
    password: hashedPassword,
  });
// Saves registered patient in DB
  try {
    await newPatient.save();
  } catch (err) {
    console.log(err);
  };

  return res.status(201).json({
    newPatient
  });
};



//Registered users log in
export const logIn = async (req, res, next) => {
  const { email, password} = req.body;

  // Check if patient exists by email
  let existingPatient;
  try {
    existingPatient = await User.findOne({email});
  } catch (err) {
    console.log(err);
  }

  if(!existingPatient) {
    return res.status(404).json({
      message: "User Not Found, Kindly Register"
    });
  }
  //Password validation
  const isPasswordValid = bcrypt.compareSync(password, existingPatient.password);

  if(!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Password"
    });
  }

  return res.status(200).json({
   message: "Login successful"
  });

};


export const forgotPassword = async (req, res, next) => {
  // Validate if the user exists
  const { email } = req.body;
  let existingPatient;
  try {
    existingPatient = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (!existingPatient) {
    return res.status(404).json({
      message: "User Not Found, Kindly Register"
    });
  }

  //create instance of User model 
  const user = new User(existingPatient);

  // generate reset token 
  const resetToken = user.generatePasswordResetToken();

  // Save the reset token in DB
  try {
    await resetToken.save(validateBeforeSave = false);
  } catch (err) {
    console.log(err);
  }
  
  //Reset URL 
  const resetUrl = `${req.protocol}://${req.get("host")}/app/auth/resetPassword/${resetToken}`;
  const body = "Forgot password? Click the link: " + resetUrl;

  // outputs the body + reset token (terminal)
  console.log(body);

  next();
};


