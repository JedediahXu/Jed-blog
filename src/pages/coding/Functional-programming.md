---
title: 函数式编程
layout: '@/layouts/Post'
date: 2023-08-20
tags: blog
pin: false
language: 中文
categories:
  - 编程
label:
  - 原创
description:
  - 最早起源于数学中的范畴论
image:
  - 'https://chetxu.chetserenade.info/uPic/Functional.jpg'
---

![图片描述](https://chetxu.chetserenade.info/uPic/Functional.jpg)

前言：函数式编程最早起源于数学中的范畴论，和面向对象编程、命令式编程并列为三大编程范式，也就是如何编写程序的方法论。 它属于"结构化编程"的一种，主要思想是把运算过程尽量写成一系列嵌套的函数调用。
范畴论（Category Theory）是数学中的一个分支，它是一种抽象的数学理论，用于研究数学结构和数学对象之间的关系。

> 顾名思义，范畴论把世界上一切存在关系的元素理解为一个范畴，有点像分子结构，范畴内部的各原子之间的关系就是函数。

## 一、函数式编程

今天，我们不单独的去聊函数式（FP）而是去结合面向对象编程（OOP）和命令式编程（IP）去聊一下。在前端，使用最多的编程语言就是JavaScript而JavaScript本身是多范式语言，所以在现在的前端框架身上都离不开这些编程范式。 如：Angular（面向对象编程）、React（命令式编程和函数式）、Vue（混合了面向对象和命令式编程、函数式）、Redux（函数式）等等。

函数式主要强调不可变性、纯函数、高阶函数、递归等函数式编程的核心概念，以提高代码的可维护性、可测试性和并发性。

**函数式编程的主要特征：**

- 一等公民
- 计算过程完全函数化
- 无副作用，有输入，有输出
- 每个函数只有一个参数（柯里化）
- 支持闭包和高阶函数
- 使用递归实现流程控制

FP 和 OOP、IP是三种截然不同的软件世界观。无论是辩证地看待三种世界观，还是单纯地“信仰”其中某一种，都需要建立在充分理解和掌握三者的前提上。
作为三种截然不同的软件世界观，FP 和 OOP、IP的差异是巨大的。

- 抽象：OOP 将数据与行为打包抽象为对象，对象是一等公民；而 FP 将行为抽象为函数，数据与行为是分离的，函数是一等公民。
- 代码重用：OOP 的核心在于继承，而 FP 的核心在于组合。
- 命令式：指令式执行 “按顺序执行，直到没有任何语句需要执行为止”。

面向对象编程（OOP）和函数式编程（FP）是两种不同的编程范式，它们有不同的思维方式和方法，可以根据项目需求和团队的技能来选择和使用。但是一般来讲FP的学习成本要比面向对象高一些，OOP通常更适合需要建模现实世界对象的项目，而FP适用于需要处理大量数据或需要强调纯函数的项目。也可以在一个项目中一起使用。例如，在一个OOP项目中，可以使用FP的思想来处理数据转换和处理，以提高代码的可维护性和可测试性。

之前在学习函数式的时候，看到了很不错的两个列子，我把它们拿到这里。

#### FP解决业务问题

李雷是网课平台的一个开发，最近他接到了这样一个需求：
为网课平台增加一个“一键注册我所喜欢的课程”功能：“注册”意味着用户加入了某个课程，“喜欢”则是一个类似于收藏的功能。用户在“喜欢”了一些课程之后，执行“注册”即可成为这些课程的学员；“注册”执行完毕后，需要及时地从用户的喜欢列表中清除这些课程；在清除完成后，还需要及时检查这个用户的注册课程总数，若总数超过10门课，则标识该用户为 VIP 客户。

我们简单捋一下这个需求的流程，它是这样的：

**用户 -> 喜欢课程 -> 注册课程 -> 清除喜欢列表 -> 检查是否 VIP -> 结束**

**代码：**

```jsx
// mock一个测试用户：李雷
const user = {
  // 姓名
  name: 'Li Lei',
  // 喜欢列表
  likedLessons: [],
  // 注册列表
  registeredLessons: [],
  // VIP 标识
  isVIP: false
}
// mock一套测试课程  
const myLessons = [
  {
    teacher: 'John',
    title: 'advanced English'
  }, {
    teacher: 'John',
    title: 'advanced Spanish'
  }
]


// ”喜欢课程“功能函数
function likeLessons(user, lessons) {
  const updatedLikedLessons = user.likedLessons.concat(lessons)
  return Object.assign(
    {}, 
    user, 
    {likedLessons: updatedLikedLessons}
  );
}

// “注册课程”功能函数
function registerLessons(user) {
  return {
    ...user,
    registeredLessons: user.likedLessons
  };
}

// “清空喜欢列表”功能函数
function emptyUserLiked(user) {
  return {
    ...user,
    likedLessons: []
  };
}

// “检查是否 VIP”功能函数
function isVIP(user) {
  let isVIP = false
  if(user.registeredLessons.length > 10) {
    isVIP = true
  }
  return  {
    ...user,
    isVIP
  }
}

// 定义一个名为 pipe 的函数，接受任意数量的函数作为参数
const pipe  = (...funcs) => funcs.reduce(
  // 使用 reduce 函数将所有传入的函数组合成一个新的函数
  (f, g) => (...args) => g(f(...args))
);

pipe(
  likeLessons,
  registerLessons,
  emptyUserLiked,
  isVIP,
  // 这个 pipe 竟然可以接收多个入参，为什么呢？当然是因为“对组合链入参的处理不同”
)(user, myLessons)
```

#### 用OOP解决业务问题

过了一段时间，李雷的老板发现，网课平台太难做了，打算换个赛道，做游戏。于是，李雷华丽转身，成为了一名游戏开发。
他接手的项目是一款运动游戏。在这款游戏里，玩家可以选择成为任何一种类型的运动选手，包括篮球、足球、网球、羽毛球等等。每一种类型的选手都有他们各自的一些绝技（比如篮球选手可以灌篮，足球选手可以射门）。
当然啦，以上这些都是很常规的运动，没有什么卖点。这个游戏真正的卖点在于它的隐藏款运动员——“疯狂号选手“。这个选手的特别之处在于他可以定制自己皮肤的颜色，并且随时都能飞！更重要的是，想成为疯狂号选手，得充钱！每飞一次，都会扣钱。要想一直飞，就得一直充！

**代码：**

```jsx
// Player 是一个最通用的基类
class Player {
    // 每位玩家入场前，都需要给自己起个名字，并且选择游戏的类型
    constructor(name, sport) {
        this.name = name;
        this.sport = sport;
    }

    // 每位玩家都有运动的能力 
    doSport() {
        return 'play' + this.sport
    }
}

// 篮球运动员类，是基于 Player 基类拓展出来的
class BasketballPlayer extends Player {
    constructor(name) {
        super(name, 'basketball')
    }

    // 这是一个灌篮方法
    slamDunk() {
        return `${this.name} just dunked a basketball`
    }
    
    // 这是一个跳跃方法
    jump() {
      return `${this.name} is jumping!`
    }
}

// 足球运动员类，也基于 Player 基类拓展出来的
class FootballPlayer extends Player {
    constructor(name) {
        super(name, 'football')
    }

    // 这是一个射门方法
    shot() {
        return `${this.name} just shot the goal`
    }
    
    // 这是一个冲刺跑方法
    runFast() {
        return `${this.name} is running fast!`
    }
}

// 疯狂号运动员，也是基于 Player 基类拓展出来的
class CrazyPlayer extends Player {
    // 疯狂号运动员可定制的属性多出了 color 和 money
    constructor(name, sport, color, money) {
        super(name, sport)
        this.color = color
        this.money = money
    }

    // 这是一个飞翔方法
    fly() {
        if(this.money > 0) {
            // 飞之前，先扣钱
            this.money--
            // 飞起来啦，好帅呀！
            return `${this.name} is flying!So handsome!`
        }
        // this.money <= 0，没钱还想飞，你也配？（狗头
        return 'you need to give me money'
    }
}

// 创建一个篮球运动员 Bob
const Bob = new BasketballPlayer('Bob')
// 'Bob just dunked a basketball'
Bob.slamDunk()
// 创建一个足球运动员 John
const John = new FootballPlayer('John')
// 'John just shot the goal'
John.shot()   

// 创建一个红色皮肤的疯狂号选手xiuyan，并充了1块钱
const demo = new CrazyPlayer('demo', 'basketball', 'red', 1)
// 'demo is flying!So handsome!'
demo.fly()
// money 归 0 了
demo.money
// 'you need to give me money'
Demo.fly()
```

通过上面二个案列，我们可以很好的察觉到FP和OOP的不同核心思想, 但是在不同的业务场景之中，我们应该使用哪一种方式最好呐？

**答案：组合+继承**

## 二、组合+继承

**在网课的案例中，我之所以倾向于使用 FP 求解，是因为这是一个重行为、轻数据结构的场景；**

**在游戏的案例中，我之所以倾向使用 OOP 求解，是因为这是一个重数据结构、轻行为的场景。**

**FP：函数是一等公民**
在 FP 的世界里，函数是绝对的主角。
以网课需求为例，它是一个典型的动词占据主导的需求：喜欢、注册、清空、检查......全都是对行为的描述，显然，这是一个行为密集型的需求。并且需求中的数据源 user 是清晰的、确定的。整个功能流程梳理下来，其实是一个点对点的数据转换过程。这样的场景，用 FP 求解是再舒服不过的。
FP 构造出的程序，就像一条长长的管道。管道的这头是源数据，管道的那头是目标数据——数据本身是清晰的、确定的、不可变的。数据不是主角，那些围绕数据展开的行为才是主角。“行为”也就是函数，一个小的行为单元，就仿佛是一根小小的管道。我们关心的，是如何把一节一节简单的小管道组合起来，进而得到一个复杂的、功能强大的大管道。

**OOP：对象是一等公民**
OOP 思想起源于对自然界的观察和抽象，它是对现实世界的一种隐喻。“类”的概念在我们生活中本来就很常见，图书馆的书籍分类、生物学的“界门纲目科属种”、社会上对不同职业不同身份的人的分类等等......这些都是在通过寻找事物之间的共性，来抽象出对一类事物的描述。
既然描述的是【事物】，那么 OOP 的世界毫无疑问是一个名词占据主导的世界。在 OOP 的语境下，我们关注的不是一个个独立的函数单元，而是一系列有联系的属性和方法。我们把相互联系的属性和方法打包，抽象为一个“类”数据结构。当我们思考问题的时候，我们关注的不是行为本身，而是谁做了这个行为，谁和谁之间有着怎样的联系。

结合:FP 案例借助 pipe 函数实现了函数组合，OOP 案例借助 extends 关键字实现了类的继承。我们可以看到：组合的过程是一个两两结合、聚沙成塔的过程；而继承则意味着子类在父类的基础上重写/增加一些内容，通过创造一个新的数据结构来满足的新的需求。
组合和继承之间的争论，和 OOP 与 FP 之间的争论一样，是一个相当沉重的话题。相比“技术问题”来说，它更像是一个“宗教问题”。 比起孰是孰非，我更想探讨的，是如何运用两者的优势，写出更加可靠的代码。

在 OOP 的语境下，我们解决“继承滥用”问题的一个重要方法，就是引入“组合”思想。**

**最优解 在OOPVSFP的第二个例子中（组合结合OOP）：**

```jsx
// 这个函数单独处理 slamDunk 能力
const getSlamDunk = (player) => ({
  slamDunk: () => {
    return `${player.name} just dunked a basketball`
  }
})

// 这个函数单独处理 shot 能力
const getShot = (player) => ({
  shot: () => {
    return `${player.name} just shot the goal`
  }
})

// 这个函数单独处理 fly 能力
const getFly = (player) => ({
  fly: () => {
      if(player.money > 0) {
          // 飞之前，先扣钱
          player.money--
          // 飞起来啦，好帅呀！
          return `${player.name} is flying!So handsome!`
      }
      // player.money <= 0
      return 'you need to give me money'
    }
})

const SuperPlayer = (name, money) => {
  // 创建 SuperPlayer 对象
  const player = {
    name,  
    sport: 'super',  
    money
  }

  // 组合多个函数到 player 中
  return Object.assign(
    {},  
    getSlamDunk(player),
    getShot(player),  
    getFly(player)
  )
}

const superPlayer = SuperPlayer('demo', 20)  
// 'demo just dunked a basketball'
superPlayer.slamDunk()  
// 'demo just shot the goal'
superPlayer.shot() 
// 'demo is flying!So handsome!'
superPlayer.fly()`
```

以上都是我在**修言老师**的文章中学到的～ 顺便借鉴了一下列子, 嘻嘻

从以上来看，不管是用函数式还是面向对象，只要更好的区分出来是“重行为”还是“重数据”之类的关键词，就可以实现“最优解”。
当然，最后一个完美的列子更好的诠释了，组合就是比继承要好，能用组合就不要用继承。

因为看到这个二个列子举的特别好，所以整理分享一下，等到周末有时间，好好深入的理解一下,顺便加入自己的见解。
