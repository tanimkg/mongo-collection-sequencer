"use strict";

var mongoose = require('mongoose');

var Sequence = new mongoose.Schema({
    keyname: String,
    nextSeqNumber: { type: Number, default: 1 }
});


// Create a sequence
exports.generate = function(keyname){
    
    return {
        next: function(callback){
            Sequence.find({"keyname":keyname},function(err, data){
                if(err){ throw(err); }
                
                if(data.length < 1){
                    // create if sequence doesn't exist and return first
                    Sequence.create({name:name,nextSeqNumber:1}, function(err, seq){
                        if(err) { throw(err); }
                        
                        callback(seq.nextSeqNumber);
                    });
                } else {
                    // update sequence and return next
                    Sequence.findOneAndUpdate({"keyname": keyname}, { $inc: { nextSeqNumber: 1 } }, {new: true}, function(err, seq){
                        if(err) { throw(err); }
                        callback(seq.nextSeqNumber);
                    });
                }
            });
        }
    };
}
