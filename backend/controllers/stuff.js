const Thing = require('../models/thing');

exports.createThing = (req,res,next)=>{
    console.log('save data to mongodb');
    const thing = new Thing({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      userId: req.body.userId,
      price: req.body.price
    });
    thing.save().then(
      ()=>{
      console.log('saved data to mongodb');
      res.status(201).json({
        message: 'Post saved successfully'
      }).catch(
        (error)=>{
          console.log('saved data failed');
          res.status(400).json({
            error: error
          })
      })
    })
  }

exports.modifyThing = (req, res, next) => {
    const thing = new Thing({
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    });
    Thing.updateOne({_id: req.params.id}, thing).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }

exports.getOneThing = (req, res, next) => {
    Thing.findOne({
      _id: req.params.id
    }).then(
      (thing) => {
        res.status(200).json(thing);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  }

  exports.deleteThing = (req,res,next)=>{
    Thing.deleteOne({_id: req.params.id}).then(
      ()=>{
        res.status(200).json({
          message: 'Thing deleted successfully'
        }).catch(
          (error)=>{
            res.status(400).json({
              error: error
            })
          }
        )
      }
    )
  }

  exports.getAllThings = (req, res, next) => {
    console.log('get data from mongodb');
      Thing.find().then(
        (things)=>{
          res.status(200).json(things);
        }).catch(
          (error)=>{
            res.status(400).json({
              error: error
            })
          }
        )
    }