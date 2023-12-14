# Google Gemini Translator Bob Plugin

> Forked from https://github.com/yetone/bob-plugin-openai-translator

## 主要改动

1. 回撤代码版本到原 repo 的 v0.4.5 , 以适配 Bob 社区版
2. 从 OpenAI 接口改为 Google Gemini 接口

## 优点

1. Gemini api 有免费额度 `60次/min`，不需要付费
2. Gemini 在长段文字上速度极快, 只比 deepl 稍慢一点

## 使用

### 准备 API Key
1. 打开 https://makersuite.google.com/app/apikey
2. 登录 Google 账号(已登录则跳过)
3. 点击 Create API Key in new project
![Alt text](/docs/images/google-greate-api-key.png)
4. 点击 Copy , 保存 API Key 备用
![Alt text](/docs/images/google-copy-api-key.png)

### 插件安装和配置
1. 下载安装 bob , `>0.5.0`版本均可(已安装则跳过)
2. 点击右侧 release
![Alt text](/docs/images/github-to-releases.png)
3. 下载以`.bobplugin`结尾的文件
![Alt text](/docs/images/github-download.png)
4. mac 上双击打开
![Alt text](/docs/images/macos-finder.png)
5. 确认安装
![Alt text](/docs/images/macos-install-success.png)
6. 打开 bob 设置界面 (任意界面`Command+,`, 或状态栏菜单中寻找, 或翻译界面右上角按钮中寻找)
7. 选择 `翻译` > `服务`, 点击左下角的 `+` 按钮
![Alt text](/docs/images/bob-open-add-service-menu.png)
8. 选择 `Gemini Translator`
![Alt text](/docs/images/bob-add-gemini-service.png)
9. 填入之前保存的 API Key
![Alt text](/docs/images/bob-enter-api-key.png)
10. 点击 `保存` 按钮
![Alt text](/docs/images/bob-save.png)
11. 现在可以在 bob 翻译界面中使用了
> 如果有问题, 可以在 issue 提出, PR is welcome

---
## README.bak

<h4 align="right">
  <strong>简体中文</strong> | <a href="https://github.com/yetone/bob-plugin-openai-translator/blob/main/docs/README_EN.md">English</a>
</h4>

<div>
  <h1 align="center">OpenAI Translator Bob Plugin</h1>
  <p align="center">
    <a href="https://github.com/yetone/bob-plugin-openai-translator/releases" target="_blank">
        <img src="https://github.com/yetone/bob-plugin-openai-translator/actions/workflows/release.yaml/badge.svg" alt="release">
    </a>
    <a href="https://github.com/yetone/bob-plugin-openai-translator/releases">
        <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/yetone/bob-plugin-openai-translator?style=flat">
    </a>
    <a href="https://github.com/yetone/bob-plugin-openai-translator/releases">
        <img alt="GitHub Repo stars" src="https://img.shields.io/badge/openai-Bob-brightgreen?style=flat">
    </a>
    <a href="https://github.com/yetone/bob-plugin-openai-translator/releases">
        <img alt="GitHub Repo stars" src="https://img.shields.io/badge/langurage-JavaScript-brightgreen?style=flat&color=blue">
    </a>
  </p>
</div>

> **Note**
>
> 重要更新：非 macOS 用户可以使用我开发的基于 ChatGPT API 的划词翻译浏览器插件 [openai-translator](https://github.com/yetone/openai-translator) 以解燃眉之急。

## 演示

![](https://user-images.githubusercontent.com/1206493/221086195-f1ed941d-4dfa-4aa0-9d47-56c258a8f854.gif)

## 简介

ChatGPT 向我们展示了 GPT 模型的伟大之处，所以我使用 OpenAI 的 API 实现了这个 Bob 的翻译 + 润色 + 语法修改插件，效果拔群！

### 润色功能

此插件已支持使用 ChatGPT API 对句子进行润色和语法修改，只需要把目标语言设置为与源语言一样即可，全面替代 Grammarly！而且理论上任何语言都可以润色，不仅仅是英语。

如果你不喜欢将翻译功能和文本润色功能放在一起，这里单独拆分出了一个专门用来文本润色和语法纠错的插件: [bob-plugin-openai-polisher](https://github.com/yetone/bob-plugin-openai-polisher)，这个润色插件具有更高级的润色功能，比如解释修改原因等。

### 语言模型

要使用 ChatGPT 的 API 需要在 Bob 的设置页面把此插件的模型改为 `gpt-3.5-turbo-0301` 或者 `gpt-3.5-turbo`:

![how to use ChatGPT API](https://user-images.githubusercontent.com/1206493/222339607-d8f05042-4b65-495c-af58-849891de7434.png)

## 使用方法

1. 安装 [Bob](https://bobtranslate.com/guide/#%E5%AE%89%E8%A3%85) (版本 >= 0.50)，一款 macOS 平台的翻译和 OCR 软件

2. 下载此插件: [openai-translator.bobplugin](https://github.com/yetone/bob-plugin-openai-translator/releases/latest)

3. 安装此插件:
  ![安装步骤](https://user-images.githubusercontent.com/1206493/219937302-6be8d362-1520-4906-b8d6-284d01012837.gif)

4. 去 [OpenAI](https://platform.openai.com/account/api-keys) 获取你的 API KEY

5. 把 API KEY 填入 Bob 偏好设置 > 服务 > 此插件配置界面的 API KEY 的输入框中
  ![设置步骤](https://user-images.githubusercontent.com/1206493/219937398-8e5bb8d2-7dc8-404a-96e7-a937e08c939f.gif)

6. 安装 [PopClip](https://bobtranslate.com/guide/integration/popclip.html) 实现划词后鼠标附近出现悬浮图标
  ![PopClip](https://user-images.githubusercontent.com/1206493/219933584-d0c2b6cf-8fa0-40a6-858f-8f4bf05f38ef.gif)

## 感谢

我这只是个小小的 Bob 插件，强大的是 Bob 本身，向它的开发者 [ripperhe](https://github.com/ripperhe) 致敬！
