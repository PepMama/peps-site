# PREPA’PEPS Site Web

Site vitrine statique de PREPA’PEPS — Le mouvement, sixième sens de l’être humain.

## Arborescence

```text
peps-site/
├── 404.html
├── index.html
├── pages/
├── assets/
│   ├── css/
│   ├── images/
│   └── js/
├── scripts/
│   └── build-shared.js
├── robots.txt
└── sitemap.xml
```

## Récupérer le projet avec Git

Vérifiez d'abord que [Git](https://git-scm.com/) est installé sur votre ordinateur,
puis exécutez les commandes suivantes dans un terminal :

```bash
git clone <URL_DU_DEPOT>
cd peps-site
```

Remplacez `<URL_DU_DEPOT>` par l'adresse HTTPS ou SSH du dépôt Git. Par exemple :

```bash
git clone https://github.com/utilisateur/peps-site.git
cd peps-site
```

Le projet étant un site statique, aucune installation de dépendances n'est
nécessaire. Vous pouvez ensuite ouvrir `index.html` directement dans votre
navigateur.

## Développement

Le site peut être ouvert directement dans le navigateur depuis `index.html`.

Les pages HTML restent statiques et déployables telles quelles. Les blocs partagés
du site, comme les métadonnées, Open Graph, le header, la hero et le footer, sont
centralisés dans `scripts/build-shared.js`.

Après modification d'un élément partagé, régénérer les pages avec :

```bash
node scripts/build-shared.js
```

### Lien vers l'application

Pour activer le bouton « Mon espace », remplacez la valeur `#` de `appUrl` dans
`scripts/build-shared.js` par l'URL de connexion à l'application, puis relancez
la commande de build ci-dessus.

## Pages

- Accueil
- Notre ADN
- Notre accompagnement
- Déroulement d'une prestation
- Contact
- Veille
- Mentions légales
