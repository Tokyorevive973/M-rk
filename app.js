import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, onChildAdded, onValue } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const hirekRef = ref(db, "hirek");

const hirekLista = document.getElementById("hirekLista");

// Betöltési animáció
hirekLista.innerHTML = `
<div class="loader">Betöltés...</div>
`;

// Ha üres a lista, akkor "Nincs hír" szöveg
onValue(hirekRef, snapshot => {
    if (!snapshot.exists()) {
        hirekLista.innerHTML = `
            <p class="empty">Jelenleg nincs megjeleníthető hír.</p>
        `;
    }
});

// Új hír érkezik
onChildAdded(hirekRef, snapshot => {
    const adat = snapshot.val();

    const szoveg = adat.szoveg || snapshot.val();
    const timestamp = adat.timestamp || Date.now();

    const datum = new Date(timestamp).toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    // Kártya létrehozása
    const card = document.createElement("div");
    card.className = "hir-card fade-in";

    card.innerHTML = `
        <h3>${szoveg}</h3>
        <p class="date">${datum}</p>
    `;

    // Legújabb előre
    hirekLista.prepend(card);

    // Töröljük a betöltő animációt
    const loader = document.querySelector(".loader");
    if (loader) loader.remove();
});
