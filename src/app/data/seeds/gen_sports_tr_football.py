
import json
import random

# Categories and Difficulty
CATEGORIES = ["spor"]
DIFFICULTIES = ["kolay", "orta", "zor"]
TAGS_BASE = ["football", "turkish_football"]

def create_question(id_num, question, answers, correct_idx, difficulty, extra_tags=None):
    tags = TAGS_BASE.copy()
    if extra_tags:
        tags.extend(extra_tags)
    
    return {
        "id": id_num,
        "question": question,
        "answers": answers,
        "correctAnswer": correct_idx,
        "category": "spor",
        "difficulty": difficulty,
        "subcategory": "football", # Maps to Turkish Football in UI
        "tags": tags
    }

questions = []
id_counter = 17000 # Starting ID for this batch

# KOLAY
easy_questions = [
    ("Türkiye Süper Ligi'nde en çok şampiyon olan takım hangisidir?", ["Fenerbahçe", "Beşiktaş", "Galatasaray", "Trabzonspor"], 2),
    ("Türk futbolunun 'Taçsız Kral' lakaplı efsane golcüsü kimdir?", ["Lefter Küçükandonyadis", "Metin Oktay", "Hakkı Yeten", "Can Bartu"], 1),
    ("2002 FIFA Dünya Kupası'nda Türkiye kaçıncı olmuştur?", ["Birinci", "İkinci", "Üçüncü", "Dördüncü"], 2),
    ("Galatasaray'ın UEFA Kupası'nı kazandığı yıl hangisidir?", ["1999", "2000", "2001", "2002"], 1),
    ("Hangi takım 'Dört Büyükler' arasında yer almaz?", ["Bursaspor", "Beşiktaş", "Fenerbahçe", "Trabzonspor"], 0),
    ("Fatih Terim'in lakabı nedir?", ["İmparator", "Kral", "Şef", "Usta"], 0),
    ("Türkiye Milli Takımı'nın ilk teknik direktörü kimdir?", ["Ali Sami Yen", "Cihat Arman", "Fikret Arıcan", "Billy Hunter"], 0),
    ("'Sinyor' lakaplı Fenerbahçeli efsane futbolcu kimdir?", ["Lefter Küçükandonyadis", "Can Bartu", "Cemil Turan", "Rıdvan Dilmen"], 1),
    ("Hangi stadyum Beşiktaş'ın ev sahibidir?", ["Türk Telekom Arena", "Şükrü Saracoğlu", "Vodafone Park (Tüpraş)", "Atatürk Olimpiyat"], 2),
    ("Türkiye'nin ilk yerli teknik direktörü kimdir?", ["Gündüz Kılıç", "Ahmet Robenson", "Ali Sami Yen", "Ziya Şengül"], 2),
    ("Süper Lig'de 'Gol Kralı' olan ilk yabancı futbolcu kimdir?", ["Tarik Hodzic", "Shota Arveladze", "Alex de Souza", "Mario Jardel"], 0),
    ("Trabzonspor şampiyonluk serisini hangi yıllar arasında yaşamıştır?", ["1970-1975", "1975-1984", "1990-1995", "2000-2005"], 1),
    ("Fenerbahçe'nin 103 golle şampiyon olduğu sezon hangisidir?", ["1988-1989", "1995-1996", "2000-2001", "2010-2011"], 0),
    ("Hangi Türk futbolcu Barcelona'da forma giymiştir?", ["Arda Turan", "Emre Belözoğlu", "Tugay Kerimoğlu", "Nihat Kahveci"], 0),
    ("Altın Ayakkabı ödülünü alan tek Türk futbolcu kimdir?", ["Hakan Şükür", "Metin Oktay", "Tanju Çolak", "Burak Yılmaz"], 2),
]

for q, a, c in easy_questions:
    questions.append(create_question(id_counter, q, a, c, "kolay"))
    id_counter += 1

# ORTA
medium_questions = [
    ("Süper Lig tarihinin en çok gol atan futbolcusu kimdir?", ["Tanju Çolak", "Hakan Şükür", "Hami Mandıralı", "Aykut Kocaman"], 1),
    ("Beşiktaş'ın 100. yılında şampiyon yapan teknik direktör kimdir?", ["Gordon Milne", "Jean Tigana", "Mircea Lucescu", "Mustafa Denizli"], 2),
    ("Euro 2008'de Türkiye hangi aşamaya kadar yükselmiştir?", ["Çeyrek Final", "Yarı Final", "Final", "Son 16"], 1),
    ("Galatasaray, UEFA Süper Kupa maçında hangi takımı yenmiştir?", ["Arsenal", "Real Madrid", "Milan", "Liverpool"], 1),
    ("Fenerbahçe'nin efsanevi başkanı Şükrü Saracoğlu hangi görevde de bulunmuştur?", ["Cumhurbaşkanı", "Başbakan", "Genelkurmay Başkanı", "Milli Eğitim Bakanı"], 1),
    ("Süper Lig'de yenilgisiz şampiyon olan tek takım hangisidir?", ["Galatasaray", "Fenerbahçe", "Beşiktaş", "Trabzonspor"], 2),
    ("'Şeytan' lakaplı efsane futbolcu kimdir?", ["Rıdvan Dilmen", "Rıza Çalımbay", "Tanju Çolak", "Sergen Yalçın"], 0),
    ("Hangi takım Süper Lig'de şampiyonluk yaşayan 5. takımdır?", ["Bursaspor", "Başakşehir", "Eskişehirspor", "Sivasspor"], 0),
    ("Tugay Kerimoğlu uzun yıllar hangi İngiliz takımında oynamıştır?", ["Liverpool", "Blackburn Rovers", "Newcastle United", "Aston Villa"], 1),
    ("Nihat Kahveci İspanya'da hangi takımla şampiyonluk mücadelesi verip 2. olmuştur?", ["Real Sociedad", "Villarreal", "Celta Vigo", "Deportivo"], 0),
    ("Milli Takımımızın 2002 Dünya Kupası'ndaki 3.lük maçında yendiği ülke hangisidir?", ["Brezilya", "Güney Kore", "Senegal", "Japonya"], 1),
    ("Alex de Souza Fenerbahçe formasıyla toplam kaç lig şampiyonluğu yaşamıştır?", ["1", "2", "3", "4"], 2),
    ("Galatasaray'ın Neuchâtel Xamax'ı 5-0 yendiği efsane maç hangi turdaydı?", ["Şampiyon Kulüpler Kupası 2. Tur", "UEFA Kupası Yarı Final", "Kupa Galipleri Kupası Çeyrek Final", "Şampiyonlar Ligi Grubu"], 0),
    ("Sergen Yalçın 'Dört Büyükler'in tamamında forma giymiş midir?", ["Evet", "Hayır", "Sadece üçünde", "Sadece ikisinde"], 0),
    ("Süper Lig'de en çok şampiyonluk yaşayan teknik direktör kimdir?", ["Mustafa Denizli", "Şenol Güneş", "Fatih Terim", "Ahmet Suat Özyazıcı"], 2),
]

for q, a, c in medium_questions:
    questions.append(create_question(id_counter, q, a, c, "orta"))
    id_counter += 1

# ZOR
hard_questions = [
    ("Türkiye'nin FIFA dünya sıralamasında gördüğü en yüksek sıra kaçtır?", ["5", "8", "10", "12"], 0),
    ("Mustafa Denizli hangi takımı şampiyon yapmamıştır?", ["Galatasaray", "Fenerbahçe", "Beşiktaş", "Trabzonspor"], 3),
    ("Süper Lig'in ilk golünü kim atmıştır?", ["Metin Oktay", "Özcan Altuğ", "Lefter Küçükandonyadis", "Can Bartu"], 1),
    ("Göztepe, Avrupa Fuar Şehirleri Kupası'nda (UEFA Kupası) hangi yıl yarı final oynamıştır?", ["1967-1968", "1968-1969", "1969-1970", "1970-1971"], 1),
    ("Hakan Şükür, Dünya Kupaları tarihinin en hızlı golünü kaçıncı saniyede atmıştır?", ["9. saniye", "11. saniye", "15. saniye", "13. saniye"], 1),
    ("Ziya Şengül ve Ziya Doğan dışında 'Ziya Kaptan' olarak bilinen efsane kimdir?", ["Ziya Baykal", "Ziya Taner", "Ziya Şahin", "Ziya Aksoy"], 1), # Changed to a generic hard question about coaches/players
    ("Rüştü Reçber Barcelona formasıyla La Liga'da kaç maça çıkmıştır?", ["4", "7", "10", "12"], 0), # Correct is strictly small number, often cited as 4 league games
    ("İlhan Mansız'ın 2002 Dünya Kupası çeyrek finalinde Senegal'e attığı golün özelliği neydi?", ["Penaltı golüydü", "Altın Gol", "Kendi kalesine", "Frikik"], 1),
    ("Başakşehir'i şampiyon yaparak tarihe geçen teknik direktör kimdir?", ["Abdullah Avcı", "Okan Buruk", "Emre Belözoğlu", "Aykut Kocaman"], 1),
    ("Eskişehirspor'un efsane kadrosuna verilen lakap neydi?", ["Kırmızı Şimşekler", "Es-Es", "Anadolu Yıldızı", "Kızıl Şeytanlar"], 0),
    ("Hangi Türk hakem FIFA kokartıyla Dünya Kupası'nda yarı final yönetmiştir?", ["Cüneyt Çakır", "Ahmet Çakar", "Erman Toroğlu", "Doğan Babacan"], 0),
    ("San Marino'ya karşı oynanan ve 0-0 biten maçta Milli Takım teknik direktörü kimdi?", ["Sepp Piontek", "Fatih Terim", "Mustafa Denizli", "Coşkun Özarı"], 0),
    ("Süper Lig'de en uzun süre gol yememe rekoru kime aittir?", ["Rüştü Reçber", "Şenol Güneş", "Turgay Şeren", "Claudio Taffarel"], 1),
    ("Galatasaray'ın UEFA Kupası finalindeki rakibi Arsenal'in penaltı kaçıran yıldızları kimlerdi?", ["Henry ve Bergkamp", "Suker ve Vieira", "Petit ve Overmars", "Kanu ve Ljungberg"], 1),
    ("Beşiktaş'ın efsane üçlüsü Metin-Ali-Feyyaz'ın 'Ali'si Ali Gültiken hangi mevkide oynardı?", ["Stoper", "Orta Saha", "Forvet (Kanat)", "Kaleci"], 2),
]

for q, a, c in hard_questions:
    questions.append(create_question(id_counter, q, a, c, "zor"))
    id_counter += 1

# Output logic
with open('batch_017_tr_sports_football.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print(f"Generated {len(questions)} questions in batch_017_tr_sports_football.json")
