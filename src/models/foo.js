class Foo {
    constructor(db) {
        this._coll = db.mongo.collection("foo");
    }
}
module.exports = Foo;