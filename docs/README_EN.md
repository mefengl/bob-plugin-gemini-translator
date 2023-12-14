## Google Gemini Translator Bob Plugin

> Forked from https://github.com/yetone/bob-plugin-openai-translator

## Main Changes

1. Reverted the code version to v0.4.5 of the original repo to adapt to Bob Community Edition.
2. Switched from OpenAI api to Google Gemini api.

## Advantages

1. Gemini API has a free quota of `60 requests/min`, no payment required.
2. Gemini is extremely fast with long texts, only slightly slower than DeepL.

## Usage

### Prepare API Key
1. Open https://makersuite.google.com/app/apikey
2. Login to your Google account (skip if already logged in)
3. Click Create API Key in new project
![Alt text](/docs/images/google-greate-api-key.png)
4. Click Copy and save the API Key for later use
![Alt text](/docs/images/google-copy-api-key.png)

### Plugin installation and configuration
1. Download and install bob, any version `> 0.5.0` is fine (skip if already installed)
2. Click release on the right
![Alt text](/docs/images/github-to-releases.png)
3. Download the file ending with `.bobplugin`
![Alt text](/docs/images/github-download.png)
4. Double-click on it on Mac
![Alt text](/docs/images/macos-finder.png)
5. Confirm installation
![Alt text](/docs/images/macos-install-success.png)
6. Open Bob's settings page (find it in any page with `Command+,`, or in the status bar menu, or in the upper right corner of the translation page)
7. Select `Translation` > `Services`, and click the `+` button in the lower left corner
![Alt text](/docs/images/bob-open-add-service-menu.png)
8. Select `Gemini Translator`
![Alt text](/docs/images/bob-add-gemini-service.png)
9. Enter the API Key you saved earlier
![Alt text](/docs/images/bob-enter-api-key.png)
10. Click the `Save` button
![Alt text](/docs/images/bob-save.png)
11. Now you can use it in bob translation interface
> If you have any questions, please submit an issue, PR is welcome

---
## README.bak

<h4 align="right">
  <a href="https://github.com/yetone/bob-plugin-openai-translator/blob/main/README.md">简体中文</a> | <strong>English</strong>
</h4>

<div>
  <h1 align="center">OpenAI Translator Bob Plugin</h1>
  <p align="center">
    <a href="https://github.com/yetone/bob-plugin-openai-translator/releases" target="_blank">
        <img src="https://github.com/yetone/bob-plugin-openai-translator/actions/workflows/release.yaml/badge.svg" alt="release">
    </a>
    <a href="https://github.com/yetone/bob-plugin-openai-translator/releases">
        <img alt="GitHub Repo stars" src="https://img.shields.io/github/Stars/yetone/bob-plugin-openai-translator?style=flat">
    </a>
    <a href="https://github.com/yetone/bob-plugin-openai-translator/releases">
        <img alt="GitHub Repo stars" src="https://img.shields.io/badge/OpenAI-Bob-brightgreen?style=flat">
    </a>
    <a href="https://github.com/yetone/bob-plugin-openai-translator/releases">
        <img alt="GitHub Repo stars" src="https://img.shields.io/badge/Langurage-JavaScript-brightgreen?style=flat&color=blue">
    </a>
  </p>
</div>

> **Note**
>
> Important update: Non-macOS users can use my browser extension based on ChatGPT API for word translation [openai-translator](https://github.com/yetone/openai-translator) to solve urgent needs.


## Demonstration

![demo](https://user-images.githubusercontent.com/1206493/221086195-f1ed941d-4dfa-4aa0-9d47-56c258a8f854.gif)

"""
## Introduction

ChatGPT showcases the greatness of GPT models, so I have implemented the Bob translation + polishing + grammar modification plugin using OpenAI's API, with outstanding results!

### Polishing Feature

This plugin supports polishing sentences and modifying grammar using the ChatGPT API. To do so, just set the target language to be the same as the source language. It's a comprehensive alternative to Grammarly! And in theory, any language can be polished, not just English.

If you don't like combining translation functionality and text polishing, a separate plugin specifically for text polishing and grammar correction is available: [bob-plugin-openai-polisher](https://github.com/yetone/bob-plugin-openai-polisher). This polishing plugin has more advanced polishing features, such as explaining the modification reasons, etc.

### Language Model

To use the ChatGPT API, go to Bob's settings page and change the plugin model to `gpt-3.5-turbo-0301` or `gpt-3.5-turbo`:

![how to use ChatGPT API](https://user-images.githubusercontent.com/1206493/222339607-d8f05042-4b65-495c-af58-849891de7434.png)

## Usage

1. Install [Bob](https://bobtranslate.com/guide/#%E5%AE%89%E8%A3%85) (version >= 0.50), a macOS translation and OCR software

2. Download this plugin: [openai-translator.bobplugin](https://github.com/yetone/bob-plugin-openai-translator/releases/latest)

3. Install this plugin:
  ![Installation Steps](https://user-images.githubusercontent.com/1206493/219937302-6be8d362-1520-4906-b8d6-284d01012837.gif)

4. Get your API KEY from [OpenAI](https://platform.openai.com/account/api-keys)

5. Enter the API KEY in Bob Preferences > Services > This plugin configuration interface's API KEY input box:
  ![Settings Steps](https://user-images.githubusercontent.com/1206493/219937398-8e5bb8d2-7dc8-404a-96e7-a937e08c939f.gif)

6. Install [PopClip](https://bobtranslate.com/guide/integration/popclip.html) for highlighted text mouse proximity floating icon:
  ![PopClip](https://user-images.githubusercontent.com/1206493/219933584-d0c2b6cf-8fa0-40a6-858f-8f4bf05f38ef.gif)

## Thanks

I'm just a small Bob plugin, and the powerful part is Bob itself. I pay tribute to its developer [ripperhe](https://github.com/ripperhe)!
