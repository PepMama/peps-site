const fs = require('fs');

const site = {
    baseUrl: 'https://prepapeps.com',
    // Remplacer « # » par l'URL de connexion à l'application, puis relancer le build.
    appUrl: '#',
    author: 'PREPA’PEPS - Le mouvement, sixième sens de l’être humain',
    keywords: 'Coach sportif, préparation physique, suivi athlétique, remise en forme, sport collectif, sport individuel',
    image: 'https://prepapeps.com/assets/images/LOGO/COULEUR/Logo_modifie.png',
};

const pages = [
    {
        path: 'index.html',
        title: "PREPA’PEPS - Page d'accueil",
        description: "PREPA’PEPS, le mouvement, sixième sens de l’être humain, accompagne ses clients dans leur accomplissement sportif avec proximité, adaptabilité et partage.",
        canonical: `${site.baseUrl}/`,
    },
    {
        path: 'pages/adn.html',
        title: 'PREPA’PEPS - Notre ADN',
        description: "Découvrez l'ADN de PREPA’PEPS, une structure dédiée au mouvement et à la performance sportive, centrée sur l'adaptabilité, la proximité et le partage.",
        canonical: `${site.baseUrl}/pages/adn.html`,
        background: 'url-adn',
        active: 'adn',
    },
    {
        path: 'pages/accompagnement.html',
        title: 'PREPA’PEPS - Ton accompagnement',
        description: "Découvre l'accompagnement sportif sur mesure proposé par PREPA’PEPS : préparation athlétique, réathlétisation, remise en forme, bien-être et mobilité durable.",
        canonical: `${site.baseUrl}/pages/accompagnement.html`,
        background: 'url-accompagnement',
        active: 'accompagnement',
    },
    {
        path: 'pages/comment-ca-marche.html',
        title: 'PREPA’PEPS - Comment ça marche ?',
        description: "Découvrez comment PREPA’PEPS vous accompagne à travers des étapes clés pour atteindre vos objectifs sportifs : suivi personnalisé, tests et plans d'entraînement adaptés.",
        canonical: `${site.baseUrl}/pages/comment-ca-marche.html`,
        background: 'url-how',
        active: 'comment-ca-marche',
    },
    {
        path: 'pages/contact.html',
        title: 'PREPA’PEPS - Nous contacter',
        description: 'Contactez PREPA’PEPS pour échanger sur un accompagnement sportif, une préparation physique ou une remise en forme personnalisée.',
        canonical: `${site.baseUrl}/pages/contact.html`,
        background: 'url-contact',
        active: 'contact',
    },
    {
        path: 'pages/mentions-legales.html',
        title: 'PREPA’PEPS - Mentions légales',
        description: 'Mentions légales du site PREPA’PEPS, le mouvement, sixième sens de l’être humain.',
        canonical: `${site.baseUrl}/pages/mentions-legales.html`,
        background: 'url-how',
        active: null,
    },
    {
        path: 'pages/veille.html',
        title: 'PREPA’PEPS - Veille',
        description: "Consultez la veille scientifique de PREPA’PEPS, un accompagnement sportif fondé sur les dernières recherches en performance physique et mentale.",
        canonical: `${site.baseUrl}/pages/veille.html`,
        background: 'url-veille',
        active: 'veille',
        robots: 'noindex, follow',
    },
];

function escapeAttribute(value) {
    return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function head(page, isHome) {
    const prefix = isHome ? '' : '../';
    const robots = page.robots ? `\n    <meta name="robots" content="${escapeAttribute(page.robots)}">` : '';

    return `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title}</title>
    <link rel="stylesheet" href="${prefix}assets/css/styles.css">
    <link rel="icon" type="image/png" href="${prefix}assets/images/LOGO/COULEUR/Logo_modifie.png">
    <meta name="description" content="${escapeAttribute(page.description)}">${robots}
    <meta name="keywords" content="${escapeAttribute(site.keywords)}">
    <meta name="author" content="${escapeAttribute(site.author)}">
    <link rel="canonical" href="${page.canonical}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="fr_FR">
    <meta property="og:site_name" content="PREPA’PEPS">
    <meta property="og:title" content="${escapeAttribute(page.title)}">
    <meta property="og:description" content="${escapeAttribute(page.description)}">
    <meta property="og:url" content="${page.canonical}">
    <meta property="og:image" content="${site.image}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeAttribute(page.title)}">
    <meta name="twitter:description" content="${escapeAttribute(page.description)}">
    <meta name="twitter:image" content="${site.image}">
</head>`;
}

function navLink(page, key, href, label) {
    const current = page.active === key ? ' aria-current="page"' : '';
    return `<li><a href="${href}"${current}>${label}</a></li>`;
}

function appLink(className) {
    const pending = site.appUrl === '#'
        ? ' aria-disabled="true" title="Lien bientôt disponible"'
        : '';
    return `<a class="${className}" href="${site.appUrl}"${pending}>Mon espace</a>`;
}

function pageChrome(page) {
    const nav = [
        navLink(page, 'accueil', '../index.html', 'Accueil'),
        navLink(page, 'adn', 'adn.html', 'ADN'),
        navLink(page, 'accompagnement', 'accompagnement.html', 'Ton accompagnement'),
        navLink(page, 'veille', 'veille.html', 'Veille & Suivi'),
        navLink(page, 'comment-ca-marche', 'comment-ca-marche.html', 'Comment ça marche'),
        `<li class="nav-app-link">${appLink('')}</li>`,
    ].join('\n                ');

    return `<div class="background-img ${page.background}"></div>
    <header class="header">
        <div class="test">
            <div class="header-logo">
                <img src="../assets/images/LOGO/COULEUR/Logo_modifie.png" alt="Logo PREPA’PEPS" decoding="async">
            </div>
            <button class="hamburger" id="hamburger" type="button" aria-label="Ouvrir le menu" aria-controls="nav-menu" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        <nav class="header-nav" id="nav-menu">
            <ul>
                ${nav}
            </ul>
        </nav>
        <div class="header-btn">
            ${appLink('btn btn-space')}
            <a class="btn" href="contact.html">Nous Contacter</a>
        </div>
    </header>

    <section class="hero">
        <div class="hero-text">
            <p class="hero-brand">PREPA’PEPS</p>
            <p>Le mouvement, sixième sens<br>de l’être humain</p>
            <a class="btn" href="contact.html">Nous Contacter</a>
        </div>
    </section>`;
}

function footer(isHome) {
    const href = isHome ? 'pages/mentions-legales.html' : 'mentions-legales.html';
    return `<footer>
        <p>&copy; 2024 PREPA’PEPS - Développé par Pépin Maëlic | <a class="link-footer" href="${href}">Mentions légales</a> </p>
    </footer>`;
}

for (const page of pages) {
    const isHome = page.path === 'index.html';
    let html = fs.readFileSync(page.path, 'utf8');

    html = html.replace(/<head>[\s\S]*?<\/head>/, head(page, isHome));

    if (isHome) {
        html = html.replace(
            /<a class="btn home-space"[\s\S]*?<\/a>/,
            appLink('btn home-space'),
        );
    } else {
        html = html.replace(
            /<div class="background-img[\s\S]*?<\/section>\n\n    <main>/,
            `${pageChrome(page)}\n\n    <main>`,
        );
    }

    html = html.replace(/<footer>[\s\S]*?<\/footer>/, footer(isHome));
    fs.writeFileSync(page.path, html);
}
