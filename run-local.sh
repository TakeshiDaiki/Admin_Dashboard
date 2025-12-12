#!/bin/bash

# Script para correr el proyecto Admin Dashboard en localhost
# Requiere: Node.js 20, npm, y MongoDB corriendo en puerto 27017

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "========================================="
echo "Admin Dashboard - Ejecutor Local"
echo "========================================="
echo ""
echo "Verificando requisitos..."
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    exit 1
fi
NODE_VERSION=$(node -v)
echo "✓ Node.js: $NODE_VERSION"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado"
    exit 1
fi
NPM_VERSION=$(npm -v)
echo "✓ npm: $NPM_VERSION"

echo ""
echo "========================================="
echo "Pasos para correr el proyecto:"
echo "========================================="
echo ""
echo "1. Asegúrate de que MongoDB está corriendo en puerto 27017"
echo "   Opción A (Local): mongod"
echo "   Opción B (Docker): docker run -d -p 27017:27017 --name mongo mongo:latest"
echo "   Opción C (MongoDB Atlas): Usa una URL en backend/.env"
echo ""
echo "2. En Terminal 1 - Inicia el Backend (Puerto 3001):"
echo "   cd backend && npm run dev"
echo ""
echo "3. En Terminal 2 - Inicia el Frontend (Puerto 3000):"
echo "   cd frontend && npm run dev"
echo ""
echo "========================================="
echo ""
echo "Accede a:"
echo "  • Frontend: http://localhost:3000"
echo "  • API Docs: http://localhost:3001/api-docs"
echo ""
