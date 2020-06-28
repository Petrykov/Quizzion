# Testing VueJS

This document will contain all the research about testing and it will describe our methodology. Over the coming sprints more details about testing such as implementation details and execution commands will be added.

[TOC]

## Why write tests?

If there are no tests, you would have to manually go into the browser, or install an app a mobile device and test out all of the functionalities of your application. That is not very efficient, and it becomes harder and more time consuming as your application grows in size and complexity. <br>
Good tests also document code because tests are basically specifications for how the code behaves.

## Types of tests

A quick summary of a couple of relevant types of tests.

#### Unit tests

Unit tests call a piece of code (like a function) and report back whether that code returned the expected output. Unit tests are not about styling, just about output, like returned data or rendered components. Unit testing is a form of 'white box' testing, this contributes to the fact that errors/bugs are easily found and debugged. Potential candidates for writing/running these tests are Jest and Mocha.

#### Integration tests

Integration tests check whether different modules of your application are working together. These tests are so called 'black box' tests, this means that the inner functionality is not tested, but treated as a magic black box that should give certain output based on set input.

#### End to end tests

E2e tests assert your component's public interface, and jest like integration tests, they treat its internals as a black box. E2e tests are slow, this is why there usually is not a lot of them.

#### Snapshot tests

Snapshots safeguard against unintended changes in rendered components. Differences in styling or rendered components will be caught and the developer will be prompted to decide if the changes were intentional or not.


## Different parts

The main parts we can test are the Vuex store and the individual Vue components. <br>
The store consists of State, Getters, Mutations and Actions. All of these, except State, are functions, so we can test them effectively. <br>
Individual components can be tested on whether they display correctly and whether they behave correctly.


## Different approaches

Here we will quickly go over the different approach you can have to testing.


#### Don't test
Writing and maintaining tests is time consuming and thus, expensive. This is why for some projects it is not cost/time efficient.

### Testing Vuex

Because a Vuex store is basically just a collection of functions, it makes the most sense to write Unit tests for this part.

#### Test store parts separately

We can test each part separately, so each individual Mutation, Action or Getter is tested in isolation. A benefit of doing this is that the tests are very fine-grained and it's easy to see why something fails. A downside of this is that the tests are brittle. A small change means you rewrite many of your tests.<br>
The following is an example of how you could test an action, and the mutation that this action commits.

```js
import mutations from './mutations'
import actions from './actions'
import { fetchData } from '../api'

test('setValue mutates state.value' () => {
    const state = {
        value: ''
    }
    const value = 'HelloWorld'
    mutations.setValue(state, value)
    expect(state.value).toBe('HelloWorld')
})

jest.mock('../api')

test('fetchValue commits value returned by api call', async () => {
    const value = 'SomeVal'
    fetchData.mockResolvedValue(value)
    const commit = jest.fn()
    await actions.fetchValue({ commit })
    expect(commit).toHaveBeenCalledWith(
        'setValue', value
    )
})

```

#### Test store instance
Testing a store instance means that you dispatch an action, and check whether the state is updated. Without looking at the internals of the action or mutation. Benefits of doing this are: you get a lot more coverage for less tests; the insides of the store may change and it won't affect your tests; actions that dispatch other actions or multiple mutations are tested easier.

But it is not all good, it is harder to find out what is wrong if a test fails and it may also be more difficult to maintain the tests as the store grows. <br>
These tests could be seen as both Unit or Integration tests.
There are a few things to keep in mind. The creation of a store instance should be done in a secure way so it does not affect your global Vue instance. This can cause problems in later tests, and it's why we will need to use a 'localVue' for each spec.

```js
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { fetchData } from '../api'
import { initialState } from '../store'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('../api')

test('updates value', async () => {
    const value = 'randomVal'
    fetchData.mockResolvedValue(value)

    const store = new Vuex.Store(initialState())

    await store.dispatch('fetchValue')

    expect(store.state.value).toBe('randomVal')
})
```
[Testing Vuex reference (YouTube)](https://www.youtube.com/watch?v=gbr0tPRqChM)

### Testing Vue (SF)Components

#### Unit

Components can be unit tested for functionality with different forms of input and output.

##### Input

- User action
- Props
- Vuex state

##### Output

- Rendered output
- Vue event calls
- Function calls

Jest examples

```js
test('component does not render when not passed visible prop', () => {
    const wrapper = mount(Component)
    expect(wrapper.isEmpty()).toBe(true)
})

test('component renders when passed visible prop as true', () => {
    const wrapper = mount(Component, {
        propsData: {
            visible: true
        }
    })
    expect(wrapper.isEmpty()).toBe(false)
})

test('click handler is called when button is clicked', () => {
    const handler = jest.fn()
    const wrapper = mount(Component, {
        propsData: {
            visible: true
            handler
        }
    })
    wrapper.find('button').trigger('click')
    expect(handler).toHaveBeenCalled()
})
```


#### Snapshot

Components can also be tested for styling with Snapshot tests. These tests match the rendered output to a previously made snapshot, and catches any differences.

Jest example:
```js
test('renders correctly', () => {
const wrapper = mount(Component, {
        propsData: {
            visible: true
        }
    })
    expect(wrapper.html()).toMatchSnapshot()
})

```


#### End to end

The final way to test Vue components is to use end to end (e2e) tests. These are functional tests that can test the entire application. They simulate how users interact with your components.

Cypress example:

```js
it('adds new item when button is clicked' () => {
cy.visit('http://localhost:8080')

cy.get('#new-item').type('HelloWorld')

cy.get('button').click()

cy.get('.items').contains('HelloWorld')
})
```
[Testing Vue components reference (YouTube)](https://www.youtube.com/watch?v=LxXsGNXsMo8)

## Our tests

There are many different tests we could do, and there are many different test runners (or, as quasar calls them, harnesses) that we could use. So in this paragraph we will describe what we will be using and why.

When it comes to Vuex, the best approach is testing instances, because this is how the app interacts with the store. We also get more coverage for less tests. These tests will be performed with Jest unit tests, we chose Jest because it is the easiest to configure, as the Quasar CLI takes care of almost everything.

The Vue components are best tested with Unit, Snapshot and e2e tests. A rule of thumb which is mentioned in many places is that there should be 10% e2e tests, 30% snapshot tests and 60% Unit tests, following the so called "Testing pyramid of VueJS". To perform the Unit and Snapshot tests, we will make use of the Jest test runner. To run e2e tests we will start by using Cypress, as this is something we have used in courses like Web Technology and Development Tools.

## Sources

For more information, check out these references. <br>



- Yerburgh, E. (2018). [Testing Vue.js Applications](https://livebook.manning.com/book/testing-vue-js-applications/) (Vol. 2018). United States, New York: Manning Publications.
- https://vue-test-utils.vuejs.org/
- https://vue-test-utils.vuejs.org/guides/using-with-vuex.html
- https://vuex.vuejs.org/guide/testing.html
- https://lmiller1990.github.io/vue-testing-handbook/
- https://www.youtube.com/watch?v=LxXsGNXsMo8 testing vue components (Edd Yerburgh @ VueJS Amserdam)
- https://www.youtube.com/watch?v=gbr0tPRqChM testing vuex (Edd Yerburgh @ InfoQ Brasil)
- https://www.dev-tips-and-tricks.com/mock-vuex-in-vue-unit-tests

Notice many back to 'Edd Yerburgh', he is the main author of the official `@vue/test-utils` package, and he has spoken/written a lot about this.
