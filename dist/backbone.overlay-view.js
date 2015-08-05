(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('backbone')) : typeof define === 'function' && define.amd ? define(['backbone'], factory) : global.OverlayView = factory(global.Backbone);
})(this, function (Backbone) {
  'use strict';

  var OverlayView = Backbone.View.extend({
    className: 'overlay-view overlay-view-hide',

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
      this.trigger('before:display');
      this._isDisplaying = true;
      this.$el.removeClass('overlay-view-hide');
      this.trigger('display');
      return this;
    },

    // Hide the overlay
    hide: function hide() {
      if (!this._isDisplaying) {
        return;
      }
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
    _handleClick: function _handleClick(e) {
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

  var backbone_overlay_view = OverlayView;

  return backbone_overlay_view;
});
//# sourceMappingURL=backbone.overlay-view.js.map