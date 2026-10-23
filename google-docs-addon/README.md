# Google Docs — O'zbek transliterator add-on

Google Docs hujjatida belgilangan matnni **Kirill**, **Lotin** va **yangi lotin** (2026: Ö, Ğ, Ş, Ç) alifbolari o'rtasida o'giradi. Konvertatsiya mantig'i [shoyim/latin-to-cyrillic](https://github.com/shoyim/latin-to-cyrillic) paketi bilan bir xil.

## O'rnatish (eng oson yo'l — bitta hujjatga)

1. Google Docs hujjatini oching.
2. Yuqoridagi menyudan **Extensions → Apps Script** ni bosing.
3. Ochilgan muharrirda:
   - `Code.gs` ichidagi standart kodni o'chirib, shu papkadagi **`Code.gs`** mazmunini qo'ying.
   - **+** tugmasi bilan yangi **Script** fayl qo'shib, nomini `Converter` deb bering va shu papkadagi **`Converter.gs`** mazmunini qo'ying.
4. **Save** (💾) bosing.
5. Hujjatni yangilang (reload). Endi yuqorida **Transliterator** menyusi paydo bo'ladi.

> `appsscript.json` ni ko'rish uchun Apps Script'da ⚙️ **Project Settings → "Show appsscript.json"** ni yoqing. Ko'pincha uni o'zgartirish shart emas — Apps Script ruxsatlarni avtomatik so'raydi.

## Ishlatish

1. Hujjatda matnni **belgilang** (tanlang).
2. **Transliterator** menyusidan kerakli yo'nalishni tanlang:
   - *Kirillga o'girish*
   - *Lotinga o'girish*
   - *Yangi lotinga o'girish*
3. Belgilangan matn o'z o'rnida o'giriladi.

Birinchi marta ishlatganda Google ruxsat (authorization) so'raydi — bu normal holat, add-on faqat **shu hujjat** bilan ishlaydi (`documents.currentonly`).

## clasp bilan (ixtiyoriy, developerlar uchun)

```bash
npm i -g @google/clasp
clasp login
clasp create --type docs --title "Uzbek Transliterator"
clasp push
```

## Eslatma

Matn o'girilganda belgilangan bo'lakning matn formatlanishi (rang, qalin/kursiv) soddalashishi mumkin — bu transliteratsiya vositalari uchun odatiy hol.
