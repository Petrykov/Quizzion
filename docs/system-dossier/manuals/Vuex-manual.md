# Vuex manual

[TOC]

### Introduction

The Vuex chapter starts with an introduction on what Vuex is, and a basic example/overview of the different elements in a Vuex store.

Vuex is a statement manager, basically a store for all the data in your frontend. It is especially useful when you want to use this data, in it's raw or modified form, in multiple components. So for example:

- Display username in a header and a profile page.
- Display list of quizzes, and let users edit them on another page.



This store has 4 components: `State, Getters, Mutations and Actions`. Because we are making a pretty big app (and because Parantion wanted us to), we will split up the store in different modules. Each module will have their own State, Getters etc. These modules can still get very large, so we are also going to split up all the components to different files (`module_name/state.js`, `module_name/getters.js` etc.).



### Example store

This will be a simple example, explaining the basic idea of a store.

Imagine some app where the only purpose is to display some list of `items`. We have a backend that retrieves items from a database, it listens to `GET http://thebackend.nl/items`.



##### State

The state is pretty much one big object where all the data that is displayed in the frontend will live. However, when we boot up the app it will not have any data yet, it will need to ask the backend. So for now, just keep a placeholder (or empty field).

``` js
//state.js

const state = {
    items: []
}

export default items
```

##### Mutations

Mutations are the only functions that are ever allowed to make changes to the state. This is why Vuex is so handy, you can debug it easily. Mutations receive the state object as the first parameter(, Vue does this automatically,) and a payload object as the second. This payload will contain whatever you 'call' the mutation with, it's not possible to have multiple payload parameters, you will need to combine everything in one object and then deconstruct it in the mutation.

A mutation is not 'called' like you would any other function, instead of 'calling', you 'commit' a mutation. This is important to remember.

```js
//mutations.js

export function setItems(state, items) {
    state.items = items
}
```

One rule for mutations is that they can not be async. So you are not allowed to make api requests in the mutations. This rule makes it much easier to debug and know what is going on.

But... then how do we do api calls?

##### Actions

Actions can be used to make api calls, they can be async. Actually, they are almost always async.  The parameters can be a bit confusing. By default, the action will get a `context` as the first parameter, this context has everything that the store has, so:

-  ` context.state `  
- `context.getters`
- `context.commit` (For mutations)
- `context.dispatch` (For other actions)

Usually you don't need the whole context, so you can de-structure the object right away to fit your needs. Often you will only need to commit a mutation (like in this example).

Just like with mutations, you don't 'call' an action. However in this case it is not called 'committing', but 'dispatching' an action.

````js
//actions.js

export function fetchItems({ commit }) {
    const response = await axios.get('http://thebackend.nl/items');
	commit('setItems', response.data);
}
````

As you can see we don't call `setItems()` directly, but instead we call `commit()` and pass the name of our mutation and the payload as parameters.

It is important to note that actions can be written in many different ways, the example above is one of the most simple ways, later on in this document we will go over the way we chose to implement actions.

##### Getters

Getters are the most simple functions in Vuex. They can access state (& other getters) in their  parameters, and their purpose is to compute some extra data based on the current state, similarly to computed properties in Vue components. Getters can not be called with a payload, but you can give extra arguments by using the 'currying' principle.

````js
//getters.js

//good, you should use a getter like this.
export function getAmountOfItems(state) {
    return state.items.length
}

//getter with extra param (You would call it as 'getItemByID(id)', but what is really happening is 'getItemByID(state)(id)', vue handles this.)
export function getItemByID(state) {
    return function (id) {
        return state.items.find(item => item.id === id)
    }
}


//bad, you should not use a getter for this.
export function getItems(state) {
    return state.items
}
````



##### Tying them together

To start using the store, we will need to tie the 4 components together in an index.js file, and then in the top level we will need to import this module (and others).

````js
//index.js in each module

import state from './state.js'
import * as getters from './getters.js'
import * as mutations from './mutations.js'
import * as actions from './actions.js'

export default {
    namespaced: true,
    state, 
    getters, 
    mutations, 
    actions
}

//index.js in the top level store folder
import itemModule from 'item_module'

...

	modules: itemModule, ...
    
...
````



### Quizzion store

In the previous paragraphs we have gone over the basic (standard) Vuex principles. However, there are a lot of different ways to write the same store. In this chapter we will go over some choices that we made and the modules we use.

#### Modules

We are using 3 different modules to house all our functionality. We have a user module, a quizzes module and a results module. Each module is name spaced.

 They are structured in the following way:

```bash
─ store
    ├── index.js                    # where we assemble and export the store
    ├── enums.js                    # where we store js enums
    │  
    ├── user                        # user module
    │ 	├── index.js                # where we assemble and export the module
 	│  	├── actions.js              # user specific actions
 	│  	├── mutations.js            # user specific mutations
   	│  	├── getters.js              # user specific getters
    │  	└── state.js                # user specific state
    │  
    └── quizzes		   				# quizzes module
     	├── index.js            	# where we assemble and export the module
 	  	├── actions.js		    	# quizzes specific actions
 	  	├── mutations.js        	# quizzes specific mutations
   	  	├── getters.js		    	# quizzes specific getters
      	├── state.js  				# quizzes specific state
    	│
        └── results		   			# results module
     		├── index.js        	# where we assemble and export the module
	 	  	├── actions.js			# results specific actions
	 	  	├── mutations.js    	# results specific mutations
 	  	  	├── getters.js			# results specific getters
  	    	└── state.js  			# results specific state
```

As you can see, the results module is a sub module in the quizzes module.

##### User

The user module holds all the user information, such as display name and their role. It also handles login/logout for moderators, and the joining of quizzes for participants.

This module is not that large, but it serves a key purpose in our app, which is retrieving and storing an access token. With this token, a moderator is able to do all CRUD operations for quizzes, questions and answers. The participants also need a token, in order to start a quiz and store their results in the database.

##### Quizzes

The quizzes module is by far the largest, and most complicated module in our store. It holds all the quizzes, questions and answers that are being created, updated or deleted by the moderator or being served to the respondents in order to test their knowledge in a quiz. We could have split these up into multiple modules, but with our data model it made more sense to us to keep it in one module. For example, each quiz contains a collection of questions. To prevent a lot of nested objects, we just reference these questions by their ID.  If the questions were kept in another module, we would need to cross over the borders of these modules all the time, in order to keep the data synchronised. This also applies to questions having a collection of answers.

Because we want to give the user a lot of customization for each object, we need many actions and mutations. To avoid this, we could split up the actions and mutations into multiple files.  Like this:

````bash
─ quizzes		   						# quizzes module
     	├── index.js            		# where we assemble and export the module
     	├── getters.js		    		# quizzes specific getters
      	├── state.js  					# quizzes specific state
 	  	├── actions			    		
 	  	│	├── index.js				# where we combine and export all actions 
 	  	│ 	├── quizzes-actions.js      # quizzes specific actions
 		│	├── questions-actions.js	# question specific actions
 		│  	└── answers-actions.js      # answers specific actions
 	  	│
 	  	└── mutations			    		
 	  		├── index.js				# where we combine and export all mutations 
 	  	 	├── quizzes-mutations.js    # quizzes specific mutations
 			├── questions-mutations.js	# question specific mutations
 		  	└── answers-mutations.js    # answers specific mutations
````

The drawback is that there will be a lot of files, and it can be confusing or impractical to get started. However this is probably better than having very big files.

##### Results

The results module is nested inside the quizzes module. Initially this made sense, since we would link the chosen answer ID to the full answer object in the parent module. They would have a close relation. However, in the end we took a different approach, for which we don't necessarily need the modules to be nested. We decided not to change it.

The purpose of the results module is to fetch and store some results after a quiz is done. For both the moderator and the respondent.



#### Choices

There are many ways to approach a Vuex store, some of these choices were already made by Parantion, such as the modular structure where all actions, mutations, getters and states their their own file. Some things were still to be decided, and in this paragraph we will go over those.

##### Top-level index.js

The way you export the store instance can change based on your preference and use case. In our application, we have chosen to extract the configuration of the store into a separate function. Calling this function gives us the full configuration necessary to initialize the store.

This is beneficial for testing purposes. We can simply import this `createStoreConfig` function, and create a new store for each test. This way the tests won't affect each other. 

The store export for the frontend application now looks like:

````js
const store = new Vuex.Store(createStoreConfig());

export default store;
````

##### Mutations

Our mutations are very basic. We export each mutation individually, and use normal function declaration syntax. There is a way to use constants as 'mutation types', which is pretty, but it prevents us from exporting each one individually and it does not bring any real benefits apart from preventing spelling mistakes.

So out of these options, we chose approach 1: 

````js
// Approach 1
export function deleteQuiz(state, deletedId) {
  state.quizzes = state.quizzes.filter(quiz => quiz.id !== deletedId);
}

...

// Approach 2
import * as types from '../mutation-types.js'

const mutations = {
    [types.DELETE_QUIZ]: (state, deletedId) => {
        state.quizzes = state.quizzes.filter(quiz => quiz.id !== deletedId);
    },
    
    ...
}
````

##### Getters

The choice we made for getters is similar to the mutations, it really only matters for the syntax. One option is to use arrow functions and store all the getters in a single object, the other option is to export all of the getters individually, and also using standard function declaration syntax.

Here are the differences:

````js
// Approach 1
export function getQuizById(state) {
  return function (id) {
    return state.quizzes.find(quiz => quiz.id === id);
  }
}

...

// Approach 2
const getters = {
    getQuizById: state => id => state.quizzes.find(quiz => quiz.id === id),
    ...
}
````

They do exactly the same thing, and even though the second approach would take up less lines of code, we believe that it will become difficult to maintain once you have 10+ getters or so. That and the fact we export each function for the other store components meant that we chose for approach 1.

##### Actions

Actions leave the most room for personalisation. We had 2 different approaches that we liked. Here is an example with the login action to show the difference:

````js
// Approach 1 - actions.js
export async function login({commit}, credentials) {
  try {
    const response = await api.login(credentials);
    commit('login', response.data);
  } catch (error) {
    console.log(error);
  }
}

...

// Approach 2 - actions.js
export function login({commit}, credentials){
  
  api.login(
    credentials,
    (response) => commit(login, response.data),
    (error) => console.log(error)
  );
}

...
````

In approach 1, we use async/await in combination with try/catch.

In approach 2, we pass callback functions for a positive and negative response from the API.

We went for the first approach, because it seemed easier to get started with and more logical. Later on we decided to also return promises, so the actions ended up looking like this:

````js
export function login({commit, dispatch}, credentials) {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.login(credentials);

      commit('login', response.data);
      resolve();
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
````

The reason for returning promises, is that we can show loading spinners during a request or do things only *after* a request is resolved. One application of this, is regarding the login. After a user pressed 'Log in', they will see a loader with the text 'Logging in...'. When the user is logged in, we automatically fetch all data linked to the account. Once again we show a spinner while the request is being processed, this time with the text 'Fetching data...'. 

In code that looks like this:

````js
login() {
        this.$q.loading.show({message: 'Logging in...'});
        this.$store.dispatch('user/login', {username: this.username, 													password: this.password})
          .then(() => {
            this.$q.loading.show({message: 'Fetching data...'});
            this.$store.dispatch('quizzes/initialiseAll')
              .then(() => {
                this.$q.loading.hide();
                this.$router.push('/'); // Send user to the homescreen
              }).catch(() => {
              this.$q.loading.hide();
              this.triggerNotification('Could not reach the server. Contact 											0570-parantion123')
            });
          }).catch(e => {
          this.$q.loading.hide();
          this.triggerNotification('Login failed, make sure you use the 												right credentials!')
        })
      }
````

We tried to keep the actions consistent, but there might be slight differences depending on the preference of the programmer that wrote that action.

##### API calls

We extracted the actual API calls into another file, we don't have to do that but it is helpful for testing and a recommended practice. With the different approaches to actions, described above, we also had  different ways of implementing API calls. Choosing for the first approach with actions also means we chose for the first approach in API calls.

Here is what both of them look like:

````js
// Approach 1 - api.js
export function login(credentials) {
  return axios.post(`${apiUrl}/user/login`, {
    username: credentials.username,
    password: md5(credentials.password)
  });
}

...


// Approach 2 - api.js
export function login(credentials, cb, errorCb) {
  axios.post(`${apiUrl}/user/login`, {
    username: credentials.username,
    password: md5(credentials.password)
  })
  .then(cb)
  .catch(errorCb)
}

...
````

The difference is that we simply return the axios promise that can be 'awaited' in approach 1, while we execute the callback or error callback in approach 2.

##### Accessing the store in the frontend

After building (parts of) the store, you also want to be able to actually use it. You want to access the data in the store, from any frontend component that needs it. There are different ways to do this:

1. Using `this.$store`
2. Using Vuex Helpers (mappers)

The first method is the easiest way to access the store, but for components that use multiple properties of the store, it will become repetitive. The second method prevents this, but it can be a bit more verbose.

Here is an example of how you would access a getter or an action with both approaches:

````js
// Approach 1
<template>
    
<h3 class="title">{{ $store.getters['quizzes/getQuizById'](quizId) }}</h3>

<q-btn @click="$store.dispatch('quizzes/deleteQuiz', quizId)"> DELETE </q-btn>

</template>


// Approach 2
<template>
    
<h3 class="title">{{ getQuizById(quizId) }}</h3>

<q-btn @click="deleteQuiz(quizId)"> DELETE </q-btn>

</template>


<script>
import { mapGetters, mapActions } from 'vuex'
    
...

	computed: {
    ...mapGetters('quizzes', ["getQuizById"])
    },
    methods: {
        ...mapActions('quizzes', ["deleteQuiz"])
    }

...    

</script>

````

The simplicity and freedom that approach 1 brings was enough for us to choose that option. The second approach is nice, but it adds a lot of extra (verbose and unreadable) code to make mistakes with, especially when you use name spaced modules.

