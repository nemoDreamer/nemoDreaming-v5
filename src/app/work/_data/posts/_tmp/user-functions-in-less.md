---
title: User functions in LESS
date: 9/25/2014, 5:01:23 PM
url: ""
category: Design
categories:
  - Blog
tags:
  - CSS
  - Development
  - LESS
  - Tips &amp; Tricks
folder: /work/user-functions-in-less
thumbnail: ""
images: []
---

An elegant way to create user functions in the LESS CSS pre-processor.

Unless you are using LESS client-side, you can't define your own functions (similar to `max()` or `lighten()`) that return a value. As a reminder, [client-side usage](http://lesscss.org/usage/#using-less-in-the-browser-functions) works as follows:

```
less = {
  functions: {
    myfunc: function() {
      return new(less.tree.Dimension)(1);
    }
  }
};
```

Here's an elegant server-side solution that — while not giving you return values — does give us a close approximation of a user function in LESS:

```
@color: #f88;

/* LESS admits that their greyscale function doesn't
   respect relative lightness */

.bad_grayscale {
  original-color: @color;
  desaturated: desaturate(@color, 100%);
  greyscaled: greyscale(@color); // synonymous
}

/* so let's fix that! */

.greyscale(@color; @keyword: color) {
  @{keyword}: hsl(0, 0, luma(@color));
}

.usage_one {
  .greyscale(@color);
}

.usage_two {
  .greyscale(@color, background-color);
  .greyscale(#f00, border-color);
}
```

Will output:

```
.bad_grayscale {
  original-color: #ff8888;
  desaturated: #c3c3c3;
  greyscaled: #c3c3c3;
}
.usage_one {
  color: #a1a1a1;
}
.usage_two {
  background-color: #a1a1a1;
  border-color: #363636;
}
```

As you can see, we're using variable interpolation and default values on a function mixin to achieve a pretty flexible result. (You can [grab or fork this code as a Gist here](https://gist.github.com/nemoDreamer/a6fd615ad97f59e7b983).) Enjoy!
