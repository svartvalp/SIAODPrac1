const express = require('express')
const app = express()
const RateRepository = require('./repo/rateRepository')
const rateRepository = new RateRepository()

app.use(express.json())
app.use('/', express.static('public'))

app.get('/api/rate', (request, responce) => {
    let from = request.query.from
    let to = request.query.to
    let step = request.query.step
    if(step) {
        return rateRepository.getAverageRate(step, from, to).then(result => {
            responce.status(200).json({data : result})
        }).catch(e => {responce.status(500).json({ msg : 'Что-то пошло не так'}); console.log(e.message)})
    }
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