const Question = require('../models/questions');

module.exports.getQuestion = (req,res) => {
  Question
    .find()
    .sort({ createdAt: -1 })

    .then(data => {
      res.json({ data: data });
    })
    .catch(err => {
      res.json({ message: err });
    })
}

module.exports.postQuestion = (req,res) => {
  Question
    .create(req.body)

    .then(data => {
      res.json({ message: "Question successfully inserted", data: data });
    })
    .catch(() => {
      res.json({ message: "Failed to insert question" });
    })
}

module.exports.putQuestion = async (req,res) => {
  const { toQuestion, upBy } = req.body;
  let ups;
  let upArray;
  let updates;

  try {
    const data = await Question.findById(toQuestion);
  
    if (data) {
      ups = data.ups;

      // check if already liked by this user

      const res = await checkIfAlreadyLiked(ups, upBy);

      if (res) {
        const newUps = ups.filter(up => {
          return up != upBy;
        })
        upArray = newUps;
        updates = true;
      } else {
        ups.push(upBy);
        upArray = ups;
        updates = false;
      }
    } else {
      throw new Error({ updated: "false 1" })
    }

    const result = await Question.findByIdAndUpdate(toQuestion, {
      ups: upArray
    })
    
    if (result) {
      if (updates) {
        res.json({ up: "removed" })
      } else {
        res.json({ up: "added" });
      }
    } else {
      throw new Error({ updated: "false 2" });
    }
  } catch (e) {
    res.json({ updated: e.message });
  }
}

const checkIfAlreadyLiked = (ups, upBy) => {
  let cond;
  for (let i = 0; i < ups.length; i++) {
    if (ups[i] == upBy) {
      cond = true;
      break;
    } else {
      cond = false;
      continue;
    }
  }
  return cond;
}