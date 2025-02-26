// SparkAIService.js
import CryptoJS from 'crypto-js';

/**
 * 星火认知大模型API服务
 */
export default class SparkAIService {
  /**
   * 构造函数
   * @param {Object} config 配置信息
   * @param {string} config.appId 应用ID
   * @param {string} config.apiKey API密钥
   * @param {string} config.apiSecret API密钥秘钥
   * @param {string} config.domain 大模型域名，如'generalv3.5'
   * @param {string} config.url API地址，如'wss://spark-api.xf-yun.com/v3.5/chat'
   */
  constructor(config) {
    this.appId = config.appId;
    this.apiKey = config.apiKey;
    this.apiSecret = config.apiSecret;
    this.domain = config.domain || '4.0Ultra';
    this.url = config.url || 'wss://spark-api.xf-yun.com/v3.5/chat';
    this.wsClient = null;
  }

  /**
   * 生成鉴权URL
   * @returns {string} 鉴权后的WebSocket URL
   */
  getAuthUrl() {
    const date = new Date().toGMTString();
    const signatureOrigin = `host: spark-api.xf-yun.com\ndate: ${date}\nGET /v4.0/chat HTTP/1.1`;
    const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, this.apiSecret);
    const signature = CryptoJS.enc.Base64.stringify(signatureSha);
    
    const authorizationOrigin = `api_key="${this.apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
    const authorization = btoa(authorizationOrigin);
    
    return `${this.url}?authorization=${authorization}&date=${encodeURIComponent(date)}&host=${encodeURIComponent('spark-api.xf-yun.com')}`;
  }

  /**
   * 发送消息到星火API
   * @param {Array} messages 消息历史
   * @param {Object} options 可选参数
   * @param {number} options.temperature 温度参数，控制随机性，范围(0,1]
   * @param {number} options.maxTokens 最大生成token数量
   * @returns {Promise} 返回Promise对象，resolve时返回大模型的完整回复
   */
  async sendMessage(messages, options = {}) {
    return new Promise((resolve, reject) => {
      const authUrl = this.getAuthUrl();
      
      // 关闭之前的连接
      if (this.wsClient) {
        this.wsClient.close();
      }
      
      // 创建新的WebSocket连接
      this.wsClient = new WebSocket(authUrl);
      
      let fullResponse = '';
      
      // WebSocket打开后发送请求
      this.wsClient.onopen = () => {
        // 构建请求参数
        const requestParams = {
          header: {
            app_id: this.appId,
            uid: 'user_' + Date.now()  // 生成随机用户ID
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
              text: [{
                "role":"system",
                "content":"你是一位专业且热情的 aoyukmt 官网意见反馈页面回复助手，具备高度的责任心与专业素养，专注于迅速、精准地处理用户针对 aoyukmt 官网应用提出的各类意见、反馈，并详尽解答相关问题。"
              },{
                "role":"user",
                "content":"你是谁？"
              }]
            }
          }
        };
        
        // 发送请求
        this.wsClient.send(JSON.stringify(requestParams));
      };
      
      // 接收服务器消息
      this.wsClient.onmessage = (event) => {
        try {
          const response = JSON.parse(event.data);
          
          // 错误处理
          if (response.header.code !== 0) {
            reject(new Error(`错误码: ${response.header.code}, 消息: ${response.header.message}`));
            this.wsClient.close();
            return;
          }
          
          // 获取回复内容
          if (response.payload.choices && response.payload.choices.text) {
            const text = response.payload.choices.text[0];
            if (text && text.content) {
              fullResponse += text.content;
            }
          }
          
          // 检查是否是最后一个响应
          if (response.header.status === 2) {
            this.wsClient.close();
            resolve({
              content: fullResponse,
              usage: response.payload.usage
            });
          }
        } catch (error) {
          reject(error);
          this.wsClient.close();
        }
      };
      
      // 错误处理
      this.wsClient.onerror = (error) => {
        reject(error);
      };
      
      // 连接关闭
      this.wsClient.onclose = () => {
        this.wsClient = null;
      };
    });
  }

  /**
   * 发送单条消息并获取回复
   * @param {string} message 用户消息
   * @param {Array} history 历史消息数组（可选）
   * @param {Object} options 可选参数
   * @returns {Promise} 返回Promise对象，resolve时返回大模型的回复
   */
  async chat(message, options = {}) {
    // 将新消息添加到历史记录
    const messages = [
      { role: 'user', content: message }
    ];
    
    const response = await this.sendMessage(messages, options);
    return response;
  }
  
  /**
   * 关闭WebSocket连接
   */
  close() {
    if (this.wsClient) {
      this.wsClient.close();
      this.wsClient = null;
    }
  }
}