import { CozeAPI, ChatEventType, RoleType, COZE_COM_BASE_URL } from '@coze/api';

const token = "pat_v82eBTLzPH5U1p5ehdfyNC68QQkFLMhUnGeNhW2xnkFKCEHc2K5QGNfPFsNLYlkE";
const botId = "7476479152497983489";
const baseURL = COZE_COM_BASE_URL;
const client = new CozeAPI({
    baseURL,
    token,
    allowPersonalAccessTokenInBrowser: true
});

export const fetchChatStream = (userMessage) => {
    return new ReadableStream({
        async start(controller) {
            try {
                console.log("请求聊天流...");

                const stream = await client.chat.stream({
                    bot_id: botId,
                    additional_messages: [
                        {
                            role: RoleType.User,
                            content: userMessage,
                            content_type: 'text',
                        },
                    ],
                });

                for await (const part of stream) {
                    if (part.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
                        const text = part.data.content;
                        controller.enqueue(text); // 发送数据到流
                    }
                }
            } catch (error) {
                console.error('聊天流处理出错:', error);
                controller.error(error);
            } finally {
                controller.close(); // 确保流最终关闭
            }
        }
    });
};
