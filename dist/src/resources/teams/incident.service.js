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
const incident_model_1 = __importDefault(require("./incident.model"));
class IncidentService {
    constructor() {
        this.incident = incident_model_1.default;
    }
    create(incidentData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(incidentData);
            try {
                const incident = yield this.incident.create(incidentData);
                return incident;
            }
            catch (error) {
                console.log(error);
                throw new Error('Unable to create incident');
            }
        });
    }
    getAllIncidents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const incidents = yield this.incident.find();
                return incidents;
            }
            catch (error) {
                throw new Error('Unable to find incidents');
            }
        });
    }
    updateIncident(incidentId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedIncident = yield this.incident.findByIdAndUpdate(incidentId, { $set: Object.assign({}, updatedData) }, { new: true });
                return updatedIncident;
            }
            catch (error) {
                console.error(error);
                throw new Error('Unable to update incident');
            }
        });
    }
    updateStatus(incidentId, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedIncidentStatus = yield this.incident.findByIdAndUpdate(incidentId, { status: newStatus }, { new: true });
                return updatedIncidentStatus;
            }
            catch (error) {
                console.error(error);
                throw new Error('Unable to update incident status');
            }
        });
    }
    getTeamById(incidentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const incident = yield this.incident.findById(incidentId);
                return incident;
            }
            catch (error) {
                throw new Error('Unable to find incident by ID');
            }
        });
    }
    deleteIncident(incidentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.incident.findByIdAndDelete(incidentId);
                return !!result;
            }
            catch (error) {
                console.error(error);
                throw new Error('Unable to delete incident');
            }
        });
    }
}
exports.default = IncidentService;
