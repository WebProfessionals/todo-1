it('double done', function(done) {
    // Calling `done()` twice is an error
    setImmediate(done);
    setImmediate(done);
});