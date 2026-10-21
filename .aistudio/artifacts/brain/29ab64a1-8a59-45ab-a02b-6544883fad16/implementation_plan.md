# 1. Şahıs (First-Person) 3D Tarihi Keşif Modu Planı

Öğrencilerin Türkiye'nin tarihi yapılarını ve meydanlarını doğrudan kendi gözlerinden (1. şahıs / FPS bakış açısı) keşfetmelerini sağlayan, insan göz hizasında yürüyüş, mouse sürükleme ve dokunmatik serbest bakış kontrollerini içeren mimari ve uygulama planı.

## Kullanıcı Tercihleri ve Onaylanan Kararlar

> [!IMPORTANT]
> Kullanıcı ile 1. aşama soru-cevap sürecinde teyit edilen kesin tercihler:

- **Kamera Görünümü**: Her zaman ve doğrudan **1. şahıs (First-Person Perspective)** kamerası devrede olacak. Dışarıdan 3. şahıs kukla karakter gizlenecek, oyuncu doğrudan dünyayı kendi gözlerinden görecek.
- **Kamera Yönetimi**: Rahat ve sezgisel bir deneyim için **mouse sürükleme ve dokunmatik kaydırma** ile 360° serbest etrafa bakış sağlanacak (tarayıcı pointer lock zorlaması olmadan pürüzsüz kamera yönlendirmesi).
- **Kamera Yüksekliği**: Standart **insan göz hizası (1.70m - 1.75m)** ayarlanacak; zıplama ve adımlarda hafif kafa sallantısı (head-bobbing) ile gerçekçi bir yürüyüş hissi verilecek.

---

## 1. Genel Bakış ve Temel Konsept

- **Ne Sağlar**: Öğrenciler Galata Kulesi Meydanı, Efes Antik Kenti, Nemrut Zirvesi veya Kapadokya vadilerinde dışarıdan bir kukla izlemek yerine bizzat orada yürüyormuş gibi tam bir sanal gezi hissiyatı yaşar.
- **Hedef Kitle**: İlkokul, ortaokul ve lise öğrencileri; tarih ve mimari meraklıları.
- **Temel Değer**: Tarihi yapıların ölçeğini (örneğin Galata Kulesi'nin 67 metrelik devasa gövdesine aşağıdan yukarıya doğru bakmanın yarattığı heybeti) doğrudan hissettirerek akılda kalıcılığı en üst seviyeye çıkarmak.

---

## 2. Kullanıcı Deneyimi ve Görsel Tasarım

### Kullanıcı Akışı
1. Öğrenci haritada bir şehre tıklar ve **"Oyuna Başla!"** der.
2. 3D sahne doğrudan oyuncunun göz hizasında (y = 1.75) açılır.
3. Önünde Galata Kulesi'nin devasa tarihi girişi, etrafında Arnavut kaldırımlı meydan ve tarihi sokak lambaları belirir.
4. Klavyede `W, A, S, D` veya yön tuşlarına bastığında doğrudan ileri/geri/sağa/sola adım atar.
5. Mouse'u veya dokunmatik ekranı sürüklediğinde başını çevirerek kuleye, gökyüzüne, meydana ve yön tabelalarına bakar.
6. Meydandaki altın tarihi eserlere yaklaştığında eser toplanır, ses efekti ve tarihi bilgi notu belirir.
7. Bilgi noktalarına (Hezarfen uçuş noktası, seyir balkonu, Ceneviz kitabesi) yaklaştığında detaylı tarihi açıklama kartları açılır.

### Görsel Kimlik ve HUD
- **HUD Görünümü**: Görüş açısını engellemeyen minimalist, cam efektli üst ve alt göstergeler.
- **Hafif Nişangah (Crosshair)**: Ekranın tam ortasında zarif, yarı saydam bir odak noktası (interaksiyonları kolaylaştırır).
- **Adım Hissi (Head-Bob)**: Yürürken kameraya eklenen çok hafif sinüs dalgası sarsıntısı ile organik insan yürüyüşü dinamikleri.
- **Göz Hizası Çarpışma Kutusu**: Kulenin taş duvarlarının içine girilmesini engelleyen dairesel fizik kalkanı.

---

## 3. Ürün Kararları ve Tercih Gerekçeleri

### Karar 1: 3. Şahıs Avatarı Yerine Doğrudan 1. Şahıs
- **Seçilen Yaklaşım**: Oyuncu avatarını görünmez yapmak ve kamerayı doğrudan oyuncunun fiziksel koordinatlarına (`playerPos + 1.75 Y`) kilitlemek.
- **Neden**: Karakter modeli kamerayı kapatmaz, öğrenci kendisini tarihi yapının içinde ve meydanın tam ortasında hisseder.

### Karar 2: Mouse Sürükleme & Dokunmatik Serbest Bakış
- **Seçilen Yaklaşım**: Mouse basılı tutularak (veya mobil ekranda parmak kaydırılarak) `yaw` (sağ-sol) ve `pitch` (yukarı-aşağı) açılarının hassas şekilde güncellenmesi.
- **Neden**: Web tabanlı eğitim sitelerinde sert "Pointer Lock API" kullanımı öğrencileri kısıtlayabilir ve sayfadan çıkışı zorlaştırabilir; sürükleme modeli hem masaüstünde hem tablet/mobil cihazlarda sıfır takılmayla çalışır.

---

## 4. Teknik Mimari ve Bileşen Şeması

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CityGameModal Container                         │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    City3DGame (Three.js WebGL)                   │  │
│  │                                                                  │  │
│  │  ┌───────────────────────┐          ┌─────────────────────────┐  │  │
│  │  │ FirstPersonController │ ───────> │  Eye-Level Camera Loop  │  │  │
│  │  │ - WASD / Arrow Keys   │          │  - Pos: x, z + 1.75y    │  │  │
│  │  │ - Mouse Drag (Yaw)    │          │  - Target: Pitch & Yaw  │  │  │
│  │  │ - Touch Joypad / Drag │          │  - Head-bob damping     │  │  │
│  │  └───────────────────────┘          └─────────────────────────┘  │  │
│  │              │                                   │               │  │
│  │              ▼                                   ▼               │  │
│  │  ┌───────────────────────┐          ┌─────────────────────────┐  │  │
│  │  │ Collision & Proximity │          │ Procedural World (PBR)  │  │  │
│  │  │ - Tower radius bound  │          │ - Galata Tower / Square │  │  │
│  │  │ - Relics collection   │          │ - 5 Relics & 4 Hotspots │  │  │
│  │  └───────────────────────┘          └─────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │               First-Person HUD & Reticle Overlay                 │  │
│  │  - Minimalist Compass / Distance Radar                           │  │
│  │  - Subtle Reticle Dot at Viewport Center                         │  │
│  │  - Fact notification toast & Discovery dialog                    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Teknik Değişiklik Adımları:
1. `City3DGame.tsx` dosyasında `cameraOrbit` (3. şahıs uydu kamerası) mantığı yerine **`firstPersonLook` (`yaw`, `pitch`)** ve **`eyeHeight: 1.75`** hesaplamasına geçilmesi.
2. 3. şahıs gövde/şapka meshinin oyuncu kendi gözünden bakarken kamerayı engellememesi için görünmez yapılması veya kamera arkasında bırakılması.
3. Yürüyüş vektörünün doğrudan baktığı `yaw` yönüne göre ileri/geri ve sağa/sola hesaplanması.
4. Mobil cihazlar için dokunmatik sol joypad (yürüme) ve sağ dokunmatik alan (bakış açısı çevirme) entegrasyonu.
5. Ekranın ortasına hafif bir odak noktası (reticle) ve 1. şahıs kontrollerini açıklayan sade yönlendirme dock'u eklenmesi.
