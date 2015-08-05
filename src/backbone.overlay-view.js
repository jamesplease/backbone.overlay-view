import Backbone from 'backbone';

var OverlayView = Backbone.View.extend({
  className: 'overlay-view overlay-view-hide',

  // Convert DOM click events into BB Events
  events: {
    click: '_handleClick'
  },

  // Returns a Boolean indicating whether or not the view is currently
  // displaying
  isDisplaying() {
    return this._isDisplaying;
  },

  // Show the overlay
  display() {
    if (this._isDisplaying) { return; }
    this.trigger('before:display');
    this._isDisplaying = true;
    this.$el.removeClass('overlay-view-hide');
    this.trigger('display');
    return this;
  },

  // Hide the overlay
  hide() {
    if (!this._isDisplaying) { return; }
    this.trigger('before:hide');
    this._isDisplaying = false;
    this.$el.addClass('overlay-view-hide');
    this.trigger('hide');
    return this;
  },

  // Whether or not the overlayView is displayed
  _isDisplaying: false,

  // Emit the `click` event if the overlay is clicked directly.
  // Otherwise, emit a `click:child` event. Then, hide the view
  // if it is displayed.
  _handleClick(e) {
    var clickedSelf = e.target === e.currentTarget;
    var eventName = clickedSelf ? 'click' : 'click:child';
    this.trigger(eventName);

    // Hide the view, if it's being displayed
    if (clickedSelf && this.isDisplaying()) {
      this.hide();
    }
  }
});

Backbone.OverlayView = OverlayView;

export default OverlayView;
