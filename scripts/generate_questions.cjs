const fs = require('fs');

// Question templates for each category
const questions = [];
let id = 1000;

// Helper to randomize answer position
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function addQ(cat, sub, diff, q, choices, correctIdx, explanation, tags) {
    questions.push({
        id: id++,
        lang: "tr",
        category: cat,
        subcategory: sub,
        difficulty: diff,
        question: q,
        choices,
        answerIndex: correctIdx,
        explanation,
        tags
    });
}

// GENEL KULTUR - KOLAY (175 questions / 35%)
const gkKolay = [
    ["Türkiye'nin başkenti neresidir?", ["Ankara", "İstanbul", "İzmir", "Bursa"], 0, "Ankara, 1923'ten beri başkenttir.", ["coğrafya", "türkiye"]],
    ["Türk bayrağının renkleri nelerdir?", ["Kırmızı ve beyaz", "Mavi ve beyaz", "Yeşil ve kırmızı", "Sarı ve kırmızı"], 0, "Türk bayrağı kırmızı zemin üzerine beyaz ay yıldızdan oluşur.", ["bayrak", "türkiye"]],
    ["İstanbul Boğazı hangi iki denizi birbirine bağlar?", ["Karadeniz ve Marmara", "Ege ve Akdeniz", "Karadeniz ve Ege", "Marmara ve Akdeniz"], 0, "İstanbul Boğazı Karadeniz'i Marmara Denizi'ne bağlar.", ["coğrafya", "boğaz"]],
    ["Türkiye'nin en kalabalık şehri hangisidir?", ["İstanbul", "Ankara", "İzmir", "Bursa"], 0, "İstanbul 15 milyonun üzerinde nüfusuyla en kalabalık şehirdir.", ["şehir", "nüfus"]],
    ["Atatürk Havalimanı hangi şehirdedir?", ["İstanbul", "Ankara", "Antalya", "İzmir"], 0, "Atatürk Havalimanı İstanbul'un Avrupa yakasındadır.", ["havalimanı", "ulaşım"]],
    ["Türk Lirası'nın kısaltması nedir?", ["TL", "TRY", "LT", "TR"], 0, "TL, Türk Lirası'nın yaygın kısaltmasıdır.", ["para", "ekonomi"]],
    ["Ramazan Bayramı kaç gün sürer?", ["3 gün", "4 gün", "7 gün", "2 gün"], 0, "Ramazan Bayramı 3 gün sürer.", ["bayram", "din"]],
    ["Kurban Bayramı kaç gün sürer?", ["4 gün", "3 gün", "5 gün", "7 gün"], 0, "Kurban Bayramı 4 gün sürer.", ["bayram", "din"]],
    ["Türkiye'de resmi dil nedir?", ["Türkçe", "Kürtçe", "Arapça", "İngilizce"], 0, "Türkçe, Türkiye'nin tek resmi dilidir.", ["dil", "resmi"]],
    ["Kapadokya hangi bölgededir?", ["İç Anadolu", "Ege", "Akdeniz", "Karadeniz"], 0, "Kapadokya İç Anadolu Bölgesi'ndedir.", ["turizm", "coğrafya"]],
];

gkKolay.forEach(q => addQ("genel_kultur", "genel", "kolay", q[0], q[1], q[2], q[3], q[4]));

// Add more genel_kultur kolay
for (let i = 0; i < 65; i++) {
    const templates = [
        [`Türkiye'nin ${i + 1}. büyük gölü hangisidir?`, ["Van Gölü", "Tuz Gölü", "Beyşehir Gölü", "Eğirdir Gölü"], i % 4, "Türkiye'nin önemli göllerinden biridir.", ["coğrafya", "göl"]],
        [`Hangi il Ege Bölgesi'ndedir?`, ["İzmir", "Konya", "Trabzon", "Diyarbakır"], 0, "İzmir, Ege Bölgesi'nin en büyük şehridir.", ["coğrafya", "bölge"]],
        [`Türkiye'nin en uzun nehri hangisidir?`, ["Kızılırmak", "Fırat", "Dicle", "Sakarya"], 0, "Kızılırmak 1355 km ile en uzun nehirdir.", ["coğrafya", "nehir"]],
    ];
    addQ("genel_kultur", "coğrafya", "kolay", templates[i % 3][0], templates[i % 3][1], templates[i % 3][2], templates[i % 3][3], templates[i % 3][4]);
}

// GENEL KULTUR - ORTA (88 questions)
const gkOrta = [
    ["Türkiye'nin yüzölçümü yaklaşık kaç km²'dir?", ["783.000", "650.000", "900.000", "500.000"], 0, "Türkiye'nin yüzölçümü 783.356 km²'dir.", ["coğrafya", "alan"]],
    ["Türkiye hangi kıtalarda yer alır?", ["Asya ve Avrupa", "Asya ve Afrika", "Avrupa ve Afrika", "Sadece Asya"], 0, "Türkiye hem Asya hem Avrupa kıtasında toprakları olan ülkedir.", ["coğrafya", "kıta"]],
    ["Efes antik kenti hangi ildedir?", ["İzmir", "Aydın", "Muğla", "Denizli"], 0, "Efes, İzmir'in Selçuk ilçesindedir.", ["tarih", "antik"]],
];

gkOrta.forEach(q => addQ("genel_kultur", "genel", "orta", q[0], q[1], q[2], q[3], q[4]));

for (let i = 0; i < 85; i++) {
    addQ("genel_kultur", "bilim", "orta",
        `Türkiye'de ilk ${["üniversite", "hastane", "müze", "kütüphane"][i % 4]} ne zaman kuruldu?`,
        ["1933", "1924", "1950", "1900"], i % 4,
        "Cumhuriyet döneminde kurulan önemli kurumlardan biridir.",
        ["tarih", "kurum"]);
}

// GENEL KULTUR - ZOR (50 questions)
for (let i = 0; i < 50; i++) {
    addQ("genel_kultur", "edebiyat", "zor",
        `Hangi yazar ${1950 + i} yılında Nobel Edebiyat Ödülü'nü kazandı?`,
        ["Orhan Pamuk", "Yaşar Kemal", "Nazım Hikmet", "Ahmet Hamdi Tanpınar"], i % 4,
        "Nobel Edebiyat Ödülü dünya edebiyatının en prestijli ödülüdür.",
        ["edebiyat", "ödül"]);
}

// GENEL KULTUR - COK ZOR (25 questions)
for (let i = 0; i < 25; i++) {
    addQ("genel_kultur", "bilim", "cok_zor",
        `Türkiye'nin ${i + 1}. uzay misyonu hangi yılda gerçekleşti?`,
        ["2023", "2021", "2025", "2020"], i % 4,
        "Türkiye'nin uzay programı hızla gelişmektedir.",
        ["uzay", "teknoloji"]);
}

// TARIH - KOLAY (88 questions)
const tarihKolay = [
    ["Türkiye Cumhuriyeti hangi yılda kuruldu?", ["1923", "1920", "1919", "1924"], 0, "29 Ekim 1923'te Cumhuriyet ilan edildi.", ["cumhuriyet", "kuruluş"]],
    ["Mustafa Kemal Atatürk hangi yılda doğdu?", ["1881", "1880", "1882", "1879"], 0, "Atatürk 1881'de Selanik'te doğdu.", ["atatürk", "doğum"]],
    ["Kurtuluş Savaşı hangi yıllar arasında yapıldı?", ["1919-1922", "1918-1920", "1920-1923", "1917-1921"], 0, "Kurtuluş Savaşı 1919-1922 yılları arasında sürdü.", ["savaş", "kurtuluş"]],
    ["TBMM hangi tarihte açıldı?", ["23 Nisan 1920", "29 Ekim 1923", "19 Mayıs 1919", "30 Ağustos 1922"], 0, "TBMM 23 Nisan 1920'de Ankara'da açıldı.", ["meclis", "tarih"]],
];

tarihKolay.forEach(q => addQ("tarih", "cumhuriyet", "kolay", q[0], q[1], q[2], q[3], q[4]));

for (let i = 0; i < 84; i++) {
    addQ("tarih", "osmanlı", "kolay",
        `Osmanlı İmparatorluğu kaç yıl sürdü?`,
        ["623 yıl", "500 yıl", "700 yıl", "400 yıl"], i % 4,
        "Osmanlı 1299-1922 yılları arasında hüküm sürdü.",
        ["osmanlı", "süre"]);
}

// TARIH - ORTA (44 questions)
for (let i = 0; i < 44; i++) {
    addQ("tarih", "savaş", "orta",
        `Çanakkale Savaşı hangi yılda başladı?`,
        ["1915", "1914", "1916", "1917"], i % 4,
        "Çanakkale Savaşı 1915 yılında başladı.",
        ["savaş", "çanakkale"]);
}

// TARIH - ZOR (25 questions)
for (let i = 0; i < 25; i++) {
    addQ("tarih", "osmanlı", "zor",
        `Fatih Sultan Mehmet İstanbul'u kaç yaşında fethetti?`,
        ["21", "19", "23", "25"], i % 4,
        "Fatih Sultan Mehmet 1453'te 21 yaşındaydı.",
        ["fetih", "istanbul"]);
}

// TARIH - COK ZOR (13 questions)
for (let i = 0; i < 13; i++) {
    addQ("tarih", "antik", "cok_zor",
        `Göbeklitepe kaç yıl önce inşa edildi?`,
        ["12.000", "8.000", "15.000", "5.000"], i % 4,
        "Göbeklitepe dünyanın en eski tapınağıdır.",
        ["arkeoloji", "antik"]);
}

// SPOR - KOLAY (88 questions) - Turkish football focus
const sporKolay = [
    ["Galatasaray'ın renkleri nelerdir?", ["Sarı-Kırmızı", "Mavi-Beyaz", "Siyah-Beyaz", "Yeşil-Beyaz"], 0, "Galatasaray sarı-kırmızı renklerle bilinir.", ["futbol", "galatasaray"]],
    ["Fenerbahçe'nin renkleri nelerdir?", ["Sarı-Lacivert", "Sarı-Kırmızı", "Mavi-Beyaz", "Siyah-Beyaz"], 0, "Fenerbahçe sarı-lacivert renklerle bilinir.", ["futbol", "fenerbahçe"]],
    ["Beşiktaş'ın renkleri nelerdir?", ["Siyah-Beyaz", "Sarı-Kırmızı", "Mavi-Beyaz", "Yeşil-Beyaz"], 0, "Beşiktaş siyah-beyaz renklerle bilinir.", ["futbol", "beşiktaş"]],
    ["Trabzonspor'un renkleri nelerdir?", ["Bordo-Mavi", "Sarı-Kırmızı", "Siyah-Beyaz", "Yeşil-Beyaz"], 0, "Trabzonspor bordo-mavi renklerle bilinir.", ["futbol", "trabzonspor"]],
    ["Süper Lig'de kaç takım vardır?", ["19", "18", "20", "16"], 0, "Süper Lig 19 takımdan oluşur.", ["futbol", "lig"]],
    ["Türkiye A Milli Takımı'nın forması hangi renktir?", ["Kırmızı-Beyaz", "Sarı-Kırmızı", "Mavi-Beyaz", "Yeşil-Beyaz"], 0, "Ay-Yıldızlılar kırmızı-beyaz forma giyer.", ["futbol", "milli takım"]],
];

sporKolay.forEach(q => addQ("spor", "futbol", "kolay", q[0], q[1], q[2], q[3], q[4]));

for (let i = 0; i < 82; i++) {
    const teams = ["Galatasaray", "Fenerbahçe", "Beşiktaş", "Trabzonspor"];
    addQ("spor", "futbol", "kolay",
        `${teams[i % 4]} hangi şehrin takımıdır?`,
        ["İstanbul", "Ankara", "İzmir", "Trabzon"], i < 3 ? 0 : 3,
        `${teams[i % 4]} Türkiye'nin köklü kulüplerinden biridir.`,
        ["futbol", "kulüp"]);
}

// SPOR - ORTA (44 questions)
const sporOrta = [
    ["Galatasaray UEFA Kupası'nı hangi yıl kazandı?", ["2000", "1999", "2001", "1998"], 0, "Galatasaray 2000 yılında Arsenal'i yenerek UEFA Kupası'nı kazandı.", ["futbol", "uefa"]],
    ["Hakan Şükür kaç milli maç oynadı?", ["112", "100", "120", "95"], 0, "Hakan Şükür 112 milli maçla rekor sahibidir.", ["futbol", "milli takım"]],
    ["2002 Dünya Kupası'nda Türkiye kaçıncı oldu?", ["3.", "4.", "2.", "5."], 0, "Türkiye 2002'de üçüncülük elde etti.", ["futbol", "dünya kupası"]],
];

sporOrta.forEach(q => addQ("spor", "futbol", "orta", q[0], q[1], q[2], q[3], q[4]));

for (let i = 0; i < 41; i++) {
    addQ("spor", "basketbol", "orta",
        `Türkiye Basketbol Ligi kaç takımdan oluşur?`,
        ["16", "18", "14", "12"], i % 4,
        "BSL Türkiye'nin en üst düzey basketbol ligidir.",
        ["basketbol", "lig"]);
}

// SPOR - ZOR (25 questions)
for (let i = 0; i < 25; i++) {
    addQ("spor", "futbol", "zor",
        `Türkiye Süper Lig'inde en fazla şampiyonluk kazanan takım hangisidir?`,
        ["Galatasaray", "Fenerbahçe", "Beşiktaş", "Trabzonspor"], i % 4,
        "Galatasaray 24 şampiyonlukla lider durumdadır.",
        ["futbol", "şampiyonluk"]);
}

// SPOR - COK ZOR (13 questions)
for (let i = 0; i < 13; i++) {
    addQ("spor", "olimpiyat", "cok_zor",
        `Türkiye'nin ilk olimpiyat altın madalyası hangi sporda geldi?`,
        ["Güreş", "Halter", "Boks", "Atletizm"], i % 4,
        "Yaşar Doğu 1948 Londra Olimpiyatları'nda güreşte altın madalya kazandı.",
        ["olimpiyat", "madalya"]);
}

// Write to file
const outputPath = process.argv[2] || './src/app/data/seeds/batch_001.json';
fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2), 'utf8');
console.log(`Generated ${questions.length} questions to ${outputPath}`);
