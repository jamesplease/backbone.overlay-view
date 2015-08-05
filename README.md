# backbone.overlay-view

A view that covers your webpage, and is closed when clicked. It's useful as a background for
dropdowns, modals, etc.

[![Travis build status](http://img.shields.io/travis/jmeas/backbone.overlay-view.svg?style=flat)](https://travis-ci.org/jmeas/backbone.overlay-view)
[![Code Climate](https://codeclimate.com/github/jmeas/backbone.overlay-view/badges/gpa.svg)](https://codeclimate.com/github/jmeas/backbone.overlay-view)
[![Test Coverage](https://codeclimate.com/github/jmeas/backbone.overlay-view/badges/coverage.svg)](https://codeclimate.com/github/jmeas/backbone.overlay-view)
[![Dependency Status](https://david-dm.org/jmeas/backbone.overlay-view.svg)](https://david-dm.org/jmeas/backbone.overlay-view)
[![devDependency Status](https://david-dm.org/jmeas/backbone.overlay-view/dev-status.svg)](https://david-dm.org/jmeas/backbone.overlay-view#info=devDependencies)

### Installation

The easiest way to install this is through `npm` or `bower`.

```js
npm install backbone.overlay-view
bower install backbone.overlay-view
```

Be sure to include both the JS and CSS files in your application.

### Motivation

A common UI feature in client side applications is an element that blocks the
user from interacting with the rest of the application. This is typically used when
the user opens, say, a custom dropdown menu or a modal.

Rather than associating a new overlay with each dropdown, I like to use a single view
that any other view in my app can utilize.

### Basic Usage

```js
// Create a single overlayView for your entire app
var overlayView = new Backbone.OverlayView();

// Display it
overlayView.display();

// When the user clicks on it, it will hide itself and emit the `hide` event.
// You can use that event to close the modal / dropdown / do whatever.
```

### Child Views

Using nested views within the OverlayView is common practice. I recommend that you
stick to existing DOM APIs to append another View's element into the OverlayView's
element. Then, when the OverlayView is hidden, you can destroy the nested view.

This might look something like:

```js
// Attach the dropdown element to the overlay view
overlayView.$el.append(dropdownView.$el);

// Destroy the dropdown when the overlayView is hidden
overlayView.once('hide', dropdownView.destroy.bind(dropdownView));

// Show the overlay view
overlayView.display();

// Click the overlay to destroy the dropdown.
```

### Methods

##### `isDisplaying()`

Returns a Boolean indicating whether or not the view is currently displaying. By
default, the view is not displaying.

##### `display()`

Display the view, if it isn't already displayed, by removing the
`.overlay-view-hidden` class.

Returns the view instance.

##### `hide()`

Hide the view, if it's being displayed, by adding the `.overlay-view-hidden`
class.

Returns the view instance.

### Events

##### `before:display`

Triggered just before the view is displayed.

##### `display`

Triggered just after the view is displayed.

##### `before:hide`

Triggered jst before the view is hidden.

##### `hide`

Triggered just after the view is hidden.

##### `click`

Triggered when the user clicks the view itself, but not a child of the view. It's
generally safer to use the `hide` event to track when the overlay closes, because it
may not always close due to a click (for instance, when the user completes the task
offered by the modal / dropdown).

##### `click:child`

Triggered when the user clicks a descendant element of the view.
