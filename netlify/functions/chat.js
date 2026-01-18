const https = require('https');

exports.handler = async (event, context) => {
  // 只允许 POST 请求
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { messages, currentEra } = JSON.parse(event.body);

    // DeepSeek API 配置
    const apiKey = process.env.DEEPSEEK_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API Key not configured' })
      };
    }

    // 构建系统提示词
    const systemPrompt = `你是一位专业的英国历史专家助手。用户当前正在查看"${currentEra.enName}"（${currentEra.name}）时代（${currentEra.year}）的内容。

请用中文简洁专业地回答问题，每次回答控制在150字以内。重点突出历史事实、关键人物和重要事件。`;

    // 准备发送给 DeepSeek 的消息
    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    // 调用 DeepSeek API
    const response = await callDeepSeekAPI(apiKey, apiMessages);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        message: response 
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: '抱歉，服务暂时不可用，请稍后再试。',
        details: error.message 
      })
    };
  }
};

// 调用 DeepSeek API 的函数
function callDeepSeekAPI(apiKey, messages) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'deepseek-chat',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500
    });

    const options = {
      hostname: 'api.deepseek.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const jsonResponse = JSON.parse(responseData);
          if (jsonResponse.choices && jsonResponse.choices[0]) {
            resolve(jsonResponse.choices[0].message.content);
          } else {
            reject(new Error('Invalid API response'));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}
