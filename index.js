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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpryngtimeOpenAI = void 0;
const { OpenAI } = require('openai');
const { SpryngtimeAnalyticsSdk } = require("spryngtime-analytics-sdk");
class SpryngtimeOpenAI extends OpenAI {
    constructor() {
        super();
        this.SpryngtimeApiKey = process.env.SPRYNGTIME_API_KEY || "";
        this.SpryngtimeAnalyticsSdk = new SpryngtimeAnalyticsSdk({
            apiKey: this.SpryngtimeApiKey
        });
        // Store the reference to the original chat.completions.create method
        this.originalChatCompletionsCreate = this.chat.completions.create.bind(this.chat.completions);
        // Override the chat.completions.create method
        this.chat.completions.create = (params) => __awaiter(this, void 0, void 0, function* () {
            const startTime = Date.now();
            // Use the stored reference to call the original method
            const result = yield this.originalChatCompletionsCreate(params);
            const latency = Date.now() - startTime;
            if (!params.stream) {
                this.SpryngtimeAnalyticsSdk.usageTracking.trackUsage({
                    key: params.user,
                    query: params.messages[0].content,
                    openAiResponse: result,
                    conversationId: params.conversationId,
                    customProperties: params.customProperties,
                    tags: params.tags,
                    latency: latency
                });
            }
            // Optionally add latency to the result
            // result.latency = latency;
            return result;
        });
    }
}
exports.SpryngtimeOpenAI = SpryngtimeOpenAI;
