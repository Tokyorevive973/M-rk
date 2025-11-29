import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAIiNyMlJtR4aEVC3Oykaq-qmnfQ7gcTk4",
  authDomain: "hirekprojekt.firebaseapp.com",
  databaseURL: "https://hirekprojekt-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "hirekprojekt",
  storageBucket: "hirekprojekt.firebasestorage.app",
  messagingSenderId: "77751928510",
  appId: "1:77751928510:web:e9f7adab3a291f9e38c0ef",
  measurementId: "G-JQT4LYTVHQ"
};

// Init
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const hirekRef = ref(db, "hirek");

const hirekLista = document.getElementById("hirekLista");

onChildAdded(hirekRef, snapshot => {
    const szoveg = snapshot.val();
    const datum = new Date().toLocaleDateString("hu-HU");

    const card = document.createElement("div");
    card.className = "hir-card";

    card.innerHTML = `
        <h3>${szoveg}</h3>
        <p class="date">Dátum: ${datum}</p>
    `;

    hirekLista.prepend(card);
});
