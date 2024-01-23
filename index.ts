import {ClientOptions} from "openai";

const {OpenAI} = require('openai')
const {SpryngtimeAnalyticsSdk} = require("spryngtime-analytics-sdk");


export class SpryngtimeOpenAI extends OpenAI {
    SpryngtimeApiKey: string;
    SpryngtimeAnalyticsSdk: typeof SpryngtimeAnalyticsSdk;

    originalChatCompletionsCreate: (params: any) => Promise<any>;

    constructor() {
        super();
        this.SpryngtimeApiKey = process.env.SPRYNGTIME_API_KEY || "";
        this.SpryngtimeAnalyticsSdk = new SpryngtimeAnalyticsSdk({
            apiKey: this.SpryngtimeApiKey
        });
        // Store the reference to the original chat.completions.create method
        this.originalChatCompletionsCreate = this.chat.completions.create.bind(this.chat.completions);

        // Override the chat.completions.create method
        this.chat.completions.create = async (params: any): Promise<any> => {
            const startTime = Date.now();

            // Use the stored reference to call the original method
            const result = await this.originalChatCompletionsCreate(params);

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
        };
    }
}

