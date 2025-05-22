# !/bin/bash
rm -rf ./dist;
npm run build;
npx gulp build:icons;
npm link;
n8n;
