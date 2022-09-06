const dbPost = require("../dbSchemas/post");

const topHashTags = async (req, res, next) => {
  try {
    const hashTags = await dbPost.aggregate([
      {
        $match: {},
      },
      {
        $project: {
          hashTags: 1,
        },
      },
      {
        $unwind: {
          path: "$hashTags",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$hashTags",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "count": -1,
        },
      },
    ]);


    if (hashTags.length > 0) {
      return res.json({ status: "ok", hashTags });
    }
    res.json({ status: "error", error: "" });
  } catch (error) {
    next(error);
  }
};

module.exports = topHashTags;
