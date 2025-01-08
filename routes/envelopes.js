var express = require('express');
var router = express.Router();
const Envelopes = require("../etc/modules/Envelopes.js");
const envelopes = new Envelopes;

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json(envelopes.Lists());
});

router.get('/:name', function (req, res, next) {
  if (!Object.hasOwnProperty(envelopes.Lists, req.params.name)) {
    next(new Error("Envelope with that name doesn't exist"));
  }
  const envelope = envelopes.getEnvelope(req.params.name);
  res.json(envelope);
});

router.post('/', function (req, res, next) {
  if (Object.hasOwnProperty(envelopes.Lists, req.body.name)) {
    next(new Error("Envelope with that name already exists"));
  }
  const envelope = envelopes.createNewEnvelope(req.body.name, req.body.amount);
  res.json(envelope);
});

/*Modify Envelope Name */
router.put('/:name', function (req, res, next) {
  const envelope = envelopes.changeEnvelopeName(req.params.name, req.body.name);
  res.json(envelope);
});

router.put('/:name/add/:amount', function (req, res, next) {
  const envelope = envelopes.getEnvelope(req.params.name);
  envelope.addAmount(req.params.amount);
  res.json(envelope);
});

router.put('/:name/remove/:amount', function (req, res, next) {
  const envelope = envelopes.getEnvelope(req.params.name);
  envelope.removeAmount(req.params.amount);
  res.json(envelope);
});

router.put('/:from/transfer/:to/:amount', function (req, res, next) {
  envelopes.transferAmount(req.params.from, req.params.to, req.params.amount);
  res.json([
    envelopes.getEnvelope(req.params.from),
    envelopes.getEnvelope(req.params.to)
  ]);
});

router.delete('/:name', function (req, res, next) {
  if (!Object.hasOwnProperty(envelopes.Lists, req.params.name)) {
    next(new Error("Envelope with that name doesn't exist"));
  }
  envelopes.removeEnvelope(req.params.name);
  res.status(201).send();
});

module.exports = router;
