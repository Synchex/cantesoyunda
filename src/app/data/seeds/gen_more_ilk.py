import json

questions = [
    {"q": "Türk adının geçtiği ilk yazılı metinler hangi millete aittir?", "c": ["Çin", "Bizans", "Sasani", "Hint"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "kolay", "exp": "Çin yıllıklarında Türk adından ilk kez bahsedilmiştir.", "tags": ["ilk_cag"]},
    {"q": "Göktürk Kitabeleri'ni okuyan ilk bilim insanı kimdir?", "c": ["Wilhelm Thomsen", "Radloff", "Vambery", "Barthold"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Danimarkalı dilbilimci Wilhelm Thomsen 1893'te okumuştur.", "tags": ["ilk_cag"]},
    {"q": "Maniheizm dinini kabul ederek savaşçı özelliklerini kaybeden Türk devleti hangisidir?", "c": ["Uygurlar", "Göktürkler", "Hunlar", "Avarlar"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "kolay", "exp": "Uygurlar Bögü Kağan zamanında Maniheizm'i kabul etmiştir.", "tags": ["ilk_cag"]},
    {"q": "Orhun Abideleri günümüzde hangi ülke sınırları içerisindedir?", "c": ["Moğolistan", "Çin", "Kazakistan", "Türkmenistan"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Moğolistan sınırları içinde Orhun Nehri vadisindedir.", "tags": ["ilk_cag"]},
    {"q": "Asya Hun Devleti'nin kurucusu kimdir?", "c": ["Teoman", "Mete Han", "Ki-ok", "Attila"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "kolay", "exp": "Asya Hun Devleti'nin bilinen ilk hükümdarı Teoman'dır.", "tags": ["ilk_cag"]},
    {"q": "Türk tarihinde 'Vatan' sevgisinden ilk bahseden hükümdar kimdir?", "c": ["Mete Han", "Teoman", "Bilge Kağan", "Kültigin"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Mete Han, toprak talebi karşısında 'Toprak milletindir, verilemez' demiştir.", "tags": ["ilk_cag"]},
    {"q": "Avrupa Hun Devleti'nin en parlak dönemi hangi hükümdar zamanında yaşanmıştır?", "c": ["Attila", "Balamir", "Uldız", "Rua"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "kolay", "exp": "Attila dönemi Avrupa Hunlarının en güçlü dönemidir.", "tags": ["ilk_cag"]},
    {"q": "Bizans ordusunda paralı askerlik yaparken taraf değiştirerek Malazgirt Savaşı'nın kazanılmasında etkili olan Türk boyu hangisidir?", "c": ["Peçenekler", "Kıpçaklar", "Oğuzlar", "Hazarlar"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Peçenekler savaş sırasında Selçuklu safına geçmiştir.", "tags": ["ilk_cag"]},
    {"q": "İslamiyet'i kabul eden ilk Türk boyu hangisidir?", "c": ["Karluklar", "Oğuzlar", "Türgişler", "Kırgızlar"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Karluklar Talas Savaşı'ndan sonra İslamiyet'i kabul etmiştir.", "tags": ["ilk_cag"]},
    {"q": "Kendi adına para bastıran ilk Türk hükümdarı kimdir?", "c": ["Baga Tarkan", "Bilge Kağan", "Mete Han", "Bumin Kağan"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "zor", "exp": "Türgiş hükümdarı Baga Tarkan kendi adına para bastırmıştır.", "tags": ["ilk_cag"]},
    {"q": "Museviliği kabul eden tek Türk devleti hangisidir?", "c": ["Hazarlar", "Bulgarlar", "Macarlar", "Avarlar"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Hazarlar, yöneticileri ve halkın bir kısmı ile Museviliği benimsemiştir.", "tags": ["ilk_cag"]},
    {"q": "Türk tarihinde kullanılan ilk alfabe hangisidir?", "c": ["Göktürk Alfabesi", "Uygur Alfabesi", "Kiril Alfabesi", "Arap Alfabesi"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "kolay", "exp": "Göktürk (Orhun) Alfabesi Türklerin kullandığı ilk milli alfabedir.", "tags": ["ilk_cag"]},
    {"q": "Kağıt ve matbaayı kullanan ilk Türk devleti hangisidir?", "c": ["Uygurlar", "Göktürkler", "Hunlar", "Kırgızlar"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Uygurlar yerleşik hayata geçerek kağıt ve matbaayı kullanmışlardır.", "tags": ["ilk_cag"]},
    {"q": "Türklerde devleti yönetme yetkisinin Tanrı tarafından verildiğine inanılan anlayışa ne denir?", "c": ["Kut", "Töre", "Yargu", "Toy"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "kolay", "exp": "Kut inancına göre hükümdarlık yetkisi Gök Tanrı'dan alınır.", "tags": ["ilk_cag"]},
    {"q": "Eski Türklerde ölülerin gömüldüğü mezara ne ad verilir?", "c": ["Kurgan", "Balbal", "Uçmağ", "Tamu"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Kurgan, eski Türklerde mezar demektir.", "tags": ["ilk_cag"]},
    {"q": "Eski Türklerde mezar başına dikilen ve öldürülen düşman sayısını simgeleyen taşlara ne denir?", "c": ["Balbal", "Bengütaş", "Yuğ", "Ongun"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Balbal, mezar taşı olarak dikilen heykellerdir.", "tags": ["ilk_cag"]},
    {"q": "Tarihte bilinen ilk Türk kadın hükümdarı kimdir?", "c": ["Tomris Hatun", "Börteçine", "Ay Hanım", "Süyümbike"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "İskitler (Sakalar) kraliçesi Tomris Hatun bilinen ilk kadın hükümdardır.", "tags": ["ilk_cag"]},
    {"q": "Çin Seddi'nin yapılmasının asıl sebebi hangi Türk devletidir?", "c": ["Asya Hunları", "Göktürkler", "Uygurlar", "Moğollar"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "kolay", "exp": "Asya Hun Devleti'nin akınlarını durdurmak için yapılmıştır.", "tags": ["ilk_cag"]},
    {"q": "Kavimler Göçü'nü başlatan Hun hükümdarı kimdir?", "c": ["Balamir", "Attila", "Uldız", "Rua"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Balamir komutasındaki Hunlar Kavimler Göçü'nü başlatmıştır.", "tags": ["ilk_cag"]},
    {"q": "Anadolu'ya ilk Türk akınlarını yapan Hun hükümdarı kimdir?", "c": ["Uldız", "Attila", "Balamir", "Teoman"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "zor", "exp": "Avrupa Hun hükümdarı Uldız, Anadolu'ya ilk akınları düzenlemiştir.", "tags": ["ilk_cag"]},
    {"q": "Göktürk Devleti'nin kurucusu kimdir?", "c": ["Bumin Kağan", "İstemi Yabgu", "Mukan Kağan", "Kutluk Kağan"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "kolay", "exp": "Bumin Kağan, Avar hakimiyetine son vererek Göktürk Devleti'ni kurdu.", "tags": ["ilk_cag"]},
    {"q": "Türk adını ilk kez bir devlet adı olarak kullanan devlet hangisidir?", "c": ["Göktürkler", "Uygurlar", "Hunlar", "Karahanlılar"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "kolay", "exp": "Göktürk Devleti, Türk adını resmi olarak kullanmıştır.", "tags": ["ilk_cag"]},
    {"q": "Orhun Abideleri hangi Türk devleti döneminde dikilmiştir?", "c": ["II. Göktürk (Kutluk)", "I. Göktürk", "Uygur", "Kırgız"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Orhun Abideleri II. Göktürk (Kutluk) Devleti döneminde dikilmiştir.", "tags": ["ilk_cag"]},
    {"q": "Ergenekon Destanı hangi Türk devletine aittir?", "c": ["Göktürkler", "Uygurlar", "Hunlar", "İskitler"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Ergenekon Destanı, Göktürklerin demir dağı eritip çıkışını anlatır.", "tags": ["ilk_cag"]},
    {"q": "Türeyiş ve Göç Destanları hangi Türk devletine aittir?", "c": ["Uygurlar", "Göktürkler", "Kırgızlar", "Oğuzlar"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Türeyiş ve Göç destanları Uygurlara aittir.", "tags": ["ilk_cag"]},
    {"q": "Dünyanın en uzun destanı olan Manas Destanı hangi Türk boyuna aittir?", "c": ["Kırgızlar", "Kazaklar", "Özbekler", "Oğuzlar"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Kırgızlara ait olan Manas Destanı dünyanın en uzun destanıdır.", "tags": ["ilk_cag"]},
    {"q": "Oğuz Kağan Destanı'ndaki Oğuz Kağan'ın kim olduğu düşünülmektedir?", "c": ["Mete Han", "Teoman", "Atilla", "Bilge Kağan"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Destandaki Oğuz Kağan'ın Asya Hun hükümdarı Mete Han olduğu kabul edilir.", "tags": ["ilk_cag"]},
    {"q": "Eski Türklerde devlet işlerinin görüşüldüğü meclise ne ad verilirdi?", "c": ["Toy (Kurultay)", "Divan", "Senato", "Pankuş"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "kolay", "exp": "Devlet işlerinin görüşüldüğü meclise Toy veya Kurultay denirdi.", "tags": ["ilk_cag"]},
    {"q": "Eski Türklerde cenaze törenine ne ad verilir?", "c": ["Yuğ", "Şölen", "Sagu", "Toy"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Yuğ, cenaze töreni; sagu ise bu törende okunan ağıttır.", "tags": ["ilk_cag"]},
    {"q": "İstanbul'u kuşatan ilk Türk devleti hangisidir?", "c": ["Avarlar", "Bulgarlar", "Hunlar", "Peçenekler"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Avarlar, Sasanilerle işbirliği yaparak İstanbul'u kuşatmıştır.", "tags": ["ilk_cag"]},
    {"q": "Hristiyanlığı kabul eden ilk Türk devleti hangisidir?", "c": ["Avarlar", "Macarlar", "Bulgarlar", "Peçenekler"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "zor", "exp": "Avarlar Hristiyanlığı kabul eden ilk Türk topluluğudur.", "tags": ["ilk_cag"]},
    {"q": "Uygur Devleti'ni yıkarak Ötüken'e hakim olan Türk boyu hangisidir?", "c": ["Kırgızlar", "Karluklar", "Basmiller", "Türgişler"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "zor", "exp": "Uygur Devleti'ne son veren Türk boyu Kırgızlardır.", "tags": ["ilk_cag"]},
    {"q": "İgor Destanı'na konu olan Türk boyu hangisidir?", "c": ["Kıpçaklar (Kumanlar)", "Peçenekler", "Oğuzlar", "Hazarlar"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "zor", "exp": "Ruslarla yaptıkları mücadeleler İgor Destanı'na konu olmuştur.", "tags": ["ilk_cag"]},
    {"q": "Eski Türklerde hükümdarın erkek çocuklarına verilen unvan nedir?", "c": ["Tigin", "Şad", "Yabgu", "Tarkan"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Hükümdar çocuklarına Tigin denir.", "tags": ["ilk_cag"]},
    {"q": "Eski Türklerde bağımsızlığa ne ad verilirdi?", "c": ["Oksızlık", "Köz", "İl", "Töre"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "cok_zor", "exp": "Oksızlık, eski Türkçede bağımsızlık demektir.", "tags": ["ilk_cag"]},
    {"q": "Hangisi Orta Asya kültür merkezlerinden biri değildir?", "c": ["Ninova", "Anav", "Afanesyevo", "Andronova"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "zor", "exp": "Ninova Mezopotamya'da Asurluların başkentidir.", "tags": ["ilk_cag"]},
    {"q": "Türk tarihinde ilk düzenli orduyu kim kurmuştur?", "c": ["Mete Han", "Teoman", "Bumin Kağan", "Bilge Kağan"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "kolay", "exp": "Mete Han M.Ö. 209'da ilk düzenli orduyu kurmuştur.", "tags": ["ilk_cag"]},
    {"q": "'Tanrının Kırbacı' lakabıyla bilinen Türk hükümdarı kimdir?", "c": ["Attila", "Balamir", "Uldız", "Rua"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "kolay", "exp": "Avrupalılar Attila'yı 'Tanrının Kırbacı' olarak adlandırmıştır.", "tags": ["ilk_cag"]},
    {"q": "Göktürklerde devletin batı kanadını yöneten 'İstemi Yabgu' hangi unvanı kullanmıştır?", "c": ["Yabgu", "Kağan", "Han", "İlteber"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Doğuyu Kağan, Batıyı Yabgu yönetirdi.", "tags": ["ilk_cag"]},
    {"q": "Sulu Kağan zamanında Emevilerle savaşarak Maveraünnehir'in İslamlaşmasını geciktiren Türk devleti hangisidir?", "c": ["Türgişler", "Karluklar", "Oğuzlar", "Göktürkler"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "zor", "exp": "Türgişler Emevilerle şiddetli savaşlar yapmıştır.", "tags": ["ilk_cag"]},
    {"q": "Eski Türklerde adalet işlerine bakan görevliye ne denirdi?", "c": ["Yargan (Yargucu)", "Tamgacı", "Bitigci", "Tudun"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "zor", "exp": "Yargıçlara Yargan denirdi.", "tags": ["ilk_cag"]},
    {"q": "Uygurlarda ressamlara ne ad verilirdi?", "c": ["Bedizci", "Baksı", "Bitigci", "Otacı"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "cok_zor", "exp": "Fresk ve minyatür ustalarına Bedizci denirdi.", "tags": ["ilk_cag"]},
    {"q": "Eski Türklerde hekimlere (doktorlara) ne ad verilirdi?", "c": ["Otacı (Emçi)", "Kam", "Baksı", "Yargan"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "zor", "exp": "Tedavi eden kişilere Otacı veya Emçi denirdi.", "tags": ["ilk_cag"]},
    {"q": "Orhun Abideleri'nin yazarı (hattatı) kimdir?", "c": ["Yolluğ Tigin", "Tonyukuk", "Bilge Kağan", "Kültigin"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "cok_zor", "exp": "Yazıtları Yolluğ Tigin yazmıştır.", "tags": ["ilk_cag"]},
    {"q": "Türklerin kullandığı '12 Hayvanlı Türk Takvimi' hangi esasa dayanır?", "c": ["Güneş Yılı", "Ay Yılı", "Yıldız Yılı", "Hicri Yıl"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Güneş yılı esasına dayanan bir takvimdir.", "tags": ["ilk_cag"]},
    {"q": "Eski Türklerde 'Ayukı' ne demektir?", "c": ["Hükümet", "Meclis", "Ordu", "Halk"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "zor", "exp": "Ayukı, hükümet (bakanlar kurulu) demektir.", "tags": ["ilk_cag"]},
    {"q": "'Bozkırın Kuyumcuları' olarak bilinen topluluk hangisidir?", "c": ["İskitler (Sakalar)", "Hunlar", "Avarlar", "Göktürkler"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "Altın işlemeciliğinde ileri gittikleri için bu unvanı almışlardır.", "tags": ["ilk_cag"]},
    {"q": "Hangi Türk devleti 'kiralık asker' (ücretli asker) kullanmıştır?", "c": ["Hazarlar", "Göktürkler", "Hunlar", "Uygurlar"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "zor", "exp": "Ticaretle zenginleşen Hazarlar ordularında ücretli asker kullanmıştır.", "tags": ["ilk_cag"]},
    {"q": "Divan-ü Lügati't Türk'te 'Rum Diyarına en yakın oturan Türkler' olarak geçen boy hangisidir?", "c": ["Peçenekler", "Kıpçaklar", "Bulgarlar", "Oğuzlar"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "cok_zor", "exp": "Kaşgarlı Mahmut Peçenekleri bu şekilde tanımlar.", "tags": ["ilk_cag"]},
    {"q": "Bulgarların Hristiyanlığı kabul eden koluna ne ad verilir?", "c": ["Tuna Bulgarları", "İtil Bulgarları", "Volga Bulgarları", "Sabirler"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "zor", "exp": "Tuna Bulgarları Hristiyanlaşmış ve Slavlaşmıştır.", "tags": ["ilk_cag"]},
    {"q": "Volga (İtil) Bulgarları hangi dini kabul etmiştir?", "c": ["İslamiyet", "Hristiyanlık", "Musevilik", "Budizm"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "orta", "exp": "İtil Bulgarları, Almış Han zamanında İslamiyet'i kabul etmiştir.", "tags": ["ilk_cag"]},
    {"q": "İbni Fadlan'ın 'Seyahatname'sinde bahsettiği Türk devleti hangisidir?", "c": ["İtil Bulgarları", "Hazarlar", "Peçenekler", "Oğuzlar"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "cok_zor", "exp": "İbni Fadlan, Abbasi elçisi olarak İtil Bulgarlarına gitmiştir.", "tags": ["ilk_cag"]},
    {"q": "Göktürklerin başkenti olan ve 'Toprak Ana' olarak kutsal sayılan şehir neresidir?", "c": ["Ötüken", "Balasagun", "Semerkant", "Buhara"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "kolay", "exp": "Ötüken, Türklerin kutsal başkentidir.", "tags": ["ilk_cag"]},
    {"q": "Alp Er Tunga'nın mezarının bulunduğu düşünülen şehir hangisidir?", "c": ["Buhara", "Semerkant", "Ötüken", "Kaşgar"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "cok_zor", "exp": "Buhara şehrinde olduğu rivayet edilir.", "tags": ["ilk_cag"]},
    {"q": "En çok Türk devletinin kurulduğu coğrafya hangisidir?", "c": ["Orta Asya", "Anadolu", "Balkanlar", "Kafkasya"], "a": 0, "cat": "tarih", "sub": "ilk_cag", "diff": "kolay", "exp": "Türklerin ana yurdu Orta Asya'dır.", "tags": ["ilk_cag"]}
]

formatted_questions = []
qid = 13000 # Starting ID for this batch

for item in questions:
    formatted_questions.append({
        "id": qid,
        "question": item["q"],
        "choices": item["c"],
        "answerIndex": item["a"],
        "category": "tarih",
        "difficulty": item["diff"],
        "tags": item["tags"]
    })
    qid += 1

with open('batch_013_tr_history_ilk_more.json', 'w', encoding='utf-8') as f:
    json.dump(formatted_questions, f, ensure_ascii=False, indent=2)

print(f"Generated {len(formatted_questions)} questions for İlk Çağ.")
