---
title: 🍬  Vue3-Setup介绍
layout: '../../layouts/Post.astro'
date: 2022-07-02
tags: blog
pin: false
quantity: 3400
language: 中文
categories:
  - 编程
---
![图片描述](https://chetxu.chetserenade.info/uPic/unfreedom.webp)

## 一、基本使用

在vue3.2中我们不再需要进行return，当使用 `<script setup>` 的时候，任何在 `<scriptsetup>` 声明的**顶层的绑定 (包括声明的变量，函数声明，以及 import 引入的内容)** 都可以在模板中直接使用，这是因为在`setup`函数中，所有的ES模板都被认为是暴露給上下文的值，并包含在`setup()`返回对象中。

要使用这个语法，需要将 `setup` 属性添加到 `<script>` 代码块上，示列：

```vue
<script setup>
import {ref} from 'vue'
let property = ref('志拾陆');
</script>
```

这里面的代码会被编译成组件 `setup()` 函数的内容，这也就意味着与普通的 `<script>` 只在组件被首次引入的时候仅执行一次不同，`<script setup>` 中的代码会在**每次组件实例被创建的时候执行**。这一点非常的重要，也就是写在 `<script setup>` 中的代码，例如初始化的赋值等在组件每次实例创建时都重新执行一次。

##  二、自动注册

使用3.2的语法时，如果需要像之前一样去引入其他组件，就无需再通过`components`进行注册，我们可以直接引入使用。示列：

```vue
<template>
  <subassembly @getChili="getChili" :title="msg" />
</template>

<script setup>
import {ref} from 'vue'

//这里我们引入了子组件 subassembly
import subassembly from './subassembly.vue'
</script>
```

## 三、组件通信

#### defineProps：

**父组件代码**

```vue
<template>
  <div>我是父组件----1</div>
  <subassembly @getChili="getChili" :title="msg" />
</template>

<script setup>
import {ref} from 'vue'
import subassembly from './subassembly.vue'

//把值传递给子组件 ---> :title="msg"  <Home @getChili="getChili" :title="msg" />
const msg = ref('父的值')

</script>
```

```vue
<template>
  <div>我是子组件----2</div>
  <div style="color: red">{{props.title}}</div>
</template>

<script setup>
import {defineProps} from 'vue'

//接收父组件 传过来的值！
const  props = defineProps({
  title: {
    type: String
  }
});

//打印一下 接收父组件的值
console.log(props.title) //父的值
</script>
```

在标准组件写法里，子组件的数据都是默认隐式暴露给父组件的，但在`script-setup`模式下，**所有数据只是默认return给template 使用，不会暴露到组件外，所以父组件是无法直接通过挂载ref 变量获取子组件的数据**。如果要调用子组件的数据，需要先在子组件显示的暴露出来，才能够正确的拿到，这个操作，就是由**defineExpose**来完成。

#### defineExpose：

**子组件代码**

```vue
<template>
  <div>我是子组件----2> {{ xiaoZhi.stator }}</div>
</template>

<script setup>
import {ref, defineExpose, reactive} from 'vue'

let xiaoZhi = reactive({
  stator: '小志',
  age: 27
})

let xiaoXiaoZhi = ref('小小志');
console.log(xiaoXiaoZhi)

defineExpose({
  xiaoZhi,
  xiaoXiaoZhi
})
</script>
```

### 四、结果展示

总得来说，新引入的setup语法糖的 目的是简化使用`Composition API`时冗长的模板代码，也就是让代码更加简洁，阅读性也越高。而在组件中引入并使用自定义hook 自定义hook的作用类似于vue2中的mixin技术 自定义Hook的优势: 很清楚复用功能代码的来源, 更清楚易懂！

 有不足的地方欢迎大家进行交流讨论，互相学习！
