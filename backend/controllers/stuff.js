const Thing = require('../models/thing');
const fs = require('fs');

exports.createThing = (req,res,next)=>{
    console.log('save data to mongodb');
    const url = req.protocol + '://' + req.get('host');
    req.body.thing = JSON.parse(req.body.thing);
    const thing = new Thing({
      title: req.body.thing.title,
      description: req.body.thing.description,
      imageUrl: url + '/images/' + req.file.filename,
      userId: req.body.thing.userId,
      price: req.body.thing.price
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
    let thing = new Thing({_id: req.params.id})
    if(req.file){
        const url = req.protocol + '://' + req.get('host');
        req.body.thing = JSON.parse(req.body.thing);
        thing = {
          _id: req.params.id,
          title: req.body.thing.title,
          description: req.body.thing.description,
          imageUrl: url + '/images/' + req.file.filename,
          userId: req.body.thing.userId,
          price: req.body.thing.price
        };
    }
    else{
        thing = {
            _id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            userId: req.body.userId
          };
    }
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
    Thing.findOne({_id: req.params.id}).then(
        (thing)=>{
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink('images/'+filename, ()=>{
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
            });
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