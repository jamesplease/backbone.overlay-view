# marionette.overlay-view

A view that covers your webpage, and is closed when clicked. It's useful as a background for
dropdowns, modals, etc.

[![Travis build status](http://img.shields.io/travis/jmeas/marionette.overlay-view.svg?style=flat)](https://travis-ci.org/jmeas/marionette.overlay-view)
[![Code Climate](https://codeclimate.com/github/jmeas/marionette.overlay-view/badges/gpa.svg)](https://codeclimate.com/github/jmeas/marionette.overlay-view)
[![Test Coverage](https://codeclimate.com/github/jmeas/marionette.overlay-view/badges/coverage.svg)](https://codeclimate.com/github/jmeas/marionette.overlay-view)
[![Dependency Status](https://david-dm.org/jmeas/marionette.overlay-view.svg)](https://david-dm.org/jmeas/marionette.overlay-view)
[![devDependency Status](https://david-dm.org/jmeas/marionette.overlay-view/dev-status.svg)](https://david-dm.org/jmeas/marionette.overlay-view#info=devDependencies)

### Installation

The easiest way to install this is through `npm` or `bower`.

```js
npm install marionette.overlay-view
bower install marionette.overlay-view
```

Be sure to iclude both the JS and CSS files in your application.

### Motivation

A common UI feature in client side applications is an element that blocks the
user from interacting with the rest of the application. This is typically used when
the user opens, say, a custom dropdown menu or a modal.

Rather than associating a new overlay with each dropdown, I like to use a single view
that any other view in my app can utilize.

### Basic Usage

```js
// Create a single overlayView for your entire app
var overlayView = new OverlayView();

// Display it
overlayView.display();

// When the user clicks on it, it will hide itself and emit the `hide` event.
// You can use that event to close the modal / dropdown / do whatever.
```

### Child Views

The OverlayView intentionally has no template, and is intentionally not a LayoutView,
but this doesn't mean that you can't place child views within it.

Instead of using the Region API, I recommend that you use existing DOM APIs to append
a child view's element directly into the overlay view's element. Then, when the overlay
is closed, you can destroy the child view.

The reason I suggest doing this is because adding the Region API is of particular use
when it comes to swapping views. For one-off attaches and detaches, like what is
typical when using this view, the region abstraction doesn't really provide much
benefit over using other DOM APIs.

This may look something like:

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

### `triggerMethod` Events

In addition to the normal Backbone and Marionette events, this View has a handful of
custom events. These are fired with `triggerMethod`, so the corresponding method
will be executed on the view, if it exists.

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
