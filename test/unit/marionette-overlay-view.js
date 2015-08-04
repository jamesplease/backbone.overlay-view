import Bb from 'backbone';
import $ from 'jquery';
Bb.$ = $;
import Mn from 'backbone.marionette';
import OverlayView from '../../src/marionette-overlay-view';

var overlayView;
describe('Marionette.OverlayView', () => {
  beforeEach(() => {
    overlayView = new OverlayView();
  });

  it('should be an instance of Backbone.View', () => {
    expect(overlayView).to.be.instanceof(Bb.View);
  });

  it('should expose a `display` and `hide` method', () => {
    expect(overlayView.display).to.be.a('function');
    expect(overlayView.hide).to.be.a('function');
  });
});
