import validaterules from "../../validationRules.js"
import helper from "../../../middleware/headerVarification.js"
import statusCode from "../../../config/statusCode.js"
import GLOBALS from "../../../config/constants.js"
import postModule from "./postModule.js"

export const createPost = (req, res) => {
    try {
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

        helper.decryption(req.body, (req) => {
            const validate = helper.checkValidationRules(req, validaterules.createPostValidation)
            if (validate) {
                postModule.createPost(req, res, user)
            } else {
                helper.sendApiResponse(req, res, statusCode.VALIDATION_ERROR, { keyword: "VALIDATION_ERROR", components: [] })
            }
        })

    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        )
    }
}

export const updatePost = (req, res) => {
    try {
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
        let { id } = req.query;

        if (!id) {
            return helper.sendApiResponse(
                req,
                res,
                statusCode.NOT_FOUND,
                { keyword: "rest_keywords_post_not_found", components: [] }
            );
        }
        id = helper.decString(id);

        helper.decryption(req.body, (req) => {
            const validate = helper.checkValidationRules(req, validaterules.createPostValidation)
            if (validate) {
                postModule.updatePost(req, res, user, id)
            } else {
                helper.sendApiResponse(req, res, statusCode.VALIDATION_ERROR, { keyword: "VALIDATION_ERROR", components: [] })
            }
        })
    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        )
    }
}

export const soft_delete = (req, res) => {
    try {
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
        let { id } = req.query;
        // console.log(id);

        if (!id) {
            return helper.sendApiResponse(
                req,
                res,
                statusCode.NOT_FOUND,
                { keyword: "rest_keywords_post_not_found", components: [] }
            );
        }
        id = helper.decString(id);

        postModule.soft_delete(req, res, user, id);

    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        )
    }
}

export const P_delete = (req, res) => {
    try {
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
        let { id } = req.query;
        console.log(id);

        if (!id) {
            return helper.sendApiResponse(
                req,
                res,
                statusCode.NOT_FOUND,
                { keyword: "rest_keywords_post_not_found", components: [] }
            );
        }
        id = helper.decString(id);

        postModule.P_delete(req, res, user, id);

    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        )
    }
}

export const getAllPost = (req, res) => {
    try {
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

        let { page, limit } = req.query;
        postModule.getAllPost(req, res, page, limit)

    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        )
    }
}

export const getMyPost = (req, res) => {
    try {
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

        let { page, limit } = req.query;
        postModule.getMyPost(req, res, user, page, limit);
    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        )
    }
}

export const getOtherPost = (req, res) => {
    try {
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

        let { page, limit } = req.query;
        postModule.getOtherPost(req, res, user, page, limit);
    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        )
    }
}

export const likeDislike = (req, res) => {
    try {
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

        let { id } = req.query;
        console.log(id);

        if (!id) {
            return helper.sendApiResponse(
                req,
                res,
                statusCode.NOT_FOUND,
                { keyword: "rest_keywords_post_not_found", components: [] }
            );
        }
        id = helper.decString(id)

        postModule.likeDislike(req, res, user, id);

    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        )
    }

}

export const rePost = (req, res) => {
    try {
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

        let { id } = req.query;

        if (!id) {
            return helper.sendApiResponse(
                req,
                res,
                statusCode.NOT_FOUND,
                { keyword: "rest_keywords_post_not_found", components: [] }
            );
        }
        id = helper.decString(id)
        
        postModule.rePost(req, res, user, id);

    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        )
    }
}