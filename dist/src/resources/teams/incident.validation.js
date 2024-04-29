"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const create = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    location: joi_1.default.string().required(),
    time: joi_1.default.string().required(),
    date: joi_1.default.string().required(),
    affected_user: joi_1.default.string().required(),
    affected_service: joi_1.default.string().required(),
    action: joi_1.default.string().required(),
    solution: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
    ticket_num: joi_1.default.string().required(),
    advisories: joi_1.default.string().required(),
});
const updateIncident = joi_1.default.object({
    title: joi_1.default.string(),
    description: joi_1.default.string(),
    location: joi_1.default.string(),
    time: joi_1.default.string(),
    date: joi_1.default.string(),
    affected_user: joi_1.default.string(),
    affected_service: joi_1.default.string(),
    action: joi_1.default.string(),
    solution: joi_1.default.string(),
    status: joi_1.default.string(),
    ticket_num: joi_1.default.string(),
    advisories: joi_1.default.string(),
});
const updateStatus = joi_1.default.object({
    newStatus: joi_1.default.string().required(),
});
exports.default = { create, updateStatus, updateIncident };
