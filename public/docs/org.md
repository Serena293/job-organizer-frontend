# 📅 Roadmap Operativa con Stima Giorni

## Giorno 1-2: Backend per eventi
- Creare entità `Event` con campi: `id`, `title`, `date`, `userId` ecc.
- Repository e service per CRUD
- Endpoint REST per gestione eventi
- Protezione JWT e associazione eventi a utente loggato

## Giorno 2-3: Visualizzazione eventi sul calendario
- Fetch eventi dal backend e salvataggio nello store
- Mostrare eventi già aggiunti al click sul giorno
- Evidenziare i giorni con eventi

## Giorno 3-4: Modifica ed elimina eventi
- Edit inline degli eventi sul calendario
- Bottone per eliminare eventi
- Aggiornamento reattivo nello store e frontend

## Giorno 4-5: Edit Profile
- Endpoint backend per aggiornamento profilo
- Form editabile nel frontend
- Validazioni lato frontend e backend

## Giorno 5-6: Controlli e validazioni per aggiunta lavoro
- Validazioni dei campi: titolo, descrizione, stipendio ecc.
- Controllo tipo lavoro (Full-Time / Part-Time)
- Gestione errori e messaggi informativi

## Giorno 6-7: Multi-file upload documenti
- Backend: endpoint per più file per utente/job
- Frontend: form upload multiplo
- Visualizzazione documenti con icone e nome

## Giorno 7-8: Miglioramento UI
- Layout responsive desktop/mobile
- Colori, hover, transizioni, cards moderne
- Possibile uso di componenti UI library (PrimeVue/Tailwind)

## Giorno 8: Frase motivazionale nella Hero Section
- Decidere tra JSON locale o API esterna
- Logica per frase casuale
- Aggiornamento frontend per testo dinamico

## Giorno 9: Migrazione su AWS
- Configurazione backend e database (EC2/RDS/S3)
- Hosting frontend (S3 static o Amplify)
- Gestione sicurezza, CORS e variabili ambiente

---

### 🔄 Sintesi
- Durata totale stimata: 9 giorni lavorativi
- Ogni task costruisce sulla base del precedente
- Inizio dal backend eventi fino alla migrazione finale su AWS
