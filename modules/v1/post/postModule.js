import postModel from "../../../database/model/postModel.js"
import helper from "../../../middleware/headerVarification.js"
import statusCode from "../../../config/statusCode.js"
import GLOBALS from "../../../config/constants.js"
import userModel from "../../../database/model/usermodel.js"
const createPost = async (req, res, user) => {
    try {
        const { userId } = user;
        const { Title, Content } = req;

        const post = new postModel({
            UserId: userId,
            Title,
            Content
        });

        await post.save();
        helper.sendApiResponse(
            req,
            res,
            statusCode.SUCCESS,
            { keyword: "POST_CREATED", components: [] },
            post
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

const updatePost = async (req, res, user, id) => {
    try {
        const { userId } = user
        const { Title, Content } = req;
        const post = await postModel.findById(id)

        if (post.UserId == userId) {
            const updatePost = await postModel.findByIdAndUpdate(id, { Title, Content }, { new: true, runValidators: true })

            helper.sendApiResponse(
                req,
                res,
                statusCode.SUCCESS,
                { keyword: "POST_UPDATED", components: [] },
                updatePost
            )
        } else {
            helper.sendApiResponse(
                req,
                res,
                statusCode.UNAUTHORIZED,
                { keyword: "POST_UPDATE_INVALID", components: [] },
            )
        }

    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        )
    }
}

const soft_delete = async (req, res, user, id) => {
    try {
        const { userId } = user
        const post = await postModel.findById(id)
        if (post.UserId == userId) {
            const updatePost = await postModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true })
            helper.sendApiResponse(
                req,
                res,
                statusCode.SUCCESS,
                { keyword: "post_soft_deleted", components: [] },
                updatePost
            )
        } else {
            helper.sendApiResponse(
                req,
                res,
                statusCode.UNAUTHORIZED,
                { keyword: "POST_delete_INVALID", components: [] },
            )
        }
    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        )
    }
}

const P_delete = async (req, res, user, id) => {
    try {
        const { userId } = user
        const post = await postModel.findById(id)
        if (post.UserId == userId) {
            const deletePost = await postModel.findByIdAndDelete(id)
            helper.sendApiResponse(
                req,
                res,
                statusCode.SUCCESS,
                { keyword: "post_deleted", components: [] },
            )
        } else {
            helper.sendApiResponse(
                req,
                res,
                statusCode.UNAUTHORIZED,
                { keyword: "POST_delete_INVALID", components: [] },
            )
        }
    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        )
    }
}

const getAllPost = async (req, res, page, limit) => {
    try {
        const filter = { isDeleted: false };

        const skip = (page - 1) * limit;

        const posts = await postModel
            .find(filter)
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const total = await postModel.countDocuments(filter);

        if (!posts || posts.length === 0) {
            return helper.sendApiResponse(
                req,
                res,
                statusCode.NOT_FOUND,
                { keyword: "POSTS_NOT_FOUND", components: [] }
            );
        }

        const responseData = {
            page: Number(page),
            limit: Number(limit),
            totalPosts: total,
            totalPages: Math.ceil(total / limit),
            posts
        };

        helper.sendApiResponse(
            req,
            res,
            statusCode.SUCCESS,
            { keyword: "POSTS_FETCH_SUCCESS", components: [] },
            responseData
        );
    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        );
    }
};

const getMyPost = async (req, res, user, page, limit) => {
    try {
        const { userId } = user;

        const filter = { isDeleted: false, UserId: userId };
        const skip = (page - 1) * limit;

        const posts = await postModel
            .find(filter)
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const total = await postModel.countDocuments(filter);

        if (!posts || posts.length === 0) {
            return helper.sendApiResponse(
                req,
                res,
                statusCode.NOT_FOUND,
                { keyword: "MY_POSTS_NOT_FOUND", components: [] }
            );
        }

        const responseData = {
            page: Number(page),
            limit: Number(limit),
            totalPosts: total,
            totalPages: Math.ceil(total / limit),
            posts
        };

        helper.sendApiResponse(
            req,
            res,
            statusCode.SUCCESS,
            { keyword: "MY_POSTS_FETCH_SUCCESS", components: [] },
            responseData
        );
    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        );
    }
};

const getOtherPost = async (req, res, user, page, limit) => {
    try {
        const { userId } = user;
        const filter = { isDeleted: false, UserId: { $ne: userId } };
        const skip = (page - 1) * limit;

        const posts = await postModel
            .find(filter)
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const total = await postModel.countDocuments(filter);

        if (!posts || posts.length === 0) {
            return helper.sendApiResponse(
                req,
                res,
                statusCode.NOT_FOUND,
                { keyword: "OTHER_POSTS_NOT_FOUND", components: [] }
            );
        }

        const responseData = {
            page: Number(page),
            limit: Number(limit),
            totalPosts: total,
            totalPages: Math.ceil(total / limit),
            posts
        };

        helper.sendApiResponse(
            req,
            res,
            statusCode.SUCCESS,
            { keyword: "OTHER_POSTS_FETCH_SUCCESS", components: [] },
            responseData
        );
    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        );
    }
};

const likeDislike = async (req, res, user, id) => {
    try {
        const { userId } = user;

        const post = await postModel.findById(id);
        if (!post) {
            return helper.sendApiResponse(
                req,
                res,
                statusCode.NOT_FOUND,
                { keyword: "POST_NOT_FOUND", components: [] }
            );
        }

        if (post.Likes.includes(userId)) {
            // Unlike
            post.Likes = post.Likes.filter(uid => uid.toString() !== userId);
            await post.save();

            return helper.sendApiResponse(
                req,
                res,
                statusCode.SUCCESS,
                { keyword: "POST_UNLIKED", components: [] },
                { totalLikes: post.Likes.length }
            );
        } else {
            // Like
            post.Likes.push(userId);
            await post.save();

            return helper.sendApiResponse(
                req,
                res,
                statusCode.SUCCESS,
                { keyword: "POST_LIKED", components: [] },
                { totalLikes: post.Likes.length }
            );
        }
    } catch (error) {
        helper.sendApiResponse(
            req,
            res,
            statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        );
    }
};

const rePost = async (req, res, user, id) => {
    try {
        const { userId } = user;
        const post = await postModel.findById(id);
        const userDoc = await userModel.findById(userId);
        
        if (!post || !userDoc) {
            return helper.sendApiResponse(
                req, res, statusCode.NOT_FOUND,
                { keyword: "POST_OR_USER_NOT_FOUND", components: [] }
            );
        }

        if (post.Reposts.includes(userId)) {
            // Un-repost
            post.Reposts = post.Reposts.filter(uid => uid.toString() !== userId);
            userDoc.Reposts = userDoc.Reposts.filter(pid => pid.toString() !== id);

            await post.save();
            await userDoc.save();

            return helper.sendApiResponse(
                req, res, statusCode.SUCCESS,
                { keyword: "POST_UNREPOSTED", components: [] },
                { totalReposts: post.Reposts.length }
            );
        } else {
            // Repost
            
            post.Reposts.push(userId);
            userDoc.Reposts.push(id);

            await post.save();
            await userDoc.save();

            return helper.sendApiResponse(
                req, res, statusCode.SUCCESS,
                { keyword: "POST_REPOSTED", components: [] },
                { totalReposts: post.Reposts.length }
            );
        }
    } catch (error) {
        helper.sendApiResponse(
            req, res, statusCode.INTERNAL_ERROR,
            { keyword: "SERVER_ERROR", components: [] }
        );
    }
};

export default {
    createPost,
    updatePost,
    soft_delete,
    P_delete,
    getAllPost,
    getMyPost,
    getOtherPost,
    likeDislike,
    rePost
}