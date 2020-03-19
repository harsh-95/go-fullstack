const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');

router.get('/', stuffCtrl.getAllThings);
router.post('/', stuffCtrl.createThing)
router.put('/:id', stuffCtrl.modifyThing);
router.get('/:id', stuffCtrl.getOneThing);
router.delete('/:id', stuffCtrl.deleteThing)

module.exports = router;