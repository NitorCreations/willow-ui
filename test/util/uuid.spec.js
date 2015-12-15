import {expect} from 'chai';
import createUuid from '../../ui/js/util/uuid';

describe('createUuid', () => {

  var pattern = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$/;

  it('generates real version 4 uuids', () => {
    for (var i = 0; i < 100; i++) {
      expect(createUuid()).to.matchRegex(pattern);
    }
  });

  it('two uuids should not be equal', () => {
    for (var i = 0; i < 100; i++) {
      expect(createUuid()).not.to.equal(createUuid());
    }
  });
});