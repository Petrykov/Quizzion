# ESLint

## Why ESLint?

#### Find Problems

ESLint provides quick code analyse, generates a report with problems specification. ESLint can run as a part of continuous integration pipeline.

#### Fix Auhomatically

Most of the problems can be fixed automatically with only one command. Additionally ESLint is syntax-aware. After fixing, the code is more consistent, there is less bugs.


#### Customize
ESLint is a very helpful tool. When the whole team is working on a particular project and the client want to have structured code. With ESLint it is really easy to provide code styling. 


## Three levels of errors
- "off" - turn off the rule
- "warn" - turn on the rule as warning
- "error" - turn on the rule as an error - exit code will be 1

In this project for all the rules, which can be fixed automatically, the error level is 'warn'. Rules, which cannot be fixed automatically are marked as 'error'.


## All problems after running ESLint with standard styling

Running Eslint with standard styling was necessary to find and anylize problems, which can be included later in the 'rules'

| problem  | description   |  
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
|camelcase|Identifier 'quiz_id' is not in camel case.|
|handle-callback-err|Expected error to be handled.|
|no-throw-literal|Expected an error object to be thrown.|

## Example of correct syntex for rules

1. Indent - 2-space(one tab) indentation

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


3. key-spacing

```sh
var obj = { "foo": 42 };
```

4. space-before-blocks - block has at least one preceding space


```sh
if (a) {
    b(); 
}
```

5. quotes
```sh

var single = 'single'; 
```
6. semi

```sh
var name = "ESLint"
var website = "eslint.org";
```

7. spaced-comment
```sh
//This is a comment

```
8. camelcase
```sh
var myFavoriteColor   = "#112C85";

```

9.  object-curly-spacing - before/after
```sh
var obj = {'foo': 'bar'};
```

10.  padded-blocks 
```sh
if (a) {
    b();
}

```
11. keyword-spacing

```sh

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
13. space-infix-ops - before/after
```sh

a + b
const a = {b:1};
```

14. space-in-parens - before/after
```sh

foo('bar');
var x = (1 + 2) * 3;
```

15. comma-spacing 
```sh
var foo = 1, bar = 2;
```

16. comma-dangle
```sh
var foo = {
    bar: "baz",
    qux: "quux"
};
```
17. semi-spacing - before/after
```sh
var foo;
var foo; var bar;
```

18. no-lonely-if
```sh

if (foo) {
    // ...
} else if (bar) {
    // ...
}

```

19. no-whitespace-before-property
```sh

foo.bar
```

20. eqeqeq

```sh
a == b
foo == true
bananas != 1

```

### Styling options, which cannot be fixed automatic 
| problem  | example of the problem  |  
|---|---|
|max-lines-per-function |Function has too many lines (26). Maximum allowed is 20 |
| camelcase |Identifier 'short_name' is not in camel case  |
|no-unused-vars |'uuidv4' is defined but never used   |
|  prefer-const |'outObject' is never reassigned. Use 'const' instead   |
|no-undef |'e' is not defined |
|no-throw-literal|Expected an error object to be thrown.|
|eqeqeq|Expected '===' and instead saw '=='.|
|handle-callback-err|Expected error to be handled.|


### Rules which are off
| problem  | 
|---|
| capitalized-comments | 
| dot-notation| 
|no-async-promise-executor|