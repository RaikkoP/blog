const Article = require('../models/admin');
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');

const Article = sequelize.define('Article', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
    },
    body: {
        type: DataTypes.TEXT,
    },
    published: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

const createNew = async (newArticle) => {
    try {
        const article = await Article.create(newArticle);
        console.log("created article: ", article);
        return article;
    } catch (err) {
        console.log("error: ", err);
        throw err;
    }
}

const getPost = async (id) => {
    try {
        const article = await Article.findByPk(id);
        console.log("found article: ", article);
        return article;
    } catch (err) {
        console.log("error: ", err);
        throw err;
    }
}

const updatePost = async (newValues) => {
    try {
        const article = await Article.update(newValues, { where: { id: newValues.id } });
        console.log("updated article: ", article);
        return article;
    } catch (err) {
        console.log("error: ", err);
        throw err;
    }
}

const deletePost = async (id) => {
    try {
        const article = await Article.destroy({ where: { id: id } });
        console.log("deleted article: ", article);
        return article;
    } catch (err) {
        console.log("error: ", err);
        throw err;
    }
}

module.exports = {
    createNew,
    getPost,
    updatePost,
    deletePost
};