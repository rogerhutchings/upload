var _ = require('lodash');
var Q = require('q');
var HTTP = require('q-io/http');

var uploadSubject = {};
module.exports = uploadSubject;

uploadSubject.run = function run(subject) {
    return Q(subject)
        .then(uploadSubject._verifySubject)
        .then(uploadSubject._createPanoptesSubject)
        .catch(function (error) {
            console.log(error);
            Q.reject(error);
        });
}

uploadSubject._createPanoptesSubject = function _createPanoptesSubject(subject) {
    return HTTP.request({
        headers: {
            'Accept': 'application/vnd.api+json; version=1',
            'Content-Type': 'application/json'
        },
        method: 'GET',
        port: 443,
        url: 'https://panoptes.zooniverse.org/api/projects/242'
    })
    .then(function (res) {
        console.log(res.body)
        return res.body
    });
}

uploadSubject._verifySubject = function _verifySubject(subject) {
    if (_.isUndefined(subject.links) || _.isUndefined(subject.links.project)) {
        throw new Error('Subject must have a project link');
    } else if (!_.isString(subject.links.project)) {
        throw new Error('Subject project link must be a string');
    } else if (_.isUndefined(subject.locations)) {
        throw new Error('Subject must have a locations attribute');
    } else if (_.isEmpty(subject.locations)) {
        throw new Error('Subject locations attribute is empty');
    } else if (!verifyLocations(subject.locations)) {
        throw new Error('Subject locations attribute may only contain strings or arrays');
    } else {
        return subject;
    }

    function verifyLocations(locations) {
        var verified = true;
        checkArray(locations);
        return verified;

        function checkArray(array) {
            _.forEach(array, function (element) {
                if (_.isArray(element)) {
                    checkArray(element);
                } else if (!_.isString(element)) {
                    verified = false;
                }
            });
        }
    }
}
