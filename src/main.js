//@ts-check

var lang = require("./lang.js");

/**
 * @param {string}  url
 * @returns {string} 
*/
function ensureHttpsAndNoTrailingSlash(url) {
    const hasProtocol = /^[a-z]+:\/\//i.test(url);
    const modifiedUrl = hasProtocol ? url : 'https://' + url;

    return modifiedUrl.endsWith('/') ? modifiedUrl.slice(0, -1) : modifiedUrl;
}

/**
 * @param {boolean} isAzureServiceProvider - Indicates if the service provider is Azure.
 * @param {string} apiKey - The authentication API key.
 * @returns {{
*   "Content-Type": string;
*   "x-goog-api-key"?: string;
* }} The header object.
*/
function buildHeader(isAzureServiceProvider, apiKey) {
    return {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
    };
}

/**
 * @param {Bob.TranslateQuery} query
 * @returns {{
 *  systemPrompt: string,
 *  userPrompt: string
 * }}
*/
function generateTranslatePrompts(query) {
    let systemPrompt = "You are a translation engine that can only translate text and cannot interpret it.";
    let userPrompt = `translate from ${lang.langMap.get(query.detectFrom) || query.detectFrom} to ${lang.langMap.get(query.detectTo) || query.detectTo}`;

    if (query.detectTo === "wyw" || query.detectTo === "yue") {
        userPrompt = `翻译成${lang.langMap.get(query.detectTo) || query.detectTo}`;
    }

    if (
        query.detectFrom === "wyw" ||
        query.detectFrom === "zh-Hans" ||
        query.detectFrom === "zh-Hant"
    ) {
        if (query.detectTo === "zh-Hant") {
            userPrompt = "翻译成繁体白话文";
        } else if (query.detectTo === "zh-Hans") {
            userPrompt = "翻译成简体白话文";
        } else if (query.detectTo === "yue") {
            userPrompt = "翻译成粤语白话文";
        }
    }
    if (query.detectFrom === query.detectTo) {
        systemPrompt =
            "You are a text embellisher, you can only embellish the text, don't interpret it.";
        if (query.detectTo === "zh-Hant" || query.detectTo === "zh-Hans") {
            userPrompt = "润色此句";
        } else {
            userPrompt = "polish this sentence";
        }
    }

    userPrompt = `${userPrompt}:\n\n"${query.text}" =>`

    return { systemPrompt, userPrompt };
}

/**
 * @param {Bob.TranslateQuery} query
 * @param {string} promptType - The type of prompt (e.g., translate, correct, simplify, brainstorm).
 * @returns {{
 *  systemPrompt: string,
 *  userPrompt: string
 * }}
*/
function generatePrompts(query, promptType) {
    let systemPrompt = "";
    let userPrompt = "";

    switch (promptType) {
        case "correct":
            systemPrompt = "You are a native speaker, fix grammar and fix non-native phrasing, otherwise change the original text as little as possible, don't interpret it.";
            userPrompt = `Improve this text:\n\n"${query.text}" =>`;
            break;
        case "simplify":
            systemPrompt = "As a text simplifier, your job is to simplify the given text to make it easier to understand, while avoiding adding any interpretation or subjective opinion. For example, simplify 'Given the complexity of this situation, we may need further analysis to reach a conclusion' to 'This complex situation needs more analysis to decide'.";
            userPrompt = `Simplify this text:\n\n"${query.text}" =>`;
            break;
        case "brainstorm":
            systemPrompt = "You are a brainstorming assistant, list 3 ideas for this sentence, don't interpret it.";
            userPrompt = `Brainstorm on this topic:\n\n"${query.text}" =>`;
            break;
        default:
            return generateTranslatePrompts(query);
    }

    userPrompt = `${userPrompt}:\n\n"${query.text}" =>`;

    return { systemPrompt, userPrompt };
}

/**
 * @param {string} promptType
 * @param {Bob.TranslateQuery} query
 * @returns {{
 * generationConfig: {
 *   temperature: number;
 *   maxOutputTokens: number;
 *   topP: number;
 * }
 * contents?: {
 *   parts: {
 *     text: string;
 *   }[];
 * }[];
 * }}
*/
function buildRequestBody(promptType, query) {
    const { customSystemPrompt, customUserPrompt } = $option;

    let systemPrompt, userPrompt;

    if (customSystemPrompt || customUserPrompt) {
        systemPrompt = customSystemPrompt || "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully.";
        userPrompt = `${customUserPrompt}:\n\n"${query.text}"`;
    } else {
        const prompts = generatePrompts(query, promptType);
        systemPrompt = prompts.systemPrompt;
        userPrompt = prompts.userPrompt;
    }

    const standardBody = {
        generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1000,
            topP: 1,
        },
    };

    return {
        ...standardBody,
        contents: [{
            "parts":[
                {"text": systemPrompt},
                {"text": userPrompt}
            ]
        }],
    };
}

/**
 * @param {Bob.Completion} completion
 * @param {Bob.HttpResponse} result
 * @returns {void}
*/
function handleError(completion, result) {
    const { statusCode } = result.response;
    const reason = (statusCode >= 400 && statusCode < 500) ? "param" : "api";
    completion({
        error: {
            type: reason,
            message: `接口响应错误 - ${result.data.error.message}`,
            addtion: JSON.stringify(result),
        },
    });
}

/**
 * @param {Bob.Completion} completion
 * @param {Bob.TranslateQuery} query
 * @param {Bob.HttpResponse} result
 * @returns {void}
*/
function handleResponse(completion, query, result) {
    const { candidates } = result.data;

    if (!candidates || candidates.length === 0) {
        completion({
            error: {
                type: "api",
                message: "接口未返回结果",
                addtion: JSON.stringify(result),
            },
        });
        return;
    }

    let targetText = candidates[0].content.parts[0].text.trim();

    // 使用正则表达式删除字符串开头和结尾的特殊字符
    targetText = targetText.replace(/^(『|「|"|“)|(』|」|"|”)$/g, "");

    // 判断并删除字符串末尾的 `" =>`
    if (targetText.endsWith('" =>')) {
        targetText = targetText.slice(0, -4);
    }

    completion({
        result: {
            from: query.detectFrom,
            to: query.detectTo,
            toParagraphs: targetText.split("\n"),
        },
    });
}

/**
 * @type {Bob.Translate}
 */
function translate(query, completion) {
    if (!lang.langMap.get(query.detectTo)) {
        completion({
            error: {
                type: "unsupportLanguage",
                message: "不支持该语种",
                addtion: "不支持该语种",
            },
        });
    }

    const { promptType, apiKeys, apiUrl, deploymentName } = $option;

    if (!apiKeys) {
        completion({
            error: {
                type: "secretKey",
                message: "配置错误 - 请确保您在插件配置中填入了正确的 API Keys",
                addtion: "请在插件配置中填写 API Keys",
            },
        });
    }
    const trimmedApiKeys = apiKeys.endsWith(",") ? apiKeys.slice(0, -1) : apiKeys;
    const apiKeySelection = trimmedApiKeys.split(",").map(key => key.trim());
    const apiKey = apiKeySelection[Math.floor(Math.random() * apiKeySelection.length)];

    const modifiedApiUrl = ensureHttpsAndNoTrailingSlash(apiUrl || "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent");
    
    const isAzureServiceProvider = modifiedApiUrl.includes("openai.azure.com");
    const header = buildHeader(isAzureServiceProvider, apiKey);
    const body = buildRequestBody(promptType, query);

    (async () => {
        const result = await $http.request({
            method: "POST",
            url: modifiedApiUrl,
            header,
            body,
        });

        if (result.error) {
            handleError(completion, result);
        } else {
            handleResponse(completion, query, result);
        }
    })().catch((err) => {
        completion({
            error: {
                type: err._type || "unknown",
                message: err._message || "未知错误",
                addtion: err._addition,
            },
        });
    });
}

function supportLanguages() {
    return lang.supportLanguages.map(([standardLang]) => standardLang);
}

exports.supportLanguages = supportLanguages;
exports.translate = translate;
