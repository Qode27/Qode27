"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
exports.requireEnv = requireEnv;
exports.env = process.env;
function requireEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
