import model from "../model/comedy_center.js"

export default {

	getNearestCenter(req, res) {
		let latitude = Number(req.query.latitude)
		let longtitude = Number(req.query.longtitude)
		model.findNearestComedyCenter(latitude, longtitude).then((nearestCenter) => {
			res.status(200).send(nearestCenter)
		}).catch((err) => {
			res.status(400).send(err.message)
		})
	},

}