import {expect} from 'chai';
import createUuid from '../../ui/js/util/uuid';
import jsc from 'jsverify';

describe('createUuid', () => {

  var pattern = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$/;

  var uuids = jsc.bless({generator: createUuid});

  jsc.property('real version 4 UUID', uuids, uuid => pattern.test(uuid));
  jsc.property('two uuids should not be equal', uuids, uuids, (u1, u2) => u1 !== u2);

});