A directive is a template token that tells Vue how we want to handle our DOM.
`v-bind` directive is used for binding element attributes
usage: v-bind:title.

`v-on` directive is to attach event listeners that invoke methods on our instances.

`v-model` directive makes two-way binding between form input and app state a breeze.

vue style guide
nuxt 3 style guide
vscode
volar
eslint
vue scholl course about vscode
typescript
componentNames
  * App*
  * The*
Nuxt patterns?
testing??? Vites

## What is Composable?

A Vue composable is a function that leverages Vue's Composition API to encapsulate and reuse stateful logic.

* your function uses other composables
* your function uses lifecycle hooks
* your function has stateful logic (usually a ref)

## Where Composables can be used?

* in the `<script setup>` function on the top level
* other composables
* lifecycle hooks
