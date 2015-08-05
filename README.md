# marionette-overlay-view

A view that covers the entire app and emits click events.

[![Travis build status](http://img.shields.io/travis/jmeas/marionette-overlay-view.svg?style=flat)](https://travis-ci.org/jmeas/marionette-overlay-view)
[![Code Climate](https://codeclimate.com/github/jmeas/marionette-overlay-view/badges/gpa.svg)](https://codeclimate.com/github/jmeas/marionette-overlay-view)
[![Test Coverage](https://codeclimate.com/github/jmeas/marionette-overlay-view/badges/coverage.svg)](https://codeclimate.com/github/jmeas/marionette-overlay-view)
[![Dependency Status](https://david-dm.org/jmeas/marionette-overlay-view.svg)](https://david-dm.org/jmeas/marionette-overlay-view)
[![devDependency Status](https://david-dm.org/jmeas/marionette-overlay-view/dev-status.svg)](https://david-dm.org/jmeas/marionette-overlay-view#info=devDependencies)

### Motivation

A common interface element on client side applications is an element that blocks the
user from interacting with the rest of the application. This is typically used when
the user opens, say, a custom dropdown menu or a modal.

Rather than associating a new overlay with each dropdown, I like to use a single view
that any other view in my app can use.

### Basic Usage

```js
// Create a single overlayView for your entire app
var overlayView = new OverlayView();

// Display it
overlayView.display();

// When the user clicks on it, it will hide itself and emit the `hide` event.
// You can use that event to close the modal / dropdown / whatever.
```

### Child Elements

The OverlayView intentionally has no template, and is intentionally not a LayoutView.
But this doesn't mean that you can't associate children views with it.

Rather than using the Region API, which is great for when views need to be swapped,
you should simply use the DOM API to append a child view's element directly into the
overlay view's element. Then, when the overlay is closed, you can destroy the child
view.

Adding a region abstraction doesn't add any benefit in this particular situation!

This may look something like:

```js
// Attach the dropdown element to the overlay view
overlayView.$el.append(dropdownView.$el);

// Destroy the dropdown when the overlayView is hidden
overlayView.on('hide', dropdownView.destroy.bind(dropdownView));

// Show the overlay view
overlayView.display();
```

### Methods

##### `isDisplaying()`

Returns a Boolean indicating whether or not the view is currently displaying. By
default, the view is not displaying.

##### `display()`

Display the view, if it isn't already displayed, by removing the
`.overlay-view-hidden` class.

##### `hide()`

Hide the view, if it's being displayed, by adding the `.overlay-view-hidden`
class.

### Events

In addition to the normal Backbone and Marionette events, this View has a handful of
custom events.

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
