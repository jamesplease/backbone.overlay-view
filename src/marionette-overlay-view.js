import Mn from 'backbone.marionette';

var OverlayView = Mn.ItemView.extend({
  className: 'overlay-view hide',

  // The OverlayView doesn't need a template: it's simply an element
  // that covers up the entirety of the application
  template: false,

  // Convert click DOM events into BB Events
  events: {
    click: '_handleClick'
  },

  // Shows the overlay. Then, when it's clicked, close it.
  display() {
    this.$el.removeClass('hide');
    this.once('click', this.hide);
  },

  hide() {
    // Ensure that the click event has been unregistered
    this.off('click');
    this.$el.addClass('hide');
    this.trigger('hide');
  },

  // Emit the `click` event if the overlay is clicked directly.
  // Otherwise, emit a `click:child` event.
  _handleClick(e) {
    var clickedSelf = e.target === e.currentTarget;
    var eventName = self ? 'click' : 'click:child';
    this.trigger(eventName);
  }
});

Mn.OverlayView = OverlayView;

export default OverlayView;
