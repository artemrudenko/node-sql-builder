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
const model_1 = require("./model");
class DBRequest {
    constructor(config) {
        this.config = config;
        this._config = {
            server: this.config.server,
            driver: 'msnodesqlv8',
            database: this.config.database
        };
        if (!!this.config.port) {
            this._config.port = this.config.port;
        }
        if (this.config.ntlm) {
            this._config.options = this._config.options
                ? Object.assign(Object.assign({}, this._config.options), { trustedConnection: true }) : { trustedConnection: true };
        }
        else {
            this._config.user = this.config.username;
            this._config.password = this.config.password;
        }
        this._config.requestTimeout = this.config.requestTimeout;
        this.pool = new sql.ConnectionPool(this._config);
    }
    get connectionConfig() {
        return this._config;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            query = !!query ? query : this.config.query;
            if (query === undefined) {
                throw new Error(`Can't execute query if it wasn't specified!`);
            }
            return this.executeQuery(query, model_1.QueryType.Query);
        });
    }
    executeProc(query) {
        return __awaiter(this, void 0, void 0, function* () {
            query = !!query ? query : this.config.query;
            if (query === undefined) {
                throw new Error(`Can't execute query if it wasn't specified!`);
            }
            return this.executeQuery(query, model_1.QueryType.Procedure);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pool.connected) {
                return this.pool.close();
            }
        });
    }
    executeQuery(query, queryType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.pool.connected) {
                yield this.pool.connect();
            }
            try {
                let result;
                switch (queryType) {
                    case model_1.QueryType.Procedure:
                        result = yield this.pool.request().execute(query);
                        break;
                    case model_1.QueryType.Query:
                    default:
                        result = yield this.pool.request().query(query);
                        return result;
                }
            }
            finally {
                yield this.pool.close();
            }
        });
    }
}
exports.DBRequest = DBRequest;
