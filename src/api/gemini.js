import OpenAI from "openai";

const apiKey = "AIzaSyCZtlwc8qfMhnHooQnXEPiDjvNIbuPHJUI"
const baseURL = "https://gemini.aoyu925.cn/v1beta/openai/"
const model = "gemini-2.0-flash"
// export const geminiAI = async () => {

//     // getModel()
//     const openai = new OpenAI({
//         apiKey: apiKey,
//         baseURL: baseURL,
//         dangerouslyAllowBrowser: true,
//     });

//     const response = await openai.chat.completions.create({
//         model: "gemini-2.0-flash",
//         messages: [
//             { role: "system", content: "你是gemini大模型官方" },
//             {
//                 role: "user",
//                 content: "gemini的模型api的免费调用限制是每个模型都有固定额度限制，也就是加入gemini-2.0-flash这个模型每天限制调用1500次，是不是我把这1500次使用完后，是所有模型都不能调用，还是其他模型依然可以调用，也就是每个模型都有固定调用次数，还是所有模型总共有这么多调用次数每天",
//             },

//         ],
//         stream: true,
//     });
//     for await (const chunk of response) {
//         console.log(chunk.choices[0].delta.content);
//     }
// }


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