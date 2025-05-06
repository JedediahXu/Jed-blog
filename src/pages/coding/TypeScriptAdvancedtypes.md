---
title: 关于TypeScript高级类型
layout: '@/layouts/Post'
date: 2024-01-21
tags: blog
pin: true
language: 中文
categories:
  - 编程
label:
  - 原创
description:
  - infer、操作符、和高阶类型
image:
  - 'https://chetxu.chetserenade.info/article/web-javascript.png'
---


![图片描述](https://chetxu.chetserenade.info/article/web-javascript.png)

## 一、infer

学过TS得都清楚,条件类型的基本语法是:
`T extends U ? X : Y;`
如果占位符类型U是一个可以被分解成几个部分的类型，譬如数组类型，元组类型，函数类型，字符串字面量类型等。这时候可以通过infer来获取U类型中某个部分的类型。

**infer语法的限制如下**
1. `infer`只能在条件类型的 `extends` 子句中使用
2. `infer`得到的类型只能在`true`语句中使用, 即X中使用


### 推断数组(或者元组)的类型

使用方法:
```typescript
type InferArray<T> = T extends (infer U)[] ? U : never;
```
(infer U)和平时常写的string[]，number[]等等是不是很像？这里就是通过(infer U)来获取数组对应的类型。

案例: 
```typescript
type I0 = InferArray<[number, string]>; // string | number
type I1 = InferArray<string[]>; // string
type I2 = InferArray<number[]>; // number
```


### 推断数组(或者元组)第一个元素的类型

使用方法:
```typescript
type InferFirst<T extends unknown[]> = T extends [infer P, ...infer _] ? P : never
```
`[infer P, ... infer _]`中infer P获取的是第一个元素的类型，而`...infer _`获取的是数组其他剩余元素的数组类型
ps：特别说明下，我们例子汇总不需要使用其他元素的类型，所以用_。

案例
```typescript
type I3 = InferFirst<[3, 2, 1]>; // 3
```


### 推断数组(或者元组)最后一个元素的类型

使用方法
```typescript
type InferLast<T extends unknown[]> = T extends [... infer _, infer Last] ? Last : never;
```
这个和推断数组第一个元素的类型类似，...infer _获取的是最后一个元素之前的所有元素类型，infer Last获取的是最后一个元素的类型。

案例
```typescript
type I4 = InferLast<[3, 2, 1]>; // 1
```


### 推断函数类型的参数
使用方法
```typescript
type InferParameters<T extends Function> = T extends (...args: infer R) => any ? R : never;
```
...args 代表的是函数参数组成的元组, infer R代表的就是推断出来的这个函数参数组成的元组的类型。

案例
```typescript
type I5 = InferParameters<((arg1: string, arg2: number) => void)>; // [string, number]
```

### 推断函数类型的返回值
使用方法
```typescript
type InferReturnType<T extends Function> = T extends (...args: any) => infer R ? R : never;
```
和前面的推断函数类型的参数类似，=> 后面的infer R代表的就是推断出来的函数的返回值类型。

案例
```typescript
type I6 = InferReturnType<() => string>; // string
```


### 推断Promise成功值的类型
使用方法
```typescript
type InferPromise<T> = T extends Promise<infer U> ? U : never;
```
案例
```typescript
type I7 = InferPromise<Promise<string>>; // string
```

### **推断字符串字面量类型的第一个字符对应的字面量类型**

使用方法
```typescript
type InferString<T extends string> = T extends ${infer First}${infer _} ? First : [];
```
案例
```typescript
type I8 = InferString<"Johnny">; // J
```


## 二、extends


- 表示继承
- 表示约束
- 表示分配(条件类型)

### **继承**
```typescript
class Animal {
  say() {
    console.log('say');
  }
}
class Dog extends Animal {}
const dog = new Dog();
dog.say();
```

### **泛型约束**
```typescript
type C = <T extends { name: string }>(arg: T) => any;
function fn(cb: C) {
  cb({ name: '回调' });
}
fn((arg) => {
  console.log(arg.name);
});
```

### **条件类型**
```typescript
type Human = {
  name: string;
};
type Duck = {
  name: string;
};
type Bool = Duck extends Human ? 'yes' : 'no'; // yes
```
Bool的类型是 'yes'这是因为 Human 和 Duck 的类型完全相同，或者说 Human 类型的一切约束条件，Duck 都具备； 需要理解的是,这个A extends B 是指类型A可以分配给类型B, 而不是说类型A是类型B的子集.稍微扩展下来详细说明这个问题：
```typescript
type Human = {
  name: string;
  desc: string;
};
type Duck = {
  name: string;
};
type Bool = Duck extends Human ? 'yes' : 'no'; // no
```
当我们给Human加上一个desc属性,发现此时Bool 是'no' 这是因为Duck没有类型为string的desc属性,类型Duck不满足类型Human的类型约束.因此 A extends B 是类型A可以分配给类型B 而不是说类型A是类型B的子集,理解extends在类型三元表达式里的用法非常重要。

## 三、进阶工具

### **Partial: 可以快速把某个接口类型中定义的所有属性变成可选的**
**例：**
```typescript
const dataType2:  Partial<ApiKey> = {
  name: 'json'
} 
```

### **Pick: 可以选择一个原来的接口中一部分的属性定义**
**例：**
```typescript
interface People {
  name: string
  age: number
}
type somePeople = Pick<People,'name'>
let onlyName:somePeople = {
  name:"112"
}
```
选择了接口中的name属性，那么该属性就必须含有 
### **Required:  和Partial刚好相反，将一个定义中的属性全部变成必选参数**
**例：**
```typescript
// 必选参数
interface People1 {
  name?: string;
  age?: number;
}
// 类型 "{ name: string; }" 中缺少属性 "age"，但类型 "Required<People>" 中需要该属性
const person2: Required<People1> = {
  name:"11"
}
```
### **Readonly:  只读，让一个定义中的所有属性都变成只读参数**
**例：**
```typescript
nterface People3 {
  name: string
  age: number,
    dog:{
    name:string
    age:number
  }
}
const xiaoling: Readonly<People3> = {
  name: '小凌', // 只读
  age: 18, // 只读
  dog:{
    age:1,
    name:'大黄'
  }
}
// 但是是浅层的
xiaoling.name = '大凌' // 无法分配到 "name" ，因为它是只读属性。
xiaoling.dog.age = 2 // 可以 
```

### **联合类型(UnionType)**
**首先是联合类型的介绍,也是一切的起源**
```typescript
let a: string | number | boolean = '123' // 变量a的类型既可以是string，
a = 123 // 也可以是number
a = true // 也可以是boolean
```

### **keyof : 将一个类型的属性名全部提取出来当做联合类型**
```typescript
// key of 使用
interface People5 {
  name: string;
  age: number;
}
// keyof 取 interface 的键
// type keys = "name" | "age"
type keys = keyof People5;
// 假设有一个 object 如下所示，
// 我们需要使用 typescript 实现一个 get 函数来获取它的属性值
const xiaozhang:People5 = {
  name: '小张',
  age: 12
}
function get<T extends object, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]
}
console.log(get(xiaozhang,'age')) // 12
console.log(get(xiaozhang,'name')) // 小张
// error 类型“"address"”的参数不能赋给类型“keyof People”的参数。
console.log(get(xiaozhang,'address'))
::keyof 与 Object.keys 略有相似，只不过 keyof 取 interface 的键::
``
```

### **映射(Record)**
**Record用于属性映射**
搭配联合类型
```typescript
type RequestMethods = 'GET'|'POST'| 'DELETE'
type MethodsAny = Record<RequestMethods, any>
let mothod1:MethodsAny = {
  GET:"1",
  POST:'1',
  DELETE:'1'
}
let mothod2:MethodsAny = {
  GET:"1",
  POST:'1',
  DELETE:'1', // 缺少，会报错，因为它为必须存在的
  PUT:'111' // error “PUT”不在类型“MethodsAny”中
}
搭配接口使用
interface PersonModel {
  name:string,
  age:number
}
// [x: string]: PersonModel;
type student = Record<string, PersonModel>
let students:student = {
  student1:{
    name:'小凌',
    age:18
  },
  student2:{
    name:'小李',
    age:19
  }
}
  ``
```

### **Exclude(排除)**
ts中可以排除 联合类型 中一部分的内容
注意：Exclude用来操作联合类型的
```typescript
type havTypes = 'name' | 'age' | 'sex'
type someTypes = Exclude<havTypes,'sex'>
const myTypes1:someTypes = 'name' // 可以
const myTypes2:someTypes = 'sex' // 错误 不能将类型“"sex"”分配给类型“someTypes”
```

### **Omit (省略)**
ts中就是将接口或者类型的键值对删除一部分
```typescript
// 省略
interface People {
  name: string;
  age: number;
}
type somePeople = Omit<People,'name'>

type somePeople = {
  age: number;
}
```

### **ReadonlyArray（只读数组）**
创建一个数组，数组中的索引不允许被修改
我们知道当我们使用const创建对象或者数组时，其实是可以修改其内部属性的，但是有的时候我们可能不需要其内部能够被修改，这时候我们就需要用ReadonlyArray了
实现的方式有两种:
```typescript
// 方法1：通过类型断言的方式
const arr = ['杜兰特','欧文','科比','乌布雷'] as const
arr[3] = '帅哥'; //  报错 无法分配到 "3" ，因为它是只读属性
// 方法2：使用ReadonlyArray
const arr2 : ReadonlyArray<string> = ['杜兰特','欧文','科比','乌布雷']
arr2[3] = 'JedXu' // 报错 类型“readonly string[]”中的索引签名仅允许读取
```
**你是不是就想知道as const和ReadonlyArray这两者的区别在哪里？**
**区别在于as const是深层次的，尽管数组内放的对象，对象内部数据也是不能被修改的。ReadonlyArray则是‘浅层’的。**

### **Mutable（去除只读）**
```typescript
type ToMutable<T> = {
  -readonly [Key in keyof T]: T[Key]
}
```
给索引类型 T 的每个索引去掉 readonly 的修饰，其余保持不变。

### **ToRequired （去掉可选符号）**
同理，也可以去掉可选修饰符：
```typescript
type ToRequired<T> = {
  [Key in keyof T]-?: T[Key]
}
```
给索引类型 T 的索引去掉 ? 的修饰 ，其余保持不变。

### **FilterByValueType （过滤值）**
可以在构造新索引类型的时候根据值的类型做下过滤：
```typescript
type FilterByValueType<
  Obj extends Record<string, any>,
  ValueType
  > = {
  [Key in keyof Obj
   as Obj[Key] extends ValueType ? Key : never]
  : Obj[Key]
}
```

类型参数 Obj 为要处理的索引类型，通过 extends 约束为索引为 string，值为任意类型的索引类型 Record<string, any>。
类型参数 ValueType 为要过滤出的值的类型。
构造新的索引类型，索引为 Obj 的索引，也就是 Key in keyof Obj，但要做一些变换，也就是 as 之后的部分。
如果原来索引的值 Obj[Key] 是 ValueType 类型，索引依然为之前的索引 Key，否则索引设置为 never，never 的索引会在生成新的索引类型时被去掉。
值保持不变，依然为原来索引的值，也就是 Obj[Key]。
这样就达到了过滤索引类型的索引，产生新的索引类型的目的：
### **大小写转换**
```typescript
type NewType = Uppercase<'aaa'>; // AAA 全大写
type NewType = Lowercase<'AAA'>; // aaa 全小写
type NewType = Capitalize<'aaa'>; // Aaa 首字母大写
type NewType = Uncapitalize<'AAA'>; // aAA 首字母小写
```

## **四、一些方法集合**

- NonNullable 排除null和undefined
- Parameters 根据Type类型构造元组类型Type
- ConstructorParameters 从构造函数类型的类型构造元组或数组类型
- ReturnType 构造一个由function的返回类型组成的类型Type
- InstanceType 构造一个由构造函数的实例类型组成的类型Type
- ThisParameterType 为函数类型提取this参数的类型，如果函数类型没有参数，则为unknown
- OmitThisParameter  this删除参数Type。如果Type没有明确声明的this参数，则返回Type。否则，将this创建一个没有参数的新函数类型Type。泛型被擦除，只有最后一个重载签名被传播到新的函数类型中
- ThisType 此实用程序不返回转换后的类型。相反，它充当上下文this类型的标记(noImplicitThis必须启用该标志才能使用此实用程序)
