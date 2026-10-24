/* DressIn : illustrations de vêtements, couleurs, catégories et dressing d'exemple.
   Partagé par le site (index.html) et la vidéo de présentation (video/promo.html). */
(function (root) {
  'use strict';

  const COLORS = [
    { id: 'noir', name: 'Noir', hex: '#1F1F24', neutral: true },
    { id: 'blanc', name: 'Blanc', hex: '#F7F7F3', neutral: true },
    { id: 'gris', name: 'Gris', hex: '#9C9FA8', neutral: true },
    { id: 'beige', name: 'Beige', hex: '#DCC6A2', neutral: true },
    { id: 'camel', name: 'Camel', hex: '#B9874F', neutral: true },
    { id: 'marron', name: 'Marron', hex: '#6B4430', neutral: true },
    { id: 'marine', name: 'Marine', hex: '#1F2A4D', neutral: true },
    { id: 'denim', name: 'Bleu jean', hex: '#4A6FA5', neutral: true },
    { id: 'ciel', name: 'Bleu ciel', hex: '#A7C8E8', neutral: false },
    { id: 'sauge', name: 'Vert sauge', hex: '#9DB08E', neutral: false },
    { id: 'kaki', name: 'Kaki', hex: '#6E6C3C', neutral: false },
    { id: 'vert', name: 'Vert', hex: '#2E7D4F', neutral: false },
    { id: 'jaune', name: 'Jaune', hex: '#EDBE3F', neutral: false },
    { id: 'orange', name: 'Orange', hex: '#E5803A', neutral: false },
    { id: 'rouge', name: 'Rouge', hex: '#C8322B', neutral: false },
    { id: 'bordeaux', name: 'Bordeaux', hex: '#6E1F2E', neutral: false },
    { id: 'rose', name: 'Rose', hex: '#F0A8BB', neutral: false },
    { id: 'violet', name: 'Violet', hex: '#7B5EA7', neutral: false },
  ];
  const COLOR_BY_ID = Object.fromEntries(COLORS.map(c => [c.id, c]));

  const CATS = [
    { id: 'haut', label: 'Hauts', one: 'Haut' },
    { id: 'bas', label: 'Bas', one: 'Bas' },
    { id: 'piece', label: 'Une-pièce', one: 'Une-pièce' },
    { id: 'veste', label: 'Vestes', one: 'Veste' },
    { id: 'chaussures', label: 'Chaussures', one: 'Chaussures' },
    { id: 'accessoire', label: 'Accessoires', one: 'Accessoire' },
  ];

  /* ---- couleur ---- */
  function hexToRgb(h) {
    h = h.replace('#', '');
    return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16));
  }
  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  }
  function mix(a, b, t) {
    const A = hexToRgb(a), B = hexToRgb(b);
    return rgbToHex(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t);
  }
  function lum(h) {
    const [r, g, b] = hexToRgb(h).map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  /* ---- formes (viewBox 100 × 100) ---- */
  const circ = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;

  const SHAPES = {
    tshirt: {
      label: 'T-shirt', cat: 'haut',
      fills: [
        ['base', 'M36 14 L44 12 Q50 19 56 12 L64 14 L84 26 L77 40 L68 35 L68 86 Q50 88 32 86 L32 35 L23 40 L16 26 Z'],
        ['dark', 'M44 12 Q50 19 56 12 L57.6 12.6 Q50 23 42.4 12.6 Z'],
      ],
      lines: ['M32 35 L33 22', 'M68 35 L67 22', 'M32.4 82 Q50 84 67.6 82', 'M19.5 33 L25.5 37', 'M80.5 33 L74.5 37'],
    },
    chemise: {
      label: 'Chemise', cat: 'haut',
      fills: [
        ['base', 'M37 13 L45 10 L50 16 L55 10 L63 13 L80 22 L90 76 L80 79 L70 40 L70 88 Q50 90 30 88 L30 40 L20 79 L10 76 L20 22 Z'],
        ['light', 'M45 10 L50 16 L47 24 L40 14 Z'],
        ['light', 'M55 10 L50 16 L53 24 L60 14 Z'],
        ['dark', 'M11.1 70 L21.5 73 L20 79 L10 76 Z'],
        ['dark', 'M88.9 70 L78.5 73 L80 79 L90 76 Z'],
        ['light', circ(50, 31, 1.3)], ['light', circ(50, 44, 1.3)], ['light', circ(50, 57, 1.3)], ['light', circ(50, 70, 1.3)],
      ],
      lines: ['M50 18 L50 88', 'M56 34 L64 34 L64 43 Q60 45 56 43 Z', 'M30 40 L30 46', 'M70 40 L70 46'],
    },
    pull: {
      label: 'Pull', cat: 'haut',
      fills: [
        ['base', 'M36 15 Q50 22 64 15 L80 22 L90 76 L80 79 L70 42 L70 86 Q50 88 30 86 L30 42 L20 79 L10 76 L20 22 Z'],
        ['dark', 'M38 13 Q50 20 62 13 L64.5 15.4 Q50 24.5 35.5 15.4 Z'],
        ['dark', 'M30 80 Q50 82 70 80 L70 86 Q50 88 30 86 Z'],
        ['dark', 'M11.1 70 L21.6 73 L20 79 L10 76 Z'],
        ['dark', 'M88.9 70 L78.4 73 L80 79 L90 76 Z'],
      ],
      lines: [
        'M50 27 Q46 32 50 37 Q54 42 50 47 Q46 52 50 57 Q54 62 50 67 Q46 72 50 77',
        'M43 28 L43 77', 'M57 28 L57 77',
        'M36 81 L36 86.5', 'M43 81.6 L43 87.3', 'M50 82 L50 87.6', 'M57 81.6 L57 87.3', 'M64 81 L64 86.5',
      ],
    },
    sweat: {
      label: 'Sweat à capuche', cat: 'haut',
      fills: [
        ['base', 'M34 17 Q50 25 66 17 L80 24 L90 76 L80 79 L70 42 L70 86 Q50 88 30 86 L30 42 L20 79 L10 76 L20 24 Z'],
        ['dark', 'M33 18 Q31 4 50 4 Q69 4 67 18 Q50 28 33 18 Z'],
        ['base', 'M39 16 Q50 23 61 16 Q60 9 50 9 Q40 9 39 16 Z'],
        ['dark', 'M30 81 Q50 83 70 81 L70 86 Q50 88 30 86 Z'],
        ['dark', 'M11.1 70 L21.6 73 L20 79 L10 76 Z'],
        ['dark', 'M88.9 70 L78.4 73 L80 79 L90 76 Z'],
      ],
      lines: ['M38 60 L62 60 L66 75 L34 75 Z', 'M46 22 L45 38', 'M54 22 L55 38'],
    },
    debardeur: {
      label: 'Débardeur', cat: 'haut',
      fills: [
        ['base', 'M38 12 L44 12 Q50 26 56 12 L62 12 Q62 25 70 33 L70 86 Q50 88 30 86 L30 33 Q38 25 38 12 Z'],
      ],
      lines: ['M44.4 13 Q50 29 55.6 13', 'M31.5 34 Q38.5 27 39.5 13', 'M68.5 34 Q61.5 27 60.5 13', 'M30.4 82 Q50 84 69.6 82'],
    },
    jean: {
      label: 'Jean', cat: 'bas',
      fills: [
        ['base', 'M29.4 17 L70.6 17 L75 90 L56 90 L50 38 L44 90 L25 90 Z'],
        ['dark', 'M30 10 L70 10 L70.6 17 L29.4 17 Z'],
        ['dark', 'M37 9 L40 9 L40 19 L37 19 Z'],
        ['dark', 'M60 9 L63 9 L63 19 L60 19 Z'],
      ],
      lines: ['M50 17 L50 38', 'M53.5 17 L53.5 30 Q53.5 34 50 36', 'M44 17 Q41 26 30 27', 'M56 17 Q59 26 70 27', 'M25.4 85 L44.6 85', 'M55.4 85 L74.6 85'],
    },
    pantalon: {
      label: 'Pantalon', cat: 'bas',
      fills: [
        ['base', 'M29.4 17 L70.6 17 L73 90 L56 90 L50 38 L44 90 L27 90 Z'],
        ['dark', 'M30 10 L70 10 L70.6 17 L29.4 17 Z'],
      ],
      lines: ['M50 17 L50 38', 'M38 22 L36 90', 'M62 22 L64 90', 'M33 17 L36.5 28', 'M67 17 L63.5 28', 'M45 13.5 L55 13.5'],
    },
    short: {
      label: 'Short', cat: 'bas',
      fills: [
        ['base', 'M27.5 25 L72.5 25 L77 66 L54 68 L50 44 L46 68 L23 66 Z'],
        ['dark', 'M28 18 L72 18 L72.5 25 L27.5 25 Z'],
      ],
      lines: ['M50 25 L50 44', 'M43 25 Q40 32 28.5 33', 'M57 25 Q60 32 71.5 33', 'M23.5 61.5 L46.5 63.5', 'M53.5 63.5 L76.5 61.5'],
    },
    jupe: {
      label: 'Jupe', cat: 'bas',
      fills: [
        ['base', 'M34.2 23 L65.8 23 L80 82 Q50 90 20 82 Z'],
        ['dark', 'M35 16 L65 16 L65.8 23 L34.2 23 Z'],
      ],
      lines: ['M42 23 L35 86', 'M50 23 L50 88', 'M58 23 L65 86', 'M38 23 L27 84', 'M62 23 L73 84'],
    },
    robe: {
      label: 'Robe', cat: 'piece',
      fills: [
        ['base', 'M40 10 L43 10 Q50 20 57 10 L60 10 Q61 22 64 30 Q60 36 59 42 L80 88 Q50 95 20 88 L41 42 Q40 36 36 30 Q39 22 40 10 Z'],
        ['dark', 'M39.6 38 Q50 41 60.4 38 L59.6 43.5 Q50 46.5 40.4 43.5 Z'],
      ],
      lines: ['M45 47 L37 90', 'M55 47 L63 90', 'M50 47 L50 92'],
    },
    combi: {
      label: 'Combinaison', cat: 'piece',
      fills: [
        ['base', 'M38 10 L44 10 Q50 21 56 10 L62 10 Q63 22 68 30 L70 46 L76 90 L56 90 L50 54 L44 90 L24 90 L30 46 L32 30 Q37 22 38 10 Z'],
        ['dark', 'M30.6 41 L69.4 41 L70 47 L30 47 Z'],
      ],
      lines: ['M50 47 L50 54', 'M37 52 L35 90', 'M63 52 L65 90'],
    },
    veste: {
      label: 'Veste', cat: 'veste',
      fills: [
        ['base', 'M36 12 L45 9 L50 44 L55 9 L64 12 L81 22 L91 80 L80 83 L71 44 L71 90 L29 90 L29 44 L20 83 L9 80 L19 22 Z'],
        ['white', 'M45 9 L50 44 L55 9 Q50 15 45 9 Z'],
        ['dark', 'M45 9 L40.5 22 L44.5 25.5 L50 44 Z'],
        ['dark', 'M55 9 L59.5 22 L55.5 25.5 L50 44 Z'],
        ['dark', circ(52.5, 57, 1.6)], ['dark', circ(52.5, 69, 1.6)],
      ],
      lines: ['M50 44 L50 90', 'M33 67 L44 67', 'M56 67 L67 67', 'M58 33 L66 33', 'M11.4 71 L21.6 74', 'M88.6 71 L78.4 74'],
    },
    manteau: {
      label: 'Manteau', cat: 'veste',
      fills: [
        ['base', 'M36 10 L45 7 L50 40 L55 7 L64 10 L80 20 L90 82 L79 85 L70 42 L72 96 L28 96 L30 42 L21 85 L10 82 L20 20 Z'],
        ['white', 'M45 7 L50 40 L55 7 Q50 13 45 7 Z'],
        ['dark', 'M45 7 L39 22 L43 26 L50 40 Z'],
        ['dark', 'M55 7 L61 22 L57 26 L50 40 Z'],
        ['dark', 'M29.7 54 L70.3 54 L70.5 59.5 L29.5 59.5 Z'],
        ['light', 'M46.5 52.5 L53.5 52.5 L53.5 61 L46.5 61 Z'],
        ['dark', circ(44, 46, 1.5)], ['dark', circ(56, 46, 1.5)], ['dark', circ(44, 70, 1.5)], ['dark', circ(56, 70, 1.5)],
      ],
      lines: ['M50 40 L50 52.5', 'M50 61 L50 96', 'M12.3 76 L22.4 79', 'M87.7 76 L77.6 79'],
    },
    baskets: {
      label: 'Baskets', cat: 'chaussures',
      fills: [
        ['base', 'M10 66 Q10 52 18 48 Q26 46 32 44 L44 36 Q50 32 56 38 L66 48 Q82 52 90 58 Q92 62 92 64 Z'],
        ['dark', 'M10 66 Q10 54 16 50 L20 52 Q15.5 58 16.5 66 Z'],
        ['white', 'M8 66 L92 64 Q94 72 88 76 L12 76 Q6 74 8 66 Z'],
      ],
      lines: ['M45 40 L51 45', 'M49 37 L55 42', 'M41.5 43.5 L47 48', 'M70 50 Q79 55 79 64', 'M27 58 Q46 52 64 58', 'M10 71 L90 69.5'],
    },
    bottines: {
      label: 'Bottines', cat: 'chaussures',
      fills: [
        ['base', 'M26 12 L52 12 L54 52 Q60 56 76 60 Q88 64 88 80 L22 80 L24 40 Z'],
        ['dark', 'M40 22 L52 22 L53 50 Q47 52 42 50 Z'],
        ['dark', 'M22 80 L88 80 Q90 86 86 88 L38 88 L38 92 L24 92 L22 86 Z'],
      ],
      lines: ['M26 17 L52 17', 'M30 12 L30 6 L36 6 L36 12', 'M60 56 Q64 66 62 80'],
    },
    escarpins: {
      label: 'Escarpins', cat: 'chaussures',
      fills: [
        ['dark', 'M76 52 L84 48 L82 90 L78.5 90 Z'],
        ['base', 'M10 74 Q8 66 16 63 Q26 60 36 62 Q50 64 62 56 Q70 48 76 40 L84 42 Q86 48 82 54 Q70 66 46 74 Z'],
        ['light', 'M36 62 Q50 64 62 56 Q70 48 76 40 Q67 51 58 55.5 Q47 60.5 36 62 Z'],
        ['dark', 'M10 74 L46 74 Q66 68 82 54 L83.6 57 Q66 72 46 77 L12 77 Q9 76 10 74 Z'],
      ],
      lines: [],
    },
    sac: {
      label: 'Sac', cat: 'accessoire',
      fills: [
        ['dark', 'M34 40 Q34 14 50 14 Q66 14 66 40 L61 40 Q61 19 50 19 Q39 19 39 40 Z'],
        ['base', 'M18 40 L82 40 L86 88 Q86 90 84 90 L16 90 Q14 90 14 88 Z'],
        ['dark', 'M18 40 L82 40 L80.6 58 Q50 66 19.4 58 Z'],
        ['light', 'M46 58 L54 58 L54 66 L46 66 Z'],
      ],
      lines: ['M17 84 L83 84'],
    },
    casquette: {
      label: 'Casquette', cat: 'accessoire',
      fills: [
        ['base', 'M22 62 Q20 30 50 28 Q76 28 78 56 L78 62 Z'],
        ['dark', 'M62 57 Q84 52 96 60 Q92 67 74 67 L60 63 Z'],
        ['dark', circ(50, 28, 2.6)],
      ],
      lines: ['M50 30 L49 62', 'M48 30 Q35 38 34 62', 'M52 30 Q65 37 66 59', 'M22 57 L62 57'],
    },
    bonnet: {
      label: 'Bonnet', cat: 'accessoire',
      fills: [
        ['light', circ(50, 20, 8)],
        ['base', 'M26 62 Q26 26 50 24 Q74 26 74 62 Z'],
        ['dark', 'M23 58 L77 58 L78 74 L22 74 Z'],
      ],
      lines: ['M30 60 L30 72', 'M38 60 L38 72', 'M46 60 L46 72', 'M54 60 L54 72', 'M62 60 L62 72', 'M70 60 L70 72', 'M40 30 Q36 44 37 58', 'M60 30 Q64 44 63 58'],
    },
    echarpe: {
      label: 'Écharpe', cat: 'accessoire',
      fills: [
        ['base', 'M52 26 L66 24 L70 82 L56 84 Z'],
        ['base', 'M30 12 Q50 20 70 12 L72 26 Q50 34 28 26 Z'],
        ['dark', 'M53.2 40 L67 38 L67.5 44 L53.7 46 Z'],
        ['dark', 'M54.6 60 L68.4 58 L68.9 64 L55.1 66 Z'],
      ],
      lines: ['M57 84 L57 90', 'M60 83.6 L60 89.6', 'M63 83.2 L63 89.2', 'M66 82.8 L66 88.8', 'M69 82.4 L69 88.4', 'M34 20 Q50 27 66 20'],
    },
  };

  /* genre et nombre, pour accorder la couleur (« chemise noire », « baskets blanches ») */
  const GRAM = {
    tshirt: ['m'], chemise: ['f'], pull: ['m'], sweat: ['m'], debardeur: ['m'], jean: ['m'], pantalon: ['m'],
    short: ['m'], jupe: ['f'], robe: ['f'], combi: ['f'], veste: ['f'], manteau: ['m'], baskets: ['f', 1],
    bottines: ['f', 1], escarpins: ['m', 1], sac: ['m'], casquette: ['f'], bonnet: ['m'], echarpe: ['f'],
  };
  for (const [id, [g, pl]] of Object.entries(GRAM)) { SHAPES[id].g = g; SHAPES[id].pl = !!pl; }

  const FORMS = {
    noir: ['noir', 'noire', 'noirs', 'noires'], blanc: ['blanc', 'blanche', 'blancs', 'blanches'],
    gris: ['gris', 'grise', 'gris', 'grises'], beige: ['beige', 'beige', 'beiges', 'beiges'],
    vert: ['vert', 'verte', 'verts', 'vertes'], jaune: ['jaune', 'jaune', 'jaunes', 'jaunes'],
    rouge: ['rouge', 'rouge', 'rouges', 'rouges'], rose: ['rose', 'rose', 'roses', 'roses'],
    violet: ['violet', 'violette', 'violets', 'violettes'],
  };
  function adj(colorId, shapeId) {
    const c = COLOR_BY_ID[colorId];
    if (!c) return '';
    const s = SHAPES[shapeId];
    const f = FORMS[colorId] || [c.name.toLowerCase()];
    return f[(s && s.g === 'f' ? 1 : 0) + (s && s.pl ? 2 : 0)] || f[0];
  }

  const SHAPES_BY_CAT = {};
  for (const [id, s] of Object.entries(SHAPES)) (SHAPES_BY_CAT[s.cat] = SHAPES_BY_CAT[s.cat] || []).push(id);

  function garmentSVG(shapeId, hex) {
    const s = SHAPES[shapeId] || SHAPES.tshirt;
    hex = hex || '#9C9FA8';
    const L = lum(hex);
    const tone = {
      base: hex,
      dark: L < 0.06 ? mix(hex, '#ffffff', 0.16) : mix(hex, '#000000', 0.2),
      light: L > 0.7 ? mix(hex, '#000000', 0.07) : mix(hex, '#ffffff', 0.38),
      white: '#F4F4F1',
    };
    const line = L < 0.1 ? mix(hex, '#ffffff', 0.4) : mix(hex, '#000000', 0.4);
    const fills = s.fills.map(([k, d]) =>
      `<path d="${d}" fill="${tone[k]}" stroke="${k === 'white' ? '#9a9a96' : line}" stroke-width="1.3" stroke-linejoin="round"/>`).join('');
    const lines = s.lines.length
      ? `<path d="${s.lines.join(' ')}" fill="none" stroke="${line}" stroke-width="1.05" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>`
      : '';
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${fills}${lines}</svg>`;
  }

  /* ---- penderie d'exemple ---- */
  const ex = (id, name, cat, shape, color, occasions, seasons) =>
    ({ id, name, cat, shape, color, occasions, seasons, photo: null, example: true });

  const SAMPLE_ITEMS = [
    ex('ex-01', 'T-shirt blanc', 'haut', 'tshirt', 'blanc', ['quotidien', 'sport'], ['chaud', 'mi-saison']),
    ex('ex-02', 'Chemise oxford', 'haut', 'chemise', 'ciel', ['travail', 'quotidien'], ['chaud', 'mi-saison']),
    ex('ex-03', 'Pull col rond', 'haut', 'pull', 'sauge', ['quotidien', 'travail'], ['mi-saison', 'froid']),
    ex('ex-04', 'Sweat gris chiné', 'haut', 'sweat', 'gris', ['quotidien', 'sport'], ['mi-saison', 'froid']),
    ex('ex-05', 'Débardeur noir', 'haut', 'debardeur', 'noir', ['soiree', 'sport', 'quotidien'], ['chaud']),
    ex('ex-06', 'Jean brut', 'bas', 'jean', 'denim', ['quotidien', 'soiree'], []),
    ex('ex-07', 'Chino beige', 'bas', 'pantalon', 'beige', ['travail', 'quotidien'], ['chaud', 'mi-saison']),
    ex('ex-08', 'Jupe plissée', 'bas', 'jupe', 'noir', ['soiree', 'travail'], ['chaud', 'mi-saison']),
    ex('ex-09', 'Short kaki', 'bas', 'short', 'kaki', ['quotidien', 'sport'], ['chaud']),
    ex('ex-10', 'Robe portefeuille', 'piece', 'robe', 'bordeaux', ['soiree'], ['chaud', 'mi-saison']),
    ex('ex-11', 'Blazer marine', 'veste', 'veste', 'marine', ['travail', 'soiree'], ['mi-saison']),
    ex('ex-12', 'Manteau camel', 'veste', 'manteau', 'camel', ['travail', 'quotidien', 'soiree'], ['froid']),
    ex('ex-13', 'Baskets blanches', 'chaussures', 'baskets', 'blanc', ['quotidien', 'sport', 'travail'], []),
    ex('ex-14', 'Bottines chelsea', 'chaussures', 'bottines', 'marron', ['quotidien', 'travail', 'soiree'], ['mi-saison', 'froid']),
    ex('ex-15', 'Escarpins rouges', 'chaussures', 'escarpins', 'rouge', ['soiree', 'travail'], []),
    ex('ex-16', 'Sac camel', 'accessoire', 'sac', 'camel', ['quotidien', 'travail', 'soiree'], []),
    ex('ex-17', 'Casquette marine', 'accessoire', 'casquette', 'marine', ['quotidien', 'sport'], ['chaud', 'mi-saison']),
    ex('ex-18', 'Bonnet moutarde', 'accessoire', 'bonnet', 'jaune', ['quotidien'], ['froid']),
  ];

  const SAMPLE_OUTFITS = [
    { id: 'ex-o1', name: 'Lundi au bureau', occasion: 'travail', mode: 'separates', example: true, wornDates: [],
      sel: { outer: 'ex-11', top: 'ex-02', bottom: 'ex-07', feet: 'ex-14', acc: 'ex-16' } },
    { id: 'ex-o2', name: 'Dîner en ville', occasion: 'soiree', mode: 'piece', example: true, wornDates: [],
      sel: { outer: null, piece: 'ex-10', feet: 'ex-15', acc: 'ex-16' } },
    { id: 'ex-o3', name: 'Dimanche au marché', occasion: 'quotidien', mode: 'separates', example: true, wornDates: [],
      sel: { outer: null, top: 'ex-01', bottom: 'ex-06', feet: 'ex-13', acc: 'ex-17' } },
  ];

  root.Penderie = { COLORS, COLOR_BY_ID, CATS, SHAPES, SHAPES_BY_CAT, garmentSVG, adj, mix, lum, hexToRgb, SAMPLE_ITEMS, SAMPLE_OUTFITS };
})(typeof window !== 'undefined' ? window : globalThis);
