#!/bin/bash

echo "Déploiement du projet Docker Compose..."

docker compose down

docker compose up -d --build

echo "Déploiement terminé avec succès."