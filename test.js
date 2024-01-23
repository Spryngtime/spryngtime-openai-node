// const {OpenAI} = require('openai')
const OpenAI = require("./index").SpryngtimeOpenAI;
require('dotenv').config();

// const {OpenAIClient, AzureKeyCredential} = require("@azure/openai");


const openai = new OpenAI();

// Backup original create method
const originalCreateMethod = openai.chat.completions.create;


async function main() {
    let query = "You are a helpful support bot. Answer this question: How do I remove my account?";

    // // OpenAI
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: query }],
        model: 'gpt-3.5-turbo-1106',
        max_tokens: 100,
    });
    console.log(JSON.stringify(chatCompletion, null, 2));

    const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106',
        messages: [{ role: 'user', content: query }],
        user:"user_123456",
        stream:true
    });
    console.log(JSON.stringify(stream, null, 2));

    // for await (const chunk of stream) {
    //     process.stdout.write(chunk.choices[0]?.delta?.content || '');
    // }
    // //

    // Azure OpenAI
    // const client = new OpenAIClient(
    //     "https://spryngtime-azure.openai.azure.com/",
    //     new AzureKeyCredential(""));

    // const deploymentId = "gpt-35-turbo";
    // const chatCompletion = await client.getChatCompletions(deploymentId, [{ role: 'user', content: query }], { maxTokens: 500 });
    //
    // console.log(JSON.stringify(chatCompletion, null, 2));

}

main();


async function assistant() {
    const myAssistant = await openai.beta.assistants.create({
        instructions:
            "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
        name: "Math Tutor",
        tools: [{ type: "code_interpreter" }],
        model: "gpt-3.5-turbo-1106",
    });

    console.log(myAssistant);
}

// assistant()

