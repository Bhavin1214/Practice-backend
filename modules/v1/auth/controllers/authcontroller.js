import validaterules from "../../../validationRules.js"
import helper from "../../../../middleware/headerVarification.js"
import statusCode from "../../../../config/statusCode.js"
import authmodule from "../module/authModule.js"

export const signup = (req, res) => {


    helper.decryption(req.body, (req) => {

        const validate = helper.checkValidationRules(req, validaterules.signupValidation)
        
        if (validate) {
            authmodule.signup(req, res)
        } else {
            helper.sendApiResponse(req, res, statusCode.VALIDATION_ERROR, { keyword: "VALIDATION_ERROR", components: [] });
        }
    })

}

export const login = (req,res)=>{

    helper.decryption(req.body, (req) => {

        const validate = helper.checkValidationRules(req, validaterules.loginValidation)

        if (validate) {
            authmodule.login(req, res)
        } else {
            helper.sendApiResponse(req, res, statusCode.VALIDATION_ERROR, { keyword: "VALIDATION_ERROR", components: [] });
        }
    })
}

export const logout = (req, res) => {
    const authHeader = req.headers["authorization"];
    const user = helper.validateHeaderToken(authHeader);

    if (!user) {
        return helper.sendApiResponse(
            req,
            res,
            statusCode.UNAUTHORIZED,
            { keyword: "TOKEN_INVALID", components: [] }
        );
    }

    authmodule.logout(req, res, user);
};

export const getProfile = (req, res) => {
    const authHeader = req.headers["authorization"];
    const user = helper.validateHeaderToken(authHeader);

    if (!user) {
        return helper.sendApiResponse(
            req,
            res,
            statusCode.UNAUTHORIZED,
            { keyword: "rest_keywords_token_not_found", components: [] }
        );
    }

    authmodule.getProfile(req, res, user);
};

export const profileUpdate = (req,res)=>{
    const authHeader = req.headers["authorization"];
    const user = helper.validateHeaderToken(authHeader);
    if (!user) {
        return helper.sendApiResponse(
            req,
            res,
            statusCode.UNAUTHORIZED,
            { keyword: "rest_keywords_token_not_found", components: [] }
        );
    }

    const data = req.body;

    
    helper.decryption(data,(req)=>{
        
        const validate = helper.checkValidationRules(req,validaterules.profileUpdateValidation);
        if (validate) {
            authmodule.profileUpdate(req,res,user)
        } else {
            helper.sendApiResponse(req, res, statusCode.VALIDATION_ERROR, { keyword: "VALIDATION_ERROR", components: [] });
        }
    })
}

export const soft_delete = (req,res)=>{
    const authHeader = req.headers["authorization"];
    const user = helper.validateHeaderToken(authHeader);
    if (!user) {
        return helper.sendApiResponse(
            req,
            res,
            statusCode.UNAUTHORIZED,
            { keyword: "rest_keywords_token_not_found", components: [] }
        );
    }
    authmodule.soft_delete(req,res,user)

}

export const p_delete = (req,res)=>{
    const authHeader = req.headers["authorization"];
    const user = helper.validateHeaderToken(authHeader);
    if (!user) {
        return helper.sendApiResponse(
            req,
            res,
            statusCode.UNAUTHORIZED,
            { keyword: "rest_keywords_token_not_found", components: [] }
        );
    }
    authmodule.p_delete(req,res,user);
}

