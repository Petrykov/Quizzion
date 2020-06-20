# EsLint

## First checking - the most common errors

| error  | description   |  
|---|---|
| indent  |Expected indentation of 4 spaces but found 6|    
| space-before-function-paren  |  Missing space before function parentheses  |  
| key-spacing  |   Missing space before value for key 'quizId'  |    
|  space-before-blocks |  Missing space before opening brace    |  
| quotes  |  Strings must use singlequote  |   
| semi  | Extra semicolon   | 
|  spaced-comment |  Expected space or tab after '//' in comment |  
|   | Parsing error: Unexpected token import  |  
| no-unused-vars  |'ca' is defined but never used     |  
|  object-curly-spacing  | A space is required after '{'    |   
|   object-curly-spacing |  A space is required before '}'  |   
| padded-blocks  |  Block must not be padded by blank lines  |   
|no-async-promise-executor   | Promise executor functions should not be async   |   
|prefer-const   | 'newAnswer' is never reassigned. Use 'const' instead   |   
|keyword-spacing   | Expected space(s) after "try"  ;  Expected space(s) before "catch"   | 
| no-multiple-empty-lines  |  More than 1 blank line not allowed    |  
|   space-infix-ops | Operator '<' must be spaced  |  
|   | Expected space(s) after "if" keyword-spacing  | 
|   | Expected space or tab after // in comment    spaced-comment  |  
| space-in-parens  | There should be no space after this paren   | 
|import/first|Import in body of module; reorder to top  |  
|import/no-duplicates     | imported multiple times  |    
|  comma-spacing | A space is required after ','    |   
|   comma-dangle |  Unexpected trailing comma   |  
|dot-notation   |     ["getFullQuizPackage"] is better written in dot notation   |
|   semi-spacing |   Unexpected whitespace before semicolon  |   
| no-dupe-keys|  Duplicate key 'animations'  |


## Example of incorrect - correct syntex

1. Indent - 4-space(one tab) indentation

 ```sh 
 if (a) {
   b=c;
   function foo(d) {
     e=f;
   }
}
 ```

 ```sh
 if (a) {
    b=c;
    function foo(d) {
        e=f;
    }
}
```
2. space-before-function-paren -
```sh
function withoutSpace(x) {
    // ...
}
```
```sh
function withSpace (x) {
    // ...
}
```

3. key-spacing

```sh
var obj = { "foo": 42 };
```

```sh
var obj = { "foo" : 42 };;
```
4. space-before-blocks - block has at least one preceding space
```sh
if (a){
    b(); ->5 spaces
}
```

```sh
if (a) {
    b(); ->4 spaces
}
```

5. quotes
```sh
var double = "double"; ->280errors
var single = 'single'; ->90errors
```
6. semi

```sh
var name = "ESLint"
var website = "eslint.org";
```

7. spaced-comment
```sh
//This is a comment
// This is a comment
```
8. capitalized-comments
```sh
// this is a comment
// This is a comment
```

9.  object-curly-spacing - before/after
```sh
var obj = { 'foo': 'bar' };
var obj = {'foo': 'bar'};
```

10.  padded-blocks 
```sh
if (a) {
    b();
}

if (a) {

    b();

}

```
11. keyword-spacing

```sh
if (foo) {
    //...
}else if (bar) {
    //...
}else {
    //...
}

if (foo) {
    //...
} else if (bar) {
    //...
} else {
    //...
}

```

12. no-multiple-empty-lines - default -max 2 lines between
```sh
var foo = 5;



var bar = 3;
```

```sh
var foo = 5;

var bar = 3;
```
13. space-infix-ops - before/after
```sh
a+b
const a={b:1};


a + b
const a = {b:1};
```

14. space-in-parens - before/after
```sh
foo( 'bar' );
var x = ( 1 + 2 ) * 3;

foo('bar');
var x = (1 + 2) * 3;
```

15. comma-spacing 
```sh
var foo = 1, bar = 2;
var foo = 1 ,bar = 2;
```

16. comma-dangle
```sh
var foo = {
    bar: "baz",
    qux: "quux",
};

var foo = {
    bar: "baz",
    qux: "quux"
};
```
17. semi-spacing - before/after
```sh
var foo ;
var foo;var bar;

var foo;
var foo; var bar;
```

18. no-lonely-if
```sh
if (foo) {
    // ...
} else {
    if (bar) {
        // ...
    }
}

if (foo) {
    // ...
} else if (bar) {
    // ...
}

```

19. no-whitespace-before-property
```sh
foo. bar

foo.bar
```

20. eqeqeq

```sh
a == b
foo == true
bananas != 1

a === b
foo === true
bananas !== 1

```

### Styling options, which cannot be fixed automatic 
| error  | example of the error  |  
|---|---|
|max-lines-per-function |Function has too many lines (206). Maximum allowed is 20 |
| camelcase |Identifier 'short_name' is not in camel case  |
|no-unused-vars |'uuidv4' is defined but never used   |
|  prefer-const |'outObject' is never reassigned. Use 'const' instead   |
|no-undef |'e' is not defined |

### Requirements from Parantion:
- Naming conventions:
    - Folders: snake_case
    - Vue components and classes: PascalCase
    - Proporties, methods: pascalCase
    - CSS: pascal-case

- Lenght of method: max 20 lines
- Props - with a required and a default value.


