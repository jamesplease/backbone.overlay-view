import Bb from 'backbone';
import $ from 'jquery';
Bb.$ = $;
import Mn from 'backbone.marionette';
import OverlayView from '../../src/marionette-overlay-view';

var overlayView;
describe('Marionette.OverlayView', () => {
  beforeEach(function() {
    overlayView = new OverlayView();
  });

  describe('it should be an instance of Backbone.View', () => {
    it('asdf', () => {
      expect(overlayView).to.be.instanceof(Bb.View);
    });
  });

  describe('it should expose a `display` and `hide` method', () => {
    it('asdf', () => {
      expect(overlayView.display).to.be.a('function');
      expect(overlayView.hide).to.be.a('function');
    });
  });
});
