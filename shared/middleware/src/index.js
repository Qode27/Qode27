"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestContext = requestContext;
exports.asyncHandler = asyncHandler;
exports.authGuard = authGuard;
exports.requireRoles = requireRoles;
exports.errorHandler = errorHandler;
const crypto_1 = require("crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("@kansalt/utils");
function requestContext(req, _res, next) {
    req.context = { requestId: (0, crypto_1.randomUUID)() };
    next();
}
function asyncHandler(handler) {
    return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}
function authGuard(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(authHeader.slice(7), (0, utils_1.requireEnv)('JWT_SECRET'));
        req.context = {
            ...req.context,
            userId: decoded.userId,
            organizationId: decoded.organizationId,
            role: decoded.role
        };
        next();
    }
    catch {
        res.status(401).json({ message: 'Invalid token' });
    }
}
function requireRoles(...roles) {
    return (req, res, next) => {
        if (!req.context.role || !roles.includes(req.context.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}
function errorHandler(error, req, res, _next) {
    console.error('request_failed', { error, requestId: req.context?.requestId });
    res.status(500).json({
        message: error instanceof Error ? error.message : 'Internal server error',
        requestId: req.context?.requestId
    });
}
