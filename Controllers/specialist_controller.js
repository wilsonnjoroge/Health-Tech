import Specialist from "../Models/specialist_model.js";
import bcrypt from "bcryptjs";




// find user from database, if not found: message
export const getAllSpecialists = async (req, res, next) => {
  let specialists;
  try {
    specialists = await Specialist.find();
  } catch (err) {
    console.log(err);
  };
// Message
  if(!specialists) {
    return res.status(404).json({
      message: "Specialist Not Found"
    });
  };

  //specialist found: show user details.
return res.status(200).json({
    specialists
  });
};



//Register and save new specialist if User model conditions are met
export const registerNewSpecialist = async (req, res, next) => {
  const { userName, email, phoneNumber, idNumber, licenseNumber, password } = req.body;

  let existingSpecialist;
// Check if specialist exists by License Number
  try {
    existingSpecialist = await Specialist.findOne({ licenseNumber });
  } catch (err) {
    console.log(err);
  };

  if(existingPatient) {
    return res.status(400).json({
      message: "User Already Exists, Kindly proceed to Log In or use another license number"
    });
  }

  //Password hashing; encryption
  const hashedPassword = bcrypt.hashSync(password);

  const newSpecialist = new Patient({
    userName,
    email,
    phoneNumber,
    idNumber,
    licenseNumber,
    password: hashedPassword,
  });
// Saves registered specialist in DB
  try {
    await newSpecialist.save();
  } catch (err) {
    console.log(err);
  };

  return res.status(201).json({
    newSpecialist
  });
};



//Registered Specialist log in
export const logInSpecialist = async (req, res, next) => {
  const { licenseNumber, password} = req.body;

  // Check if patient exists by license number
  let existingSpecialist;
  try {
    existingSpecialist = await Patient.findOne({email});
  } catch (err) {
    console.log(err);
  }

  if(!existingSpecialist) {
    return res.status(404).json({
      message: "User Not Found, Kindly Register"
    });
  }
  //Password validation
  const isPasswordValid = bcrypt.compareSync(password, existingSpecialist.password);

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
  const { licenseNumber } = req.body;
  let existingSpecialist;
  try {
    existingSpecialist = await Specialist.findOne({ licenseNumber });
  } catch (err) {
    console.log(err);
  }
  if (!existingSpecialist) {
    return res.status(404).json({
      message: "User Not Found, Kindly Register"
    });
  }

  //create instance of User model 
  const user = new Specialist(existingSpecialist);

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

  // outputs the body + reset token (terminal) as object
  console.log({body});

  next();

};