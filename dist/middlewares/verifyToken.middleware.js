"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = void 0;
const appError_1 = require("../errors/appError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class VerifyToken {
    static execute(req, res, next) {
        const authorization = req.headers.authorization;
        if (!authorization) {
            throw new appError_1.AppError("Token is required", 401);
        }
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer ", "");
        const secret = process.env.JWT_SECRET;
        jsonwebtoken_1.default.verify(token, secret);
        res.locals.decode = jsonwebtoken_1.default.decode(token);
        next();
    }
}
exports.VerifyToken = VerifyToken;
