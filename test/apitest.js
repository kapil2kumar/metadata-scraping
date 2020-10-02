let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let server = require("../server");

describe("URL", () => {
    describe("/POST getMetaInfo", () => {
        it("it should POST all the URL", (done) => {
            chai.request(server)
            .post("/getMetaInfo").send({
                "url": "https://ogp.me/"
            })
            .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a("object");
                    done();
            });
        });
    });
});