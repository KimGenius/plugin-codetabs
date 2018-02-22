# path param codetabs

Include multiple languages code block to your GitBook (for example when documenting an API).

![Preview](./preview.png)

### Installation

Adds the plugin to your `book.json`, then run `gitbook install` if you are building your book locally.

```js
{
    "plugins": ["path-params-codetabs"]
}
```

### Show Path Parameter

Path Parameter를 표현하려면 {% codetabs %} 를 {% pathCodetabs %} 로 변경하고 parameter를 {} 안에 넣어주면 됩니다.

```md
{% pathCodetabs name="CURL", type="bash" -%}
curl -X POST http://genius.genie.ggg/abc/{userId}/{HelloCount}/hey
{% endcodetabs %}
```

### Using codetabs
```md

This is a code block with tabs for each languages:

{% pathCodetabs name="Python", type="py" -%}
msg = "Hello World"
print msg
{%- language name="JavaScript", type="js" -%}
var msg = "Hello World";
console.log(msg);
{%- endpathCodetabs %}
```

### Escaping templating syntax

For languages using syntax like `{{`, `{%`; we have to escape these content:


```md
Here is some angular and react code

{% codetabs name="Python", type="py" -%}
    {% raw %}
    <h1>Hello {{yourName}}!</h1>
    {% endraw %}
{%- language name="React", type="js" -%}
var React = require('react')
{%- endcodetabs %}
```
