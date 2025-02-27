import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseMessages } from "../constant/responseMessages.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { redis } from "../redis/redis.js";
const { NO_USER, GET_SUCCESS_MESSAGES, UPDATE_SUCCESS_MESSAGES, DELETED_SUCCESS_MESSAGES, UPDATE_UNSUCCESS_MESSAGES, NO_DATA_FOUND } = responseMessages





// @desc    GET
// @route   GET /api/v1/admin/editUser/:id
// @access  Admin

export const getAlluser = asyncHandler(async (_, res) => {
    const redisDataRaw = await redis.get("users");
    // console.log("📦 Raw Redis Data:", redisData);

    if (redisDataRaw) {
        const redisData = JSON.parse(redisDataRaw);
        console.log("✅ Redis Data Parsed:", redisData);
        return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, GET_SUCCESS_MESSAGES, redisData));
    }

    console.log("❌ No data in Redis, fetching from DB...");
    const getUser = await User.find();
    
    if (!getUser) {
        throw new ApiError(StatusCodes.BAD_REQUEST, NO_USER);
    }

    console.log("✅ Users fetched from DB, storing in Redis...");
    redis.set("users", JSON.stringify(getUser), "EX", 60 * 10); // Cache for 5 minutes

    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, GET_SUCCESS_MESSAGES, getUser));
});




// @desc    PUT
// @route   put /api/v1/admin/updateUser/:id
// @access  Admin

export const updateUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    if(!userId){
        return new ApiError(StatusCodes.BAD_REQUEST, UPDATE_SUCCESS_MESSAGES);
    };

    if(Object.keys(req.body).length === 0){
        throw new ApiError(StatusCodes.BAD_REQUEST, NO_DATA_FOUND)
    }

    const isUser = await User.findByIdAndUpdate(userId,
        { $set: req.body }, 
        { new: true, runValidators: true  }
    );
    if(!isUser){
        throw new ApiError(StatusCodes.BAD_REQUEST, NO_USER);
    }
    console.log(isUser);

    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, UPDATE_SUCCESS_MESSAGES));
})





// @desc    DELETE
// @route   DELETE /api/v1/admin/delete/
// @access  Admin

export const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if(!user){
        return new ApiError(StatusCodes.BAD_REQUEST, UPDATE_UNSUCCESS_MESSAGES);
    };

    const isUser = await User.findByIdAndDelete(userId);
    if(!isUser){
        throw new ApiError(StatusCodes.BAD_REQUEST, NO_USER);
    };

    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, DELETED_SUCCESS_MESSAGES));
})