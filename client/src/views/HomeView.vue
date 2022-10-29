<template>
	<div>
		<h2>Find the nearest ComSci Comedy Center!</h2>
		<form @submit.prevent="submitForm()">
			<div>
				<label for="latitude">Latitude: </label>
				<input type="text" id="latitude" name="latitude" v-model="latitude" @change="validateForm()" required/>
				<input type="button" name="latitudeSign" :value="latitudeSign >= 0 ? 'N' : 'S'" @click="toggleLatitudeSign()"/>
			</div>
			<div>
				<label for="longtitude">Longtitude: </label>
				<input type="text" id="longtitude" name="longtitude" v-model="longtitude" @change="validateForm()" required/>
				<input type="button" name="longtitudeSign" :value="longtitudeSign >= 0 ? 'E' : 'W'"  @click="toggleLongtitudeSign()"/>
			</div>
			<p class="errmsg" v-for="msg in errorMessages" :key="msg">
				{{msg}}
			</p>
			<input type="submit" value="Submit" :disabled="!formValid"/>
		</form>
		<hr/>
		<div v-if="nearestCenter">
			<p>The nearest ComSci Comedy Center is at:</p>
			<p id="nearest_center_label">"{{nearestCenter.name}} ({{nearestCenter.abbr}})"</p>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		latitude: 0,
		longtitude: 0,
		latitudeSign: 1,
		longtitudeSign: 1,
		errorMessages: [],
		nearestCenter: null,
		formValid: true
	}),

	methods: {

		toggleLatitudeSign() {
			this.latitudeSign = -this.latitudeSign
			this.validateForm()
		},

		toggleLongtitudeSign() {
			this.longtitudeSign = -this.longtitudeSign
			this.validateForm()
		},

		validateLatitude() {

			if (this.latitude === '') {
				this.errorMessages.push("Latitude cannot be empty")
				this.formValid = false
				return
			}

			this.latitude = Number(this.latitude)

			if (isNaN(this.latitude) || this.latitude < 0 || this.latitude > 90) {
				this.errorMessages.push("Latitude must be a number between 0-90")
				this.formValid = false
				this.latitude = ''
				return
			}

		},

		validateLongtitude() {

			if (this.longtitude === '') {
				this.errorMessages.push("Longtitude cannot be empty")
				this.formValid = false
				return
			}

			this.longtitude = Number(this.longtitude)

			if (isNaN(this.longtitude) || this.longtitude < 0 || this.longtitude > 180) {
				this.errorMessages.push("Longtitude must be a number between 0-180")
				this.formValid = false
				this.longtitude = ''
				return
			}

		},

		validateForm() {
			this.formValid = true
			this.errorMessages = []
			this.validateLatitude()
			this.validateLongtitude()
		},

		submitForm() {
			if (this.formValid) {
				let signedLatitude = this.latitude.toFixed(2) * this.latitudeSign
				let signedLongtitude = this.longtitude * this.longtitudeSign
				this.$store.dispatch("fetchNearestComedyCenter", {
					latitude: signedLatitude,
					longtitude: signedLongtitude
				}).then(() => {
					this.nearestCenter = this.$store.getters.nearestCenter
				}).catch(err => {
					alert(err.message)
					this.nearestCenter = null
				})
			}
		}

	}
}
</script>

<style scoped>
	.errmsg {
		color: red;
	}

	form {
		margin: 8px;
		padding: 8px;
		display: block;
	}

	input[type=text] {
		margin: 4px
	}

	#nearest_center_label {
		font-size: x-large;
		font-weight: bold;
	}

</style>