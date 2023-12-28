
// ***************************************************
// userAuthController.js
const userAuthModel = require('../models/userAuthModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const JWT = require("jsonwebtoken");

// Function to send OTP via email
const sendOTPByEmail = async (otp, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sunielsharma1921@gmail.com',
        pass: 'mvqjagkegjejliwd',
      },
    });

    const mailOptions = {
      from: 'sunielsharma1921@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for registration is: ${otp}`,
    };

    const emailResult = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + emailResult.response);

    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Error sending email' };
  }
};

// Controller for user registration
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation check
    if (!name || !email || !password) {
      return res.status(400).send({ success: false, message: 'All Fields are required' });
    }

    // Check if the user already exists
    const userExists = await userAuthModel.findOne({ email });
    if (userExists) {
      return res.status(400).send({ success: false, message: 'User already exists!' });
    }

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Hashing user password
    const hashPassword = await bcrypt.hash(password, 10);

    // Save the new user in the database
    const newUser = await userAuthModel.create({ name, email, password: hashPassword, otp });

    // Send OTP via email
    const emailResult = await sendOTPByEmail(otp, email);

    if (!emailResult.success) {
      // If email sending fails, you might want to handle it accordingly
      return res.status(500).send(emailResult);
    }

    return res.status(201).send({ success: true, message: 'OTP sent via email.', newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: `Error while registering user ${error}` });
  }
};




exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user by email (case-insensitive search)
    const user = await userAuthModel.findOne({ email: { $regex: new RegExp(email, 'i') } });

    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    // Check if the provided OTP matches the stored OTP
    if (otp === user.otp) {
      // OTP matched, update user's OTP status or perform any other necessary actions
      // For simplicity, you can update the user's status to verified
      await userAuthModel.findByIdAndUpdate(user._id, { $set: { isVerified: true } });

      return res.status(200).send({ success: true, message: 'OTP verification successful' });
    } else {
      return res.status(400).send({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: 'Error during OTP verification' });
  }
};







// ***************************************************

















// //register controller
// exports.register = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         //validation check
//         if (!name || !email || !password) {
//             return res.status(400).send({ success: false, message: 'All Fields are required' })
//         }

//         //check user email alrady exit or not
//         const userExit = await userAuthModel.findOne({ email });
//         if (userExit) {
//             return res.status(400).send({ success: false, message: 'User already Exit' })
//         }

//         //hashing user password
//         const hashPassword = await bcrypt.hash(password, 10);

//         //saving new user in database
//         const newUser = await userAuthModel.create({ name, email, password: hashPassword });
//         return res.status(201).send({ success: true, message: 'Register Successfully', newUser })


//     } catch (error) {
//         return res.status(500).send({ success: false, message: `Error while registering user ${error}` })

//     }
// }









//login controller 
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation check
        if (!email || !password) {
            return res.status(400).send({ success: false, message: 'All Fields are required' })
        }

        //checking user register or not
        const userExit = await userAuthModel.findOne({ email });
        if (!userExit) {
            return res.status(400).send({ success: false, message: 'User Not Exit' });
        }

        //check password (password match or not with db Password)
        const passwordMatch = await bcrypt.compare(password, userExit.password);
        if (!passwordMatch) {
            return res.status(400).send({ success: false, message: 'Invalid Credential' })
        }

        //generate token
        const token = JWT.sign({ _id: userExit._id }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });

        // Save the token in a cookie
        res.cookie("You Token is ", token,{
            httpOnly: true, // Makes the cookie accessible only on the server side
            secure: process.env.NODE_ENV === 'development', // Ensures the cookie is sent only over HTTPS in production
            // secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent only over HTTPS in production
            maxAge: 2 * 24 * 60 * 60 * 1000, // Sets the cookie expiration time in milliseconds (2 days in this example)
            path: '/', // Specifies the cookie path

        })

        return res.status(200).send({ success: true, message: 'Login Successfully', userExit, token });


    } catch (error) {
        return res.status(500).send({ success: false, message: `Error while registering user ${error}` })
    }

}



//test for private routes
exports.test = (req, res)=>{
    res.send("iam protected routes")
}

//admin page test
exports.isAdmin = (req ,res)=>{
    res.send("welcome to the admin dashboard")
}