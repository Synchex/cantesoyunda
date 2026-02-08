
import json
import random

# Categories and Difficulty
CATEGORIES = ["genel_kultur"]
TAGS_BASE = ["revamp", "hard_mode", "expert", "bilim_sanat"]

def create_question(id_num, question, answers, correct_idx, difficulty, subcategory, extra_tags=None):
    tags = TAGS_BASE.copy()
    if extra_tags:
        tags.extend(extra_tags)
    
    return {
        "id": id_num,
        "question": question,
        "answers": answers,
        "correctAnswer": correct_idx,
        "category": "genel_kultur",
        "difficulty": difficulty,
        "subcategory": subcategory,
        "tags": tags
    }

questions = []
id_counter = 18000 

# ==============================================================================
# SCIENCE: MATHEMATICS (Expert)
# ==============================================================================

math_questions = [
    # ORTA (Hard for normal people)
    ("Bir küreyi sonlu sayıda parçaya bölüp tekrar birleştirerek aynı hacimde iki küre elde edilebileceğini öne süren paradoks hangisidir?", ["Banach-Tarski Paradoksu", "Zeno Paradoksu", "Hilbert Oteli", "Russell Paradoksu"], 0, "orta"),
    ("Asal sayıların dağılımıyla ilgili olan ve hala kanıtlanamamış ünlü matematik problemi hangisidir?", ["Riemann Hipotezi", "Fermat'nın Son Teoremi", "Poincare Sanısı", "Dört Renk Teoremi"], 0, "orta"),
    ("Kaos teorisinde, küçük bir değişikliğin büyük sonuçlar doğurabileceğini ifade eden terim nedir?", ["Kelebek Etkisi", "Kartopu Etkisi", "Domino Teorisi", "Kırılma Noktası"], 0, "orta"),
    ("Matematikte 'sıfır' kavramını ve ondalık sistemi Batı dünyasına tanıtan ünlü İslam matematikçisi kimdir?", ["Harezmi", "Biruni", "Ömer Hayyam", "Ali Kuşçu"], 0, "orta"),
    
    # ZOR
    ("Kalkülüs'ün (türev ve integral) keşfi konusunda Isaac Newton ile şiddetli bir öncelik tartışması yaşayan Alman matematikçi kimdir?", ["Gottfried Wilhelm Leibniz", "Carl Friedrich Gauss", "Bernhard Riemann", "Leonhard Euler"], 0, "zor"),
    ("İkinci Dünya Savaşı'nda Almanların Enigma şifresini kıran, ancak daha sonra eşcinselliği nedeniyle yargılanan ünlü matematikçi kimdir?", ["Alan Turing", "John von Neumann", "Kurt Gödel", "George Boole"], 0, "zor"),
    ("Matematiğin 'Prens'i olarak bilinen ve henüz 19 yaşındayken pergel ve cetvelle 17-genin çizilebileceğini kanıtlayan kimdir?", ["Carl Friedrich Gauss", "Blaise Pascal", "Pierre de Fermat", "Evariste Galois"], 0, "zor"),
    ("Öklid dışı (Non-Euclidean) geometrilerin kurucularından biri kabul edilen Rus matematikçi kimdir?", ["Nikolay Lobaçevski", "Andrey Kolmogorov", "Grigori Perelman", "Lev Landau"], 0, "zor"),
    ("Bin Yılın Soruları (Millennium Prize Problems) arasında yer alan ve çözüldüğü takdirde kriptografi güvenliğini sarsabilecek problem hangisidir?", ["P vs NP Problemi", "Navier-Stokes Denklemleri", "Hodge Sanısı", "Birch ve Swinnerton-Dyer Sanısı"], 0, "zor"),
    ("Sadece pergel ve cetvel kullanarak 'bir daireyle aynı alana sahip kare çizme' probleminin imkansızlığı hangi sayının özelliğinden kaynaklanır?", ["Pi sayısının transandantal (aşkın) olması", "Pi sayısının irrasyonel olması", "Kök 2'nin irrasyonel olması", "Altın oranın sonsuz olması"], 0, "zor"),
]

for q, a, c, d in math_questions:
    questions.append(create_question(id_counter, q, a, c, d, "matematik"))
    id_counter += 1

# ==============================================================================
# SCIENCE: PHYSICS (Expert)
# ==============================================================================

physics_questions = [
    # ORTA
    ("Termodinamiğin ikinci yasasına göre, kapalı bir sistemde zamanla azalmayan ve evrenin 'ısı ölümü'ne gitmesine neden olan nicelik nedir?", ["Entropi", "Entalpi", "İç Enerji", "Gibbs Serbest Enerjisi"], 0, "orta"),
    ("Kuantum mekaniğinde, bir parçacığın konumu ve momentumunun aynı anda kesin olarak bilinemeyeceğini ifade eden ilke nedir?", ["Heisenberg Belirsizlik İlkesi", "Pauli Dışlama İlkesi", "Schrödinger Denklemi", "Planck Sabiti"], 0, "orta"),
    ("Işığın hem dalga hem de parçacık özelliği gösterdiğini kanıtlayan ünlü deney hangisidir?", ["Çift Yarık Deneyi (Young)", "Michelson-Morley Deneyi", "Millikan Yağ Damlası Deneyi", "Rutherford Altın Levha Deneyi"], 0, "orta"),
    
    # ZOR
    ("Standart Model'e göre, proton ve nötronları oluşturan temel parçacıklara ne ad verilir?", ["Kuark", "Lepton", "Bozon", "Foton"], 0, "zor"),
    ("Evrendeki kütleçekiminin, galaksilerin dönüş hızını açıklamaya yetmemesi nedeniyle var olduğu düşünülen görünmez maddeye ne denir?", ["Karanlık Madde", "Karanlık Enerji", "Antimadde", "Plazma"], 0, "zor"),
    ("Bir kara deliğin olay ufkuna (event horizon) düşen bir cismin, dışarıdan bakan bir gözlemciye göre zamanla donup kalması etkisine ne ad verilir?", ["Zaman Genişlemesi (Time Dilation)", "Kütleçekimsel Kızıla Kayma", "Spagettileşme", "Hawking Işıması"], 0, "zor"),
    ("Fizikte, dört temel kuvveti (kütleçekim hariç) tek bir matematiksel çatıda birleştiren teorilere ne ad verilir?", ["Büyük Birleşik Teori (GUT)", "Sicim Teorisi", "M-Kuramı", "Kuantum Kütleçekimi"], 0, "zor"),
    ("Manhattan Projesi'nin bilimsel lideri olan ve 'Atom bombasının babası' olarak bilinen fizikçi kimdir?", ["J. Robert Oppenheimer", "Enrico Fermi", "Edward Teller", "Niels Bohr"], 0, "zor"),
    ("Antimaddenin varlığını teorik olarak öngören ve kendi adıyla anılan denklemi yazan İngiliz fizikçi kimdir?", ["Paul Dirac", "James Clerk Maxwell", "Michael Faraday", "J.J. Thomson"], 0, "zor"),
]

for q, a, c, d in physics_questions:
    questions.append(create_question(id_counter, q, a, c, d, "fizik"))
    id_counter += 1

# ==============================================================================
# SCIENCE: BIOLOGY (Expert)
# ==============================================================================

bio_questions = [
    # ORTA
    ("Hücresel solunumun gerçekleştiği ve 'Sitrik Asit Döngüsü' olarak da bilinen metabolik sürecin adı nedir?", ["Krebs Döngüsü", "Calvin Döngüsü", "Glikoliz", "Fermantasyon"], 0, "orta"),
    ("Hücre bölünmesi sırasında, kromozomların uç kısımlarında bulunan ve her bölünmede kısalan, yaşlanmayla ilişkilendirilen yapı nedir?", ["Telomer", "Sentromer", "Kromatit", "Nükleozom"], 0, "orta"),
    ("Penisilin'i keşfeden Alexander Fleming, bu keşfi hangi organizma üzerinde tesadüfen yapmıştır?", ["Penicillium notatum (Küf mantarı)", "Escherichia coli", "Staphylococcus aureus", "Saccharomyces cerevisiae"], 0, "orta"),
    
    # ZOR
    ("Tüm modern insanların (Homo sapiens) annesel soyunun dayandığı varsayılan ortak ataya genetik biliminde ne isim verilir?", ["Mitokondriyal Havva", "Y-Kromozom Adem'i", "Lucy", "Ardi"], 0, "zor"),
    ("DNA replikasyonu sırasında DNA zincirini fermuar gibi açan enzimin adı nedir?", ["Helikaz", "Polimeraz", "Ligaz", "Primaz"], 0, "zor"),
    ("Biyolojide, canlıların sınıflandırılması (taksonomi) sistemini kuran İsveçli bilim insanı kimdir?", ["Carl Linnaeus", "Jean-Baptiste Lamarck", "Georges Cuvier", "Alfred Russel Wallace"], 0, "zor"),
    ("Programlı hücre ölümüne bilimsel olarak ne ad verilir?", ["Apoptoz", "Nekroz", "Mitoz", "Metastaz"], 0, "zor"),
    ("1953 yılında DNA'nın çift sarmal yapısını keşfeden Watson ve Crick'in çalışmalarında kritik rol oynayan 'Fotoğraf 51'i çeken bilim kadını kimdir?", ["Rosalind Franklin", "Barbara McClintock", "Marie Curie", "Ada Yonath"], 0, "zor"),
]

for q, a, c, d in bio_questions:
    questions.append(create_question(id_counter, q, a, c, d, "biyoloji"))
    id_counter += 1

# ==============================================================================
# SCIENCE: CHEMISTRY (Expert)
# ==============================================================================

chem_questions = [
    # ORTA
    ("Altın ve platin gibi soy metalleri çözebilen tek asit karışımının (Kral Suyu) içeriği nedir?", ["Hidroklorik asit ve Nitrik asit", "Sülfürik asit ve Hidroklorik asit", "Nitrik asit ve Asetik asit", "Siyanür ve Sülfürik asit"], 0, "orta"),
    ("Modern atom teorisine göre, elektronların bulunma olasılığının en yüksek olduğu hacimsel bölgelere ne ad verilir?", ["Orbital", "Yörünge", "Kabuk", "Çekirdek"], 0, "orta"),
    
    # ZOR
    ("Periyodik tablonun 'Lantanitler' ve 'Aktinitler' serisi genellikle hangi isimle anılır?", ["Nadir Toprak Elementleri", "Soy Gazlar", "Halojenler", "Alkali Metaller"], 0, "zor"),
    ("Haber-Bosch süreci, endüstriyel olarak hangi maddenin üretimini sağlayarak tarım devrimine yol açmıştır?", ["Amonyak (Yapay Gübre)", "Sülfürik Asit", "Plastik", "Çelik"], 0, "zor"),
    ("Radyoaktivite birimi 'Becquerel'in yanı sıra, tarihsel olarak kullanılan ve 1 gram radyumun aktivitesine eşit olan birim hangisidir?", ["Curie", "Gray", "Sievert", "Rem"], 0, "zor"),
    ("Karbonun, grafitten farklı olarak futbol topu şeklindeki kafes yapısına sahip allotropuna ne ad verilir?", ["Fulleren (Buckminsterfullerene)", "Elmas", "Grafen", "Karbon Nanotüp"], 0, "zor"),
    ("Simyacıların 'Felsefe Taşı'nı ararken yanlışlıkla fosforu keşfeden kişi kimdir?", ["Hennig Brand", "Paracelsus", "Robert Boyle", "Antoine Lavoisier"], 0, "zor"),
]

for q, a, c, d in chem_questions:
    questions.append(create_question(id_counter, q, a, c, d, "kimya"))
    id_counter += 1

# ==============================================================================
# CULTURE & ARTS (Expert - Edebiyat, Sinema, Sanat)
# ==============================================================================

culture_questions = [
    # EDEBİYAT
    ("Dostoyevski'nin 'Karamazov Kardeşler' romanında, Tanrı'nın varlığını ve kötülük problemini sorgulayan ünlü bölümün adı nedir?", ["Büyük Engizisyoncu", "Yeraltından Notlar", "Suç ve Ceza", "Budala"], 0, "zor"),
    ("James Joyce'un 'Ulysses' romanı, Homeros'un hangi destanının modern bir versiyonu olarak kurgulanmıştır?", ["Odysseia", "İlyada", "Aeneis", "Gılgamış"], 0, "zor"),
    ("Divan Edebiyatı'nda, şairlerin şiirlerinde kullandıkları takma isme ne ad verilir?", ["Mahlas", "Tapşırma", "Müstear", "Lakap"], 0, "orta"),
    ("Gabriel Garcia Marquez'in öncüsü olduğu, büyülü unsurların olağan gerçeklikle harmanlandığı edebi akım nedir?", ["Büyülü Gerçekçilik", "Sürrealizm", "Dadaizm", "Egzistansiyalizm"], 0, "orta"),
    
    # SİNEMA
    ("Sinema tarihinde 'Montaj' (Kurgu) teorisinin temellerini atan ve 'Potemkin Zırhlısı' filmini yöneten Sovyet yönetmen kimdir?", ["Sergei Eisenstein", "Dziga Vertov", "Andrei Tarkovsky", "Lev Kuleshov"], 0, "zor"),
    ("Alfred Hitchcock'un filmlerinde bizzat küçük bir rolde (cameo) görünmesi geleneği hangi filminde teknik imkansızlıklar nedeniyle (tek mekan, tek bot) gazete ilanıyla çözülmüştür?", ["Lifeboat (Yaşamak İstiyoruz)", "Rear Window", "Rope", "Dial M for Murder"], 0, "zor"),
    ("Stanley Kubrick'in '2001: Bir Uzay Destanı' filmindeki yapay zeka karakterinin adı nedir?", ["HAL 9000", "Skynet", "Bishop", "Matrix"], 0, "orta"),
    
    # SANAT
    ("Rönesans döneminde, Leonardo, Michelangelo ve Raphael'in öncülüğünü yaptığı döneme ne ad verilir?", ["Yüksek Rönesans", "Erken Rönesans", "Maniyerizm", "Barok"], 0, "orta"),
    ("Edvard Munch'un ünlü 'Çığlık' tablosunun orijinal Almanca adı aslında 'Çığlık' değildir. Tablonun asıl ifade ettiği şey nedir?", ["Doğanın Çığlığı", "İnsanın Çaresizliği", "Sessiz Çığlık", "Korku"], 0, "zor"),
    ("Pablo Picasso'nun İspanya İç Savaşı sırasında Nazi bombardımanına uğrayan bir kasabayı resmettiği devasa tablonun adı nedir?", ["Guernica", "Avignonlu Kızlar", "Ağlayan Kadın", "Yaşlı Gitarist"], 0, "orta"),
]

for q, a, c, d in culture_questions:
    questions.append(create_question(id_counter, q, a, c, d, "edebiyat_sanat"))
    id_counter += 1

# Output logic
with open('src/app/data/seeds/batch_021_gk_revamp.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print(f"Generated {len(questions)} EXPERT-LEVEL general knowledge questions in batch_021_gk_revamp.json")
