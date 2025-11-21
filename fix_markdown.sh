#!/bin/bash
# Script para corrigir problemas comuns de markdown

FILE="calculadoraComPadroes/GUIA_EDUCACIONAL_COMPLETO.md"
BACKUP="${FILE}.backup"

# Fazer backup
cp "$FILE" "$BACKUP"

# Remover dois pontos de cabeçalhos (MD026)
sed -i '' 's/^\(#\{1,6\} .*\):$/\1/' "$FILE"

echo "✅ Correções aplicadas!"
echo "📋 Backup salvo em: $BACKUP"
