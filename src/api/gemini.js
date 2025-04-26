import OpenAI from "openai";

const apiKey = "AIzaSyCZtlwc8qfMhnHooQnXEPiDjvNIbuPHJUI"
const baseURL = "https://gemini.aoyu925.cn/v1beta/openai/"
const model = "gemini-2.0-flash"

export class GeminiAssistant {

    constructor() {
        this.apiKey = apiKey
        this.baseURL = baseURL
        this.model = model
    }

    //初始化openai
    initOpenai() {
        return new OpenAI({
            apiKey: this.apiKey,
            baseURL: this.baseURL,
            dangerouslyAllowBrowser: true,
        })
    }

    //单个文本对话
    chat(prompt, msg) {
        const openai = this.initOpenai()
        const chatStream = new ReadableStream({
            async start(controller) {
                try {
                    console.log("开始请求Gemini大模型...");
                    const response = await openai.chat.completions.create({
                        model: model,
                        messages: [
                            { "role": "system", "content": prompt },
                            { "role": "user", "content": msg }
                        ],
                        stream: true
                    })

                    for await (const chunk of response) {
                        if (chunk.choices[0].delta.content === undefined) {
                            break
                        }

                        console.log(chunk.choices[0].delta.content);

                        controller.enqueue(chunk.choices[0].delta.content)
                    }
                } catch (error) {
                    console.error("请求聊天流出错：", error);
                    controller.error(error)
                } finally {
                    controller.close()
                }
            }

        })

        return chatStream

    }


}