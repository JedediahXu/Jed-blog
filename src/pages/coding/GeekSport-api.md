---
title:  GeekSportApi-Api
layout: '@/layouts/Post'
date: 2024-09-11
tags: blog
pin: true
language: 中文
categories:
  - 编程
label:
  - 原创
description:
  - NestJS 是一个用于构建高效、可扩展的 Node.js 服务器端应用的框架。
image:
  - 'https://chetxu.chetserenade.info/JedXu/header.1af6756a%2022.42.201.png'
---

![图片描述](https://chetxu.chetserenade.info/JedXu/header.1af6756a%2022.42.201.png)

## GeekSport-Api

### **NestJS官网介绍**

Nest (NestJS) 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的开发框架。它利用 JavaScript 的渐进增强的能力，使用并完全支持 TypeScript （仍然允许开发者使用纯 JavaScript 进行开发），并结合了 OOP （面向对象编程）、FP （函数式编程）和 FRP （函数响应式编程）。

在底层，Nest 构建在强大的 HTTP 服务器框架上，例如 Express （默认），并且还可以通过配置从而使用 Fastify ！

Nest 在这些常见的 Node.js 框架 (Express/Fastify) 之上提高了一个抽象级别，但仍然向开发者直接暴露了底层框架的 API。这使得开发者可以自由地使用适用于底层平台的无数的第三方模块。

[Nest官网-中文](https://nestjs.bootcss.com/)

### **为什么选择NestJS作为后台服务**

1. **通用语言/低学习曲线**：
   NestJS 使用 JavaScript/TypeScript，这与前端开发完全一致。无需学习新的编程语言，极大降低学习时间成本。对于熟悉 JavaScript 和现代前端框架（Vue、React、Angular、Astro、Nuxt、Next等）的开发者来说，NestJS 的学习成本相对较低。它的模块化结构和装饰器语法与 Angular 类似，可以能够快速上手。

2. **API 开发便捷**：
   NestJS 对 REST API 和 GraphQL 都有很好的支持，使 API 的设计和实现变得更直观。

3. **比较丰富的生态系统**：
   NestJS快速发展的的这几年，已经有丰富的模块和库。

###  **GeekSport-Api Nest架构设计 v1.x 部分架构说明**

### 技术架构

1. 前端：微信小程序
2. 后端： Nest.js
3. 数据库：Mysql
4. 缓存：Redis
5. 消息队列：RabbitMQ

### 接口概述

- HTTP 状态码标准化
- 自定义数据特征码
  - `status`
  - `message`
  - `error`
  - `debug`
  - `result`

### 数据模型

**通用**

- `extend` 为数据表的通用扩展结构 `Extend Model`
- 活动、用户表都包含 `extend` 字段，用于自定义扩展

**各表重要字段**

- `id`：数据库中的唯一标识符
- `createdAt`：创建时间
- `updatedAt`：更新时间
- `location`：地理位置信息

**数据组成**

- 数据库存储数据
- 业务计算的衍生数据

### 应用结构

**入口文件**
- `main.ts`
- `app.module.ts`
- `app.controller.ts`
- `app.config.ts`
- `app.environment.ts`

**请求处理流程**
1. 请求接收
2. 中间件过滤
3. 守卫过滤
4. 拦截器前置处理
5. 参数校验
6. 控制器处理
7. 服务处理
8. 拦截器后置处理
9. 异常过滤


### 核心组件

**过滤器**
- 错误过滤器

**拦截器**
- 缓存拦截器
- 数据流转换拦截器
- 数据流异常拦截器
- 日志拦截器

**装饰器**
- 缓存装饰器
- 响应装饰器
- 请求参数装饰器
- 访客请求装饰器

**守卫**
- 管理员专用守卫
- 管理员可选守卫

**中间件**
- CORS 中间件
- Origin 中间件

**管道**
- 验证管道
- 权限管道

**鉴权处理**

- 使用微信小程序的登录机制

### 数据安全

- 定期数据备份策略

....

### 目前还在研发中，敬请期待！

「**业余时间开发**」

![目前正在研发中](https://chetxu.chetserenade.info/JedXu/CleanShot%202024-09-11%20at%2022.16.35.png)


