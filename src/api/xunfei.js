import CryptoJS from 'crypto-js';

export default class SparkAIService {
    constructor() {
        this.appId = 'fb918983';
        this.apiKey = '18138a8d8a482d9e4fbb9cca2c5218a7';
        this.apiSecret = 'Mjg3Mjk5Njc2Y2U4MWE5ODA2ZDQxMzdi';
        this.domain = '4.0Ultra';
        this.url = 'wss://spark-api.xf-yun.com/v4.0/chat';
        this.wsClient = null;
    }

    getAuthUrl() {
        const date = new Date().toGMTString();
        const signatureOrigin = `host: spark-api.xf-yun.com\ndate: ${date}\nGET /v4.0/chat HTTP/1.1`;
        const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, this.apiSecret);
        const signature = CryptoJS.enc.Base64.stringify(signatureSha);
        const authorizationOrigin = `api_key=\"${this.apiKey}\", algorithm=\"hmac-sha256\", headers=\"host date request-line\", signature=\"${signature}\"`;
        const authorization = btoa(authorizationOrigin);

        return `${this.url}?authorization=${authorization}&date=${encodeURIComponent(date)}&host=${encodeURIComponent('spark-api.xf-yun.com')}`;
    }

    sendMessageStream(msg, options = {}) {
        return new ReadableStream({
            start: (controller) => {
                const authUrl = this.getAuthUrl();
                if (this.wsClient) {
                    this.wsClient.close();
                }
                this.wsClient = new WebSocket(authUrl);
                let fullResponse = '';

                this.wsClient.onopen = () => {
                    const requestParams = {
                        header: {
                            app_id: this.appId,
                            uid: 'user_' + Date.now()
                        },
                        parameter: {
                            chat: {
                                domain: this.domain,
                                temperature: options.temperature || 0.5,
                                max_tokens: options.maxTokens || 2048
                            }
                        },
                        payload: {
                            message: {
                                text: [
                                    {
                                        role: "system",
                                        content: "你是一位专业且热情的 aoyukmt 官网意见反馈页面回复助手..."
                                    },
                                    {
                                        role: "user",
                                        content: msg
                                    }
                                ]
                            }
                        }
                    };
                    this.wsClient.send(JSON.stringify(requestParams));
                };

                this.wsClient.onmessage = (event) => {
                    try {
                        const response = JSON.parse(event.data);
                        if (response.header.code !== 0) {
                            controller.error(new Error(`错误码: ${response.header.code}, 消息: ${response.header.message}`));
                            this.wsClient.close();
                            return;
                        }
                        if (response.payload.choices && response.payload.choices.text) {
                            const text = response.payload.choices.text[0];
                            if (text && text.content) {
                                fullResponse += text.content;
                                controller.enqueue(text.content);
                            }
                        }
                        if (response.header.status === 2) {
                            this.wsClient.close();
                            controller.close();
                        }
                    } catch (error) {
                        controller.error(error);
                        this.wsClient.close();
                    }
                };

                this.wsClient.onerror = (error) => {
                    controller.error(error);
                };

                this.wsClient.onclose = () => {
                    this.wsClient = null;
                };
            }
        });
    }
}
