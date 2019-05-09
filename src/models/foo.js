class Foo {
    constructor(ctx) {
        this._coll = ctx.mongo.collection("foo");
    }
}
module.exports = Foo;