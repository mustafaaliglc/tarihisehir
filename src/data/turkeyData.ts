export interface CityQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CityData {
  id: string;
  name: string;
  plate: string;
  region: 'Marmara' | 'Ege' | 'İç Anadolu' | 'Akdeniz' | 'Karadeniz' | 'Doğu Anadolu' | 'Güneydoğu Anadolu';
  x: number; // percentage on map (0 - 100)
  y: number; // percentage on map (0 - 100)
  landmark: string;
  epoch: string;
  shortDesc: string;
  legend: string;
  builder: string;
  century: string;
  badgeName: string;
  gameQuestions: CityQuestion[];
}

export const REGIONS = [
  'Marmara',
  'Ege',
  'İç Anadolu',
  'Akdeniz',
  'Karadeniz',
  'Doğu Anadolu',
  'Güneydoğu Anadolu',
] as const;

export const TURKEY_CITIES: CityData[] = [
  {
    "id": "adana",
    "name": "Adana",
    "plate": "01",
    "region": "Akdeniz",
    "x": 51.9,
    "y": 73.6,
    "landmark": "Taşköprü & Varda Köprüsü",
    "epoch": "Roma & Osmanlı",
    "shortDesc": "Seyhan Nehri üzerinde dünyada hala kullanılan en eski taş köprülerden biri olan Roma Taşköprüsü.",
    "legend": "Taşköprü'nün ayaklarının altında gizli hazineler olduğuna inanılır.",
    "builder": "Roma İmparatoru Hadrianus",
    "century": "MS 4. Yüzyıl",
    "badgeName": "Çukurova Kartalı",
    "gameQuestions": [
      {
        "question": "Adana'da Seyhan Nehri üzerinde bulunan tarihi Roma köprüsü hangisidir?",
        "options": [
          "Taşköprü",
          "Mostar Köprüsü",
          "Uzunköprü",
          "Malabadi Köprüsü"
        ],
        "correctIndex": 0,
        "explanation": "Taşköprü, Roma döneminden günümüze kadar ayakta kalmış dünyanın en eski köprülerindendir."
      }
    ]
  },
  {
    "id": "adiyaman",
    "name": "Adıyaman",
    "plate": "02",
    "region": "Güneydoğu Anadolu",
    "x": 66,
    "y": 68.3,
    "landmark": "Nemrut Dağı Heykelleri",
    "epoch": "Kommagene Krallığı",
    "shortDesc": "2150 metre zirvede güneşin doğuşunu ve batışını selamlayan devasa tanrı ve kral heykelleri.",
    "legend": "Kral Antiochos kendini tanrılarla bir tuttuğu için kendi heykelini de dev tanrı heykellerinin yanına yaptırmıştır.",
    "builder": "Kral I. Antiochos",
    "century": "MÖ 1. Yüzyıl",
    "badgeName": "Nemrut Kartalı",
    "gameQuestions": [
      {
        "question": "Nemrut Dağı'nın zirvesindeki devasa heykeller hangi krallığa aittir?",
        "options": [
          "Kommagene Krallığı",
          "Hititler",
          "Lidyalılar",
          "Urartular"
        ],
        "correctIndex": 0,
        "explanation": "Nemrut Dağı heykelleri Kommagene Krallığı döneminde yapılmış bir dünya mirasıdır."
      }
    ]
  },
  {
    "id": "afyonkarahisar",
    "name": "Afyonkarahisar",
    "plate": "03",
    "region": "Ege",
    "x": 26.4,
    "y": 56.1,
    "landmark": "Afyon Kalesi & Frig Vadisi",
    "epoch": "Hitit, Frig & Selçuklu",
    "shortDesc": "226 metre yükseklikteki volkanik sarp kaya kütlesi üzerine kurulu heybetli tarihi kale.",
    "legend": "Kalenin tepesindeki Kız Kulesi'ne çıkanların bahtının açılacağına dair asırlık bir inanış vardır.",
    "builder": "Hitit Kralı II. Murşili",
    "century": "MÖ 1350",
    "badgeName": "Hisar Muhafızı",
    "gameQuestions": [
      {
        "question": "Afyonkarahisar'ın simgesi olan volkanik kaya üzerindeki tarihi yapı hangisidir?",
        "options": [
          "Afyon Kalesi",
          "Alanya Kalesi",
          "Ankara Kalesi",
          "Mardin Kalesi"
        ],
        "correctIndex": 0,
        "explanation": "Afyon Kalesi, yalçın volkanik bir kaya kütlesi üzerinde yer alır."
      }
    ]
  },
  {
    "id": "agri",
    "name": "Ağrı",
    "plate": "04",
    "region": "Doğu Anadolu",
    "x": 91,
    "y": 41.9,
    "landmark": "İshak Paşa Sarayı & Ağrı Dağı",
    "epoch": "Osmanlı İmparatorluğu (Lale Devri)",
    "shortDesc": "Dünyanın ilk merkezi kalorifer sistemiyle ısıtılan, kartal yuvası gibi sarp kayalıkta yükselen saray.",
    "legend": "Sarayın altın yaldızlı kapısının dillere destan olduğu ve 40 at tarafından taşındığı söylenir.",
    "builder": "Çolak Abdi Paşa & İshak Paşa",
    "century": "1784",
    "badgeName": "Saraylar Sultanı",
    "gameQuestions": [
      {
        "question": "Doğubayazıt'ta bulunan ve ilk merkezi ısıtmalı saray kabul edilen şaheser hangisidir?",
        "options": [
          "İshak Paşa Sarayı",
          "Topkapı Sarayı",
          "Dolmabahçe Sarayı",
          "Çırağan Sarayı"
        ],
        "correctIndex": 0,
        "explanation": "İshak Paşa Sarayı, Osmanlı, Selçuklu ve Fars mimarisinin ortak şaheseridir."
      }
    ]
  },
  {
    "id": "amasya",
    "name": "Amasya",
    "plate": "05",
    "region": "Karadeniz",
    "x": 52.5,
    "y": 24.6,
    "landmark": "Kral Kaya Mezarları & Yalıboyu Evleri",
    "epoch": "Pontus Krallığı & Osmanlı",
    "shortDesc": "Yeşilırmak kıyısında dik dağlara oyulmuş kral mezarları ve şehzadeler şehri.",
    "legend": "Ferhat ile Şirin'in aşkı uğruna dağları delerek şehre su getirdiği efsanesi burada geçmiştir.",
    "builder": "Pontus Kralları",
    "century": "MÖ 3. Yüzyıl",
    "badgeName": "Şehzadeler Rehberi",
    "gameQuestions": [
      {
        "question": "Amasya'da Yeşilırmak kıyısındaki dağlara oyulan antik mezarlar kime aittir?",
        "options": [
          "Pontus Kralları",
          "Pers Şahları",
          "Roma Sezarları",
          "Mısır Firavunları"
        ],
        "correctIndex": 0,
        "explanation": "Kral Kaya Mezarları, Helenistik dönem Pontus Krallığı krallarına aittir."
      }
    ]
  },
  {
    "id": "ankara",
    "name": "Ankara",
    "plate": "06",
    "region": "İç Anadolu",
    "x": 36.5,
    "y": 38.6,
    "landmark": "Anıtkabir & Ankara Kalesi",
    "epoch": "Frigler, Roma, Selçuklu & Cumhuriyet",
    "shortDesc": "Gazi Mustafa Kemal Atatürk'ün ebedi istirahatgâhı Anıtkabir ve Türkiye'nin başkenti.",
    "legend": "Kral Midas'ın burada bir gemi çapası bulmasıyla şehrin kurulduğu efsane edilir.",
    "builder": "Emin Onat, Orhan Arda & Frigler",
    "century": "MÖ 8. Yüzyıl & 1953",
    "badgeName": "Başkent Rehberi",
    "gameQuestions": [
      {
        "question": "Gazi Mustafa Kemal Atatürk'ün anıt mezarı Anıtkabir hangi şehrimizdedir?",
        "options": [
          "Ankara",
          "İstanbul",
          "İzmir",
          "Samsun"
        ],
        "correctIndex": 0,
        "explanation": "Anıtkabir, başkent Ankara'nın Rasattepe mevkiinde yer almaktadır."
      }
    ]
  },
  {
    "id": "antalya",
    "name": "Antalya",
    "plate": "07",
    "region": "Akdeniz",
    "x": 27.9,
    "y": 83,
    "landmark": "Aspendos Tiyatrosu & Kaleiçi",
    "epoch": "Roma & Likya",
    "shortDesc": "Akustiği günümüze kadar kusursuz ulaşmış antik tiyatro ve turkuaz Akdeniz kıyıları.",
    "legend": "Mimar Zenon'un sahneden fısıldadığı kelimelerin en üst basamaktan kral tarafından duyulduğu söylenir.",
    "builder": "Mimar Zenon & Roma İmparatorluğu",
    "century": "MS 2. Yüzyıl",
    "badgeName": "Akdeniz Bilgini",
    "gameQuestions": [
      {
        "question": "Antalya'da mükemmel akustiğiyle ünlü antik tiyatro hangisidir?",
        "options": [
          "Aspendos Tiyatrosu",
          "Koloseum",
          "Efes Tiyatrosu",
          "Bergama Tiyatrosu"
        ],
        "correctIndex": 0,
        "explanation": "Aspendos, dünyada sahnesi ve akustiği en iyi korunmuş antik Roma tiyatrolarındandır."
      }
    ]
  },
  {
    "id": "artvin",
    "name": "Artvin",
    "plate": "08",
    "region": "Karadeniz",
    "x": 83.8,
    "y": 18.4,
    "landmark": "Şavşat Kalesi & Karagöl",
    "epoch": "Bagratlı Krallığı & Osmanlı",
    "shortDesc": "Zümrüt yeşili yaylalar, dik vadi kaleleri ve masalsı Karagöl doğa harikası.",
    "legend": "Kafkas dağlarının sisleri arasında yükselen kalelerin kartallara yuva olduğu anlatılır.",
    "builder": "Bagratlı Krallığı",
    "century": "MS 9. Yüzyıl",
    "badgeName": "Kafkas Kartalı",
    "gameQuestions": [
      {
        "question": "Artvin'in doğa harikası milli park gölü hangisidir?",
        "options": [
          "Karagöl",
          "Uzungöl",
          "Abant",
          "Eğirdir"
        ],
        "correctIndex": 0,
        "explanation": "Borçka ve Şavşat Karagöl, yemyeşil ormanlarla çevrili büyüleyici göllerdir."
      }
    ]
  },
  {
    "id": "aydin",
    "name": "Aydın",
    "plate": "09",
    "region": "Ege",
    "x": 12.9,
    "y": 69.1,
    "landmark": "Afrodisias Antik Kenti & Milet",
    "epoch": "Roma & Karya",
    "shortDesc": "Güzellik tanrıçası Afrodit'e adanmış antik mermer heykeltıraşlık başkenti.",
    "legend": "Afrodisias mermer heykellerinin canlı gibi parladığına inanılırdı.",
    "builder": "Karyalılar & Romalılar",
    "century": "MÖ 3. Yüzyıl",
    "badgeName": "Heykel Ustası",
    "gameQuestions": [
      {
        "question": "Aydın'da bulunan heykelleriyle ünlü UNESCO antik kenti hangisidir?",
        "options": [
          "Afrodisias",
          "Truva",
          "Hattuşa",
          "Gordion"
        ],
        "correctIndex": 0,
        "explanation": "Afrodisias, mermer heykeltıraşlık okuluyla Roma dünyasına ün salmıştır."
      }
    ]
  },
  {
    "id": "balikesir",
    "name": "Balıkesir",
    "plate": "10",
    "region": "Marmara",
    "x": 12.2,
    "y": 40.3,
    "landmark": "Antandros Antik Kenti & Saat Kulesi",
    "epoch": "Karesi Beyliği & Roma",
    "shortDesc": "Kaz Dağları'nın eteklerinde Truva efsanelerine tanıklık eden zengin antik kent.",
    "legend": "Antik İda (Kaz) Dağı'nda tarihin ilk güzellik yarışmasının yapıldığı söylenir.",
    "builder": "Pelasglar & Karesioğulları",
    "century": "MÖ 8. Yüzyıl",
    "badgeName": "Kazdağı Kartalı",
    "gameQuestions": [
      {
        "question": "Balıkesir Edremit körfezinde mozaikleriyle ünlü antik kent hangisidir?",
        "options": [
          "Antandros",
          "Knidos",
          "Assos",
          "Sardes"
        ],
        "correctIndex": 0,
        "explanation": "Antandros, Kaz Dağları eteklerinde yer alan zengin bir antik kenttir."
      }
    ]
  },
  {
    "id": "bilecik",
    "name": "Bilecik",
    "plate": "11",
    "region": "Marmara",
    "x": 23.6,
    "y": 34.3,
    "landmark": "Şeyh Edebali Türbesi & Saat Kulesi",
    "epoch": "Osmanlı Devleti (Kuruluş)",
    "shortDesc": "Osmanlı Devleti'nin tohumlarının atıldığı ve Şeyh Edebali'nin Osman Gazi'ye öğüt verdiği yer.",
    "legend": "\"İnsanı yaşat ki devlet yaşasın\" sözü bu topraklarda söylenmiştir.",
    "builder": "Osmanlı Devleti",
    "century": "MS 13. Yüzyıl",
    "badgeName": "Kuruluş Meşalesi",
    "gameQuestions": [
      {
        "question": "Osmanlı Devleti'nin manevi kurucusu sayılan Şeyh Edebali'nin türbesi hangi ilimizdedir?",
        "options": [
          "Bilecik",
          "Bursa",
          "Edirne",
          "Kütahya"
        ],
        "correctIndex": 0,
        "explanation": "Şeyh Edebali Türbesi Bilecik il merkezinde tarihi vadide yer alır."
      }
    ]
  },
  {
    "id": "bingol",
    "name": "Bingöl",
    "plate": "12",
    "region": "Doğu Anadolu",
    "x": 78.1,
    "y": 49.5,
    "landmark": "Yüzen Adalar & Kral Kızı Kalesi",
    "epoch": "Urartu & Doğa",
    "shortDesc": "Rüzgar estikçe gölün üzerinde bağımsız hareket eden eşsiz yüzen adalar doğa mucizesi.",
    "legend": "Adaların su üstünde sal gibi yüzmesinin perilerin oyunu olduğuna inanılırdı.",
    "builder": "Doğa & Urartular",
    "century": "Milyonlarca Yıl Öncesi",
    "badgeName": "Yüzen Ada Kaşifi",
    "gameQuestions": [
      {
        "question": "Göl üzerinde rüzgarla serbestçe hareket eden Yüzen Adalar hangi ilimizdedir?",
        "options": [
          "Bingöl",
          "Muş",
          "Bitlis",
          "Ağrı"
        ],
        "correctIndex": 0,
        "explanation": "Bingöl Solhan ilçesinde yer alan Turnalar Gölü'ndeki adalar su üstünde yüzer."
      }
    ]
  },
  {
    "id": "bitlis",
    "name": "Bitlis",
    "plate": "13",
    "region": "Doğu Anadolu",
    "x": 86.8,
    "y": 57.2,
    "landmark": "Ahlat Selçuklu Mezarlığı & Bitlis Kalesi",
    "epoch": "Selçuklu & Osmanlı",
    "shortDesc": "Dünyanın en büyük tarihi İslam mezarlığı kabul edilen devasa oymalı Ahlat mezar taşları.",
    "legend": "Büyük İskender'in komutanı Badlis'in sarp kayalara yaptırdığı kalenin fethedilemez olduğu söylenir.",
    "builder": "Ahlatşahlar & Selçuklular",
    "century": "MS 12. Yüzyıl",
    "badgeName": "Ahlat Bilgini",
    "gameQuestions": [
      {
        "question": "UNESCO Dünya Mirası Geçici Listesi'ndeki devasa oymalı Selçuklu mezar taşları hangi ilçededir?",
        "options": [
          "Ahlat",
          "Tatvan",
          "Adilcevaz",
          "Hizan"
        ],
        "correctIndex": 0,
        "explanation": "Bitlis Ahlat Selçuklu Mezarlığı, \"Kubbet-ül İslam\" olarak bilinen açık hava müzesidir."
      }
    ]
  },
  {
    "id": "bolu",
    "name": "Bolu",
    "plate": "14",
    "region": "Karadeniz",
    "x": 31.5,
    "y": 26,
    "landmark": "Yedigöller & Abant Tabiat Parkı",
    "epoch": "Doğa & Osmanlı",
    "shortDesc": "Yedi ayrı heyelan gölünün birbirine bağlandığı masalsı ormanlar ve Köroğlu efsanesi.",
    "legend": "Köroğlu'nun haksızlığa karşı Bolu Beyi'ne başkaldırdığı dağlar buradadır.",
    "builder": "Doğa & Türk Halk Kültürü",
    "century": "Doğal & Efsanevi",
    "badgeName": "Köroğlu Yiğidi",
    "gameQuestions": [
      {
        "question": "Heyelan set gölleriyle oluşan ünlü Yedigöller Milli Parkı hangi ilimizdedir?",
        "options": [
          "Bolu",
          "Düzce",
          "Kastamonu",
          "Bursa"
        ],
        "correctIndex": 0,
        "explanation": "Yedigöller, Bolu'nun kuzeyinde yer alan dünyaca ünlü tabiat cennetidir."
      }
    ]
  },
  {
    "id": "burdur",
    "name": "Burdur",
    "plate": "15",
    "region": "Akdeniz",
    "x": 23.6,
    "y": 73.9,
    "landmark": "Sagalassos Antik Kenti & Salda Gölü",
    "epoch": "Roma & Pisidya",
    "shortDesc": "Dağların doruklarında Antoninler Çeşmesi'nden hala su akan büyüleyici Sagalassos ve Salda Gölü.",
    "legend": "Antoninler Çeşmesi'nden su içenlerin ömür boyu güzelleşeceğine inanılırdı.",
    "builder": "Pisidyalılar & Roma İmparatorluğu",
    "century": "MS 2. Yüzyıl",
    "badgeName": "Bulutlar Kenti",
    "gameQuestions": [
      {
        "question": "Burdur Ağlasun'da binlerce yıldır çeşmesinden su akan antik kent hangisidir?",
        "options": [
          "Sagalassos",
          "Perge",
          "Hierapolis",
          "Efes"
        ],
        "correctIndex": 0,
        "explanation": "Sagalassos, Toros Dağları'nın 1700 metre yükseğindeki muazzam Roma kentidir."
      }
    ]
  },
  {
    "id": "bursa",
    "name": "Bursa",
    "plate": "16",
    "region": "Marmara",
    "x": 18.1,
    "y": 33.5,
    "landmark": "Ulu Cami & Yeşil Türbe",
    "epoch": "Osmanlı İmparatorluğu (Erken Dönem)",
    "shortDesc": "Osmanlı Devleti'nin ilk başkenti, 20 kubbeli şadırvanlı Ulu Cami ve Yeşil Türbe.",
    "legend": "Ulu Cami inşasında çalışan işçilere Somuncu Baba'nın fırınından sıcak ekmek dağıttığı rivayet edilir.",
    "builder": "Yıldırım Bayezid & Çelebi Mehmed",
    "century": "1399 & 1421",
    "badgeName": "Osmanlı Çınarı",
    "gameQuestions": [
      {
        "question": "Bursa Ulu Cami'nin çatısı açık kubbesinin altında yer alan özel yapı nedir?",
        "options": [
          "Şadırvan (Havuz)",
          "Mihrap",
          "Saat Kulesi",
          "Çan Kulesi"
        ],
        "correctIndex": 0,
        "explanation": "Ulu Cami içinde yer alan 16 köşeli havuzlu şadırvan eşsiz bir su akustiği sağlar."
      }
    ]
  },
  {
    "id": "canakkale",
    "name": "Çanakkale",
    "plate": "17",
    "region": "Marmara",
    "x": 7.4,
    "y": 30.5,
    "landmark": "Truva Antik Kenti & Şehitler Abidesi",
    "epoch": "Truva Krallığı & 1915 Çanakkale",
    "shortDesc": "Truva Atı efsanesinin ve \"Çanakkale Geçilmez\" destanının yazıldığı kahraman topraklar.",
    "legend": "Akhaların surları aşmak için şehrin önüne bıraktığı tahta at tarihin en meşhur taktiğidir.",
    "builder": "Truvalılar & Türk Milleti",
    "century": "MÖ 3000 & 1915",
    "badgeName": "Truva Kahramanı",
    "gameQuestions": [
      {
        "question": "Homeros'un İlyada destanına konu olan Truva Savaşı hangi ilimiz topraklarında geçmiştir?",
        "options": [
          "Çanakkale",
          "İzmir",
          "Muğla",
          "Balıkesir"
        ],
        "correctIndex": 0,
        "explanation": "Truva antik kenti Çanakkale sınırları içinde yer almaktadır."
      }
    ]
  },
  {
    "id": "cankiri",
    "name": "Çankırı",
    "plate": "18",
    "region": "İç Anadolu",
    "x": 40.8,
    "y": 24.7,
    "landmark": "Tarihi Tuz Mağarası & Çankırı Kalesi",
    "epoch": "Hititler Dönemi & Doğa",
    "shortDesc": "Hititlerden beri 5 bin yıldır işletilen devasa yer altı tuz galerileri.",
    "legend": "Tuz mağarasında yüzyıllar öncesinden kalma bozulmamış fosiller bulunmaktadır.",
    "builder": "Hititler & Doğa",
    "century": "MÖ 3000",
    "badgeName": "Tuz Şehri Kaşifi",
    "gameQuestions": [
      {
        "question": "Çankırı'da Hititlerden beri tuz çıkarılan devasa yer altı mağarası hangisidir?",
        "options": [
          "Tuz Mağarası",
          "Damlataş",
          "Dupnisa",
          "Karain"
        ],
        "correctIndex": 0,
        "explanation": "Çankırı Tuz Mağarası, yerin 150 metre altında devasa tuz galerilerine sahiptir."
      }
    ]
  },
  {
    "id": "corum",
    "name": "Çorum",
    "plate": "19",
    "region": "Karadeniz",
    "x": 47,
    "y": 26.7,
    "landmark": "Hattuşa (Hitit Başkenti) & Yazılıkaya",
    "epoch": "Hitit İmparatorluğu",
    "shortDesc": "Tarihin ilk yazılı barış antlaşması Kadeş'in yapıldığı Hitit İmparatorluğu'nun başkenti.",
    "legend": "Hitit kralları Yazılıkaya açık hava tapınağında 12 yer altı tanrısına dualar ederdi.",
    "builder": "Hitit Kralları",
    "century": "MÖ 1600",
    "badgeName": "Hitit Güneşi",
    "gameQuestions": [
      {
        "question": "Hitit İmparatorluğu'nun UNESCO tescilli antik başkenti hangisidir?",
        "options": [
          "Hattuşa",
          "Gordion",
          "Sardes",
          "Tuşpa"
        ],
        "correctIndex": 0,
        "explanation": "Hattuşa (Boğazkale), Çorum'da yer alan görkemli Hitit başkentidir."
      }
    ]
  },
  {
    "id": "denizli",
    "name": "Denizli",
    "plate": "20",
    "region": "Ege",
    "x": 19.3,
    "y": 69.1,
    "landmark": "Pamukkale Travertenleri & Hierapolis",
    "epoch": "Pergamon & Roma",
    "shortDesc": "Kalsiyum çökelimiyle oluşan bembeyaz pamuk teraslar ve antik şifa kenti Hierapolis.",
    "legend": "Mısır Kraliçesi Kleopatra'nın güzelliğini buradaki antik termal havuza borçlu olduğu söylenir.",
    "builder": "Doğa & Bergama Krallığı",
    "century": "MÖ 2. Yüzyıl",
    "badgeName": "Beyaz Cennet Kaşifi",
    "gameQuestions": [
      {
        "question": "Pamukkale travertenlerinin oluşmasını sağlayan doğal su özelliği nedir?",
        "options": [
          "Kalsiyum karbonatlı termal sular",
          "Tuzlu buzul suları",
          "Kükürt gazı",
          "Demir madeni"
        ],
        "correctIndex": 0,
        "explanation": "Termal sulardaki kalsiyum karbonat havayla temas edince çökelerek beyaz basamakları oluşturur."
      }
    ]
  },
  {
    "id": "diyarbakir",
    "name": "Diyarbakır",
    "plate": "21",
    "region": "Güneydoğu Anadolu",
    "x": 76.3,
    "y": 63.5,
    "landmark": "Diyarbakır Surları & On Gözlü Köprü",
    "epoch": "Hurri-Mitanni, Roma & Osmanlı",
    "shortDesc": "Çin Seddi'nden sonra dünyanın en uzun ve bozulmamış siyah bazalt taş surları.",
    "legend": "Dicle Nehri üzerindeki On Gözlü Köprü'nün asırlardır aşıkları birbirine kavuşturduğu söylenir.",
    "builder": "Roma İmparatoru II. Constantius & Selçuklular",
    "century": "MS 4. Yüzyıl",
    "badgeName": "Surlar Fatihi",
    "gameQuestions": [
      {
        "question": "Diyarbakır'ın UNESCO Dünya Mirası Listesi'ndeki devasa tarihi yapısı hangisidir?",
        "options": [
          "Diyarbakır Surları",
          "Babil Kulesi",
          "Galata Kulesi",
          "Sinop Kalesi"
        ],
        "correctIndex": 0,
        "explanation": "Diyarbakır Surları, 5.5 kilometrelik uzunluğu ve burçlarıyla benzersizdir."
      }
    ]
  },
  {
    "id": "edirne",
    "name": "Edirne",
    "plate": "22",
    "region": "Marmara",
    "x": 5.4,
    "y": 16.6,
    "landmark": "Selimiye Camii & Eski Cami",
    "epoch": "Osmanlı İmparatorluğu (Klasik Dönem)",
    "shortDesc": "Mimar Sinan'ın \"Ustalık Eserim\" dediği, tek kubbeli mimarlık harikası Selimiye Camii.",
    "legend": "Selimiye Camii minberindeki ters lale arsa sahibinin inatçılığını temsil eder.",
    "builder": "Mimar Sinan",
    "century": "1575",
    "badgeName": "Sinan Çırağı",
    "gameQuestions": [
      {
        "question": "Büyük mimar Mimar Sinan'ın \"Ustalık Eserim\" dediği şaheser cami nerededir?",
        "options": [
          "Edirne",
          "İstanbul",
          "Bursa",
          "Trabzon"
        ],
        "correctIndex": 0,
        "explanation": "Edirne Selimiye Camii, Mimar Sinan'ın 80'li yaşlarında tamamladığı ustalık şaheseridir."
      }
    ]
  },
  {
    "id": "elazig",
    "name": "Elazığ",
    "plate": "23",
    "region": "Doğu Anadolu",
    "x": 71.6,
    "y": 55.2,
    "landmark": "Harput Kalesi (Süt Kalesi)",
    "epoch": "Urartu & Artuklu",
    "shortDesc": "Harput Kalesi'nin harcında su yerine süt ve yumurta akı kullanıldığı için Süt Kalesi denir.",
    "legend": "Kale harcına su kıtlığında develerin ve koyunların sütü karıştırılmıştır.",
    "builder": "Urartu Krallığı",
    "century": "MÖ 8. Yüzyıl",
    "badgeName": "Harput Ereni",
    "gameQuestions": [
      {
        "question": "Elazığ'da harcında su yerine süt kullanıldığı rivayet edilen kale hangisidir?",
        "options": [
          "Harput Kalesi (Süt Kalesi)",
          "Kars Kalesi",
          "Van Kalesi",
          "Ankara Kalesi"
        ],
        "correctIndex": 0,
        "explanation": "Harput Kalesi, efsaneye göre kuraklık döneminde sütle yoğrularak yapılmıştır."
      }
    ]
  },
  {
    "id": "erzincan",
    "name": "Erzincan",
    "plate": "24",
    "region": "Doğu Anadolu",
    "x": 71,
    "y": 40.2,
    "landmark": "Kemah Kalesi & Girlevik Şelalesi",
    "epoch": "Hitit, Mengücek & Osmanlı",
    "shortDesc": "Fırat Nehri'nin kanyonlarında zapt edilemez kayalık kale Kemah ve kışın donan şelaleler.",
    "legend": "Kemah Kalesi'nin sarp uçurumları tarihte sayısız orduyu püskürtmüştür.",
    "builder": "Hititler & Mengücekliler",
    "century": "MÖ 1000",
    "badgeName": "Fırat Kartalı",
    "gameQuestions": [
      {
        "question": "Erzincan'da kışın donduğunda devasa buz sarkıtları oluşturan şelale hangisidir?",
        "options": [
          "Girlevik Şelalesi",
          "Düden Şelalesi",
          "Manavgat Şelalesi",
          "Tortum Şelalesi"
        ],
        "correctIndex": 0,
        "explanation": "Girlevik Şelalesi, kış aylarında buz tırmanışçıları için büyüleyici bir manzaraya bürünür."
      }
    ]
  },
  {
    "id": "erzurum",
    "name": "Erzurum",
    "plate": "25",
    "region": "Doğu Anadolu",
    "x": 82.4,
    "y": 34.4,
    "landmark": "Çifte Minareli Medrese & Yakutiye",
    "epoch": "Selçuklu & İlhanlı",
    "shortDesc": "Selçuklu taş işçiliğinin şaheseri çift minareli medrese ve Nene Hatun'un kahraman şehri.",
    "legend": "Çifte Minarelerin üzerindeki hayat ağacı ve çift başlı kartal gücü ve sonsuzluğu simgeler.",
    "builder": "Hundi Hatun",
    "century": "1253",
    "badgeName": "Dadaşlar Diyarı",
    "gameQuestions": [
      {
        "question": "Erzurum'un simgesi olan ve tuğla-çini minareleriyle tanınan Selçuklu yapısı hangisidir?",
        "options": [
          "Çifte Minareli Medrese",
          "Karatay Medresesi",
          "Sırçalı Medrese",
          "İnce Minareli Medrese"
        ],
        "correctIndex": 0,
        "explanation": "Çifte Minareli Medrese, Anadolu Selçuklu taş süslemesinin en görkemli örneğidir."
      }
    ]
  },
  {
    "id": "eskisehir",
    "name": "Eskişehir",
    "plate": "26",
    "region": "İç Anadolu",
    "x": 28.8,
    "y": 41.4,
    "landmark": "Odunpazarı Tarihi Evleri & Yazılıkaya",
    "epoch": "Frigya & Osmanlı",
    "shortDesc": "Rengarenk Osmanlı konakları, lületaşı sanatı ve Midas'ın Yazılıkaya Frig anıtı.",
    "legend": "Kral Midas'ın hazinelerinin Yazılıkaya anıtının gizli odalarında saklandığına inanılırdı.",
    "builder": "Frigler & Osmanlı Ustaları",
    "century": "MÖ 6. Yüzyıl",
    "badgeName": "Frig Muhafızı",
    "gameQuestions": [
      {
        "question": "Eskişehir'de yer alan ve Kral Midas adına yapılan devasa Frig kaya anıtı hangisidir?",
        "options": [
          "Yazılıkaya",
          "İvriz",
          "Aslantaş",
          "Gordion"
        ],
        "correctIndex": 0,
        "explanation": "Midas Anıtı (Yazılıkaya), Frig kaya mimarisinin en görkemli eseridir."
      }
    ]
  },
  {
    "id": "gaziantep",
    "name": "Gaziantep",
    "plate": "27",
    "region": "Güneydoğu Anadolu",
    "x": 60.9,
    "y": 78.8,
    "landmark": "Zeugma Mozaik Müzesi & Antep Kalesi",
    "epoch": "Roma & Kurtuluş Savaşı",
    "shortDesc": "Dünyanın en zengin mozaik koleksiyonu, ünlü Çingene Kızı mozaiği ve tarihi Antep Kalesi.",
    "legend": "Çingene Kızı mozaiğinin gözleri tıpkı Mona Lisa gibi odaya nereden bakarsanız bakın sizi izler.",
    "builder": "Seleukos & Romalılar",
    "century": "MÖ 3. Yüzyıl",
    "badgeName": "Mozaik Ustası",
    "gameQuestions": [
      {
        "question": "Gözleriyle izleyen ünlü \"Çingene Kızı\" mozaiği hangi ilimizdeki Zeugma Müzesi'ndedir?",
        "options": [
          "Gaziantep",
          "Şanlıurfa",
          "Hatay",
          "Diyarbakır"
        ],
        "correctIndex": 0,
        "explanation": "Çingene Kızı mozaiği, Gaziantep Zeugma Mozaik Müzesi'nin başyapıtıdır."
      }
    ]
  },
  {
    "id": "giresun",
    "name": "Giresun",
    "plate": "28",
    "region": "Karadeniz",
    "x": 67.3,
    "y": 26.4,
    "landmark": "Giresun Adası & Giresun Kalesi",
    "epoch": "Amazonlar Efsanesi & Pontus",
    "shortDesc": "Doğu Karadeniz'in tek yaşanabilir adası Giresun Adası ve fındığın başkenti.",
    "legend": "Efsaneye göre savaşçı kadınlar olan Amazonlar Giresun Adası'nda savaş tapınakları kurmuştur.",
    "builder": "Pontus Krallığı",
    "century": "MÖ 2. Yüzyıl",
    "badgeName": "Karadeniz İncisi",
    "gameQuestions": [
      {
        "question": "Doğu Karadeniz'de antik çağda Amazonların yaşadığı rivayet edilen ada hangisidir?",
        "options": [
          "Giresun Adası",
          "Kefken Adası",
          "Bozcaada",
          "Heybeliada"
        ],
        "correctIndex": 0,
        "explanation": "Giresun Adası, Karadeniz'deki antik efsanelere ev sahipliği yapmış tek adadır."
      }
    ]
  },
  {
    "id": "gumushane",
    "name": "Gümüşhane",
    "plate": "29",
    "region": "Karadeniz",
    "x": 71.3,
    "y": 30.4,
    "landmark": "Karaca Mağarası & Santa Harabeleri",
    "epoch": "Roma, Doğu Roma & Doğa",
    "shortDesc": "Sarkıt ve dikitleriyle yer altı sarayı Karaca Mağarası ve dağlardaki tarihi Santa köyleri.",
    "legend": "Karaca Mağarası havasının solunum yollarına ve sağlığa şifa dağıttığına inanılır.",
    "builder": "Doğa & Rum Ustalar",
    "century": "Milyonlarca Yıl Öncesi",
    "badgeName": "Yer Altı Sarayı",
    "gameQuestions": [
      {
        "question": "Gümüşhane'de bulunan ve büyüleyici sarkıt-dikitleriyle ünlü damlataş mağarası hangisidir?",
        "options": [
          "Karaca Mağarası",
          "Damlataş",
          "Derinkuyu",
          "Dupnisa"
        ],
        "correctIndex": 0,
        "explanation": "Karaca Mağarası, zengin sarkıt, dikit ve sütun oluşumlarıyla ünlüdür."
      }
    ]
  },
  {
    "id": "hakkari",
    "name": "Hakkari",
    "plate": "30",
    "region": "Güneydoğu Anadolu",
    "x": 95.4,
    "y": 73,
    "landmark": "Cilo Buzulları & Meydan Medresesi",
    "epoch": "Urartu & Osmanlı",
    "shortDesc": "Türkiye'nin ikinci en yüksek zirvesi Cilo Dağı'ndaki 20 bin yıllık buzul vadileri.",
    "legend": "Cilo dağlarının sarp kayalıkları gökyüzüne en yakın kartalların yuvasıdır.",
    "builder": "Hakkari Beyleri",
    "century": "1700",
    "badgeName": "Buzul Zirvesi",
    "gameQuestions": [
      {
        "question": "Türkiye'nin en büyük vadi buzullarının bulunduğu dağ sırası hangisidir?",
        "options": [
          "Cilo Dağları",
          "Toroslar",
          "Kaçkarlar",
          "Uludağ"
        ],
        "correctIndex": 0,
        "explanation": "Hakkari Cilo Dağları, binlerce yıllık buzul göllerine ve vadilerine ev sahipliği yapar."
      }
    ]
  },
  {
    "id": "hatay",
    "name": "Hatay",
    "plate": "31",
    "region": "Akdeniz",
    "x": 55.2,
    "y": 88.2,
    "landmark": "St. Pierre Mağara Kilisesi & Titus Tüneli",
    "epoch": "Roma & Erken Hristiyanlık",
    "shortDesc": "Dünyanın ilk mağara kilisesi ve Romalıların dağ delerek yaptığı devasa Titus Tüneli.",
    "legend": "Titus Tüneli, sel sularının limanı tıkamaması için köleler ve lejyonerler tarafından kazılmıştır.",
    "builder": "Havariler & Roma İmparatoru Vespasianus",
    "century": "MS 1. Yüzyıl",
    "badgeName": "Medeniyetler Köprüsü",
    "gameQuestions": [
      {
        "question": "Hristiyanlık kelimesinin tarihte ilk defa kullanıldığı mağara kilise hangisidir?",
        "options": [
          "St. Pierre Kilisesi",
          "Kızıl Kilise",
          "Sümela Manastırı",
          "Akdamar Kilisesi"
        ],
        "correctIndex": 0,
        "explanation": "Antakya'daki St. Pierre Kilisesi, Hristiyanlığın en eski ibadet merkezlerindendir."
      }
    ]
  },
  {
    "id": "isparta",
    "name": "Isparta",
    "plate": "32",
    "region": "Akdeniz",
    "x": 28,
    "y": 66.5,
    "landmark": "Antiocheia Antik Kenti & Eğirdir Kalesi",
    "epoch": "Pisidya & Roma",
    "shortDesc": "Güller ve lavantalar diyarı, Eğirdir Gölü ve antik Pisidya başkenti Antiocheia.",
    "legend": "Eğirdir Gölü ortasındaki Yeşilada'da asırlardır balıkçılar ve ermişlerin huzur bulduğu söylenir.",
    "builder": "Pisidyalılar & Selçuklular",
    "century": "MÖ 3. Yüzyıl",
    "badgeName": "Güller Diyarı",
    "gameQuestions": [
      {
        "question": "Yalvaç ilçesinde bulunan önemli Pisidya antik kenti hangisidir?",
        "options": [
          "Pisidia Antiocheia",
          "Efes",
          "Perge",
          "Sardes"
        ],
        "correctIndex": 0,
        "explanation": "Pisidia Antiocheia, Roma döneminde bölgenin askeri ve dini başkentiydi."
      }
    ]
  },
  {
    "id": "mersin",
    "name": "Mersin",
    "plate": "33",
    "region": "Akdeniz",
    "x": 42.8,
    "y": 84.5,
    "landmark": "Kızkalesi & Cennet-Cehennem Obrukları",
    "epoch": "Kilikya & Roma",
    "shortDesc": "Denizin ortasındaki Kızkalesi ve yüzlerce metre derinlikteki devasa Cennet-Cehennem obrukları.",
    "legend": "Kral kızını yılan sokmasından korumak için bu deniz kalesini yaptırmıştır ama üzüm sepetinden çıkan yılan onu sokmuştur.",
    "builder": "Kilikya Krallığı & Roma",
    "century": "MS 12. Yüzyıl",
    "badgeName": "Kilikya Şövalyesi",
    "gameQuestions": [
      {
        "question": "Mersin Erdemli sahilinde denizin 600 metre açığındaki tarihi kale hangisidir?",
        "options": [
          "Kızkalesi (Deniz Kalesi)",
          "Bodrum Kalesi",
          "Alanya Kalesi",
          "Sinop Kalesi"
        ],
        "correctIndex": 0,
        "explanation": "Kızkalesi, Akdeniz açıklarındaki küçük bir adacık üzerine kurulmuştur."
      }
    ]
  },
  {
    "id": "istanbul",
    "name": "İstanbul",
    "plate": "34",
    "region": "Marmara",
    "x": 16.7,
    "y": 17.2,
    "landmark": "Ayasofya & Topkapı Sarayı",
    "epoch": "Roma, Bizans & Osmanlı İmparatorluğu",
    "shortDesc": "İki kıtayı birleştiren, üç büyük imparatorluğa başkentlik yapmış dünya kültür mirası.",
    "legend": "Kızkulesi efsanesine göre kral kızını yılan sokmasından korumak için Boğaz'ın ortasına bu kuleyi dikmiştir.",
    "builder": "I. Justinianos & Fatih Sultan Mehmet",
    "century": "537 & 1478",
    "badgeName": "İstanbul Muhafızı",
    "gameQuestions": [
      {
        "question": "Ayasofya ilk olarak hangi imparatorluk döneminde kilise olarak inşa edilmiştir?",
        "options": [
          "Bizans İmparatorluğu",
          "Hititler",
          "Selçuklular",
          "Persler"
        ],
        "correctIndex": 0,
        "explanation": "Ayasofya, MS 537 yılında Bizans İmparatoru I. Justinianos tarafından yaptırılmıştır."
      }
    ]
  },
  {
    "id": "izmir",
    "name": "İzmir",
    "plate": "35",
    "region": "Ege",
    "x": 9.3,
    "y": 57.9,
    "landmark": "Efes Antik Kenti & Tarihi Saat Kulesi",
    "epoch": "İyonya & Roma İmparatorluğu",
    "shortDesc": "Antik çağın en önemli liman kenti, Artemis Tapınağı ve Konak Meydanı Saat Kulesi.",
    "legend": "Efes adının, efsanevi Amazon kraliçesi Evas'tan geldiği rivayet edilir.",
    "builder": "İyonlular & Romalılar",
    "century": "MÖ 10. Yüzyıl",
    "badgeName": "Efes Kaşifi",
    "gameQuestions": [
      {
        "question": "Efes Antik Kenti'nin ayakta kalan en görkemli kütüphane kalıntısı hangisidir?",
        "options": [
          "Celsus Kütüphanesi",
          "İskenderiye Kütüphanesi",
          "Bergama Kütüphanesi",
          "Millet Kütüphanesi"
        ],
        "correctIndex": 0,
        "explanation": "Celsus Kütüphanesi, Roma mimarisinin en büyüleyici yapıtlarındandır."
      }
    ]
  },
  {
    "id": "kars",
    "name": "Kars",
    "plate": "36",
    "region": "Doğu Anadolu",
    "x": 90.3,
    "y": 28.4,
    "landmark": "Ani Ören Yeri & Kars Kalesi",
    "epoch": "Bagratlı Krallığı & Selçuklu",
    "shortDesc": "\"Binbir Kilise Şehri\" olarak bilinen, İpek Yolu üzerinde orta çağın görkemli ticaret merkezi.",
    "legend": "Ani surlarının rüzgarda ezgiler fısıldadığına ve aşılamaz olduğuna inanılırdı.",
    "builder": "Bagratlılar & Sultan Alparslan",
    "century": "MS 10. Yüzyıl",
    "badgeName": "İpek Yolu Muhafızı",
    "gameQuestions": [
      {
        "question": "Kars'ta yer alan ve \"Binbir Kiliseli Şehir\" olarak anılan antik kent hangisidir?",
        "options": [
          "Ani Ören Yeri",
          "Hasankeyf",
          "Hattuşa",
          "Nemrut"
        ],
        "correctIndex": 0,
        "explanation": "Ani Harabeleri, Kafkasya ve Anadolu arasındaki İpek Yolu ticaretinin kalbiydi."
      }
    ]
  },
  {
    "id": "kastamonu",
    "name": "Kastamonu",
    "plate": "37",
    "region": "Karadeniz",
    "x": 42,
    "y": 12.3,
    "landmark": "Kastamonu Kalesi & Valla Kanyonu",
    "epoch": "Komnenos & Candaroğulları",
    "shortDesc": "Şerife Bacı'nın kahraman şehri, saat kulesi ve dünyanın en derin kanyonlarından Valla Kanyonu.",
    "legend": "Kastamonu Saat Kulesi'nin çanı İstanbul Sarayburnu'nda zamansız çaldığı için buraya sürgün edilmiştir.",
    "builder": "Bizans Komnenos Hanedanı",
    "century": "MS 12. Yüzyıl",
    "badgeName": "İstiklal Kahramanı",
    "gameQuestions": [
      {
        "question": "Kastamonu Pınarbaşı'nda bulunan dünyanın en derin ve geçişi zor kanyonlarından biri hangisidir?",
        "options": [
          "Valla Kanyonu",
          "Ihlara Vadisi",
          "Saklıkent Kanyonu",
          "Köprülü Kanyon"
        ],
        "correctIndex": 0,
        "explanation": "Valla Kanyonu, 800-1200 metreye varan sarp uçurumlarıyla ünlüdür."
      }
    ]
  },
  {
    "id": "kayseri",
    "name": "Kayseri",
    "plate": "38",
    "region": "İç Anadolu",
    "x": 53.1,
    "y": 55.7,
    "landmark": "Erciyes Dağı & Kültepe Kaniş",
    "epoch": "Asur Kolonileri & Selçuklu",
    "shortDesc": "Anadolu'da ilk yazılı tabletlerin bulunduğu Kültepe ve dünyanın ilk tıp fakültesi Gevher Nesibe.",
    "legend": "Erciyes Dağı'nın püskürttüğü küller milyonlarca yıl önce Kapadokya peri bacalarını var etmiştir.",
    "builder": "Asurlular & Selçuklular",
    "century": "MÖ 2000 & 1206",
    "badgeName": "Kültepe Yazmanı",
    "gameQuestions": [
      {
        "question": "Anadolu'da ilk yazılı kil tabletlerin bulunduğu antik ticaret merkezi hangisidir?",
        "options": [
          "Kültepe (Kaniş)",
          "Hattuşa",
          "Gordion",
          "Sardes"
        ],
        "correctIndex": 0,
        "explanation": "Kültepe tabletleri, Anadolu tarihini yazılı çağa geçiren en eski belgelerdir."
      }
    ]
  },
  {
    "id": "kirklareli",
    "name": "Kırklareli",
    "plate": "39",
    "region": "Marmara",
    "x": 9.8,
    "y": 9.3,
    "landmark": "Dupnisa Mağarası & Hızırbey Külliyesi",
    "epoch": "Traklar & Osmanlı",
    "shortDesc": "Istranca ormanlarının kalbinde milyonlarca yıllık sarkıt ve yer altı nehirleriyle Dupnisa Mağarası.",
    "legend": "Mağara derinliklerinde perilerin yaşadığı ve suların şifa dağıttığı söylenir.",
    "builder": "Doğa & Osmanlı",
    "century": "Milyonlarca Yıl Öncesi",
    "badgeName": "Trakya Kaşifi",
    "gameQuestions": [
      {
        "question": "Trakya'nın turizme açılan tek mağarası hangisidir?",
        "options": [
          "Dupnisa Mağarası",
          "Damlataş",
          "Karain",
          "İnsuyu"
        ],
        "correctIndex": 0,
        "explanation": "Dupnisa Mağarası, Kırklareli Demirköy'de bulunan harika bir doğa mirasıdır."
      }
    ]
  },
  {
    "id": "kirsehir",
    "name": "Kırşehir",
    "plate": "40",
    "region": "İç Anadolu",
    "x": 44.4,
    "y": 45.5,
    "landmark": "Cacabey Medresesi & Ahi Evran Türbesi",
    "epoch": "Selçuklu (Astronomi Rasathanesi)",
    "shortDesc": "Gökbilim medresesi olarak inşa edilen ve kubbesinden yıldızların incelendiği Cacabey Medresesi.",
    "legend": "Medresenin kuyusuna yansıyan yıldız ışıklarıyla gezegenlerin hareketleri hesaplanırdı.",
    "builder": "Cacaoğlu Nureddin",
    "century": "1272",
    "badgeName": "Gökbilimci",
    "gameQuestions": [
      {
        "question": "Selçuklular döneminde uzay ve yıldız gözlemleri yapılan medrese hangisidir?",
        "options": [
          "Cacabey Medresesi",
          "Sırçalı Medrese",
          "Karatay Medresesi",
          "Çifte Minareli Medrese"
        ],
        "correctIndex": 0,
        "explanation": "Kırşehir Cacabey Medresesi, dönemin en ileri astronomi rasathanelerindendi."
      }
    ]
  },
  {
    "id": "kocaeli",
    "name": "Kocaeli",
    "plate": "41",
    "region": "Marmara",
    "x": 22.6,
    "y": 21.9,
    "landmark": "Saat Kulesi & Hannibal Anıt Mezarı",
    "epoch": "Bitinya & Osmanlı",
    "shortDesc": "Roma'yı dize getiren Kartacalı ünlü komutan Hannibal'ın anıtı ve İzmit Saat Kulesi.",
    "legend": "Hannibal düşmana teslim olmamak için yüzüğündeki zehri burada içmiştir.",
    "builder": "Mustafa Kemal Atatürk (Hannibal Anıtı)",
    "century": "MÖ 183 & 1981",
    "badgeName": "Körfez Bekçisi",
    "gameQuestions": [
      {
        "question": "Dünya tarihinin en büyük komutanlarından Kartacalı Hannibal'ın anıt mezarı hangi ilimizdedir?",
        "options": [
          "Kocaeli (Gebze)",
          "Bursa",
          "Yalova",
          "Sakarya"
        ],
        "correctIndex": 0,
        "explanation": "Hannibal'ın anıt mezarı Gebze TÜBİTAK arazisi içinde yer almaktadır."
      }
    ]
  },
  {
    "id": "konya",
    "name": "Konya",
    "plate": "42",
    "region": "İç Anadolu",
    "x": 36.5,
    "y": 64.6,
    "landmark": "Mevlana Müzesi & Çatalhöyük",
    "epoch": "Selçuklu & Neolitik Çağ",
    "shortDesc": "Selçuklu İmparatorluğu'nun başkenti, Mevlana Celaleddin Rumi ve ilk insanlık kenti Çatalhöyük.",
    "legend": "Mevlana'nın \"Ne olursan ol yine gel\" çağrısı tüm dünyada hoşgörünün simgesi olmuştur.",
    "builder": "Selçuklu Sultanları",
    "century": "MÖ 7400 & MS 13. Yüzyıl",
    "badgeName": "Mevlevi Dostu",
    "gameQuestions": [
      {
        "question": "Evlerin birbirine bitişik olduğu ve kapıların tavanda yer aldığı ilk insanlık şehri hangisidir?",
        "options": [
          "Çatalhöyük",
          "Efes",
          "Truva",
          "Alacahöyük"
        ],
        "correctIndex": 0,
        "explanation": "Konya Çumra'daki Çatalhöyük, insanlığın ilk toplu yerleşimlerinden biridir."
      }
    ]
  },
  {
    "id": "kutahya",
    "name": "Kütahya",
    "plate": "43",
    "region": "Ege",
    "x": 20.9,
    "y": 46.6,
    "landmark": "Aizanoi Antik Kenti & Çini Çarşısı",
    "epoch": "Roma (Zeus Tapınağı) & Germiyanoğulları",
    "shortDesc": "Dünyanın ilk borsa binasının bulunduğu Aizanoi ve dünyaca ünlü Kütahya çini sanatı.",
    "legend": "Aizanoi Zeus Tapınağı altında bulunan devasa tonozlu oda kehanet merkezi olarak kullanılmıştır.",
    "builder": "Romalılar & Türk Çini Ustaları",
    "century": "MS 2. Yüzyıl",
    "badgeName": "Çini Ustası",
    "gameQuestions": [
      {
        "question": "Dünyanın bilinen ilk borsa yapısının bulunduğu antik kent hangisidir?",
        "options": [
          "Aizanoi Antik Kenti",
          "Efes",
          "Hierapolis",
          "Perge"
        ],
        "correctIndex": 0,
        "explanation": "Kütahya Çavdarhisar'daki Aizanoi'de Roma dönemine ait ilk gıda borsası bulunur."
      }
    ]
  },
  {
    "id": "malatya",
    "name": "Malatya",
    "plate": "44",
    "region": "Doğu Anadolu",
    "x": 64.8,
    "y": 57.8,
    "landmark": "Arslantepe Höyüğü & Battalgazi",
    "epoch": "Kalkolitik & Erken Tunç Çağı",
    "shortDesc": "Dünyada bilinen ilk saray yapısının ve ilk metal kılıçların bulunduğu UNESCO mirası.",
    "legend": "Arslantepe'deki kerpiç sarayda ilk bürokratik mühürlerin kullanıldığı bilinir.",
    "builder": "İlk Devlet Toplumları",
    "century": "MÖ 3300",
    "badgeName": "İlk Saray Kaşifi",
    "gameQuestions": [
      {
        "question": "Dünyanın en eski kerpiç saray kompleksine sahip UNESCO mirası höyük hangisidir?",
        "options": [
          "Arslantepe Höyüğü",
          "Çatalhöyük",
          "Alacahöyük",
          "Göbeklitepe"
        ],
        "correctIndex": 0,
        "explanation": "Malatya Arslantepe, devlet ve bürokrasinin doğduğu ilk merkezlerdendir."
      }
    ]
  },
  {
    "id": "manisa",
    "name": "Manisa",
    "plate": "45",
    "region": "Ege",
    "x": 13.7,
    "y": 54,
    "landmark": "Sardes Antik Kenti & Spil Dağı",
    "epoch": "Lidya Krallığı",
    "shortDesc": "Tarihte ilk paranın icat edildiği ve basıldığı Lidyalıların efsanevi başkenti.",
    "legend": "Kral Midas dokunduğu her şeyi altına dönüştürmekten kurtulmak için buradaki nehirde yıkanmıştır.",
    "builder": "Lidya Kralları (Karun)",
    "century": "MÖ 7. Yüzyıl",
    "badgeName": "Lidya Hazinesi",
    "gameQuestions": [
      {
        "question": "Tarihte madeni parayı ilk basan ve kullanan medeniyet hangisidir?",
        "options": [
          "Lidyalılar",
          "Sümerler",
          "Hititler",
          "Mısırlılar"
        ],
        "correctIndex": 0,
        "explanation": "Lidyalılar, başkentleri Sardes'te (Manisa) ilk parayı icat etmişlerdir."
      }
    ]
  },
  {
    "id": "kahramanmaras",
    "name": "Kahramanmaraş",
    "plate": "46",
    "region": "Akdeniz",
    "x": 59,
    "y": 66.5,
    "landmark": "Tarihi Maraş Kalesi & Taş Medrese",
    "epoch": "Geç Hitit & Kurtuluş Savaşı",
    "shortDesc": "Sütçü İmam'ın bağımsızlık kıvılcımını yaktığı ve İstiklal Madalyalı kahraman şehir.",
    "legend": "Maraş Kalesi'ndeki Türk bayrağını indirmeyen halk işgale ilk başkaldırıyı yapmıştır.",
    "builder": "Hititler & Dulkadiroğulları",
    "century": "MÖ 9. Yüzyıl",
    "badgeName": "İstiklal Kahramanı",
    "gameQuestions": [
      {
        "question": "Kurtuluş Savaşı'nda gösterdiği kahramanlık sebebiyle \"Kahraman\" unvanı alan şehrimiz hangisidir?",
        "options": [
          "Kahramanmaraş",
          "Gaziantep",
          "Şanlıurfa",
          "Kastamonu"
        ],
        "correctIndex": 0,
        "explanation": "Kahramanmaraş, kendi kendini kurtararak İstiklal Madalyası almıştır."
      }
    ]
  },
  {
    "id": "mardin",
    "name": "Mardin",
    "plate": "47",
    "region": "Güneydoğu Anadolu",
    "x": 79.2,
    "y": 74.7,
    "landmark": "Deyrulzafaran & Zinciriye Medresesi",
    "epoch": "Artuklu & Süryani",
    "shortDesc": "Sarı kalker taşından oyulmuş basamaklı evleriyle Mezopotamya ovasına bakan masal kenti.",
    "legend": "Mardin evleri öyle inşa edilmiştir ki hiçbir evin gölgesi arkasındaki evin güneşini kesmez.",
    "builder": "Artuklu Sultanları & Süryani Mimarlar",
    "century": "MS 5. ve 14. Yüzyıl",
    "badgeName": "Taş Ustası",
    "gameQuestions": [
      {
        "question": "Mardin mimarisine altın sarısı rengini veren geleneksel yapı malzemesi nedir?",
        "options": [
          "Sarı kalker taşı",
          "Kırmızı tuğla",
          "Beyaz mermer",
          "Granit"
        ],
        "correctIndex": 0,
        "explanation": "Mardin evleri, bölgeye özgü sarı kalker taşının ince ince oyulmasıyla yapılmıştır."
      }
    ]
  },
  {
    "id": "mugla",
    "name": "Muğla",
    "plate": "48",
    "region": "Ege",
    "x": 15.3,
    "y": 79.8,
    "landmark": "Bodrum Kalesi & Dalyan Kaya Mezarları",
    "epoch": "Karya & Rodos Şövalyeleri",
    "shortDesc": "Dünyanın 7 Harikası Halikarnas Mozolesi ve göğe uzanan Kaunos kral kaya mezarları.",
    "legend": "Dalyan kaya mezarları dağların göğe en yakın doruklarına kralları ölümsüzleştirmek için oyulmuştur.",
    "builder": "Kral Mausolos & Şövalyeler",
    "century": "MÖ 4. Yüzyıl",
    "badgeName": "Ege Kaptanı",
    "gameQuestions": [
      {
        "question": "Dünyanın 7 Harikası'ndan biri olan Halikarnas Mozolesi hangi ilçemizde yer alıyordu?",
        "options": [
          "Bodrum",
          "Fethiye",
          "Marmaris",
          "Datça"
        ],
        "correctIndex": 0,
        "explanation": "Halikarnas Mozolesi, Karya Kralı Mausolos için Bodrum'da inşa edilmiştir."
      }
    ]
  },
  {
    "id": "mus",
    "name": "Muş",
    "plate": "49",
    "region": "Doğu Anadolu",
    "x": 84,
    "y": 50.1,
    "landmark": "Malazgirt Meydan Muharebesi Tarihi Milli Parkı",
    "epoch": "Selçuklu İmparatorluğu (1071)",
    "shortDesc": "Sultan Alparslan'ın Bizans ordusunu yenerek Anadolu'nun kapılarını Türklere açtığı tarihi ova.",
    "legend": "Sultan Alparslan 26 Ağustos 1071 Cuma günü beyaz kefenini giyip ordusunun önüne geçmiştir.",
    "builder": "Sultan Alparslan & Selçuklular",
    "century": "1071",
    "badgeName": "Malazgirt Fatihi",
    "gameQuestions": [
      {
        "question": "Anadolu'nun kapılarını Türklere açan 1071 Malazgirt Zaferi hangi ilimizin ovasında kazanılmıştır?",
        "options": [
          "Muş",
          "Bitlis",
          "Erzurum",
          "Kars"
        ],
        "correctIndex": 0,
        "explanation": "Sultan Alparslan komutasındaki Selçuklu ordusu zaferi Muş Malazgirt ovasında kazanmıştır."
      }
    ]
  },
  {
    "id": "nevsehir",
    "name": "Nevşehir",
    "plate": "50",
    "region": "İç Anadolu",
    "x": 47.2,
    "y": 53.4,
    "landmark": "Kapadokya Peri Bacaları & Göreme",
    "epoch": "Doğa Harikası & Erken Hristiyanlık",
    "shortDesc": "Volkanik lavların rüzgar ve yağmurla aşınması sonucu oluşan masalsı peri bacaları ve yer altı kentleri.",
    "legend": "Peri bacalarının bacalarında eskiden perilerin yaşadığı ve insanlara yardım ettiği anlatılır.",
    "builder": "Erciyes ve Hasan Dağı Volkanları",
    "century": "Milyonlarca Yıl Öncesi",
    "badgeName": "Kapadokya Sihirbazı",
    "gameQuestions": [
      {
        "question": "Kapadokya'da binlerce insanın saklanabildiği meşhur sekiz katlı yer altı şehri hangisidir?",
        "options": [
          "Derinkuyu",
          "Sümela",
          "Zeugma",
          "Efes"
        ],
        "correctIndex": 0,
        "explanation": "Derinkuyu yer altı şehri, gelişmiş havalandırma bacalarına sahip bir savunma mucizesidir."
      }
    ]
  },
  {
    "id": "nigde",
    "name": "Niğde",
    "plate": "51",
    "region": "İç Anadolu",
    "x": 47.3,
    "y": 66.4,
    "landmark": "Gümüşler Manastırı & Niğde Kalesi",
    "epoch": "Bizans & Selçuklu",
    "shortDesc": "Kaya oyma manastır içinde dünyada eşi benzeri olmayan \"Gülen Meryem Ana\" freski.",
    "legend": "Freskteki Meryem Ana figürünün nereden bakarsanız bakın size gülümseyerek baktığı görülür.",
    "builder": "Bizans Keşişleri",
    "century": "MS 10. Yüzyıl",
    "badgeName": "Aladağlar Kartalı",
    "gameQuestions": [
      {
        "question": "Niğde Gümüşler Manastırı'ndaki dünyaca ünlü eşsiz fresk hangisidir?",
        "options": [
          "Gülen Meryem Ana Freski",
          "Ağlayan Kadınlar",
          "Celsus Portresi",
          "Mona Lisa"
        ],
        "correctIndex": 0,
        "explanation": "Gümüşler Manastırı'nda yer alan Gülen Meryem freski dünyada tektir."
      }
    ]
  },
  {
    "id": "ordu",
    "name": "Ordu",
    "plate": "52",
    "region": "Karadeniz",
    "x": 61.8,
    "y": 23.1,
    "landmark": "Boztepe & Yason Burnu Kilisesi",
    "epoch": "Pontus & Doğa",
    "shortDesc": "Teleferikle çıkılan muhteşem Karadeniz manzaralı Boztepe ve Argonotlar efsanesinin Yason Burnu.",
    "legend": "Altın Post'u aramak için Karadeniz'e açılan mitolojik savaşçıların Yason Burnu'na yanaştığı söylenir.",
    "builder": "Romalılar & Rum Denizciler",
    "century": "1868",
    "badgeName": "Boztepe Rüzgarı",
    "gameQuestions": [
      {
        "question": "Altın Post efsanesine ev sahipliği yapan ve denize doğru uzanan tarihi burun hangisidir?",
        "options": [
          "Yason Burnu",
          "İnceburun",
          "Sinop Burnu",
          "Fener Burnu"
        ],
        "correctIndex": 0,
        "explanation": "Ordu Perşembe'deki Yason Burnu, mitolojik Argonotlar efsanesinin geçtiği yerdir."
      }
    ]
  },
  {
    "id": "rize",
    "name": "Rize",
    "plate": "53",
    "region": "Karadeniz",
    "x": 78.8,
    "y": 20.9,
    "landmark": "Zil Kale & Kaçkar Yaylaları",
    "epoch": "Trabzon Rum İmparatorluğu & Osmanlı",
    "shortDesc": "Fırtına Vadisi'nin sarp sarp kayalıklarına asılı duran bulutlar arasındaki masalsı Zil Kale.",
    "legend": "Zil Kale'nin vadiyi gözetleyen kartalların gözü gibi fırtınalara kafa tuttuğu söylenir.",
    "builder": "Komnenos Hanedanı",
    "century": "MS 14. Yüzyıl",
    "badgeName": "Kaçkar Fatihi",
    "gameQuestions": [
      {
        "question": "Fırtına Deresi üzerinde sarp bir kayalıkta yükselen meşhur tarihi kale hangisidir?",
        "options": [
          "Zil Kale",
          "Alanya Kalesi",
          "Amasya Kalesi",
          "Mardin Kalesi"
        ],
        "correctIndex": 0,
        "explanation": "Zil Kale, Rize Çamlıhemşin'de Fırtına Vadisi'ne hakim sarp bir kayaya kurulmuştur."
      }
    ]
  },
  {
    "id": "sakarya",
    "name": "Sakarya",
    "plate": "54",
    "region": "Marmara",
    "x": 25.7,
    "y": 24.1,
    "landmark": "Justinianus Köprüsü (Beşköprü)",
    "epoch": "Doğu Roma (Bizans)",
    "shortDesc": "1500 yıl önce Bizans İmparatoru Justinianos tarafından yaptırılan 375 metre uzunluğunda dev taş köprü.",
    "legend": "İmparatorun Sakarya Nehri'nin yatağını değiştirip İzmit Körfezi'ne bağlamak istediği söylenir.",
    "builder": "I. Justinianos",
    "century": "562",
    "badgeName": "Sakarya Yiğidi",
    "gameQuestions": [
      {
        "question": "Sakarya'da yer alan 1500 yıllık devasa Bizans taş köprüsü hangisidir?",
        "options": [
          "Justinianus Köprüsü (Beşköprü)",
          "Taşköprü",
          "Mostar Köprüsü",
          "Malabadi Köprüsü"
        ],
        "correctIndex": 0,
        "explanation": "Justinianus Köprüsü, geç Roma döneminin en heybetli taş köprülerindendir."
      }
    ]
  },
  {
    "id": "samsun",
    "name": "Samsun",
    "plate": "55",
    "region": "Karadeniz",
    "x": 54,
    "y": 16.6,
    "landmark": "Bandırma Vapuru & Onur Anıtı",
    "epoch": "Kurtuluş Savaşı & Türkiye Cumhuriyeti",
    "shortDesc": "19 Mayıs 1919'da Atatürk'ün ayak basarak Milli Mücadele meşalesini yaktığı ilk durak.",
    "legend": "Bandırma Vapuru hırçın Karadeniz dalgalarını aşarak bir milletin yeniden doğuşunu taşımıştır.",
    "builder": "Heinrich Krippel (Onur Anıtı)",
    "century": "1919 & 1931",
    "badgeName": "İstiklal Meşalesi",
    "gameQuestions": [
      {
        "question": "Gazi Mustafa Kemal Atatürk'ün 19 Mayıs 1919'da Samsun'a geldiği vapur hangisidir?",
        "options": [
          "Bandırma Vapuru",
          "Gülcemal",
          "Savarona",
          "Nusret"
        ],
        "correctIndex": 0,
        "explanation": "Bandırma Vapuru, Türk Kurtuluş Savaşı'nın başlangıç sembolüdür."
      }
    ]
  },
  {
    "id": "siirt",
    "name": "Siirt",
    "plate": "56",
    "region": "Güneydoğu Anadolu",
    "x": 86.2,
    "y": 66.6,
    "landmark": "Veysel Karani Türbesi & Tillo Işık Hadisesi",
    "epoch": "İslam & Osmanlı",
    "shortDesc": "İsmail Fakirullah Hazretleri için İbrahim Hakkı'nın kurduğu ekinoks ışık düzeneği.",
    "legend": "Güneşin doğduğu ilk ışıklar pencereden geçip hocasının başucunu aydınlatacak şekilde tasarlanmıştır.",
    "builder": "İbrahim Hakkı Hazretleri",
    "century": "18. Yüzyıl",
    "badgeName": "Işık Ustası",
    "gameQuestions": [
      {
        "question": "Siirt Tillo'da ekinoks günlerinde türbeye güneş ışığı yansıtan optik sistem kime aittir?",
        "options": [
          "İbrahim Hakkı Hazretleri",
          "Ali Kuşçu",
          "Biruni",
          "Harezmi"
        ],
        "correctIndex": 0,
        "explanation": "İbrahim Hakkı, hocasının mezarı için harika bir optik güneş düzeneği kurmuştur."
      }
    ]
  },
  {
    "id": "sinop",
    "name": "Sinop",
    "plate": "57",
    "region": "Karadeniz",
    "x": 48.2,
    "y": 10.1,
    "landmark": "Tarihi Sinop Cezaevi & İnceburun",
    "epoch": "Grek, Selçuklu & Osmanlı",
    "shortDesc": "Türkiye'nin en kuzey noktası İnceburun, deniz surları ve ünlü filozof Diyojen'in memleketi.",
    "legend": "Büyük İskender'e \"Gölge etme başka ihsan istemem\" diyen filozof Diyojen Sinop'ta doğmuştur.",
    "builder": "Milet Kolonileri & Selçuklu",
    "century": "MÖ 7. Yüzyıl",
    "badgeName": "Kuzey Yıldızı",
    "gameQuestions": [
      {
        "question": "Türkiye'nin en kuzey ucundaki fener hangisidir?",
        "options": [
          "İnceburun Feneri",
          "Rumeli Feneri",
          "Şile Feneri",
          "Anadolu Feneri"
        ],
        "correctIndex": 0,
        "explanation": "Sinop İnceburun, Türkiye haritasının en kuzey ucudur."
      }
    ]
  },
  {
    "id": "sivas",
    "name": "Sivas",
    "plate": "58",
    "region": "İç Anadolu",
    "x": 60.9,
    "y": 41.5,
    "landmark": "Divriği Ulu Camii & Çifte Minareli Medrese",
    "epoch": "Mengücekli & Selçuklu",
    "shortDesc": "Taş oymalarında ikindi güneşiyle namaz kılan insan silueti gölgesi oluşan UNESCO şaheseri.",
    "legend": "Gölge oyununun tesadüf olmadığı, mimarın ince matematiksel hesaplarla bunu tasarladığı bilinir.",
    "builder": "Ahmet Şah ve Melike Turan Melek",
    "century": "1228",
    "badgeName": "Taşın Şairi",
    "gameQuestions": [
      {
        "question": "Kapısındaki taş kabartmalarında namaz kılan insan gölgesi oluşan UNESCO eseri nerededir?",
        "options": [
          "Sivas (Divriği)",
          "Konya",
          "Kayseri",
          "Erzurum"
        ],
        "correctIndex": 0,
        "explanation": "Divriği Ulu Cami ve Darüşşifası, taş süslemeleriyle dünyada tektir."
      }
    ]
  },
  {
    "id": "tekirdag",
    "name": "Tekirdağ",
    "plate": "59",
    "region": "Marmara",
    "x": 9.7,
    "y": 18.5,
    "landmark": "Rákóczi Müzesi & Rüstem Paşa Camii",
    "epoch": "Osmanlı & Macar Tarihi",
    "shortDesc": "Macar bağımsızlık kahramanı II. Rákóczi Ferenc'in yaşadığı tarihi konak ve Mimar Sinan eseri.",
    "legend": "Macaristan'dan gelen prens ömrünün sonuna kadar Osmanlı'nın himayesinde yaşamıştır.",
    "builder": "Mimar Sinan & Osmanlı",
    "century": "MS 16. ve 18. Yüzyıl",
    "badgeName": "Marmara Rüzgarı",
    "gameQuestions": [
      {
        "question": "Tekirdağ'da bulunan Macar dostluk müzesi kime aittir?",
        "options": [
          "II. Rákóczi Ferenc",
          "Mimar Sinan",
          "Namık Kemal",
          "Evliya Çelebi"
        ],
        "correctIndex": 0,
        "explanation": "Rákóczi Müzesi, Tekirdağ sahilinde yer almaktadır."
      }
    ]
  },
  {
    "id": "tokat",
    "name": "Tokat",
    "plate": "60",
    "region": "Karadeniz",
    "x": 56.9,
    "y": 29.5,
    "landmark": "Ballıca Mağarası & Tokat Kalesi",
    "epoch": "Doğa & Danişmendliler",
    "shortDesc": "Dünyada ender görülen dev soğan sarkıtlarıyla Ballıca Mağarası ve Kont Drakula'nın hapsedildiği kale.",
    "legend": "Eflak Prensi Kazıklı Voyvoda'nın bir dönem Tokat Kalesi'nin zindanlarında hapsedildiği anlatılır.",
    "builder": "Doğa & Danişmendliler",
    "century": "Milyonlarca Yıl & MS 12. Yüzyıl",
    "badgeName": "Soğan Sarkıtı",
    "gameQuestions": [
      {
        "question": "Tokat'ta bulunan dünyaca ünlü soğan sarkıtlı mağara hangisidir?",
        "options": [
          "Ballıca Mağarası",
          "Damlataş Mağarası",
          "Karain Mağarası",
          "Dupnisa Mağarası"
        ],
        "correctIndex": 0,
        "explanation": "Ballıca Mağarası, nadir soğan sarkıtlarıyla UNESCO Geçici Listesi'ndedir."
      }
    ]
  },
  {
    "id": "trabzon",
    "name": "Trabzon",
    "plate": "61",
    "region": "Karadeniz",
    "x": 73.5,
    "y": 23,
    "landmark": "Sümela Manastırı & Atatürk Köşkü",
    "epoch": "Bizans İmparatorluğu & Osmanlı",
    "shortDesc": "Mela Dağı'nın dik sarp kayalıklarına oyulmuş bulutlar arasındaki mucizevi Sümela Manastırı.",
    "legend": "Atina'dan gelen iki rahibin rüyalarında Hz. Meryem'i görmeleri üzerine bu sarp yamaca kurulmuştur.",
    "builder": "Barnabas ve Sophronios",
    "century": "386",
    "badgeName": "Karadeniz Kartalı",
    "gameQuestions": [
      {
        "question": "Trabzon Maçka'da sarp kayalıklara oyulmuş tarihi manastır hangisidir?",
        "options": [
          "Sümela Manastırı",
          "Akdamar Kilisesi",
          "Deyrulzafaran",
          "Meryem Ana Evi"
        ],
        "correctIndex": 0,
        "explanation": "Sümela Manastırı, Altındere Vadisi'nde kayalara oyulmuş dünyaca ünlü bir yapıdır."
      }
    ]
  },
  {
    "id": "tunceli",
    "name": "Tunceli",
    "plate": "62",
    "region": "Doğu Anadolu",
    "x": 71.8,
    "y": 47.5,
    "landmark": "Munzur Vadisi Milli Parkı & Gözeler",
    "epoch": "Doğa Harikası",
    "shortDesc": "Buz gibi şifalı suların kayalardan fışkırdığı Munzur Gözeleri ve el değmemiş kanyonlar.",
    "legend": "Çoban Munzur'un elindeki süt kabının döküldüğü yerlerden kırk pınarın fışkırdığı efsane edilir.",
    "builder": "Doğa & Munzur Efsanesi",
    "century": "Kadim",
    "badgeName": "Munzur Geyiği",
    "gameQuestions": [
      {
        "question": "Tunceli'de kayaların arasından onlarca berrak pınarın fışkırdığı yer neresidir?",
        "options": [
          "Munzur Gözeleri",
          "Düden",
          "Tortum",
          "Kapuzbaşı"
        ],
        "correctIndex": 0,
        "explanation": "Munzur Gözeleri, Ovacık ilçesinde dağların eteklerinden çıkan kutsal su kaynaklarıdır."
      }
    ]
  },
  {
    "id": "sanliurfa",
    "name": "Şanlıurfa",
    "plate": "63",
    "region": "Güneydoğu Anadolu",
    "x": 69.9,
    "y": 76.4,
    "landmark": "Göbeklitepe & Balıklıgöl",
    "epoch": "Neolitik Çağ (MÖ 10.000)",
    "shortDesc": "12 bin yıl önce inşa edilen insanlık tarihinin ilk tapınağı Göbeklitepe ve kutsal Balıklıgöl.",
    "legend": "Hz. İbrahim ateşe atıldığında ateşin serin suya, odunların ise balıklara dönüştüğü anlatılır.",
    "builder": "Tarihöncesi Avcı-Toplayıcı İnsanlar",
    "century": "MÖ 10. Bin Yıl",
    "badgeName": "Medeniyet Atası",
    "gameQuestions": [
      {
        "question": "İnsanlık tarihinin bilinen en eski anıtsal tapınağı kabul edilen yer hangisidir?",
        "options": [
          "Göbeklitepe",
          "Stonehenge",
          "Mısır Piramitleri",
          "Babil Kulesi"
        ],
        "correctIndex": 0,
        "explanation": "Göbeklitepe, Şanlıurfa'da yer alır ve insanlık tarihinin sıfır noktasıdır."
      }
    ]
  },
  {
    "id": "usak",
    "name": "Uşak",
    "plate": "64",
    "region": "Ege",
    "x": 19.8,
    "y": 57.4,
    "landmark": "Ulubey Kanyonu & Karun Hazineleri",
    "epoch": "Lidya & Doğa",
    "shortDesc": "Amerika'daki Büyük Kanyon'dan sonra dünyanın en uzun ikinci kanyonu Ulubey ve Kanatlı Denizatı Broşu.",
    "legend": "Karun kadar zengin olsan da kanyonun heybetine boyun eğersin denir.",
    "builder": "Doğa & Lidya Krallığı",
    "century": "MÖ 6. Yüzyıl",
    "badgeName": "Karun Broşu",
    "gameQuestions": [
      {
        "question": "Dünyanın en uzun ikinci kanyonu olarak bilinen kanyon hangi ilimizdedir?",
        "options": [
          "Ulubey Kanyonu (Uşak)",
          "Ihlara Vadisi",
          "Saklıkent",
          "Köprülü Kanyon"
        ],
        "correctIndex": 0,
        "explanation": "Ulubey Kanyonu, Uşak'ta 77 kilometrelik devasa uzunluğuyla uzanır."
      }
    ]
  },
  {
    "id": "van",
    "name": "Van",
    "plate": "65",
    "region": "Doğu Anadolu",
    "x": 92.9,
    "y": 57.6,
    "landmark": "Akdamar Kilisesi & Van Kalesi",
    "epoch": "Urartu Krallığı (Tuşpa) & Vaspurakan",
    "shortDesc": "Urartu Krallığı'nın başkenti Tuşpa ve masmavi sodalı Van Gölü'nün incisi Akdamar Adası.",
    "legend": "Kıza aşık çobanın fırtınalı gölde boğulurken \"Ah Tamara!\" diye haykırdığı efsane anlatılır.",
    "builder": "I. Sarduri & Mimar Manuel",
    "century": "MÖ 9. Yüzyıl & MS 915",
    "badgeName": "Urartu Efendisi",
    "gameQuestions": [
      {
        "question": "Van Kalesi'nin bulunduğu antik başkent hangi medeniyete aittir?",
        "options": [
          "Urartular (Tuşpa)",
          "Hititler",
          "Lidyalılar",
          "Frigler"
        ],
        "correctIndex": 0,
        "explanation": "Van, Urartu Krallığı'nın başkenti Tuşpa olarak kurulmuştur."
      }
    ]
  },
  {
    "id": "yozgat",
    "name": "Yozgat",
    "plate": "66",
    "region": "İç Anadolu",
    "x": 50.1,
    "y": 40.3,
    "landmark": "Basilica Therma (Kral Kızı Hamamı) & Çamlık",
    "epoch": "Roma İmparatorluğu",
    "shortDesc": "2000 yıldır termal suyu kaynayan açık hava Roma hamamı ve Türkiye'nin ilk milli parkı Çamlık.",
    "legend": "Kayseri kralının amansız hastalığa yakalanan kızının buradaki şifalı sularda iyileştiği söylenir.",
    "builder": "Romalılar",
    "century": "MS 2. Yüzyıl",
    "badgeName": "Termal Şifa",
    "gameQuestions": [
      {
        "question": "Türkiye'nin 1958 yılında ilan edilen İLK milli parkı hangisidir?",
        "options": [
          "Yozgat Çamlığı Milli Parkı",
          "Yedigöller",
          "Munzur",
          "Küre Dağları"
        ],
        "correctIndex": 0,
        "explanation": "Yozgat Çamlığı, Türkiye'nin ilk milli parkı unvanına sahiptir."
      }
    ]
  },
  {
    "id": "zonguldak",
    "name": "Zonguldak",
    "plate": "67",
    "region": "Karadeniz",
    "x": 32.7,
    "y": 15.6,
    "landmark": "Cehennemağzı Mağaraları & Gökgöl Mağarası",
    "epoch": "Roma & Mitoloji",
    "shortDesc": "Herkül'ün 12. görevini tamamlayıp üç başlı köpek Kerberos'u yendiği mitolojik mağara.",
    "legend": "Herkül yer altı ülkesine inip üç başlı bekçi köpeği yeryüzüne çıkarmıştır.",
    "builder": "Mitoloji & Doğa",
    "century": "Antik Çağ",
    "badgeName": "Karaelmas Yiğidi",
    "gameQuestions": [
      {
        "question": "Mitolojide Herkül'ün üç başlı köpek Kerberos'u yakaladığı rivayet edilen mağara nerededir?",
        "options": [
          "Zonguldak (Cehennemağzı)",
          "Antalya (Karain)",
          "Alanya (Damlataş)",
          "Burdur (İnsuyu)"
        ],
        "correctIndex": 0,
        "explanation": "Cehennemağzı Mağaraları Zonguldak Ereğli'de yer almaktadır."
      }
    ]
  },
  {
    "id": "aksaray",
    "name": "Aksaray",
    "plate": "68",
    "region": "İç Anadolu",
    "x": 42.9,
    "y": 59.7,
    "landmark": "Ihlara Vadisi & Sultanhanı Kervansarayı",
    "epoch": "Kapadokya & Selçuklu",
    "shortDesc": "Melendiz Çayı'nın yardığı 14 km'lik doğa kanyonu, kaya kiliseleri ve Anadolu'nun en büyük kervansarayı.",
    "legend": "İpek Yolu kervanları Sultanhanı'nda üç gün boyunca ücretsiz konaklar ve korunurdu.",
    "builder": "I. Alaeddin Keykubad",
    "century": "1229",
    "badgeName": "Kervanbaşı",
    "gameQuestions": [
      {
        "question": "İçinde onlarca kayaya oyulmuş kilise ve Melendiz Çayı bulunan vadi hangisidir?",
        "options": [
          "Ihlara Vadisi",
          "Valla Kanyonu",
          "Munzur Vadisi",
          "Saklıkent"
        ],
        "correctIndex": 0,
        "explanation": "Aksaray Ihlara Vadisi, tarihi freskli kaya kiliseleriyle doludur."
      }
    ]
  },
  {
    "id": "bayburt",
    "name": "Bayburt",
    "plate": "69",
    "region": "Karadeniz",
    "x": 75.6,
    "y": 31,
    "landmark": "Bayburt Kalesi & Baksı Müzesi",
    "epoch": "Dede Korkut & Çağdaş Sanat",
    "shortDesc": "Dede Korkut hikayelerinde geçen yalçın Bayburt Kalesi ve tepelerdeki ödüllü Baksı Müzesi.",
    "legend": "Dede Korkut'un bu topraklarda kopuz çalarak boy boylayıp soy soyladığı rivayet edilir.",
    "builder": "Bagratlılar & Selçuklular",
    "century": "MS 9. Yüzyıl",
    "badgeName": "Dede Korkut Torunu",
    "gameQuestions": [
      {
        "question": "Dede Korkut hikayelerinde \"Çin-Maçin Kalesi\" olarak adı geçen tarihi kale hangisidir?",
        "options": [
          "Bayburt Kalesi",
          "Trabzon Kalesi",
          "Erzurum Kalesi",
          "Kars Kalesi"
        ],
        "correctIndex": 0,
        "explanation": "Bayburt Kalesi, Dede Korkut destanlarına konu olmuş sarp bir kaledir."
      }
    ]
  },
  {
    "id": "karaman",
    "name": "Karaman",
    "plate": "70",
    "region": "İç Anadolu",
    "x": 39.7,
    "y": 78.9,
    "landmark": "Karaman Kalesi & Manazan Mağaraları",
    "epoch": "Karamanoğulları Beyliği",
    "shortDesc": "Türkçeyi resmi devlet dili ilan eden Karamanoğlu Mehmet Bey'in başkenti ve kaya şehir Manazan.",
    "legend": "\"Bugünden sonra divanda, dergahta, bargâhta Türkçeden başka dil kullanılmaya!\" fermanı burada verilmiştir.",
    "builder": "Karamanoğlu Mehmet Bey",
    "century": "1277",
    "badgeName": "Türkçe Muhafızı",
    "gameQuestions": [
      {
        "question": "1277 yılında Türkçeyi resmi dil ilan eden Karamanoğlu Mehmet Bey hangi beyliktendir?",
        "options": [
          "Karamanoğulları",
          "Germiyanoğulları",
          "Karesioğulları",
          "Osmanoğulları"
        ],
        "correctIndex": 0,
        "explanation": "Karamanoğlu Mehmet Bey, Karaman'da Türkçeyi devlet dili ilan etmiştir."
      }
    ]
  },
  {
    "id": "kirikkale",
    "name": "Kırıkkale",
    "plate": "71",
    "region": "İç Anadolu",
    "x": 42,
    "y": 37.6,
    "landmark": "Çeşnigir Köprüsü & Silah Sanayi Müzesi",
    "epoch": "Selçuklu & Mimar Sinan",
    "shortDesc": "Kızılırmak üzerinde Selçuklu döneminden kalma tarihi Çeşnigir Köprüsü ve milli savunma sanayii.",
    "legend": "Yavuz Sultan Selim Mısır Seferi'ne giderken ordusuyla bu köprüden geçmiştir.",
    "builder": "Selçuklular & Mimar Sinan",
    "century": "MS 13. Yüzyıl",
    "badgeName": "Demir Ustası",
    "gameQuestions": [
      {
        "question": "Kızılırmak üzerinde Kırıkkale sınırlarında yer alan tarihi Selçuklu köprüsü hangisidir?",
        "options": [
          "Çeşnigir Köprüsü",
          "Taşköprü",
          "Uzunköprü",
          "Malabadi"
        ],
        "correctIndex": 0,
        "explanation": "Çeşnigir Köprüsü, Kızılırmak'ın kanyon vadisi üzerinde yükselen tarihi bir köprüdür."
      }
    ]
  },
  {
    "id": "batman",
    "name": "Batman",
    "plate": "72",
    "region": "Güneydoğu Anadolu",
    "x": 81.7,
    "y": 65.3,
    "landmark": "Hasankeyf & Malabadi Köprüsü",
    "epoch": "Artuklular & Eyyubiler",
    "shortDesc": "Dicle Nehri kıyısında 12 bin yıllık kaya yerleşimleri Hasankeyf ve türkülere konu olan Malabadi Köprüsü.",
    "legend": "Malabadi Köprüsü'nün tek kemerinin altına Ayasofya'nın kubbesinin sığabileceği söylenir.",
    "builder": "Artuklu Necmeddin Alpi",
    "century": "1147",
    "badgeName": "Hasankeyf Kaşifi",
    "gameQuestions": [
      {
        "question": "Dünyanın günümüze ulaşan en geniş kemer açıklığına sahip tarihi taş köprülerinden olan yapı hangisidir?",
        "options": [
          "Malabadi Köprüsü",
          "Taşköprü",
          "Boğaziçi",
          "Varda"
        ],
        "correctIndex": 0,
        "explanation": "Malabadi Köprüsü, Artuklu döneminin en büyük mühendislik harikasıdır."
      }
    ]
  },
  {
    "id": "sirnak",
    "name": "Şırnak",
    "plate": "73",
    "region": "Güneydoğu Anadolu",
    "x": 87.7,
    "y": 73.3,
    "landmark": "Nuh'un Gemisi Cudi Dağı & Kırmızı Medrese",
    "epoch": "Hz. Nuh Efsanesi & Cizre Beyliği",
    "shortDesc": "Kuran-ı Kerim'de Nuh'un Gemisi'nin oturduğu belirtilen Cudi Dağı ve Sibernetik bilgini El-Cezeri'nin şehri Cizre.",
    "legend": "Büyük tufandan sonra insanlık Cudi Dağı eteklerinde yeniden filizlenmiştir.",
    "builder": "Cizre Beyleri",
    "century": "14. Yüzyıl",
    "badgeName": "Cudi Zirvesi",
    "gameQuestions": [
      {
        "question": "Robotik ve sibernetik biliminin kurucusu kabul edilen El-Cezeri hangi ilçemizde yaşamıştır?",
        "options": [
          "Cizre (Şırnak)",
          "Silifke",
          "Edremit",
          "Ahlat"
        ],
        "correctIndex": 0,
        "explanation": "İsmail El-Cezeri, otomatik makinelerini Cizre Sarayı'nda tasarlamıştır."
      }
    ]
  },
  {
    "id": "bartin",
    "name": "Bartın",
    "plate": "74",
    "region": "Karadeniz",
    "x": 36,
    "y": 10.5,
    "landmark": "Amasra Kalesi & Kemere Köprüsü",
    "epoch": "Ceneviz, Roma & Osmanlı",
    "shortDesc": "Fatih Sultan Mehmet'in tepeden bakıp \"Çeşm-i Cihan (Dünyanın Gözü) burası mı ola?\" dediği Amasra.",
    "legend": "Fatih Sultan Mehmet şehre zarar vermemek için kalenin anahtarını savaşmadan teslim almıştır.",
    "builder": "Cenevizliler & Fatih Sultan Mehmet",
    "century": "MS 14. ve 15. Yüzyıl",
    "badgeName": "Çeşm-i Cihan",
    "gameQuestions": [
      {
        "question": "Fatih Sultan Mehmet'in \"Çeşm-i Cihan (Dünyanın Gözü)\" olarak nitelendirdiği tarihi kıyı kenti hangisidir?",
        "options": [
          "Amasra",
          "Sinop",
          "Alanya",
          "Trabzon"
        ],
        "correctIndex": 0,
        "explanation": "Fatih Sultan Mehmet, Amasra'yı fethederken güzelliğine hayran kalmıştır."
      }
    ]
  },
  {
    "id": "ardahan",
    "name": "Ardahan",
    "plate": "75",
    "region": "Doğu Anadolu",
    "x": 88.7,
    "y": 18.4,
    "landmark": "Çıldır Gölü & Ardahan Kalesi",
    "epoch": "Selçuklu & Osmanlı",
    "shortDesc": "Kışın tamamen buz tutan göl üzerinde atlı kızakların kaydığı Çıldır Gölü ve Kura Nehri.",
    "legend": "Gölün altındaki antik bir şehrin sular yükselince battığı efsane edilir.",
    "builder": "Kanuni Sultan Süleyman & Selçuklular",
    "century": "MS 16. Yüzyıl",
    "badgeName": "Buz Gölü Süvarisi",
    "gameQuestions": [
      {
        "question": "Kışın yüzeyi tamamen buz tutan ve üzerinde atlı kızaklarla gezilen ünlü doğu gölü hangisidir?",
        "options": [
          "Çıldır Gölü",
          "Van Gölü",
          "Nemrut Gölü",
          "Erçek Gölü"
        ],
        "correctIndex": 0,
        "explanation": "Ardahan ve Kars sınırındaki Çıldır Gölü, kışın kalın buz tabakasıyla kaplanır."
      }
    ]
  },
  {
    "id": "igdir",
    "name": "Iğdır",
    "plate": "76",
    "region": "Doğu Anadolu",
    "x": 95,
    "y": 37.4,
    "landmark": "Karakale Harabeleri & Selçuklu Kervansarayı",
    "epoch": "Selçuklu & İpek Yolu",
    "shortDesc": "Doğu Anadolu'nun Çukurovası kabul edilen mikroklimalı vaha ve Ağrı Dağı'nın eteğindeki kervansaray.",
    "legend": "Kafkasya'dan gelen kervanların kar fırtınalarında sığındığı sıcak bir sığınaktır.",
    "builder": "Selçuklular",
    "century": "13. Yüzyıl",
    "badgeName": "Kafkas Kapısı",
    "gameQuestions": [
      {
        "question": "Türkiye'nin üç ülkeyle (Ermenistan, Nahçıvan/Azerbaycan, İran) sınırı olan tek ili hangisidir?",
        "options": [
          "Iğdır",
          "Kars",
          "Ağrı",
          "Van"
        ],
        "correctIndex": 0,
        "explanation": "Iğdır, stratejik konumuyla üç ülkeye komşu olan tek ilimizdir."
      }
    ]
  },
  {
    "id": "yalova",
    "name": "Yalova",
    "plate": "77",
    "region": "Marmara",
    "x": 18.7,
    "y": 26.3,
    "landmark": "Yürüyen Köşk & Termal Kaplıcaları",
    "epoch": "Atatürk & Roma Dönemi",
    "shortDesc": "Bir çınar ağacının dalı kesilmesin diye raylar üzerinde yürütülen efsanevi Yürüyen Köşk.",
    "legend": "Atatürk doğaya ve ağaca saygıyı tüm dünyaya göstermek için köşkü 4.8 metre kaydırtmıştır.",
    "builder": "Gazi Mustafa Kemal Atatürk",
    "century": "1929",
    "badgeName": "Doğa Dostu",
    "gameQuestions": [
      {
        "question": "Ulu bir çınar ağacının dalı kesilmesin diye raylar üzerinde kaydırılan tarihi yapı hangisidir?",
        "options": [
          "Yürüyen Köşk",
          "Florya Köşkü",
          "Çankaya Köşkü",
          "Dolmabahçe"
        ],
        "correctIndex": 0,
        "explanation": "Yalova'daki Yürüyen Köşk, Atatürk'ün çevre bilincinin en büyük anıtıdır."
      }
    ]
  },
  {
    "id": "karabuk",
    "name": "Karabük",
    "plate": "78",
    "region": "Karadeniz",
    "x": 36.7,
    "y": 17.1,
    "landmark": "Safranbolu Evleri & Kristal Teras",
    "epoch": "Osmanlı İmparatorluğu (Sivil Mimari)",
    "shortDesc": "Ahşap çatkılı, cumbalı geleneksel konaklarıyla UNESCO Dünya Mirası Safranbolu kenti.",
    "legend": "Konakların pencereleri hiçbir komşusunun mahremiyetini veya manzarasını engellemeyecek şekilde tasarlanmıştır.",
    "builder": "Osmanlı Ahşap Ustaları",
    "century": "18. ve 19. Yüzyıl",
    "badgeName": "Safranbolu Ustası",
    "gameQuestions": [
      {
        "question": "Geleneksel ahşap cumbalı Osmanlı konaklarıyla UNESCO listesinde korunan ilçe hangisidir?",
        "options": [
          "Safranbolu",
          "Beypazarı",
          "Göynük",
          "Odunpazarı"
        ],
        "correctIndex": 0,
        "explanation": "Karabük Safranbolu, Osmanlı kent dokusunu bozulmadan koruyan bir açık hava müzesidir."
      }
    ]
  },
  {
    "id": "kilis",
    "name": "Kilis",
    "plate": "79",
    "region": "Güneydoğu Anadolu",
    "x": 59.5,
    "y": 83.2,
    "landmark": "Ravanda Kalesi & Oylum Höyük",
    "epoch": "Hitit, Roma & Memlûkler",
    "shortDesc": "Bereketli Hilal'in batı ucunda 9 bin yıllık Oylum Höyük ve sarp dağ kalesi Ravanda.",
    "legend": "Haçlı seferlerinde kralların Ravanda Kalesi'ni zapt etmek için aylarca beklediği söylenir.",
    "builder": "Memlûkler & Romalılar",
    "century": "MÖ 3000 & MS 11. Yüzyıl",
    "badgeName": "Zeytin Diyarı",
    "gameQuestions": [
      {
        "question": "Kilis'te yer alan ve Mezopotamya-Anadolu ticaretini aydınlatan devasa tarihi höyük hangisidir?",
        "options": [
          "Oylum Höyük",
          "Çatalhöyük",
          "Göbeklitepe",
          "Kültepe"
        ],
        "correctIndex": 0,
        "explanation": "Oylum Höyük, bölgenin en büyük ve en eski yerleşim höyüklerinden biridir."
      }
    ]
  },
  {
    "id": "osmaniye",
    "name": "Osmaniye",
    "plate": "80",
    "region": "Akdeniz",
    "x": 55.4,
    "y": 76.1,
    "landmark": "Kastabala Antik Kenti & Toprakkale",
    "epoch": "Roma & Kilikya",
    "shortDesc": "Sütunlu caddeleriyle büyüleyen antik Kastabala (Hierapolis) ve Çukurova kapısı Toprakkale.",
    "legend": "Kastabala'da ateş üzerinde çıplak ayakla yürüyen Artemis rahipleri efsanesi anlatılır.",
    "builder": "Kilikyalılar & Romalılar",
    "century": "MÖ 1. Yüzyıl",
    "badgeName": "Kastabala Bekçisi",
    "gameQuestions": [
      {
        "question": "Osmaniye'de sütunlu caddesi ve tiyatrosu günümüze ulaşan antik kent hangisidir?",
        "options": [
          "Kastabala Antik Kenti",
          "Efes",
          "Milet",
          "Sardes"
        ],
        "correctIndex": 0,
        "explanation": "Kastabala, Çukurova'nın en etkileyici antik sütunlu caddelerine sahiptir."
      }
    ]
  },
  {
    "id": "duzce",
    "name": "Düzce",
    "plate": "81",
    "region": "Karadeniz",
    "x": 29.6,
    "y": 21.3,
    "landmark": "Prusias ad Hypium (Konuralp) Antik Tiyatrosu",
    "epoch": "Bitinya Krallığı & Roma",
    "shortDesc": "Karadeniz'in Efes'i olarak bilinen 10 bin kişilik devasa antik tiyatro ve yemyeşil şelaleler.",
    "legend": "Konuralp Bey'in adaleti ve hoşgörüsüyle fethettiği bu topraklarda tarihin fısıltıları yaşar.",
    "builder": "Bitinya Krallığı & Romalılar",
    "century": "MÖ 3. Yüzyıl",
    "badgeName": "Konuralp Gazi",
    "gameQuestions": [
      {
        "question": "\"Batı Karadeniz'in Efes'i\" olarak bilinen ve antik tiyatrosu kazılarla ortaya çıkarılan yer neresidir?",
        "options": [
          "Konuralp (Prusias ad Hypium)",
          "Amasra",
          "Sinop",
          "Ereğli"
        ],
        "correctIndex": 0,
        "explanation": "Düzce Konuralp antik kenti, Roma döneminin en zengin sanat merkezlerindendir."
      }
    ]
  }
];
