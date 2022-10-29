import fs from "node:fs"
import { parse as parseFromCSV } from "csv"

// Path to comedy center data file
const filePath = "./src/data/comedy_center.csv"

class ComedyCenter {

	// Latitude: [-90, 90], Positive: N, Negative: S
	// Longtitude: [-180, 180], Positive: E, Negative: W
	constructor(name, abbr, latitude, longtitude) {
		this.name = name
		this.abbr = abbr
		this.latitude = latitude
		this.longtitude = longtitude
	}

	serializeName() {
		return `${this.name} (${this.abbr})`
	}

	serializeLatitude() {
		let latitudeSign = this.latitude >= 0 ? "N" : "S"
		return `${Math.abs(this.latitude)}${latitudeSign}`
	}

	serializeLongtitude() {
		let longtitudeSign = this.longtitude >= 0 ? "E" : "W"
		return `${Math.abs(this.longtitude)}${longtitudeSign}`
	}

	serializeLocation() {
		return "[" + this.serializeLatitude() + ", " + this.serializeLongtitude() + "]"
	}

	static readFromArray(record) {
		let name = record[0]
		let abbr =  record[1]
		let latitude = Number(record[2])
		let longtitude = Number(record[3])
		return new ComedyCenter(name, abbr, latitude, longtitude)
	}

}

// Read Comedy Centers data from .csv file
async function readFromFile() {
	
	return new Promise((resolve, reject) => {
		let data = []
		fs.createReadStream(filePath)
			.pipe(parseFromCSV({ header: false }))
			.on("data", (row) => { 
			data.push(ComedyCenter.readFromArray(row)) 
		})
			.on("err", (err) => { 
			console.log(err) 
			reject(err)
		})
			.on("end", () => {
			resolve(data)
		})		
	})

}

function distanceToCenter(latitude, longtitude, comedyCenter) {
	// Code from: https://www.movable-type.co.uk/scripts/latlong.html
	const R = 6371e3; // metres
	const lat1r = latitude * Math.PI/180; // cast to radian
	const lat2r = comedyCenter.latitude * Math.PI/180 // cast to radian
	const dlat = lat2r - lat1r
	const dlong = (comedyCenter.longtitude - longtitude) * Math.PI/180;
	
	const a = Math.sin(dlat/2) * Math.sin(dlat/2) +
			  Math.cos(lat1r) * Math.cos(lat2r) *
			  Math.sin(dlong/2) * Math.sin(dlong/2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	const d = R * c; // in metres
	return d
}

export default {

	async getAllComedyCenters() {
		let comedyCenters = await readFromFile()
		return comedyCenters
	},

	async findNearestComedyCenter(latitude, longtitude) {
		let comedyCenters = await this.getAllComedyCenters()
		let nearestCenter = null
		let nearestDistance = Number.MAX_VALUE
		comedyCenters.forEach(c => {
			let curDistance = distanceToCenter(latitude, longtitude, c)
			if (curDistance < nearestDistance) {
				nearestCenter = c
				nearestDistance = curDistance
			}
		})
		if (nearestCenter != null) {
			nearestCenter.distance = nearestDistance
		}
		return nearestCenter
	}

} 