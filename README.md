<h1 align="center">@ngnjs/libdata<br/><img src="https://img.shields.io/npm/v/@ngnjs/libdata?label=%40ngnjs%2Flibdata&logo=npm&style=social"/></h1>

While this JavaScript library is maintained primarily by and for NGN, it is a standalone "cross-runtime" library (will work without NGN).

The library consists of common functions for managing primitive and low level elements of JavaScript (objects, arrays, booleans, etc).

## Usage

See the [working examples](https://codepen.io/coreybutler/pen/OJNoPJX) on Codepen.

### Via CDN (Browser/Deno)

```javascript
import * as DATA from 'https://cdn.skypack.dev/@ngnjs/libdata'

console.log(DATA)
```

_Also available on JSDelivr._

### Node

`npm i @ngnjs/libdata -S`

```javascript
import * as DATA from '@ngnjs/libdata'
console.log(DATA)
```

# Features

<p class="description">
  The NGN libdata library is a standalone library containing common data manipulation functions. This is significantly more primitive than the NGN Data module. This library contains methods for performing operations to a single data item, whereas the NGN Data module focuses on data modeling, bulk storage, and querying (amongst others).
</p>
<h2>Constants</h2>
<table>
  <tr><th>Name</th><th>Description</th></tr>
  <tr><td>dedupe</td><td>Deduplicate an array.</td></tr>
  <tr><td>forceArray</td><td>Force a value into an array.</td></tr>
  <tr><td>forceBoolean</td><td>Force a value into a boolean.</td></tr>
  <tr><td>forceNumber</td><td>Force a value into a number.</td></tr>
  <tr><td>forceString</td><td>Force a value into a string.</td></tr>
  <tr><td>object</td><td>A collection of object management methods, including <code>all</code>, <code>any</code>, <code>exactly</code>, <code>require</code>, <code>extraneous</code>, <code>missing</code>, <code>mixin</code>, <code>serialize</code></td></tr>
  <tr><td>typeOf</td><td>Returns the data type of a value. This is more specific than the native `typeof` operator.</td></tr>
  <tr><td>nullIf</td><td>Returns <code>null</code> if the source value matches the provided value.</td></tr>
  <tr><td>coalesce</td><td>Returns the first non-null/defined value in a list of arguments.</td></tr>
  <tr><td>coalesceb</td><td>Same as <code>coalesce</code>, but ignores blank/empty strings.</td></tr>
  <tr><td>getPrimitive</td><td>Returns the primitive object/function of the specified type.</td></tr>
  <tr><td>AdvancedSet</td><td>This is a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set" target="blank">Set</a>, augmented with additonal methods: <code>isSuperSet</code>, <code>concat</code>, <code>intersection</code>, <code>except</code>, <code>diff</code>, and <code>equal</code></td></tr>
  <tr><td>GUID</td><td>Generate a globally unique identifier.</td></tr>
  <tr><td>UUID</td><td>Generate a universally unique identifier.</td></tr>
  <tr><td>NANOID</td><td>A very fast/efficient unique ID generator.</td></tr>
  <tr><td>checksum</td><td>Calculate the checksum of an object.</td></tr>
</table>
