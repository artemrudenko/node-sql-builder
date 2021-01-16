"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBRequest = void 0;
const sql = __importStar(require("mssql/msnodesqlv8"));
class DBRequest {
    constructor(config) {
        this.config = config;
        const connectionConfig = {
            server: this.config.server,
            driver: 'msnodesqlv8',
            database: this.config.database
        };
        if (!!this.config.port) {
            connectionConfig.port = this.config.port;
        }
        if (this.config.ntlm) {
            connectionConfig.options = connectionConfig.options
                ? Object.assign(Object.assign({}, connectionConfig.options), { trustedConnection: true }) : { trustedConnection: true };
        }
        else {
            connectionConfig.user = this.config.username;
            connectionConfig.password = this.config.password;
        }
        connectionConfig.requestTimeout = 60000;
        this.pool = new sql.ConnectionPool(connectionConfig);
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.query === undefined) {
                throw new Error(`Can't execute query if it wasn't specified!`);
            }
            if (!this.pool.connected) {
                yield this.pool.connect();
            }
            try {
                const result = yield this.pool.request().query(this.config.query);
                return result.recordset;
            }
            finally {
                yield this.pool.close();
            }
        });
    }
    executeProc() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.query === undefined) {
                throw new Error(`Can't execute query if it wasn't specified!`);
            }
            if (!this.pool.connected) {
                yield this.pool.connect();
            }
            try {
                const result = yield this.pool.request().execute(this.config.query);
                return result;
            }
            finally {
                yield this.pool.close();
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pool.connected) {
                return this.pool.close();
            }
        });
    }
}
exports.DBRequest = DBRequest;
