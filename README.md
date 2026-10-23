# O'zbek transliterator — Chrome kengaytmasi va Google Docs add-on

O'zbek matnini **Lotin**, **Kirill** va **yangi lotin** (2026 islohoti: Ö, Ğ, Ş, Ç) alifbolari o'rtasida o'giradigan vositalar to'plami. Konvertatsiya mantig'i [shoyim/latin-to-cyrillic](https://github.com/shoyim/latin-to-cyrillic) PHP paketining aynan o'zi, JavaScriptga ko'chirilgan va bitta `converter.js` yadrosi orqali ishlaydi.

## Tarkibi

| Qism | Papka | Tavsif |
| --- | --- | --- |
| 🧩 Chrome kengaytmasi | `.` (ildiz) | Brauzerda popup orqali o'girish. To'liq offline, ruxsatlarsiz. |
| 📄 Google Docs add-on | [`google-docs-addon/`](google-docs-addon/) | Docs hujjatida belgilangan matnni menyu orqali o'giradi. |

---

## 🧩 Chrome kengaytmasi

To'liq **offline** ishlaydi — matn hech qayerga yuborilmaydi, server yo'q, hech qanday ruxsat (permission) talab qilinmaydi.

### O'rnatish (developer rejimi)

1. Ushbu papkani kompyuteringizga yuklab oling.
2. Chrome'da `chrome://extensions` sahifasini oching.
3. O'ng yuqoridagi **Developer mode** ni yoqing.
4. **Load unpacked** tugmasini bosib, shu papkani (repo ildizini) tanlang.
5. Asboblar panelidagi ikonka orqali foydalaning.

### Ishlatish

- Matnni kiriting.
- **Kirillga**, **Lotinga** yoki **Yangi lotinga** tugmalaridan birini tanlang (yozilayotganda avtomatik o'giriladi).
- **Nusxa olish** bilan natijani oling.

---

## 📄 Google Docs add-on

Docs hujjatida belgilangan matnni o'z o'rnida o'giradi. O'rnatish va foydalanish — [`google-docs-addon/README.md`](google-docs-addon/README.md).

---

## Fayllar (ildiz)

| Fayl | Vazifasi |
| --- | --- |
| `manifest.json` | Kengaytma konfiguratsiyasi (Manifest V3) |
| `converter.js` | Transliteratsiya yadrosi (Node va brauzerda ishlaydi) |
| `popup.html` / `popup.css` / `popup.js` | Kengaytma interfeysi |
| `icons/` | Ikonkalar |
| `test.node.js` | `node test.node.js` — yadroni tekshiradi (29 ta holat) |
| `google-docs-addon/` | Google Docs add-on (Apps Script) |

## Litsenziya

MIT © Shoyim Obloqulov
