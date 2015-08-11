var _ = require('lodash');
var expect = require('chai').expect;
var nock = require('nock');

var uploadSubject = require('../lib/upload-subject.js');

var goodSubject = {
    links: {
        project: '1'
    },
    locations: ['image/png', ['image/png']]
};

describe('uploadSubject module', function () {

    it('should have a run method', function () {
        expect(uploadSubject).to.have.a.property('run');
        expect(uploadSubject.run).to.be.a('function');
    });

    describe('run method', function () {
        it('should return a promise');
        it('should reject the promise is an error is caught');
    });

    it('should have a _verifySubject method', function () {
        expect(uploadSubject).to.have.a.property('_verifySubject');
        expect(uploadSubject._verifySubject).to.be.a('function');
    });

    describe('_verifySubject method', function () {

        it('should return the subject if it\'s verified', function () {
            var result = uploadSubject._verifySubject(goodSubject);
            expect(result).to.equal(goodSubject);
        });

        function _verifySubject(subject) {
            return uploadSubject._verifySubject.bind(uploadSubject, subject);
        }

        it('should throw an error if there\'s no projects link', function () {
            var subject = _.clone(goodSubject, true);
            subject.links = {};
            expect(_verifySubject(subject)).to.throw('Subject must have a project link');
        });

        it('should throw an error if the projects link isn\'t a string', function () {
            var subject = _.clone(goodSubject, true);
            subject.links.project = 1;
            expect(_verifySubject(subject)).to.throw('Subject project link must be a string');
        });

        it('should throw an error if there\'s no locations attribute', function () {
            var subject = _.clone(goodSubject, true);
            subject = _.omit(subject, 'locations');
            expect(_verifySubject(subject)).to.throw('Subject must have a locations attribute');
        });

        it('should throw an error if the locations array is empty', function () {
            var subject = _.clone(goodSubject, true);
            subject.locations = [];
            expect(_verifySubject(subject)).to.throw('Subject locations attribute is empty');
        });

        it('should throw an error if the locations array contains anything but strings or arrays', function () {
            var subject1 = _.clone(goodSubject, true);
            subject1.locations.push(1);
            expect(_verifySubject(subject1)).to.throw('Subject locations attribute may only contain strings or arrays');

            var subject2 = _.clone(goodSubject, true);
            subject2.locations.push([1]);
            expect(_verifySubject(subject2)).to.throw('Subject locations attribute may only contain strings or arrays');
        })

    });

    it('should have a _createPanoptesSubject method', function () {
        expect(uploadSubject).to.have.a.property('_createPanoptesSubject');
        expect(uploadSubject._createPanoptesSubject).to.be.a('function');
    });

    describe('_createPanoptesSubject method', function () {
    });

    it('should have a _uploadLocations method', function () {
        expect(uploadSubject).to.have.a.property('_uploadLocations');
        expect(uploadSubject._uploadLocations).to.be.a('function');
    });

    describe('_uploadLocations method', function () {
        it('should should upload a file for each location to S3');
    });

});
