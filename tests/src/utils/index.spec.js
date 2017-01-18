'use strict';
const test = require('tape');
const Utils = require('../../../src/utils');
const generateRandomString = Utils.generateRandomString;
const generateRandomUUID = Utils.generateRandomUUID;
const stripBearer = Utils.stripBearer;
const extractErrorMessage = Utils.extractErrorMessage;

/**
 * generateRandomString(radix)
 */

test('generateRandomString(radix) should generate distinct strings', (assert) => {
  assert.plan(1);
  assert.notEquals(generateRandomString(), generateRandomString());
});

/**
 * generateRandomUUID()
 */

test('generateRandomUUID() should generate', (t) => {

  t.test('a UUID with hyphens in the correct positions', (assert) => {
    assert.plan(5);
    let uuid = generateRandomUUID();
    assert.equals(uuid.length, 36);
    assert.equals(uuid.charAt(8), '-');
    assert.equals(uuid.charAt(13), '-');
    assert.equals(uuid.charAt(18), '-');
    assert.equals(uuid.charAt(23), '-');
  });

  t.test('distict UUIDs', (assert) => {
    assert.plan(1);
    assert.notEquals(generateRandomUUID(), generateRandomUUID());
  });

});

/**
 * stripBearer(header)
 */

test('stripBearer(header) should strip Bearer token from Authorization header', (assert) => {
  assert.plan(1);
  assert.equals(stripBearer('Bearer d4149324285e46bfb8065b6c816a12b2'), 'd4149324285e46bfb8065b6c816a12b2');
});

/**
 * extractErrorMessage(errorCode)
 */

test('extractErrorMessage(errorCode) should extract the correct messages', (assert) => {
  assert.plan(9);
  assert.equals(extractErrorMessage('user_exists'), 'User already exists');
  assert.equals(extractErrorMessage('user_not_found'), 'User not found');
  assert.equals(extractErrorMessage('invalid_email'), 'Could not find an account for this email');
  assert.equals(extractErrorMessage('invalid_credentials'), 'You have entered an invalid email password combination');
  assert.equals(extractErrorMessage('invalid_password'), 'You have entered an invalid password');
  assert.equals(extractErrorMessage('invalid_client'), 'Client authentication failed');
  assert.equals(extractErrorMessage('invalid_grant'), 'The provided authorization token is invalid');
  assert.equals(extractErrorMessage('invalid_request'), 'The request is missing a required parameter');
  assert.equals(extractErrorMessage('error'), 'Unexpected error');
});
