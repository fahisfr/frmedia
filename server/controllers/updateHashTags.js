const dbPost = require("../dbSchemas/post");

const updateHashTags = async (tags) => {
  const hashTagsName = hashTags.map((tage) => tage.name);
  return  await dbPost.updateOne({ _id: postId }, [
    {
      $set: {
        hashTags: {
          $let: {
            vars: {
              allTags: {
                $map: {
                  input: "$hashTags",
                  as: "pcrTage",
                  in: "$$pcrTage.name",
                },
              },
            },
            in: {
              $concatArrays: [
                {
                  $map: {
                    input: "$hashTags",
                    as: "tage",
                    in: {
                      $cond: [
                        { $in: ["$$tage.name", hashTagsName] },
                        {
                          name: "$$tage.name",
                          count: {
                            $add: ["$$tage.count", 1],
                          },
                        },
                        "$$tage",
                      ],
                    },
                  },
                },
                {
                  $filter: {
                    input: hashTags,
                    as: "vtage",
                    cond: {
                      $not: {
                        $in: ["$$vtage.name", "$$allTags"],
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
  ]);
};


module.exports = updateHashTags