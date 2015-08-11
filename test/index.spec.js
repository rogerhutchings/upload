var expect = require('chai').expect;
var moduleApi = require('../index.js');

describe('Module API', function () {
    it('should have an uploadSubject module', function () {
        expect(moduleApi).to.have.a.property('uploadSubject');
        expect(moduleApi.uploadSubject).to.be.a('function');
    });
});
