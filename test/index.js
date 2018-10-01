////testing libraries
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

describe('site', () => {
    it('Should have home page', (done) => {
        //describes what should happen when testing homepage loads
        chai.request('localhost:3000')
        .get('/')
        .end((err, res) => {
            if (err) {
                done(err)
            }
            res.status.should.be.equal(200)
            done()
        })
    })
})
