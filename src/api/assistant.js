const URL = "http://localhost:8080/web/assistant/chat"

export const assistant = async (data, token) => {


    const resp = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const reader = resp.body.getReader()
    const decoder = new TextDecoder()
    const chatStream = new ReadableStream({
        async start(controller) {
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
                            console.log("eventData数据：", eventData);
                            controller.enqueue(eventData.message); // 只推送 text 字段
                        } catch (error) {
                            console.error("解析 SSE 数据失败:", error);
                        }
                    }
                }
            }
        }
    })


    return chatStream
}