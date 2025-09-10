import userModel from "../../../../database/model/usermodel.js"
import bcrypt from "bcrypt"
import validaterules from "../../../validationRules.js"
import helper from "../../../../middleware/headerVarification.js"
import statusCode from "../../../../config/statusCode.js"
import jwt from "jsonwebtoken"
import GLOBALS from "../../../../config/constants.js"
const signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            countryCode,
            phoneNo,
            password,
            DOB,
            gender,
        } = req;




        const existingUser = await userModel.findOne({ $or: [{ email }, { phoneNo }] });
        if (existingUser) {
            return helper.sendApiResponse(req, res, statusCode.DUPLICATED_VALUE, { keyword: "EMAIL_PHONE_ALREADY_EXIST", components: [] })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user (backend fields take defaults)
        const newUser = new userModel({
            firstName,
            lastName,
            email,
            countryCode,
            phoneNo,
            password: hashedPassword,
            DOB,
            gender,
            // backend fields (optional, schema already has defaults)
            loginStatus: "offline",
            status: "active",
            isDeleted: false,
        });

        await newUser.save();

        // Remove password from response
        const userResponse = newUser.toObject();
        delete userResponse.password;

        helper.sendApiResponse(req, res, statusCode.SUCCESS, { keyword: "USER_CREATED", components: [] }, userResponse)

    } catch (error) {
        console.error("Signup error:", error);
        helper.sendApiResponse(req, res, statusCode.INTERNAL_ERROR, { keyword: "SERVER_ERROR", components: [] });
    }
};

const login = async (req, res) => {
    try {
        const { email, phoneNo, password } = req;

        // Find user by email or phone
        const user = await userModel.findOne({
            $or: [{ email }, { phoneNo }]
        });

        if (!user) {
            return helper.sendApiResponse(
                req,
                res,
                statusCode.NOT_FOUND,
                { keyword: "USER_NOT_FOUND", components: [] }
            );
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return helper.sendApiResponse(
                req,
                res,
                statusCode.UNAUTHORIZED,
                { keyword: "INVALID_CREDENTIALS", components: [] }
            );
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            GLOBALS.JWT_SECRET,
            { expiresIn: GLOBALS.JWT_EXPIRES_IN }
        );

        // Update login status
        user.loginStatus = "online";
        await user.save();

        // Remove password before sending response
        const userResponse = user.toObject();
        delete userResponse.password;

        helper.sendApiResponse(
            req,
            res,
            statusCode.SUCCESS,
            { keyword: "LOGIN_SUCCESS", components: [] },
            { user: userResponse, token }
        );

    } catch (error) {
        console.error("Login error:", error);
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        );
    }
};

const logout = async (req, res, user) => {
    try {
        const { userId } = user; // coming from JWT payload

        const existingUser = await userModel.findById(userId);
        if (!existingUser) {
            return helper.sendApiResponse(
                req,
                res,
                statusCode.NOT_FOUND,
                { keyword: "USER_NOT_FOUND", components: [] }
            );
        }

        existingUser.loginStatus = "offline";
        await existingUser.save();

        helper.sendApiResponse(
            req,
            res,
            statusCode.SUCCESS,
            { keyword: "LOGOUT_SUCCESS", components: [] }
        );
    } catch (error) {
        console.error("Logout error:", error);
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        );
    }
};

const getProfile = async (req, res, user) => {
    try {
        const { userId } = user;

        const existingUser = await userModel.findById(userId).select("-password");
        if (!existingUser) {
            return helper.sendApiResponse(
                req,
                res,
                statusCode.NOT_FOUND,
                { keyword: "USER_NOT_FOUND", components: [] }
            );
        }

        helper.sendApiResponse(
            req,
            res,
            statusCode.SUCCESS,
            { keyword: "PROFILE_FETCHED", components: [] },
            existingUser
        );
    } catch (error) {
        console.error("GetProfile error:", error);
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        );
    }
};

const profileUpdate = async (req, res, user) => {
    try {
        const {
            firstName,
            lastName,
            email,
            countryCode,
            phoneNo,
            DOB,
            gender,
        } = req;

        const { userId } = user;

        const existingUser = await userModel.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            email,
            countryCode,
            phoneNo,
            DOB,
            gender,
        }, { new: true, runValidators: true }).select("-password");

        if (existingUser) {
            helper.sendApiResponse(
                req,
                res,
                statusCode.SUCCESS,
                { keyword: "PROFILE_UPDATED", components: [] },
                existingUser
            )
        } else {
            helper.sendApiResponse(
                req,
                res,
                statusCode.NOT_FOUND,
                { keyword: "USER_NOT_FOUND", components: [] }
            )
        }

    } catch (error) {
        console.error("GetProfile error:", error);
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        );
    }
}

const soft_delete = async (req, res, user) => {
    try {
        const { userId } = user;
        const existingUser = await userModel.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, runValidators: true })
        console.log(existingUser);

        if (!existingUser) {
            helper.sendApiResponse(
                req,
                res,
                statusCode.NOT_FOUND,
                { keyword: "USER_NOT_FOUND", components: [] }
            )
        }


        helper.sendApiResponse(
            req,
            res,
            statusCode.SUCCESS,
            { keyword: "user_soft_delete", components: [] }
        )
    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        )
    }
}

const p_delete = async (req, res, user) => {
    try {
        const { userId } = user;
        const deleted_user = await userModel.findByIdAndDelete(userId);
        if (!deleted_user) {
            helper.sendApiResponse(
                req,
                res,
                statusCode.NOT_FOUND,
                { keyword: "USER_NOT_FOUND", components: [] }
            )
        }
        helper.sendApiResponse(
            req,
            res,
            statusCode.SUCCESS,
            { keyword: "user_permanent_deleted", components: [] }
        )
    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        )
    }
}

export default {
    signup,
    login,
    logout,
    getProfile,
    profileUpdate,
    soft_delete,
    p_delete
}
