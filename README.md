## fuzzymatch

A fork of https://github.com/rapportive-oss/jquery-fuzzymatch

## The original description:

fuzzymatch implements a fuzzy-string-matching algorithm inspired by QuickSilver and Command-T in javascript.

It is designed for use as part of an autocompleter, where a finite list of possible strings are to be matched against the few characters that the user has typed.

It offers some improvement over existing prefix-based matches, though it is careful to ensure that if a prefix match has been typed, it will be shown first.

## Why fork?

The original library does a very good job, but there are a few tweaks that were needed for it to be more useful in a modern JS environment.

* removed dependency on jQuery - it's not a jQuery plugin anymore, but simply a function
* in fact, no dependencies
* converted into an AMD + Node module for use in browser and node
* package.json and bower.json
* removed escaped HTML feature - trying to do only one thing