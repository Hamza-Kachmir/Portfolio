import os
import logging
import pandas as pd

# Configuration des logs
logging.basicConfig(level=logging.INFO)

# Import des fonctions
from app.fetch import fetch_csv_data
from app.transform import transform_data
from app.db import get_connection, create_tables, insert_raw_data
from app.sql_export import export_summary_from_sql

def main():
    logging.info("Démarrage du pipeline ANALIZOR")

    # Étape 1 : Télécharger les données CSV
    logging.info("[Étape 1] Téléchargement des données externes")
    dataframes = fetch_csv_data()

    # Étape 2 : Transformer les données
    logging.info("[Étape 2] Transformation des données")
    produits, magasins, ventes = transform_data(dataframes)

    # Étape 3 : Connexion à la base de données et création des tables
    logging.info("[Étape 3] Création de la base de données")
    conn = get_connection()
    create_tables(conn)

    # Étape 4 : Insertion des données en base
    logging.info("[Étape 4] Insertion des données")
    insert_raw_data(conn, "produits", produits)
    insert_raw_data(conn, "magasins", magasins)
    insert_raw_data(conn, "ventes", ventes)

    # Étape 5 : Génération du fichier synthèse depuis la base avec des requêtes SQL
    logging.info("[Étape 5] Export des résultats (via SQL)")
    export_summary_from_sql()

    logging.info("Pipeline ANALIZOR exécuté avec succès")

if __name__ == "__main__":
    main()