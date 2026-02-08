import json

questions = []
qid = 5100 # Start after previous batch

# ==============================================================================
# 1. ANCIENT & CLASSICAL (30 Questions)
# ==============================================================================
ancient_qs = [
    # Mesopotamia & Middle East
    {"q": "The Code of Hammurabi is one of the earliest examples of what?", "c": ["Written laws", "Musical notation", "Mathematical theorems", "Epic poetry"], "a": 0, "cat": "tarih", "diff": "orta", "tags": ["ancient", "law"]},
    {"q": "Which empire was known for its capital city of Nineveh?", "c": ["Babylonian", "Assyrian", "Persian", "Sumerian"], "a": 1, "cat": "tarih", "diff": "zor", "tags": ["ancient", "empires"]},
    {"q": "Cyrus the Great was the founder of which empire?", "c": ["Achaemenid (Persian)", "Macedonian", "Roman", "Ottoman"], "a": 0, "cat": "tarih", "diff": "orta", "tags": ["ancient", "empires", "legends"]},
    
    # Egypt
    {"q": "The Great Sphinx of Giza faces which direction?", "c": ["North", "South", "East", "West"], "a": 2, "cat": "tarih", "diff": "zor", "tags": ["ancient", "monuments"]},
    {"q": "Which Egyptian queen became pharaoh and wore a fake beard?", "c": ["Nefertiti", "Cleopatra", "Hatshepsut", "Sobekneferu"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["ancient", "legends"]},
    
    # Greece
    {"q": "The Peloponnesian War was fought between which two city-states?", "c": ["Athens and Sparta", "Rome and Carthage", "Thebes and Corinth", "Troy and Mycenae"], "a": 0, "cat": "tarih", "diff": "orta", "tags": ["ancient", "war"]},
    {"q": "Who is considered the 'Father of History'?", "c": ["Thucydides", "Herodotus", "Plutarch", "Xenophon"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["ancient", "literature"]},
    {"q": "Which battle ended the second Persian invasion of Greece?", "c": ["Marathon", "Thermopylae", "Salamis", "Plataea"], "a": 3, "cat": "tarih", "diff": "zor", "tags": ["ancient", "war"]},
    {"q": "Alexander the Great defeated King Darius III at which decisive battle?", "c": ["Gaugamela", "Issus", "Granicus", "Hydaspes"], "a": 0, "cat": "tarih", "diff": "zor", "tags": ["ancient", "war", "legends"]},
    
    # Rome
    {"q": "Which Roman emperor built a wall across northern Britain?", "c": ["Trajan", "Hadrian", "Nero", "Marcus Aurelius"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["ancient", "empire"]},
    {"q": "The Year of the Four Emperors occurred after the death of which emperor?", "c": ["Augustus", "Nero", "Caligula", "Tiberius"], "a": 1, "cat": "tarih", "diff": "zor", "tags": ["ancient", "empire"]},
    {"q": "Who led the slave revolt against Rome in 73 BC?", "c": ["Crixus", "Spartacus", "Gannicus", "Hannibal"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["ancient", "legends"]},
    {"q": "Which battle marked the end of the Roman Republic?", "c": ["Actium", "Pharsalus", "Philippi", "Zama"], "a": 0, "cat": "tarih", "diff": "zor", "tags": ["ancient", "war"]},
    {"q": "What was the name of the elite unit that protected the Roman Emperor?", "c": ["Praetorian Guard", "Varangian Guard", "Legion X", "Immortal Guard"], "a": 0, "cat": "tarih", "diff": "orta", "tags": ["ancient", "military"]},
    
    # Asia & Others
    {"q": "Ashoka the Great ruled which Indian empire?", "c": ["Gupta", "Maurya", "Mughal", "Chola"], "a": 1, "cat": "tarih", "diff": "zor", "tags": ["ancient", "asia"]},
    {"q": "The Silk Road trade route connected China with which region?", "c": ["Europe", "South Africa", "Australia", "Americas"], "a": 0, "cat": "tarih", "diff": "kolay", "tags": ["ancient", "trade"]},
    {"q": "Sun Tzu is famous for writing which book?", "c": ["The Book of Five Rings", "The Art of War", "Tao Te Ching", "Analects"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["ancient", "literature"]},
    {"q": "Which Carthaginian general defeated the Romans at Cannae?", "c": ["Hamilcar", "Hasdrubal", "Hannibal", "Scipio"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["ancient", "war", "legends"]},
    
    # General Ancient
    {"q": "The library of Alexandria was located in which modern-day country?", "c": ["Greece", "Italy", "Turkey", "Egypt"], "a": 3, "cat": "tarih", "diff": "kolay", "tags": ["ancient"]},
    {"q": "Which civilization invented the first known writing system (Cuneiform)?", "c": ["Sumerians", "Egyptians", "Phoenicians", "Chinese"], "a": 0, "cat": "tarih", "diff": "orta", "tags": ["ancient", "invention"]},
    {"q": "Who was the Greek god of the underworld?", "c": ["Zeus", "Apollo", "Hades", "Ares"], "a": 2, "cat": "tarih", "diff": "kolay", "tags": ["ancient", "mythology"]},
    {"q": "The Trojan War is the subject of which epic poem?", "c": ["The Odyssey", "The Iliad", "The Aeneid", "Beowulf"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["ancient", "literature"]},
    {"q": "Which king of Babylon created the Hanging Gardens?", "c": ["Nebuchadnezzar II", "Hammurabi", "Sargon", "Gilgamesh"], "a": 0, "cat": "tarih", "diff": "zor", "tags": ["ancient", "wonders"]},
    {"q": "The Colossus of Rhodes was a statue of which god?", "c": ["Zeus", "Poseidon", "Helios", "Apollo"], "a": 2, "cat": "tarih", "diff": "zor", "tags": ["ancient", "wonders"]},
    {"q": "Which philosopher was sentenced to death by drinking hemlock?", "c": ["Plato", "Aristotle", "Socrates", "Epicurus"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["ancient", "philosophy"]},
]

# ==============================================================================
# 2. MEDIEVAL ERA (25 Questions)
# ==============================================================================
medieval_qs = [
    {"q": "The Battle of Hastings took place in which year?", "c": ["1066", "1215", "1415", "1485"], "a": 0, "cat": "tarih", "diff": "kolay", "tags": ["medieval", "war"]},
    {"q": "Who was the first Holy Roman Emperor?", "c": ["Charlemagne", "Otto I", "Frederick Barbarossa", "Charles V"], "a": 0, "cat": "tarih", "diff": "orta", "tags": ["medieval", "empires"]},
    {"q": "The Magna Carta was signed by which English king?", "c": ["Richard I", "John", "Henry II", "Edward I"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["medieval", "law"]},
    {"q": "Joan of Arc was a heroine of which war?", "c": ["Thirty Years' War", "Hundred Years' War", "War of the Roses", "Crusades"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["medieval", "war", "legends"]},
    {"q": "Saladin was a famous leader during which conflict?", "c": ["The Crusades", "Mongol Invasions", "Reconquista", "Ottoman Expansion"], "a": 0, "cat": "tarih", "diff": "orta", "tags": ["medieval", "war", "legends"]},
    {"q": "The bubonic plague that devastated Europe is also known as?", "c": ["The Spanish Flu", "The Black Death", "The White Plague", "Justinian's Plague"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["medieval", "disease"]},
    {"q": "Who was the Venetian merchant who traveled to China?", "c": ["Christopher Columbus", "Vasco da Gama", "Marco Polo", "Ferdinand Magellan"], "a": 2, "cat": "tarih", "diff": "kolay", "tags": ["medieval", "exploration"]},
    {"q": "The Wars of the Roses were fought between which two houses?", "c": ["York and Lancaster", "Tudor and Stuart", "Valois and Bourbon", "Habsburg and Hanover"], "a": 0, "cat": "tarih", "diff": "orta", "tags": ["medieval", "war"]},
    {"q": "Genghis Khan founded which empire?", "c": ["Ottoman", "Mughal", "Mongol", "Qing"], "a": 2, "cat": "tarih", "diff": "kolay", "tags": ["medieval", "empires", "legends"]},
    {"q": "Which city was the capital of the Aztec Empire?", "c": ["Cusco", "Tenochtitlan", "Chichen Itza", "Tikal"], "a": 1, "cat": "tarih", "diff": "zor", "tags": ["medieval", "americas"]},
    {"q": "William Wallace was a freedom fighter for which country?", "c": ["Ireland", "Wales", "Scotland", "Cornwall"], "a": 2, "cat": "tarih", "diff": "kolay", "tags": ["medieval", "legends"]},
    {"q": "The Reconquista was the retaking of which peninsula from the Moors?", "c": ["Italian", "Balkan", "Iberian", "Anatolian"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["medieval", "war"]},
    {"q": "Who wrote 'The Divine Comedy'?", "c": ["Petrarch", "Boccaccio", "Dante Alighieri", "Machiavelli"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["medieval", "literature"]},
    {"q": "The Vikings primarily came from which region?", "c": ["Scandinavia", "Baltics", "British Isles", "Germany"], "a": 0, "cat": "tarih", "diff": "kolay", "tags": ["medieval"]},
    {"q": "Which battle stopped the Muslim advance into Western Europe in 732?", "c": ["Battle of Tours", "Battle of Hastings", "Battle of Vienna", "Battle of Lepanto"], "a": 0, "cat": "tarih", "diff": "zor", "tags": ["medieval", "war"]},
    {"q": "The Knights Templar were founded to protect pilgrims traveling to where?", "c": ["Rome", "Jerusalem", "Santiago de Compostela", "Mecca"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["medieval", "religion"]},
    {"q": "Mansa Musa was the wealthy ruler of which African empire?", "c": ["Ghana", "Songhai", "Mali", "Ethiopia"], "a": 2, "cat": "tarih", "diff": "zor", "tags": ["medieval", "africa"]},
    {"q": "The Forbidden City was built during which Chinese dynasty?", "c": ["Han", "Tang", "Song", "Ming"], "a": 3, "cat": "tarih", "diff": "zor", "tags": ["medieval", "asia"]},
    {"q": "Who invented the printing press in Europe?", "c": ["Leonardo da Vinci", "Johannes Gutenberg", "Galileo", "Isaac Newton"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["medieval", "invention"]},
    {"q": "The Bayeux Tapestry depicts which historical event?", "c": ["Magna Carta signing", "Battle of Hastings", "Crusades", "Viking raids"], "a": 1, "cat": "tarih", "diff": "zor", "tags": ["medieval", "art"]},
]

# ==============================================================================
# 3. EARLY MODERN & EXPLORATION (25 Questions)
# ==============================================================================
early_modern_qs = [
    {"q": "Which king broke away from the Catholic Church to form the Church of England?", "c": ["Henry VII", "Henry VIII", "Edward VI", "James I"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["early_modern", "religion"]},
    {"q": "Who was the first person to circumnavigate the globe?", "c": ["Columbus", "Magellan", "Drake", "Cook"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["early_modern", "exploration"]},
    {"q": "The Gunpowder Plot of 1605 failed to blow up which building?", "c": ["Buckingham Palace", "Tower of London", "Houses of Parliament", "Westminster Abbey"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["early_modern", "uk"]},
    {"q": "Louis XIV of France became known as the?", "c": ["Lion King", "Sun King", "Moon King", "Iron King"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["early_modern", "france"]},
    {"q": "Which philosopher said 'I think, therefore I am'?", "c": ["Locke", "Kant", "Descartes", "Voltaire"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["early_modern", "philosophy"]},
    {"q": "The Battle of Waterloo marked the final defeat of whom?", "c": ["Napoleon Bonaparte", "Duke of Wellington", "King George III", "Tsar Alexander I"], "a": 0, "cat": "tarih", "diff": "kolay", "tags": ["early_modern", "war"]},
    {"q": "Who discovered the law of gravity after seeing an apple fall?", "c": ["Copernicus", "Kepler", "Galileo", "Newton"], "a": 3, "cat": "tarih", "diff": "kolay", "tags": ["early_modern", "science"]},
    {"q": "Peter the Great is credited with modernizing which country?", "c": ["Germany", "France", "Russia", "Sweden"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["early_modern", "russia"]},
    {"q": "The Boston Tea Party was a protest against which country?", "c": ["France", "Spain", "Great Britain", "Netherlands"], "a": 2, "cat": "tarih", "diff": "kolay", "tags": ["early_modern", "usa"]},
    {"q": "Marie Antoinette was queen of France during which revolution?", "c": ["Russian Revolution", "French Revolution", "American Revolution", "Industrial Revolution"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["early_modern", "france"]},
    {"q": "Who wrote 'The Prince'?", "c": ["Machiavelli", "Dante", "Hobbes", "More"], "a": 0, "cat": "tarih", "diff": "orta", "tags": ["early_modern", "literature"]},
    {"q": "Which treaty ended the American Revolutionary War?", "c": ["Treaty of Paris", "Treaty of Versailles", "Treaty of Ghent", "Treaty of Utrecht"], "a": 0, "cat": "tarih", "diff": "zor", "tags": ["early_modern", "usa"]},
    {"q": "Catherine the Great was the Empress of?", "c": ["Austria", "Prussia", "Russia", "France"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["early_modern", "russia"]},
    {"q": "Who painted 'The Night Watch'?", "c": ["Vermeer", "Rembrandt", "Van Gogh", "Rubens"], "a": 1, "cat": "tarih", "diff": "zor", "tags": ["early_modern", "art"]},
    {"q": "The Great Fire of London happened in which year?", "c": ["1666", "1642", "1688", "1605"], "a": 0, "cat": "tarih", "diff": "zor", "tags": ["early_modern", "uk"]},
    {"q": "Captain James Cook is famous for exploring which region?", "c": ["Arctic", "Pacific Ocean", "Amazon", "Sahara"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["early_modern", "exploration"]},
    {"q": "The guillotine was widely used during which historical period?", "c": ["Middle Ages", "French Revolution", "Spanish Inquisition", "English Civil War"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["early_modern", "france"]},
    {"q": "Which War of Independence began in 1775?", "c": ["French", "American", "Haitian", "Greek"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["early_modern", "usa"]},
]

# ==============================================================================
# 4. 19th CENTURY & INDUSTRIAL AGE (20 Questions)
# ==============================================================================
nineteenth_qs = [
    {"q": "Queen Victoria reigned for how many years?", "c": ["50", "63", "45", "70"], "a": 1, "cat": "tarih", "diff": "zor", "tags": ["modern", "uk"]},
    {"q": "The Battle of Gettysburg was a turning point in which war?", "c": ["WWI", "American Civil War", "Mexican-American War", "War of 1812"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["modern", "usa"]},
    {"q": "Who wrote The Communist Manifesto?", "c": ["Lenin", "Marx and Engels", "Stalin", "Trotsky"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["modern", "politics"]},
    {"q": "The Light Brigade charge happened during which war?", "c": ["Boer War", "Crimean War", "Napoleonic Wars", "Seven Years' War"], "a": 1, "cat": "tarih", "diff": "zor", "tags": ["modern", "war"]},
    {"q": "Who assassinated Abraham Lincoln?", "c": ["Lee Harvey Oswald", "John Wilkes Booth", "Charles Guiteau", "James Earl Ray"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["modern", "usa"]},
    {"q": "The Suez Canal connects the Mediterranean Sea to which body of water?", "c": ["Black Sea", "Red Sea", "Atlantic Ocean", "Caspian Sea"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["modern", "geography"]},
    {"q": "Which country sold Alaska to the USA in 1867?", "c": ["Canada", "France", "Russia", "Spain"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["modern", "trade"]},
    {"q": "Who invented the telephone?", "c": ["Edison", "Bell", "Tesla", "Marconi"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["modern", "invention"]},
    {"q": "The Eiffel Tower was built for the World's Fair in which year?", "c": ["1889", "1900", "1851", "1875"], "a": 0, "cat": "tarih", "diff": "zor", "tags": ["modern", "monuments"]},
    {"q": "Florence Nightingale is considered the founder of modern?", "c": ["Surgery", "Nursing", "Midwifery", "Pharmacy"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["modern", "medicine"]},
    {"q": "The Boer Wars were fought in which African country?", "c": ["Egypt", "Kenya", "South Africa", "Nigeria"], "a": 2, "cat": "tarih", "diff": "zor", "tags": ["modern", "war"]},
    {"q": "Who was the first Chancellor of Germany?", "c": ["Bismarck", "Wilhelm I", "Hitler", "Hindenburg"], "a": 0, "cat": "tarih", "diff": "orta", "tags": ["modern", "germany"]},
    {"q": "The Meiji Restoration modernized which country?", "c": ["China", "Japan", "Korea", "Thailand"], "a": 1, "cat": "tarih", "diff": "zor", "tags": ["modern", "asia"]},
    {"q": "Which famous ship sank on its maiden voyage in 1912?", "c": ["Lusitania", "Titanic", "Britannic", "Olympic"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["modern", "disaster"]},
]

# ==============================================================================
# 5. 20th CENTURY & CONTEMPORARY (30 Questions)
# ==============================================================================
twentieth_qs = [
    {"q": "The assassination of Archduke Franz Ferdinand took place in which city?", "c": ["Vienna", "Berlin", "Sarajevo", "Belgrade"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["modern", "ww1"]},
    {"q": "Which country was NOT part of the Axis Powers in WWII?", "c": ["Germany", "Italy", "Japan", "Soviet Union"], "a": 3, "cat": "tarih", "diff": "kolay", "tags": ["modern", "ww2"]},
    {"q": "Who was the leader of Nazi Germany?", "c": ["Mussolini", "Hitler", "Himmler", "Goebbels"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["modern", "ww2"]},
    {"q": "The D-Day landings took place in which region of France?", "c": ["Brittany", "Normandy", "Provence", "Calais"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["modern", "ww2"]},
    {"q": "The atomic bombs were dropped on Hiroshima and?", "c": ["Tokyo", "Kyoto", "Nagasaki", "Osaka"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["modern", "ww2"]},
    {"q": "Who was the first woman to fly solo across the Atlantic?", "c": ["Amelia Earhart", "Bessie Coleman", "Harriet Quimby", "Valentina Tereshkova"], "a": 0, "cat": "tarih", "diff": "orta", "tags": ["modern", "aviation"]},
    {"q": "The Cold War was primarily between which two superpowers?", "c": ["USA and China", "USA and USSR", "UK and Germany", "France and Russia"], "a": 1, "cat": "tarih", "diff": "kolay", "tags": ["modern", "politics"]},
    {"q": "Who was the first human to journey into outer space?", "c": ["Neil Armstrong", "John Glenn", "Yuri Gagarin", "Buzz Aldrin"], "a": 2, "cat": "tarih", "diff": "orta", "tags": ["modern", "space"]},
    {"q": "The Berlin Wall was built in which year?", "c": ["1945", "1953", "1961", "1972"], "a": 2, "cat": "tarih", "diff": "zor", "tags": ["modern", "cold_war"]},
    {"q": "In which city was President John F. Kennedy assassinated?", "c": ["Austin", "Dallas", "Houston", "Washington D.C."], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["modern", "usa"]},
    {"q": "Which treaty created the European Union?", "c": ["Treaty of Rome", "Maastricht Treaty", "Treaty of Paris", "Lisbon Treaty"], "a": 1, "cat": "tarih", "diff": "zor", "tags": ["modern", "eu"]},
    {"q": "Apartheid was a system of racial segregation in?", "c": ["USA", "Australia", "South Africa", "Brazil"], "a": 2, "cat": "tarih", "diff": "kolay", "tags": ["modern", "politics"]},
    {"q": "Chernobyl nuclear disaster happened in which country (at the time)?", "c": ["Russia", "Ukraine (USSR)", "Belarus", "Poland"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["modern", "disaster"]},
    {"q": "Who was the first female Prime Minister of the UK?", "c": ["Theresa May", "Margaret Thatcher", "Liz Truss", "Angela Merkel"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["modern", "uk"]},
    {"q": "The 9/11 attacks targeted the World Trade Center and?", "c": ["White House", "Capitol Building", "Pentagon", "Statue of Liberty"], "a": 2, "cat": "tarih", "diff": "kolay", "tags": ["modern", "usa"]},
    {"q": "Which war lasted from 1950 to 1953?", "c": ["Vietnam War", "Korean War", "Gulf War", "Falklands War"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["modern", "war"]},
    {"q": "Who succeeded Stalin as leader of the Soviet Union?", "c": ["Brezhnev", "Khrushchev", "Gorbachev", "Andropov"], "a": 1, "cat": "tarih", "diff": "zor", "tags": ["modern", "ussr"]},
    {"q": "The 'Iron Curtain' speech was given by?", "c": ["Truman", "Churchill", "Stalin", "Roosevelt"], "a": 1, "cat": "tarih", "diff": "orta", "tags": ["modern", "politics"]},
    {"q": "Which country was first to grant women the right to vote?", "c": ["USA", "UK", "New Zealand", "Finland"], "a": 2, "cat": "tarih", "diff": "zor", "tags": ["modern", "rights"]},
    {"q": "Mahatma Gandhi led the independence movement in?", "c": ["South Africa", "Pakistan", "India", "Bangladesh"], "a": 2, "cat": "tarih", "diff": "kolay", "tags": ["modern", "india"]},
]

all_qs = ancient_qs + medieval_qs + early_modern_qs + nineteenth_qs + twentieth_qs

for item in all_qs:
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

print(f"Generated {len(questions)} robust English history questions")

import os
os.makedirs('src/app/data/seeds', exist_ok=True)
with open('src/app/data/seeds/batch_031_en_history_expansion.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print(f"✓ Saved to src/app/data/seeds/batch_031_en_history_expansion.json")
