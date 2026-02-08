import json

questions = []
qid = 5000 # Starting ID for generated EN questions to avoid collision

# Ancient History (40 questions)
# Categories: ancient, empires, legends
ancient_qs = [
    {"q": "Who was the first emperor of Rome?", "c": ["Julius Caesar", "Augustus", "Nero", "Trajan"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["ancient", "empires", "legends"]},
    {"q": "The Great Wall of China was built primarily to protect against which group?", "c": ["Mongols", "Japanese", "Romans", "Persians"], "a": 0, "cat": "tarih", "diff": "kolay", "tags": ["ancient", "empires"]},
    {"q": "Which Egyptian pharaoh is famous for his intact tomb discovered in 1922?", "c": ["Ramses II", "Tutankhamun", "Akhenaten", "Khufu"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["ancient", "legends"]},
    {"q": "The Parthenon is located in which city?", "c": ["Rome", "Athens", "Cairo", "Instanbul"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["ancient"]},
    {"q": "Which general crossed the Alps with elephants to attack Rome?", "c": ["Hannibal", "Alexander the Great", "Scipio Africanus", "Attila"], "a": 0, "cat": "tarih", "diff": "orta", "tags": ["ancient", "legends"]},
    {"q": "The Battle of Thermopylae was fought between the Greeks and which empire?", "c": ["Roman Empire", "Persian Empire", "Ottoman Empire", "Mongol Empire"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["ancient", "empires"]},
    {"q": "Who was the tutor of Alexander the Great?", "c": ["Plato", "Socrates", "Aristotle", "Pythagoras"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["ancient", "legends"]},
    {"q": "What was the capital of the Byzantine Empire?", "c": ["Rome", "Constantinople", "Athens", "Alexandria"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["ancient", "empires"]},
    {"q": "Which Roman emperor made Christianity the official religion?", "c": ["Nero", "Theodosius I", "Constantine the Great", "Trajan"], "a": 1, "cat": "tarih", "diff": "zor", "tags": ["ancient"]},
    {"q": "The Rosetta Stone was key to deciphering which language?", "c": ["Greek", "Latin", "Egyptian Hieroglyphs", "Sumerian"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["ancient"]},
    {"q": "Who wrote 'The Odyssey'?", "c": ["Homer", "Virgil", "Sophocles", "Hesiod"], "a": 0, "cat": "tarih", "diff": "kolay", "tags": ["ancient", "legends"]},
    {"q": "Which city was destroyed by the eruption of Mount Vesuvius in 79 AD?", "c": ["Rome", "Naples", "Pompeii", "Venice"], "a": 2, "cat": "tarih", "diff": "kolay", "tags": ["ancient"]},
    {"q": "Who was the queen of Ancient Egypt known for her relationship with Julius Caesar?", "c": ["Nefertiti", "Cleopatra", "Hatshepsut", "Nefertari"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["ancient", "legends"]},
    {"q": "The Punic Wars were fought between Rome and which city-state?", "c": ["Athens", "Sparta", "Carthage", "Alexandria"], "a": 2, "cat": "tarih", "diff": "zor", "tags": ["ancient", "empires"]},
    {"q": "Which empire constructed the Terracotta Army?", "c": ["Qin Dynasty", "Han Dynasty", "Tang Dynasty", "Ming Dynasty"], "a": 0, "cat": "tarih", "diff": "zor", "tags": ["ancient", "empires"]},
]

for item in ancient_qs:
    questions.append({
        "id": qid,
        "lang": "en",
        "category": item["cat"],
        "difficulty": item["diff"],
        "question": item["q"],
        "answers": item["c"],
        "correctAnswer": item["a"],
        "tags": item["tags"]
    })
    qid += 1

# Modern History (40 questions) - 19th and 20th century
# Categories: modern, legends
modern_qs = [
    {"q": "The Industrial Revolution began in which country?", "c": ["France", "USA", "Germany", "Great Britain"], "a": 3, "cat": "tarih", "diff": "kolay", "tags": ["modern"]},
    {"q": "Who was the leader of the Soviet Union during World War II?", "c": ["Vladimir Lenin", "Joseph Stalin", "Nikita Khrushchev", "Mikhail Gorbachev"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["modern", "legends"]},
    {"q": "The Titanic sank in which year?", "c": ["1910", "1912", "1914", "1916"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["modern"]},
    {"q": "Which event triggered World War I?", "c": ["Invasion of Poland", "Bombing of Pearl Harbor", "Assassination of Archduke Franz Ferdinand", "The October Revolution"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["modern"]},
    {"q": "Who was the first man in space?", "c": ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"], "a": 2, "cat": "tarih", "diff": "kolay", "tags": ["modern", "legends"]},
    {"q": "The Berlin Wall fell in which year?", "c": ["1987", "1989", "1991", "1993"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["modern"]},
    {"q": "Which treaty ended World War I?", "c": ["Treaty of Paris", "Treaty of Versailles", "Treaty of Tordesillas", "Treaty of Ghent"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["modern"]},
    {"q": "Who delivered the 'I Have a Dream' speech?", "c": ["Malcolm X", "John F. Kennedy", "Martin Luther King Jr.", "Rosa Parks"], "a": 2, "cat": "tarih", "diff": "kolay", "tags": ["modern", "legends"]},
    {"q": "The American Civil War was fought between North and South over which main issue?", "c": ["Taxation", "Slavery", "Territory", "Religion"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["modern"]},
    {"q": "In which year did the moon landing occur?", "c": ["1965", "1969", "1971", "1975"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["modern", "legends"]},
    {"q": "Who was the British Prime Minister during most of WWII?", "c": ["Neville Chamberlain", "Winston Churchill", "Clement Attlee", "Tony Blair"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["modern", "legends"]},
    {"q": "The French Revolution began in which year?", "c": ["1776", "1789", "1812", "1848"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["modern"]},
    {"q": "Who discovered penicillin?", "c": ["Louis Pasteur", "Alexander Fleming", "Marie Curie", "Isaac Newton"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["modern"]},
    {"q": "Which crisis in 1962 brought the world close to nuclear war?", "c": ["Berlin Crisis", "Korean War", "Cuban Missile Crisis", "Vietnam War"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["modern"]},
    {"q": "Nelson Mandela was the first black president of which country?", "c": ["Kenya", "Nigeria", "South Africa", "Zimbabwe"], "a": 2, "cat": "tarih", "diff": "kolay", "tags": ["modern", "legends"]},
]

for item in modern_qs:
    questions.append({
        "id": qid,
        "lang": "en",
        "category": item["cat"],
        "difficulty": item["diff"],
        "question": item["q"],
        "answers": item["c"],
        "correctAnswer": item["a"],
        "tags": item["tags"]
    })
    qid += 1

# Early Modern (30 questions) - Renaissance, Exploration
# Categories: early_modern, empires
early_modern_qs = [
    {"q": "Who painted the Sistine Chapel ceiling?", "c": ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"], "a": 2, "cat": "tarih", "diff": "kolay", "tags": ["early_modern", "legends"]},
    {"q": "In 1492, Columbus sailed the ocean blue for which country?", "c": ["Portugal", "Italy", "Spain", "France"], "a": 2, "cat": "tarih", "diff": "kolay", "tags": ["early_modern"]},
    {"q": "Who started the Protestant Reformation?", "c": ["John Calvin", "Martin Luther", "Henry VIII", "Pope Leo X"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["early_modern"]},
    {"q": "Which English king had six wives?", "c": ["Henry V", "Henry VIII", "Richard III", "Edward VI"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["early_modern", "legends"]},
    {"q": "The defeat of the Spanish Armada occurred in which year?", "c": ["1588", "1603", "1492", "1776"], "a": 0, "cat": "tarih", "diff": "zor", "tags": ["early_modern", "empires"]},
    {"q": "Who proposed the heliocentric model of the universe?", "c": ["Galileo Galilei", "Nicolaus Copernicus", "Johannes Kepler", "Isaac Newton"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["early_modern"]},
    {"q": "The Thirty Years' War was primarily fought in which area?", "c": ["France", "Spain", "Germany (Holy Roman Empire)", "England"], "a": 2, "cat": "tarih", "diff": "zor", "tags": ["early_modern"]},
    {"q": "Which queen ruled England during the Golden Age?", "c": ["Victoria", "Elizabeth I", "Mary I", "Anne"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["early_modern", "legends"]},
    {"q": "Who conquered the Aztec Empire?", "c": ["Francisco Pizarro", "Hernán Cortés", "Christopher Columbus", "Ferdinand Magellan"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["early_modern", "empires"]},
    {"q": "The Taj Mahal was built by which emperor?", "c": ["Akbar", "Jahangir", "Shah Jahan", "Aurangzeb"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["early_modern", "empires"]},
]

for item in early_modern_qs:
    questions.append({
        "id": qid,
        "lang": "en",
        "category": item["cat"],
        "difficulty": item["diff"],
        "question": item["q"],
        "answers": item["c"],
        "correctAnswer": item["a"],
        "tags": item["tags"]
    })
    qid += 1

print(f"Generated {len(questions)} English history questions")

import os
os.makedirs('seeds', exist_ok=True)
with open('src/app/data/seeds/batch_030_en_history_generated.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print(f"✓ Saved to src/app/data/seeds/batch_030_en_history_generated.json")
