Below are code snippets that illustrate some of the flexible features of
JavaScript and how they can introduce unexpected/unintuitive behavior. There
are many more; see Appendix B of Crockford's _JavaScript: The Good Parts_.
Please note that there are useful, positive sides of most of these; every
language design/implementation decision is a trade-off.

### Automatic semicolon insertion

```javascript
function f() {
     return 3;
}
function g() {
     return
       3;
}
console.log(f()); // ??
console.log(g()); // ??
```

### Eval

JavaScript's `eval` function can be used to load and execute new code at
runtime. This is generally considered a bad/dangerous idea, but nevertheless
useful in some cases. Beyond security implications (mostly a concern in the
browser since `eval` can easily be leveraged to carry out [XSS
attacks](https://en.wikipedia.org/wiki/Cross-site_scripting)), however the
behavior of `eval` differs when you call it directly or indirectly. This
difference was introduced in the name of performance (arguably okay since you
should not be using `eval` very much, but still not great.)

```javascript
global.x = 33;
{
  const x = 44;
  const ev = eval;
  console.log(eval("x")); // ??
  console.log(ev("x")); // ??
}
```


### Implicit casting

See the sarcastic [WAT](https://www.destroyallsoftware.com/talks/wat) video.

### Monkeypatching

Because JavaScript lets you modify arbitrary objects and their prototypes,
running untrusted code safely is extremely difficult to do. (If you're
interested in this, come talk to me; this is some of my research).
See some examples
[here](https://github.com/google/caja/wiki/GlobalObjectPoisoning) on global
object poisoning. Here is the simplest:

```javascript
// suppose add was exposed by a third-party library
function add(x, y) {
  // Poison the Object prototype by redefining toString,
  // which is called when objects are implicitly casted to
  // strings. The modified function modifies the object (this), by
  // setting name to 'mud';
  Object.prototype.toString = function () {
    var name = this.name ;
    this.name = 'mud';
    return 'HA ' + name + '.  IM STEALIN UR CODEZ!';
  };
  return x + y;
}

var o = { name: 'Bingo' };
console.log(add(3,4)); // calling add poisoned Object.prototype
console.log('' + o);
console.log('Your name is now ' + o.name);
```
