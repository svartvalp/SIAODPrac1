const express = require('express')
const app = express()
const RateRepository = require('./repo/rateRepository')
const rateRepository = new RateRepository()

app.use(express.json())
app.use('/', express.static('public'))

app.get('/api/rate', (request, responce) => {
    let from = request.query.from
    let to = request.query.to
    if(from && to) {
        rateRepository.getRate(from, to).then(result => {
            responce.status(200).json({data : result})
        }).catch(e => responce.status(500).json({msg : "somethig went wrong"}))
    } else {
        rateRepository.getAllRate().then(result => {
            responce.status(200).json({data : result})
        })
    }
})

app.listen(8080, () => console.log('Run'))