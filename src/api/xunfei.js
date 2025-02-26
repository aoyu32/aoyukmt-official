import axios from "axios";

// 请求地址
const url = 'https://spark-api-open.xf-yun.com/v1/chat/completions';

// 请求头
const headers = {
    'Authorization': 'URdyPDcdpHeQrMQkYOgB:lcPhUfvHFaVtVmhQjggL',  // 替换为你的APIPassword
    'Content-Type': 'application/json'
};

// API 请求方法
export const fetchAIResponse = async (userMessage) => {
    const data = {
        model: 'lite',  // 指定请求的模型版本
        messages: [
            {
                role: 'user',  // 角色是user，表示用户发起的消息
                content: userMessage,  // 用户输入的内容
            }
        ],
        stream: false,  // 设置为非流式请求
        max_tokens: 1024,  // 设置最大token数
        temperature: 0.5,  // 可选参数，控制生成的多样性
        top_k: 4,  // 可选参数，控制多样性
        presence_penalty: 1,  // 可选参数，控制重复内容的惩罚
        frequency_penalty: 1,  // 可选参数，控制频率惩罚
    };

    try {
        const response = await axios.post(url, data, { headers });
        return response.data;  // 返回整个响应数据
    } catch (error) {
        console.error('请求错误:', error.response ? error.response.data : error.message);
        throw error;  // 抛出错误以便在调用时捕获
    }
};