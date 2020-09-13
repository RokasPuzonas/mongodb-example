const { Router } = require('express');
const mongoose = require("mongoose")
const { MongoClient, ObjectID } = require("mongodb")
const assert = require("assert");
const { error } = require('console');
var router = Router();
mongoose.connect("mongodb://localhost:27017/test", { useUnifiedTopology: true })
var Schema = mongoose.Schema

const userDataSchema = new Schema({
	title: {type: String, required: true},
	content: String,
	author: String
}, {collation: "user_data"})

const UserData = mongoose.model("UserData", userDataSchema)

router.get('/', (req, res, next) => {
	res.render('index');
});

router.get("/get-data", (req, res, next) => {
	UserData.find()
		.then(doc => {
			console.log(doc)
			res.render("index", {items: doc})
		})
})

router.post("/insert", (req, res, next) => {
	let data = new UserData({
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	})
	data.save()

	res.redirect("/")
})

router.post("/update", (req, res, next) => {
	let id = req.body.id
	UserData.findById(id, (err, doc) => {
		if (err) {
			console.error("No entry found!")
		}
		doc.title = req.body.title
		doc.content = req.body.content
		doc.author = req.body.author
	})
	res.redirect("/")
})


router.post("/delete", (req, res, next) => {
	let id = req.body.id
	UserData.findByIdAndRemove(id).exec()
	res.redirect("/")
})
module.exports = router;
