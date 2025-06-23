# 📊 Analizor - Analyse des ventes d'une PME

Ce projet a été réalisé dans le cadre de la sélection au parcours **Data Engineer** de Simplon. Il a pour objectif d'analyser les ventes d'une PME grâce à une architecture conteneurisée, une base de données relationnelle et des scripts d'importation et d'analyse de données.

---

## 🧠 Objectifs

- Mettre en place une architecture avec deux services (script & base de données)
- Importer les données depuis des sources distantes (Google Sheets)
- Créer et modéliser une base de données SQLite
- Effectuer des analyses SQL simples (chiffre d'affaires, ventes par produit/région)
- Stocker les résultats des analyses

---

## 🛠️ Stack technique

- **Python**
- **SQLite**
- **Docker & Docker Compose**
- **Pandas, Requests**

---

## 🗂️ Structure du projet

Analizor/
│
├── app/                  # Scripts Python
│   ├── main.py           # Point d'entrée principal
│   ├── fetch.py          # Téléchargement des données (HTTP)
│   ├── transform.py      # Traitement et insertion dans la BDD
│   ├── db.py             # Création et connexion à la BDD
│   └── sql_export.py     # Exécution et stockage des requêtes SQL
│
├── database/
│   └── analizor.db       # Base de données SQLite générée
│
├── sql/
│   └── analyze.sql       # Requêtes SQL d’analyse
│
├── docs/
│   └── synthese.txt      # Résultats des analyses
│
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
│
└── requirements.txt      # Dépendances Python

---

## 🧪 Lancer le projet

1. Lancer les services avec Docker :

```bash
docker compose up -d --build
```

2. Résultats :

- La base de données est créée dans `database/analizor.db`
- Les résultats des analyses SQL sont stockés et visibles dans `docs/synthese.txt`

---

## 🗃️ Requêtes SQL réalisées

- Chiffre d'affaires total  
- Ventes par produit  
- Ventes par région  

Toutes les requêtes sont dans le fichier [`analyze.sql`](sql/analyze.sql).

---

## 📄 Schémas

- Schéma de l'architecture : `docs/architecture.drawio`  
- MCD : `docs/mcd.drawio`

---

## 👤 Auteur

- **Hamza Kachmir**  