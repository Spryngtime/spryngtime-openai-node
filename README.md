# Spryngtime OpenAI Node wrapper

Easily track LLM analytics, debug prompts, and bill for usage. This is an OpenAI wrapper for you to easily drop and replace OpenAI with Spryngtime's wrapper for out of the box analytics & LLM observability!

How to get started:

1. Sign up for an account and get an API key at https://www.usespryngtime.com/
2. Set your OpenAI and Spryngtime API keys in your environment/.env file
   <br>For example:
   OPENAI_API_KEY=sk-openaiapikey<br>
   SPRYNGTIME_API_KEY=spryngtime_api_key
   
3. `npm install spryngtime-openai-node`
4. Replace <br>`const {OpenAI} = require('openai')` <br>with<br> `const OpenAI = require("spryngtime-openai-node").SpryngtimeOpenAI;`
5. Go live!
