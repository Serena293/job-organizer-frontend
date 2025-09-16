# 🚀 Roadmap Funzionalità Mancanti e Task

## 1. Backend per eventi
- Creare entità `Event` con campi: `id`, `title`, `date`, `userId` ecc.
- Repository e service per CRUD (Create, Read, Update, Delete)
- Endpoint REST per gestione eventi
- Protezione tramite JWT e associazione eventi a utente loggato

## 2. Visualizzazione eventi sul calendario
- Mostrare eventi già aggiunti al click sul giorno
- Integrare fetch eventi dal backend
- Evidenziare giorni con eventi

## 3. Modifica ed elimina eventi
- Edit inline nel calendario
- Bottone per eliminare eventi
- Aggiornamento reattivo nello store e frontend

## 4. Edit Profile
- Endpoint backend per aggiornamento profilo
- Form editabile nel frontend
- Validazioni lato frontend e backend

## 5. Controlli e validazioni per aggiunta lavoro
- Validazioni campi: titolo, descrizione, stipendio ecc.
- Controllo tipo lavoro (Full-Time / Part-Time)
- Messaggi di errore e info

## 6. Multi-file upload documenti
- Backend: endpoint per più file per utente/job
- Frontend: form upload multiplo
- Visualizzazione documenti con icone e nome

## 7. Miglioramento UI
- Layout responsive desktop/mobile
- Colori, hover, transizioni, cards moderne
- Possibile uso di componenti UI library (PrimeVue/Tailwind)

## 8. Frase motivazionale nella Hero Section
- Decidere tra JSON locale o API esterna
- Logica per frase casuale
- Aggiornare frontend per testo dinamico

## 9. Migrazione su AWS
- Configurazione backend e database (EC2/RDS/S3)
- Hosting frontend (S3 static o Amplify)
- Gestione sicurezza, CORS e variabili ambiente


## 🔄 Ordine di implementazione

1. Backend per eventi  
2. Visualizzazione eventi sul calendario  
3. Modifica ed elimina eventi  
4. Edit profile  
5. Controlli e validazioni per aggiunta lavoro  
6. Multi-file upload documenti  
7. Miglioramento UI generale  
8. Frase motivazionale dinamica nella Hero Section  
9. Migrazione su AWS
