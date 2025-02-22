import { CozeAPI, ChatEventType, RoleType, COZE_CN_BASE_URL } from '@coze/api';

const token = "pat_c0YXh9XQdq6N60kfC2GH82qggXwPTsQL5LfSBlvDeiLiaDUMNOWizptwr8dO6PLA";
const botId = "7448870100947566603";
const baseURL = COZE_CN_BASE_URL;
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
                controller.close(); // 关闭流
            } catch (error) {
                console.error('聊天流处理出错:', error);
                controller.error(error);
            }
        }
    });
};
