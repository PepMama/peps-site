const fs = require('fs');

const site = {
    baseUrl: 'https://prepapeps.com',
    author: 'PEPS - Performance énergétique, préparation sportive',
    keywords: 'Coach sportif, préparation physique, suivi athlétique, remise en forme, sport collectif, sport individuel',
    image: 'https://prepapeps.com/assets/images/LOGO/COULEUR/logo-complet.png',
};

const pages = [
    {
        path: 'index.html',
        title: "PEPS - Page d'accueil",
        description: "PEPS, Performance Énergétique et Performance Sportive, accompagne ses clients dans leur accomplissement sportif, en se basant sur la proximité, l'adaptabilité et le partage, pour une performance physique et mentale durable",
        canonical: `${site.baseUrl}/`,
    },
    {
        path: 'pages/adn.html',
        title: 'PEPS - Notre ADN',
        description: "Découvrez l'ADN de PEPS, une structure dédiée à la performance sportive et énergétique, centrée sur l'adaptabilité, la proximité et le partage. Inspirée par la science du mouvement et l'accompagnement personnalisé.",
        canonical: `${site.baseUrl}/pages/adn.html`,
        background: 'url-adn',
        active: 'adn',
    },
    {
        path: 'pages/accompagnement.html',
        title: 'PEPS - Accompagnement',
        description: "PEPS propose un accompagnement sportif sur mesure : préparation athlétique, remise en forme, réathlétisation après traumatisme. Adapté à vos objectifs, que ce soit pour un événement, une saison ou pour maintenir votre condition physique.",
        canonical: `${site.baseUrl}/pages/accompagnement.html`,
        background: 'url-accompagnement',
        active: 'accompagnement',
    },
    {
        path: 'pages/comment-ca-marche.html',
        title: 'PEPS - Comment ça marche ?',
        description: "Découvrez comment PEPS, spécialiste en performance énergétique et préparation sportive, vous accompagne à travers des étapes clés pour atteindre vos objectifs sportifs. Suivi personnalisé, tests, et plans d'entraînement adaptés à vos besoins.",
        canonical: `${site.baseUrl}/pages/comment-ca-marche.html`,
        background: 'url-how',
        active: 'comment-ca-marche',
    },
    {
        path: 'pages/contact.html',
        title: 'PEPS - Nous contacter',
        description: 'Contactez PEPS pour échanger sur un accompagnement sportif, une préparation physique ou une remise en forme personnalisée.',
        canonical: `${site.baseUrl}/pages/contact.html`,
        background: 'url-contact',
        active: 'contact',
    },
    {
        path: 'pages/mentions-legales.html',
        title: 'PEPS - Mentions légales',
        description: 'Mentions légales du site PEPS, Performance Énergétique et Préparation Sportive.',
        canonical: `${site.baseUrl}/pages/mentions-legales.html`,
        background: 'url-how',
        active: null,
    },
    {
        path: 'pages/veille.html',
        title: 'PEPS - Veille',
        description: "Consultez la veille scientifique de PEPS, un accompagnement sportif fondé sur les dernières recherches en performance physique et mentale.",
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
    <link rel="icon" type="image/png" href="${prefix}assets/images/LOGO/COULEUR/logo-peps.png">
    <meta name="description" content="${escapeAttribute(page.description)}">${robots}
    <meta name="keywords" content="${escapeAttribute(site.keywords)}">
    <meta name="author" content="${escapeAttribute(site.author)}">
    <link rel="canonical" href="${page.canonical}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="fr_FR">
    <meta property="og:site_name" content="PEPS">
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

function pageChrome(page) {
    const nav = [
        navLink(page, 'accueil', '../index.html', 'Accueil'),
        navLink(page, 'adn', 'adn.html', 'Adn'),
        navLink(page, 'accompagnement', 'accompagnement.html', 'Accompagnement'),
        navLink(page, 'veille', 'veille.html', 'Veille'),
        navLink(page, 'comment-ca-marche', 'comment-ca-marche.html', 'Comment ça marche'),
    ].join('\n                ');

    return `<div class="background-img ${page.background}"></div>
    <header class="header">
        <div class="test">
            <div class="header-logo">
                <img src="../assets/images/LOGO/COULEUR/icon.png" alt="Logo PEPS" decoding="async">
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
            <a class="btn" href="contact.html">Nous Contacter</a>
        </div>
    </header>

    <section class="hero">
        <div class="hero-text">
            <p class="hero-brand">PEPS</p>
            <p>Performance Énergétique <br> Préparation Sportive</p>
            <a class="btn" href="contact.html">Nous Contacter</a>
        </div>
    </section>`;
}

function footer(isHome) {
    const href = isHome ? 'pages/mentions-legales.html' : 'mentions-legales.html';
    return `<footer>
        <p>&copy; 2024 PEPS - Développé par Pépin Maëlic | <a class="link-footer" href="${href}">Mentions légales</a> </p>
    </footer>`;
}

for (const page of pages) {
    const isHome = page.path === 'index.html';
    let html = fs.readFileSync(page.path, 'utf8');

    html = html.replace(/<head>[\s\S]*?<\/head>/, head(page, isHome));

    if (!isHome) {
        html = html.replace(
            /<div class="background-img[\s\S]*?<\/section>\n\n    <main>/,
            `${pageChrome(page)}\n\n    <main>`,
        );
    }

    html = html.replace(/<footer>[\s\S]*?<\/footer>/, footer(isHome));
    fs.writeFileSync(page.path, html);
}
