import { Component } from 'react'
import io from 'socket.io-client'
import fetch from 'isomorphic-fetch'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Connect from '../components/Connect'
import firebase from 'firebase'

let firebaseConfig = {
	apiKey: process.env.FIREBASE_APIKEY,
	authDomain: process.env.FIREBASE_AUTHDOMAIN,
	databaseURL: process.env.FIREBASE_DATABASEURL,
	projectId: process.env.FIREBASE_APPID,
	storageBucket: process.env.FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
	appId: process.env.FIREBASE_APPID
};
try {
	firebase.initializeApp(firebaseConfig)
} catch(err) {
	if(!/already exists/.test(err.message)) {
		console.log('Firebase initialization error',err.stack)
	}
}

const database = firebase.database()

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: 'Leon'
		}
	}

	componentDidMount () {
		const nameRef= database.ref().child('name')
		nameRef.on('value', snapshot => {
			this.setState({
				name: snapshot.val()
			})
		})
	}

	componentWillUnmount () {
	}


	render () {
		return (
			<div className="page-style">
				<Connect/>
				<h1>{this.state.name}</h1>
				<style jsx>{`
					background-color:black;
				`}</style>
			</div>
		)
	}
}

export default Home
