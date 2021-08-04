# Testing Node applications
We have completely neglected one essential area of software development, and that is automated testing.

Let's start our testing journey by looking at unit tests. The logic of our application is so simple, that there is not much that makes sense to test with unit tests. Let's create a new file utils/for_testing.js and write a couple of simple functions that we can use for test writing practice:
```
const palindrome = (string) => {
  return string
    .split('')
    .reverse()
    .join('')
}

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.reduce(reducer, 0) / array.length
}

module.exports = {
  palindrome,
  average,
}
```
The average function uses the array reduce method. If the method is not familiar to you yet, then now is a good time to watch the first three videos from the Functional Javascript series on Youtube.
There are many different testing libraries or test runners available for JavaScript. In this course we will be using a testing library developed and used internally by Facebook called jest, that resembles the previous king of JavaScript testing libraries Mocha.

Jest is a natural choice for this course, as it works well for testing backends, and it shines when it comes to testing React applications.

Windows users: Jest may not work if the path of the project directory contains a directory that has spaces in its name.
Since tests are only executed during the development of our application, we will install jest as a development dependency with the command:
```
npm install --save-dev jest
```
Let's define the npm script test to execute tests with Jest and to report about the test execution with the verbose style:
```
{
  //...
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build:ui": "rm -rf build && cd ../../../2/luento/notes && npm run build && cp -r build ../../../3/luento/notes-backend",
    "deploy": "git push heroku master",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push && npm run deploy",
    "logs:prod": "heroku logs --tail",
    "lint": "eslint .",
    "test": "jest --verbose"
  },
  //...
}
```
Jest requires one to specify that the execution environment is Node. This can be done by adding the following to the end of package.json:
```
{
 //...
 "jest": {
   "testEnvironment": "node"
 }
}
```
Alternatively, Jest can look for a configuration file with the default name jest.config.js, where we can define the execution environment like this:
```
module.exports = {
  testEnvironment: 'node',
};
```
Let's create a separate directory for our tests called tests and create a new file called palindrome.test.js with the following contents:
```
const palindrome = require('../utils/for_testing').palindrome

test('palindrome of a', () => {
  const result = palindrome('a')

  expect(result).toBe('a')
})

test('palindrome of react', () => {
  const result = palindrome('react')

  expect(result).toBe('tcaer')
})

test('palindrome of releveler', () => {
  const result = palindrome('releveler')

  expect(result).toBe('releveler')
})
```
The ESLint configuration we added to the project in the previous part complains about the test and expect commands in our test file, since the configuration does not allow globals. Let's get rid of the complaints by adding "jest": true to the env property in the .eslintrc.js file.
```
module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true,
    'jest': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12
  },
  "rules": {
    // ...
  },
}
```
In the first row, the test file imports the function to be tested and assigns it to a variable called palindrome:
```
const palindrome = require('../utils/for_testing').palindrome
```
Individual test cases are defined with the test function. The first parameter of the function is the test description as a string. The second parameter is a function, that defines the functionality for the test case. The functionality for the second test case looks like this:
```
() => {
  const result = palindrome('react')

  expect(result).toBe('tcaer')
}
```
First we execute the code to be tested, meaning that we generate a palindrome for the string react. Next we verify the results with the expect function. Expect wraps the resulting value into an object that offers a collection of matcher functions, that can be used for verifying the correctness of the result. Since in this test case we are comparing two strings, we can use the toBe matcher.

As expected, all of the tests pass:

**fullstack content(image)**

Jest expects by default that the names of test files contain .test. In this course, we will follow the convention of naming our tests files with the extension .test.js.

Jest has excellent error messages, let's break the test to demonstrate this:
```
test('palindrom of react', () => {
  const result = palindrome('react')

  expect(result).toBe('tkaer')
})
```
Running the tests above results in the following error message:

**fullstack content(image)**

Let's add a few tests for the average function, into a new file tests/average.test.js.
```
const average = require('../utils/for_testing').average

describe('average', () => {
  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})
```

The test reveals that the function does not work correctly with an empty array (this is because in JavaScript dividing by zero results in NaN):

**fullstack content(image)**
Fixing the function is quite easy:
```
const average = array => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.length === 0
    ? 0
    : array.reduce(reducer, 0) / array.length
}
```
If the length of the array is 0 then we return 0, and in all other cases we use the reduce method to calculate the average.

There are a few things to notice about the tests that we just wrote. We defined a describe block around the tests that was given the name average:
```
describe('average', () => {
  // tests
})
```
Describe blocks can be used for grouping tests into logical collections. The test output of Jest also uses the name of the describe block:

**fullstack content(image)**

As we will see later on describe blocks are necessary when we want to run some shared setup or teardown operations for a group of tests.

Another thing to notice is that we wrote the tests in quite a compact way, without assigning the output of the function being tested to a variable:
```
test('of empty array is zero', () => {
  expect(average([])).toBe(0)
})
```