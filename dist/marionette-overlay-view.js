(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('backbone.marionette')) : typeof define === 'function' && define.amd ? define(['backbone.marionette'], factory) : global.OverlayView = factory(global.Mn);
})(this, function (Mn) {
  'use strict';

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
    isDisplaying: function isDisplaying() {
      return this._isDisplaying;
    },

    // Show the overlay
    display: function display() {
      if (this._isDisplaying) {
        return;
      }
      this.triggerMethod('before:display');
      this._isDisplaying = true;
      this.$el.removeClass('overlay-view-hide');
      this.triggerMethod('display');
      return this;
    },

    // Hide the overlay
    hide: function hide() {
      if (!this._isDisplaying) {
        return;
      }
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
    _handleClick: function _handleClick(e) {
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

  var marionette_overlay_view = OverlayView;

  return marionette_overlay_view;
});
//# sourceMappingURL=marionette-overlay-view.js.map