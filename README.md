# dummy-reveal, Dead simple yet powerful, javascript reveal library.

## Usage:

In you javascript file:

```javascript
var dr = new DummyReveal({});
```

In your html tags:

```html
<div class="reveal" data-active-class="bounceInDown"></div>
```

## Options:

JavaScript:

```javascript
var dr = new DummyReveal({
  selector: 'reveal',           // default, class that will trigger reveal animation
  classDefault: 'animated',     // default, global class that will be base for all elements withoud data default class
  classActive: 'fadeIn',        // default, global active class that will be added to all elements without data active class
  globalDelay: 0,               // default, global delay for animations that will be added to all elements without data delay
  noAnimateClass: 'noAnimate',  // default, global noAnimateClass, for initial value before element is active 
  reverse: false,               // default, global reverse for animations that will be added to all elements without data reverse
  mobile: false                 // default, global 
});
```

HTML:

```html
<div 
  class="reveal" 
  data-active-class="bounceInDown"
  data-default-class="animated"
  data-no-animate-class="noAnimate"
  data-delay="0",
  data-offset="0"
></div>
```
