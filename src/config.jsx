import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyA0flwMGejg7rrLkGqs3D7qonB8H9E8Uxc",
	authDomain: "instaport-application.firebaseapp.com",
	databaseURL: "https://instaport-application-default-rtdb.firebaseio.com",
	projectId: "instaport-application",
	storageBucket: "instaport-application.appspot.com",
	messagingSenderId: "62094269732",
	appId: "1:62094269732:web:a58b2a941f9af5f338a7b1"
  };

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
