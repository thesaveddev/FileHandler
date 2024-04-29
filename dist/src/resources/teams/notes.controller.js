"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_exception_1 = __importDefault(require("../../utils/exceptions/http.exception"));
const validation_middleware_1 = __importDefault(require("../../middleware/validation.middleware"));
const notes_validation_1 = __importDefault(require("./notes.validation"));
const notes_service_1 = __importDefault(require("./notes.service"));
class IncidentController {
    constructor() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.IncidentService = new notes_service_1.default();
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const incident = yield this.IncidentService.create(req.body);
                res.status(201).json({
                    message: 'Incident created successfully',
                    incident,
                });
            }
            catch (error) {
                console.log(error);
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.getIncidents = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const incidents = yield this.IncidentService.getAllIncidents();
                res.status(200).json({ incidents });
            }
            catch (error) {
                console.error(error);
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.updateStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTeamStatus = yield this.IncidentService.updateStatus(req.params.incidentId, req.body.newStatus);
                if (!updatedTeamStatus) {
                    throw new http_exception_1.default(404, 'Incident not found');
                }
                res.status(200).json({
                    message: 'Incident status updated successfully',
                    updatedTeamStatus,
                });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.updateIncident = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedIncident = yield this.IncidentService.updateIncident(req.params.incidentId, req.body);
                if (!updatedIncident) {
                    throw new http_exception_1.default(404, 'Incident not found');
                }
                res.status(200).json({
                    message: 'Incident updated successfully',
                    updatedIncident,
                });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.getIncidentById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const incidentId = req.params.incidentId;
                const incident = yield this.IncidentService.getTeamById(incidentId);
                if (!incident) {
                    throw new http_exception_1.default(404, 'Incident not found');
                }
                res.status(200).json({ incident });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.deleteIncident = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const incidentId = req.params.incidentId;
                const isDeleted = yield this.IncidentService.deleteIncident(incidentId);
                if (!isDeleted) {
                    throw new http_exception_1.default(404, 'Incident not found');
                }
                res.status(200).json({
                    message: 'Incident deleted successfully',
                });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}`, (0, validation_middleware_1.default)(notes_validation_1.default.create), this.create);
        this.router.get(`${this.path}`, this.getIncidents);
        this.router.get(`${this.path}:incidentId`, this.getIncidentById);
        this.router.patch(`${this.path}status/:incidentId`, (0, validation_middleware_1.default)(notes_validation_1.default.updateStatus), this.updateStatus);
        this.router.patch(`${this.path}:incidentId`, (0, validation_middleware_1.default)(notes_validation_1.default.updateIncident), this.updateIncident);
        this.router.delete(`${this.path}:incidentId`, this.deleteIncident);
    }
}
exports.default = IncidentController;
