import Mn from 'backbone.marionette';

var OverlayView = Mn.ItemView.extend({
  className: 'overlay-view overlay-view-hide',

  // The OverlayView doesn't need a template: it's simply an element
  // that covers up the entirety of the application
  template: false,

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
    this.triggerMethod('before:display');
    this._isDisplaying = true;
    this.$el.removeClass('overlay-view-hide');
    this.triggerMethod('display');
    return this;
  },

  // Hide the overlay
  hide() {
    if (!this._isDisplaying) { return; }
    this.triggerMethod('before:hide');
    this._isDisplaying = false;
    this.$el.addClass('overlay-view-hide');
    this.triggerMethod('hide');
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
    this.triggerMethod(eventName);

    // Hide the view, if it's being displayed
    if (clickedSelf && this.isDisplaying()) {
      this.hide();
    }
  }
});

Mn.OverlayView = OverlayView;

export default OverlayView;
