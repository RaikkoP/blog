const Author = require("../models/author.model");

const getUserPosts = (req, res) => {
    Author.getUserPosts(req.params.name, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else if(data.length > 0){
            console.log(data);
            res.render("author", {
                author: data[0].name,
                articles: data
            });
        } else {
            res.render("author", {
                error: "User not found"
            });
        }

    });
};

module.exports = {
    getUserPosts};