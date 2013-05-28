var fuzzymatch = require("../");

describe("fuzzymatch", function () {

  it("scores strings based on how closely they match the query", function () {
    fuzzymatch("London, United Kingdom", "London, United Kingdom").should.deep.equal({ score: 1 });
  });

  it("should give a score of 1 for an exact match", function () {
    fuzzymatch("a", "a").score.should.equal(1);
    fuzzymatch("abcdef", "abcdef").score.should.equal(1);
    fuzzymatch("abCdef", "abCdef").score.should.equal(1);
  });

  it("should return 0 for abbreviations that don't match", function () {
    fuzzymatch("hello", "bye").score.should.equal(0);
    fuzzymatch("hello", "le").score.should.equal(0);
    fuzzymatch("hello world", "hell oworld").score.should.equal(0);
  });

  it("should prefer exact matches over prefix matches", function () {
    fuzzymatch("grab", "grab").score.should.be.greaterThan(fuzzymatch("grabbed", "grab").score);
    fuzzymatch("grabbed", "grab").score.should.equal(fuzzymatch("grabbing", "grab").score);
  });

  it("should prefer closer-together matches over further-apart matches", function () {
    fuzzymatch("garden", "ga").score.should.be.greaterThan(fuzzymatch("gray", "ga").score);
    fuzzymatch("aggravate", "ga").score.should.be.greaterThan(fuzzymatch("aglutamate", "ga").score);
  });

  it("should prefer case-sensitive matches over case-insensitivei matches", function () {
    fuzzymatch("CSS", "CS").score.should.be.greaterThan(fuzzymatch("css", "CS").score);
    fuzzymatch("arm", "ar").score.should.be.greaterThan(fuzzymatch("ARM", "ar").score);
  });

  it("should prefer things that starts of words more", function () {
    fuzzymatch("outlook-user", "ous").score.should.be.greaterThan(fuzzymatch("zoho-user", "ous").score);
    fuzzymatch("outlook-the-user", "ous").score.should.be.greaterThan(fuzzymatch("the-outlook-user", "ous").score);
    fuzzymatch("lots-of-outlook-users", "ous").score.should.be.greaterThan(fuzzymatch("millions-of-outlook-users", "ous").score);
    fuzzymatch("camelCaseStuff", "css").score.should.be.greaterThan(fuzzymatch("CAMELCASESTUFF", "css").score);
    fuzzymatch("CSS", "css").score.should.be.greaterThan(fuzzymatch("camelCaseStuff", "css").score);
  });

  it("should not take exponential time in pathological cases", function () {
    var t = (new Date()).getTime();
    fuzzymatch("aaaaaaaaaaaaaaaaaaaa", "aaaaaaaaa");
    // On my laptop the un-optimized algorithm takes about 10ms to run the above,
    // so I'm going out on a limb and saying that there's no computer 100 times faster than
    // mine that we're likely to run the specs on. [I'm also hoping there's no computer
    // 10 times slower, so the test should fail in under 2 minutes :p]
    //
    // 20ms is just as generous, on my machine it's about 10ms with a proper cache in place.
    ((new Date()).getTime() - t).should.be.lessThan(20);
  });

});