const User = require('../Models/UserModels');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const validator = require('validator');
const sendMail = require('../utils/email');

// signup function
exports.signingUp = async (req, res) => {
    try {
        //1-check if the email is already valid
        let email = req.body.email;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'email is not valid' });
        }
        //2-check if a user already signed in using the same email 
        const checkEmail = await User.findOne({ email: req.body.email });
        if (checkEmail) {
            return res.status(400).json({ message: 'a user already signed in using this email' });

        }
        //3- check if a user already signed in using the same username
        const checkUsername = await User.findOne({ userName: req.body.userName });
        if (checkUsername) {
            return res.status(400).json({ message: 'a user already signed in using this username' });
        };
        //4-check if the password and confirm password match
        let pass = req.body.password;
        let passConfirm = req.body.passwordConfirm;

        if (pass != passConfirm) {
            res.status(400).json({ message: 'password and passwordConfirm do not match' });
        }
        else {
            //5-create the user
            const hashedPassword = await bcrypt.hash(pass, 12);

            const newUser = await User.create({
                fullName: req.body.fullName,
                userName: req.body.userName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hashedPassword,
            });

            res.status(201).json({ message: "User created succesfully.", data: { newUser } })

        };
    } catch (err) {
        console.log(err);
    }
};

//signin function
exports.signingIn = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        //   1-check if user already signed up on this website
        if (!user) {
            res.status(400).json({ message: 'user not found' });
        }
        // 2-check if the password is correct
        const comparePasswords = await bcrypt.compare(req.body.password, user.password);

        if (!comparePasswords) {
            return res.status(400).json({ message: "Incorrect credentials." });
        }
        else {
            return res.status(201).json({ message: 'you signed in successfully', data: user });
        }

    } catch (err) {
        console.log(err);
    }
}

exports.forgotPassword = async (req, res) => {
    try {

        //1-Check if the user with the provided email exists
        const user = await User.findOne({ $or: [{ email: req.body.email }, { userName: req.body.userName }, { phoneNumber: req.body.phoneNumber }] });

        if (!user) {
            return res.status(404).json({ message: 'the user with this email does not exist' });
        }

        //2-Create the reset token(to be sent via email)
        const resetToken = user.generatePasswordResetToken();
        await user.save({ validateBeforeSave: false });

        //3-Send the token via email, (create a url with a message to be sent):
        //http://127.0.0.1/api/auth/resetPassword/ahsbdsljdhytfdnbdndjjshshsbsbsb\flsljrjhtiwwqnaz => email that will be sent to the user

        //3.1 Create this url:{
        const url = `${req.protocol}://${req.get("host")}/api/auth/resetPassword/${resetToken}`;
        const msg = `Forgot your password? Reset it by visiting the following link: ${url}`;

        try {
            await sendMail({
                email: user.email,
                subject: "Your password reset token is valid for 10 min",
                message: msg,
            });

            res.status(200).json({
                status: 'success', message: 'The reset link was delivered to your email succesfully',
            });
        }
        catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });

            res.status(500).json({ message: "An error has occurred while sending the email, please try again in a moment", });
        }
    } catch (err) {
        console.log(err);
    }
};


//password reset
exports.resetPassword = async (req, res) => {
    try {
        const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await user.findOne({
            passwordResetToken: hashedToken, passwordResetToken: { $gt: Date.now() }, //$gt greater than or equal
        });

        if (!user) {
            return res.status(400).json({ message: 'The token is invalid, or expired. Please request a new one' });
        }

        if (req.body.password.length < 8) {
            return res.status(400).json({ message: 'Password length is too short' });
        }

        if (req.body.password !== req.body.passwordConfirm) {
            return res.status(400).json({ message: 'Password & Password Confirm are not the same' });
        }

        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        passwordChangedAt: Date.now();

        await user.save();

        return res.status(200).json({ message: "Password has changed successfully" })

    } catch (err) {
        console.log(err);
    }
};

