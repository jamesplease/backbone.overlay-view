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

  describe('isDisplaying()', () => {
    describe('when the view is first created', () => {
      it('should not be displaying', () => {
        expect(overlayView.isDisplaying()).to.be.false;
      });
    });

    describe('when the view is displayed', () => {
      beforeEach(() => {
        overlayView.display();
      });

      it('should be displaying', () => {
        expect(overlayView.isDisplaying()).to.be.true;
      });
    });

    describe('when the view is displayed, then hidden', () => {
      beforeEach(() => {
        overlayView.display().hide();
      });

      it('should not be displaying', () => {
        expect(overlayView.isDisplaying()).to.be.false;
      });
    });
  });

  describe('display()', () => {
    beforeEach(() => {
      sinon.spy(overlayView, 'display');
      sinon.stub(overlayView, 'trigger');
      overlayView.display();
    });

    it('should trigger the `display` events', () => {
      expect(overlayView.trigger).to.have.been.calledTwice;
      expect(overlayView.trigger).to.have.been.calledWithExactly('display');
      expect(overlayView.trigger).to.have.been.calledWithExactly('before:display');
    });

    it('should return `this`', () => {
      expect(overlayView.display).to.always.returned(overlayView);
    });

    describe('when calling it a second time in a row', () => {
      beforeEach(() => {
        overlayView.display();
      });
      it('should not trigger the events again, because it is already displaying', () => {
        expect(overlayView.trigger).to.have.been.calledTwice;
      });
    });
  });

  describe('hide()', () => {
    beforeEach(() => {
      overlayView.display();
      sinon.spy(overlayView, 'hide');
      sinon.stub(overlayView, 'trigger');
      overlayView.hide();
    });

    it('should trigger the `hide` events', () => {
      expect(overlayView.trigger).to.have.been.calledTwice;
      expect(overlayView.trigger).to.have.been.calledWithExactly('hide');
      expect(overlayView.trigger).to.have.been.calledWithExactly('before:hide');
    });

    it('should return `this`', () => {
      expect(overlayView.hide).to.always.returned(overlayView);
    });

    describe('when calling it a second time in a row', () => {
      beforeEach(() => {
        overlayView.hide();
      });

      it('should not trigger the events again, because it is already hiddem', () => {
        expect(overlayView.trigger).to.have.been.calledTwice;
      });
    });
  });

  var leftClick;
  describe('clicks', () => {
    beforeEach(() => {
      leftClick = $.Event('click');
      leftClick.which = 1;
    });

    describe('on the view element', () => {
      describe('when it is hidden', () => {
        beforeEach(() => {
          sinon.stub(overlayView, 'trigger');
          sinon.stub(overlayView, 'hide');
          overlayView.$el.trigger(leftClick);
        });

        it('should not call hide()', () => {
          expect(overlayView.hide).to.not.have.been.called;
        });

        it('should trigger the `click` event', () => {
          expect(overlayView.trigger).to.have.been.calledOnce;
          expect(overlayView.trigger).to.have.been.calledWithExactly('click');
        });
      });

      describe('when it is displaying', () => {
        beforeEach(() => {
          overlayView.display();
          sinon.stub(overlayView, 'trigger');
          sinon.stub(overlayView, 'hide');
          overlayView.$el.trigger(leftClick);
        });

        it('should call hide()', () => {
          expect(overlayView.hide).to.have.been.called;
        });

        it('should trigger the `click` event', () => {
          expect(overlayView.trigger).to.have.been.calledOnce;
          expect(overlayView.trigger).to.have.been.calledWithExactly('click');
        });
      });
    });

    var $child;
    describe('on a descendent element', () => {
      beforeEach(() => {
        $child = $('<div>');
        overlayView.$el.append($child);
      });

      afterEach(() => {
        overlayView.$el.empty();
      });

      describe('when it is hidden', () => {
        beforeEach(() => {
          sinon.stub(overlayView, 'trigger');
          sinon.stub(overlayView, 'hide');
          $child.trigger(leftClick);
        });

        it('should not call hide()', () => {
          expect(overlayView.hide).to.not.have.been.called;
        });

        it('should trigger the `click:child` event', () => {
          expect(overlayView.trigger).to.have.been.calledOnce;
          expect(overlayView.trigger).to.have.been.calledWithExactly('click:child');
        });
      });

      describe('when it is displaying', () => {
        beforeEach(() => {
          overlayView.display();
          sinon.stub(overlayView, 'trigger');
          sinon.stub(overlayView, 'hide');
          $child.trigger(leftClick);
        });

        it('should not call hide()', () => {
          expect(overlayView.hide).to.not.have.been.called;
        });

        it('should trigger the `click:child` event', () => {
          expect(overlayView.trigger).to.have.been.calledOnce;
          expect(overlayView.trigger).to.have.been.calledWithExactly('click:child');
        });
      });
    });
  });
});
