export const callDashScopeStream = (userMessage) => {
    return new ReadableStream({
        async start(controller) {
            const apiKey = "sk-008e7aff40a64109b285d427d110c067";
            const appId = "9725d757e40249209951f45c48c1a9a2";
            const url = `https://dashscope.aliyuncs.com/api/v1/apps/${appId}/completion`;

            const data = {
                input: {
                    prompt: userMessage
                },
                parameters: {
                    'incremental_output': 'true'
                },
                debug: {}
            };

            try {
                console.log("请求 DashScope 聊天流...");

                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                        'X-DashScope-SSE': 'enable'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.body) {
                    console.error("Response body is empty");
                    controller.error(new Error("Empty response body"));
                    return;
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder("utf-8");
                let buffer = ""; // 存储未完整的 SSE 数据

                for (; ;) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });

                    // 按行解析 SSE 数据
                    const lines = buffer.split("\n");
                    buffer = lines.pop(); // 可能存在不完整的行，保留到下次处理

                    for (const line of lines) {
                        if (line.startsWith("data:")) {
                            try {
                                const jsonStr = line.substring(5).trim(); // 去掉 "data:" 前缀
                                const eventData = JSON.parse(jsonStr);

                                if (eventData.output && eventData.output.text) {
                                    controller.enqueue(eventData.output.text); // 只推送 text 字段
                                }
                            } catch (error) {
                                console.error("解析 SSE 数据失败:", error);
                            }
                        }
                    }
                }

            } catch (error) {
                console.error("DashScope 聊天流处理出错:", error);
                controller.error(error);
            } finally {
                controller.close();
            }
        }
    });
};
