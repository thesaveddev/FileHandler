"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const IncidentSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    description: { type: String },
    location: { type: String },
    time: { type: String },
    date: { type: String },
    affected_users: [{ type: String }], // should be an array of user ids
    affected_service: [{ type: String }], //should be an array of servcice ids, this will come from settings service
    actions: [{ type: String }],
    solution: { type: String },
    status: {
        type: String,
        // enum: ['Active', 'In Active'],
        // default: 'Active',
    },
    ticket_num: { type: String },
    advisories: { type: String },
    timeline: [{
            activity: {
                type: String,
                default: "Incident Started."
            },
            time_date: {
                type: Date,
                default: Date.now()
            }
        }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Incident', IncidentSchema);
