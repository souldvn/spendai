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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
var node_telegram_bot_api_1 = require("node-telegram-bot-api");
var axios_1 = require("axios");
// Create a bot instance with the new token
var token = '7770234898:AAG4_N1_M5gnSY-U9fBWfPtFr6FLRIfM7wM';
console.log('Initializing bot with token:', token);
// Test the token by making a direct API call
function testBotToken() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("https://api.telegram.org/bot".concat(token, "/getMe"))];
                case 1:
                    response = _b.sent();
                    data = response.data;
                    console.log('Bot API test response:', data);
                    if (data.ok) {
                        console.log('Bot token is valid! Bot name:', data.result.username);
                    }
                    else {
                        console.error('Bot token is invalid:', data.description);
                        process.exit(1);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error('Error testing bot token:', ((_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _a === void 0 ? void 0 : _a.data) || (error_1 === null || error_1 === void 0 ? void 0 : error_1.message) || 'Unknown error');
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Test the token before starting the bot
testBotToken();
var bot = new node_telegram_bot_api_1.default(token, {
    polling: true,
    filepath: false
});
exports.bot = bot;
// Log when bot is ready
bot.on('message', function (msg) {
    if (msg.from) {
        console.log('Received message:', msg.text, 'from:', msg.from.username);
    }
    else {
        console.log('Received message from an unknown user');
    }
});
// Handle /start command
bot.onText(/\/start/, function (msg) {
    if (msg.from) {
        console.log('Received /start command from:', msg.from.username, 'chatId:', msg.chat.id);
    }
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Я бот для управления финансами. Чем могу помочь?')
        .then(function () { return console.log('Start message sent successfully'); })
        .catch(function (error) { return console.error('Error sending start message:', error); });
});
// Handle /help command
bot.onText(/\/help/, function (msg) {
    if (msg.from) {
        console.log('Received /help command from:', msg.from.username, 'chatId:', msg.chat.id);
    }
    var chatId = msg.chat.id;
    var helpMessage = "\n\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u044B:\n  /start - \u041D\u0430\u0447\u0430\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u0443 \u0441 \u0431\u043E\u0442\u043E\u043C\n  /help - \u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u043A\u043E\u043C\u0430\u043D\u0434\n  /balance - \u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0431\u0430\u043B\u0430\u043D\u0441\n  /transactions - \u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0438\n  /report - \u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u044B\u0439 \u043E\u0442\u0447\u0435\u0442\n  ";
    bot.sendMessage(chatId, helpMessage)
        .then(function () { return console.log('Help message sent successfully'); })
        .catch(function (error) { return console.error('Error sending help message:', error); });
});
// Handle /balance command
bot.onText(/\/balance/, function (msg) {
    if (msg.from) {
        console.log('Received /balance command from:', msg.from.username, 'chatId:', msg.chat.id);
    }
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Баланс: 0 ₽')
        .then(function () { return console.log('Balance message sent successfully'); })
        .catch(function (error) { return console.error('Error sending balance message:', error); });
});
// Handle /transactions command
bot.onText(/\/transactions/, function (msg) {
    if (msg.from) {
        console.log('Received /transactions command from:', msg.from.username, 'chatId:', msg.chat.id);
    }
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Последние транзакции:\nНет транзакций')
        .then(function () { return console.log('Transactions message sent successfully'); })
        .catch(function (error) { return console.error('Error sending transactions message:', error); });
});
// Handle /report command
bot.onText(/\/report/, function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var chatId, userId, report, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                chatId = msg.chat.id;
                userId = (_a = msg.from) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    // Если userId не существует, отправляем сообщение об ошибке
                    bot.sendMessage(chatId, 'Не удалось получить ваш ID. Попробуйте снова.');
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, generateDailyReportForUser(userId)];
            case 2:
                report = _b.sent();
                sendReportToUser(chatId, report); // Отправка отчета пользователю
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error('Error generating or sending report:', error_2);
                bot.sendMessage(chatId, 'Произошла ошибка при генерации отчета. Попробуйте позже.');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Error handling
bot.on('error', function (error) {
    console.error('Telegram bot error:', error);
});
// Log when bot is ready
bot.on('polling_error', function (error) {
    console.error('Polling error:', error);
});
console.log('Telegram bot started successfully!');
// Function to generate daily report for user (example)
function generateDailyReportForUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // Здесь логика генерации отчета для пользователя
            return [2 /*return*/, "\u041E\u0442\u0447\u0435\u0442 \u0434\u043B\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F ".concat(userId, ": \n\u0414\u043E\u0445\u043E\u0434: 1000 \u20BD\n\u0420\u0430\u0441\u0445\u043E\u0434: 500 \u20BD")];
        });
    });
}
// Function to send report to user
function sendReportToUser(chatId, report) {
    bot.sendMessage(chatId, report)
        .then(function () { return console.log('Report sent successfully'); })
        .catch(function (error) { return console.error('Error sending report:', error); });
}
