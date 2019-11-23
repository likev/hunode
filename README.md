# hunode
a simple static site generator written in Node.js

## Features
1. It is written in Node.js(v10.0+) and ES2017(ES8), You can use it as your static site generator or for learning how to use `await` in [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

2. You can include some css or js in a separate article's front-matter.

3. You can change the code, it is very simple. The main generator code is `index.js` and it has only 200 lines. The default theme is written in [ES2015 template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) .

## Demo
[the-first-article-hello](https://likev.github.io/hunode/the-first-article-hello)

## How to use
1. install git and Node.js

2. clone the repository and install dependencies
```
git clone https://github.com/likev/hunode.git
cd hunode
npm install
```

3. add some articles in posts, you can write it using markdown.

`hello.md`
```
---
css: ["./grey-div.css"]
script: ["./say-hello.js"]
---
## hello demo

<div class='grey-div'>click the grey div to say hello</div>
```

`grey-div.css`
```css
.grey-div{
    border: solid red 1px;
    width: 300px;
    height: 300px;
    background-color: grey;
    color: white;
}
```

`say-hello.js`
```js
$('.grey-div').click(function(){

    alert('hello');

})
```

4. generate static site
```
node index.js
```

5. the static site is under www



