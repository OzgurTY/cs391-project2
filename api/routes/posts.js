const router = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");

//creating post
router .post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch(err) {
        res.status(500).json(err);
    }
});

//updating post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({$set: req.body});
            res.status(200).json("Your post has been updated!");
        } else {
            res.status(403).json("This is not your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//deleting post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne({$set: req.body});
            res.status(200).json("Your post has been deleted!");
        } else {
            res.status(403).json("This is not your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//like-dislike post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("You liked this post!");
        } else {
            await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json("You disliked this post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//getting a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//gettin timeline posts
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPost = await Promise.all(
            currentUser.followings.map(friendId => {
                return Post.find({userId: friendId})
            })
        );
        res.status(200).json(userPosts.concat(...friendPost))
    } catch (err) {
        res.status(500).json(err);
    }
});

//getting user's all posts
router.get("/profile/:username", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;