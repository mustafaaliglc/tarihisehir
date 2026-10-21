import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Routes
app.post('/api/ai/city-info', async (req, res) => {
  try {
    const { cityName, landmarkName } = req.body;
    if (!cityName) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const prompt = `Türkiye'nin ${cityName} şehrindeki ${landmarkName || 'tarihi yapılar'} hakkında öğrencilere yönelik eğitici, merak uyandırıcı ve eğlenceli bir rehber hazırla.
    Lütfen şu başlıklar altında Türkçe olarak JSON formatında yanıt ver:
    - title: Yapının veya şehrin çekici başlığı
    - history: Tarihçesi ve kimler tarafından yapıldığı (2-3 cümle)
    - legendOrSecret: İlginç bir efsanesi, sırrı veya az bilinen eğlenceli bir gerçeği
    - studentQuiz: Bu yapıyla ilgili öğrencilere sorulabilecek eğlenceli 1 adet çoktan seçmeli soru (question, options dizi, correctIndex)
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const data = JSON.parse(text);
    res.json(data);
  } catch (err: any) {
    console.error('City info error:', err);
    res.status(500).json({ error: err.message || 'AI generation failed' });
  }
});

app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    
    const systemInstruction = `Sen "Bilge Dede" adında çok bilgili, sevecen ve eğlenceli bir Türk tarihi ve coğrafyası rehberisin. Öğrencilere Türkiye'nin illerini, antik kentlerini, saraylarını, camilerini, kalelerini ve efsanelerini hikayelerle anlatırsın. Türkçe konuş ve çocukların kolayca anlayabileceği sıcak bir dil kullan.`;

    const contents = [
      ...(history || []).map((h: any) => ({
        role: h.role,
        parts: [{ text: h.text }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text || 'Üzgünüm, şu an yanıt üretemedim.' });
  } catch (err: any) {
    console.error('Chat error:', err);
    res.status(500).json({ error: err.message || 'Chat error' });
  }
});

app.post('/api/ai/quiz', async (req, res) => {
  try {
    const { region } = req.body;
    const prompt = `Türkiye'nin ${region ? region + ' bölgesindeki' : ''} tarihi yapıları, antik şehirleri ve kültürel mirası hakkında ortaokul ve lise öğrencilerine yönelik 5 adet eğlenceli ve öğretici çoktan seçmeli soru hazırla.
    JSON formatında döndür: bir dizi nesne (question, options [4 seçenek], correctAnswer index (0-3), explanation).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const data = JSON.parse(response.text || '[]');
    res.json(data);
  } catch (err: any) {
    console.error('Quiz error:', err);
    res.status(500).json({ error: err.message || 'Quiz generation failed' });
  }
});

app.get('/api/ai/galata-info', (req, res) => {
  const galataData = {
    title: "Galata Kulesi'nde Hezarfen'in Kanatları Altında: Boğaz Uçuşu",
    history: "Galata Kulesi, ilk olarak Bizans döneminde fener kulesi olarak yapılmış, 1348 yılında ise Cenevizliler tarafından 'İsa Kulesi' adıyla yeniden inşa edilmiştir. Osmanlı döneminde yangın gözetleme ve rasathane gibi amaçlarla kullanılan bu görkemli kule, asırlardır İstanbul Boğazı'nın ve Haliç'in en sadık nöbetçisidir.",
    legendOrSecret: "Kulenin en ünlü efsanesi, 17. yüzyılda Hezarfen Ahmed Çelebi'nin kendi yaptığı yapay kuş kanatlarıyla kulenin tepesinden kendini rüzgâra bırakıp Boğaz'ı aşarak Üsküdar Doğancılar Meydanı'na kadar uçmasıdır. Ayrıca bir Roma efsanesine göre, Galata Kulesi'ne ilk kez birlikte çıkan bir çiftin birbiriyle evleneceğine inanılır.",
    gameMission: "Görev: Rüzgârı Yakala ve Boğaz'ı Aş! Galata Kulesi'nin seyir terasında rüzgâr gülü ve pusula araçlarını kullanarak lodos ve poyraz hava akımlarını hesapla. Kendi tasarladığın kanatları kuşan, Boğaz'ın üzerindeki tarihi akıntıları ve termal hava dalgalarını takip ederek Hezarfen'i güvenle Üsküdar'a ulaştır!",
    studentQuiz: {
      question: "17. yüzyılda Galata Kulesi'nin tepesinden kanat takıp uçarak Boğaz'ı geçen ve Üsküdar'a inen ünlü Osmanlı bilgini kimdir?",
      options: [
        "Evliya Çelebi",
        "Hezarfen Ahmed Çelebi",
        "Mimar Sinan",
        "Piri Reis"
      ],
      correctIndex: 1
    }
  };

  res.json(galataData);
});

// Dynamic educational landmark mission generator
app.post('/api/ai/landmark-mission', async (req, res) => {
  const { landmarkName = 'Galata Kulesi', cityName = 'İstanbul' } = req.body || {};
  
  const normalizeMissionData = (raw: any, landmark: string, city: string) => {
    const title = raw.title || `${landmark} Keşif Macerası`;
    const history = raw.Tarihçe || raw.history || `${landmark}, ${city} ilimizin en önemli tarihi miraslarından biridir.`;
    const legendOrSecret = raw.EfsaneOrSır || raw.legendOrSecret || `${landmark} hakkında kadim efsaneler anlatılır.`;
    const gameMission = raw.OyunGörevi || raw.gameMission || `Görev: ${landmark} çevresindeki 5 gizli tarihi emaneti topla!`;
    const rawQuiz = raw.studentQuiz || {};
    const question = rawQuiz.Soru || rawQuiz.question || `${landmark} hangi şehrimizde yer alır?`;
    const options = rawQuiz.Seçenekler || rawQuiz.options || [city, "Ankara", "İzmir", "Konya"];
    const correctIndex = typeof rawQuiz.correctIndex === 'number' ? rawQuiz.correctIndex : 0;

    return {
      title,
      history,
      Tarihçe: history,
      legendOrSecret,
      EfsaneOrSır: legendOrSecret,
      gameMission,
      OyunGörevi: gameMission,
      studentQuiz: {
        question,
        Soru: question,
        options,
        Seçenekler: options,
        correctIndex
      }
    };
  };

  const curatedLandmarks: Record<string, any> = {
    'galata kulesi': normalizeMissionData({
      title: "Galata Kulesi'nde Hezarfen'in Kanatları Altında: Boğaz Uçuşu",
      Tarihçe: "Galata Kulesi, ilk olarak Bizans döneminde fener kulesi olarak yapılmış, 1348 yılında ise Cenevizliler tarafından 'İsa Kulesi' adıyla yeniden inşa edilmiştir. Osmanlı döneminde yangın gözetleme ve rasathane gibi amaçlarla kullanılan bu görkemli kule, asırlardır İstanbul Boğazı'nın ve Haliç'in en sadık nöbetçisidir.",
      EfsaneOrSır: "Kulenin en ünlü efsanesi, 17. yüzyılda Hezarfen Ahmed Çelebi'nin kendi yaptığı yapay kuş kanatlarıyla kulenin tepesinden kendini rüzgâra bırakıp Boğaz'ı aşarak Üsküdar Doğancılar Meydanı'na kadar uçmasıdır. Ayrıca bir Roma efsanesine göre, Galata Kulesi'ne ilk kez birlikte çıkan bir çiftin birbiriyle evleneceğine inanılır.",
      OyunGörevi: "Görev: Rüzgârı Yakala ve Boğaz'ı Aş! Galata Kulesi'nin seyir terasında rüzgâr gülü ve pusula araçlarını kullanarak lodos ve poyraz hava akımlarını hesapla. Kendi tasarladığın kanatları kuşan, Boğaz'ın üzerindeki tarihi akıntıları ve termal hava dalgalarını takip ederek Hezarfen'i güvenle Üsküdar'a ulaştır!",
      studentQuiz: {
        Soru: "17. yüzyılda Galata Kulesi'nin tepesinden kanat takıp uçarak Boğaz'ı geçen ve Üsküdar'a inen ünlü Osmanlı bilgini kimdir?",
        Seçenekler: [
          "Evliya Çelebi",
          "Hezarfen Ahmed Çelebi",
          "Mimar Sinan",
          "Piri Reis"
        ],
        correctIndex: 1
      }
    }, 'Galata Kulesi', 'İstanbul'),

    'kız kulesi': normalizeMissionData({
      title: "Kız Kulesi'nin Gizemli Muhafızı: Boğaz'ın Masalsı Nöbeti",
      Tarihçe: "Kız Kulesi, M.Ö. 5. yüzyılda Atinalı komutan Alkibiades tarafından Boğaz'dan geçen gemileri denetlemek amacıyla kurulan bir gümrük noktası olarak başladı. Bizans ve Osmanlı dönemlerinde deniz feneri, savunma kalesi ve karantina istasyonu olarak hizmet verdi.",
      EfsaneOrSır: "En meşhur efsaneye göre, bir kral çok sevdiği kızını yılan sokmasıyla öleceğine dair bir kehanetten korumak için denizin ortasındaki bu kuleye yerleştirir. Ancak kuleye gönderilen bir meyve sepetine gizlenen yılan yine de prensesi sokar.",
      OyunGörevi: "Görev: Efsaneyi Boz ve Prensesi Koru! Denizin ortasında dalgalarla ve gizemli labirent koridorlarıyla mücadele et. Boğaz akıntılarını aşarak kuleye ulaş, güvenli antik sandıkları aç ve prensesi koruyacak koruyucu tılsımları topla!",
      studentQuiz: {
        Soru: "İstanbul Boğazı'nın incisi Kız Kulesi hangi iki kıtanın tam kesiştiği boğaz sularında yer almaktadır?",
        Seçenekler: [
          "Avrupa ile Asya",
          "Asya ile Afrika",
          "Avrupa ile Amerika",
          "Avustralya ile Asya"
        ],
        correctIndex: 0
      }
    }, 'Kız Kulesi', 'İstanbul'),

    'topkapı sarayı': normalizeMissionData({
      title: "Topkapı Sarayı'nda Cihan Hükümdarlarının Gizli Hazine Avı",
      Tarihçe: "Topkapı Sarayı, 1478 yılında Fatih Sultan Mehmet tarafından İstanbul'un fethinden sonra inşa ettirilmiştir. Yaklaşık 400 yıl boyunca Osmanlı İmparatorluğu'nun idare merkezi ve padişahların resmi ikametgahı olarak hizmet vermiştir.",
      EfsaneOrSır: "Sarayın Hazine Dairesi'nde korunan dünyaca ünlü 86 karatlık 'Kaşıkçı Elması'nın sokakta bir çöpçü tarafından bulunduğu ve üç tahta kaşık karşılığında bir kaşıkçıya satıldığı rivayet edilir.",
      OyunGörevi: "Görev: Dört Avlunun Sırrını Çöz! Bâb-ı Hümâyûn'dan geçerek Enderûn Mektebi ve Divan-ı Hümayun avlularında saklanmış gizli fermanları topla, Kaşıkçı Elması'nın şifreli kasasını aç!",
      studentQuiz: {
        Soru: "Topkapı Sarayı'nın inşasını 1478 yılında başlatan ve İstanbul'u fetheden ünlü Osmanlı padişahı kimdir?",
        Seçenekler: [
          "Kanuni Sultan Süleyman",
          "Yavuz Sultan Selim",
          "Fatih Sultan Mehmet",
          "II. Abdülhamid"
        ],
        correctIndex: 2
      }
    }, 'Topkapı Sarayı', 'İstanbul')
  };

  const key = landmarkName.toLowerCase().trim();
  if (curatedLandmarks[key]) {
    return res.json(curatedLandmarks[key]);
  }

  // Also check if key contains any of our curated keys
  for (const cKey of Object.keys(curatedLandmarks)) {
    if (key.includes(cKey) || cKey.includes(key)) {
      return res.json(curatedLandmarks[cKey]);
    }
  }

  try {
    const prompt = `Sen "Türkiye Keşif Gezgini" projesinin uzman eğitimci oyun tasarımcısı ve tarihçisisin.
Aşağıdaki tarihi mekan için çocuklara uygun, heyecan verici ve eğitici içerik oluştur:
Mekan: ${landmarkName} (Şehir: ${cityName})

Kesinlikle geçerli JSON formatında (markdown veya ek metin olmadan sadece ham JSON) şu alanları içeren bir yanıt döndür:
- "title": Dönüm noktasıyla eğlenceli misyonu birleştiren ilgi çekici, çocuklara uygun bir başlık (örneğin, "Galata Kulesi'nde Hezarfen'in Kanatları Altında: Boğaz Uçuşu").
- "Tarihçe": Yapının kim tarafından inşa edildiğini ve tarihi dönemlerini belirten, kısa ve ilgi çekici bir tarihçe (2-3 cümle, çocuk dostu).
- "EfsaneOrSır": Yapıyla ilgili ilginç bir efsane, mit veya sır.
- "OyunGörevi": Öğrencinin bu yapının içinde veya çevresinde oynayacağı yaratıcı bir mini oyun görevi açıklaması.
- "studentQuiz": İçeriğinde şunlar bulunan bir nesne:
    - "Soru": Önemli yer işareti hakkındaki bilgiyi test eden eğlenceli bir çoktan seçmeli soru.
    - "Seçenekler": 4 seçenekten (dizeden) oluşan bir dizi.
    - "correctIndex": Seçenekler dizisindeki doğru seçeneğin tamsayı indeksi (0-3).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(normalizeMissionData(parsed, landmarkName, cityName));
  } catch (err: any) {
    console.error('Landmark mission error:', err);
    return res.json(normalizeMissionData({}, landmarkName, cityName));
  }
});

// Vite Dev Server or Static Hosting
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      // Avoid intercepting api requests
      if (req.originalUrl.startsWith('/api/')) {
        return next();
      }
      try {
        const indexPath = path.resolve(__dirname, 'index.html');
        if (fs.existsSync(indexPath)) {
          let template = fs.readFileSync(indexPath, 'utf-8');
          template = await vite.transformIndexHtml(req.originalUrl, template);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
          return;
        }
        next();
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
