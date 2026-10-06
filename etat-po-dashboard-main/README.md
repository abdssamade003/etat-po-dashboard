# etat-po-dashboard (Dongfeng Parts)

Dashboard pièces Dongfeng : `public/index.html` (app complète, fichier unique) + `server.mjs` (sert la page et le proxy du chat IA).

## Lancer en local
```bash
node server.mjs          # Node >= 22, http://localhost:3000
npm test
```

## Variables d'environnement
Voir `.env.example`. Sans `AI_API_KEY`, `AI_MODEL`, `APP_ORIGINS` et un token (ou `CHAT_PUBLIC_ACCESS=true`), le chat répond `not_configured`; le reste du dashboard marche.

## Déploiement
- **Docker / Coolify / Render** : `docker build -t dongfeng . && docker run -p 3000:3000 --env-file .env dongfeng` (healthcheck `/health`).
- **GitHub Pages** (statique, sans chat) : workflow `.github/workflows/pages.yml` publie `public/`. Pour activer le chat, déployer le backend ailleurs et mettre son URL dans `<meta name="df-chat-api" content="...">` de `index.html`, puis ajouter l'URL Pages dans `APP_ORIGINS`.
