/*!
 * O'zbek transliteratsiya yadrosi (Google Apps Script versiyasi).
 * Lotin / Kirill / Yangi lotin (2026): O'→Ö, G'→Ğ, Sh→Ş, Ch→Ç.
 * Funksiyalar global: toLatin, toCyrillic, toNewLatin, fromNewLatin.
 * github.com/shoyim
 */

var LotinAlifbo = "AaBbDdFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvXxYyZz‘‘";
    var KrillAlifbo = "АаБбДдФфГгҲҳИиЖжКкЛлМмНнОоПпҚқРрСсТтУуВвХхЙйЗзЪъ";

    var APOSTROF = "‘"; // ‘ (U+2018)
    var KIRILL_UNLILAR = ["А", "Е", "Ё", "И", "О", "У", "Э", "Ю", "Я", "Ў"]; // А Е Ё И О У Э Ю Я Ў

    function replaceAll(text, search, repl) {
        return text.split(search).join(repl);
    }

    function changeApostrophe(text) {
        var variantlar = ["'", "`", "ʻ", "ʼ", "‘", "’", "ʹ", "´"];
        var harflar = ["O", "o", "G", "g"];
        for (var h = 0; h < harflar.length; h++) {
            for (var v = 0; v < variantlar.length; v++) {
                if (variantlar[v] === APOSTROF) continue;
                text = replaceAll(text, harflar[h] + variantlar[v], harflar[h] + APOSTROF);
            }
        }
        return text;
    }

    function toLatin(text) {
        text = changeApostrophe(text);
        var result = "";
        var isAllUpper = (text.toUpperCase() === text);

        for (var i = 0; i < text.length; i++) {
            var ch = text[i];
            var prev = (i > 0) ? text[i - 1] : null;

            // "Е": so'z boshida va unlidan keyin — "Ye", undoshdan keyin — "e".
            if (ch === "Е" || ch === "е") { // Е / е
                var prevUp = (prev !== null) ? prev.toUpperCase() : null;
                var ye = (i === 0)
                    || prevUp === " " || prevUp === "-" || prevUp === "Ъ" || prevUp === "Ь" // Ъ Ь
                    || KIRILL_UNLILAR.indexOf(prevUp) !== -1;
                if (ye) {
                    result += (ch === "Е") ? (isAllUpper ? "YE" : "Ye") : "ye";
                } else {
                    result += (ch === "Е") ? "E" : "e";
                }
                continue;
            }

            // "Ц": unlidan keyin "ts", aks holda "s".
            if (ch === "Ц" || ch === "ц") { // Ц / ц
                var prevLo = (prev !== null) ? prev.toLowerCase() : null;
                var afterVowel = (i > 0) && ["а", "е", "и", "о", "у", "ў", "э"].indexOf(prevLo) !== -1;
                if (afterVowel) {
                    result += (ch === "Ц") ? (isAllUpper ? "TS" : "Ts") : "ts";
                } else {
                    result += (ch === "Ц") ? "S" : "s";
                }
                continue;
            }

            var map = {
                "Ў": "O‘", "ў": "o‘", // Ў ў
                "Ғ": "G‘", "ғ": "g‘", // Ғ ғ
                "Ш": isAllUpper ? "SH" : "Sh", "ш": "sh", // Ш ш
                "Ч": isAllUpper ? "CH" : "Ch", "ч": "ch", // Ч ч
                "Ё": isAllUpper ? "YO" : "Yo", "ё": "yo", // Ё ё
                "Ю": isAllUpper ? "YU" : "Yu", "ю": "yu", // Ю ю
                "Я": isAllUpper ? "YA" : "Ya", "я": "ya", // Я я
                "Э": "E", "э": "e" // Э э
            };

            if (Object.prototype.hasOwnProperty.call(map, ch)) {
                result += map[ch];
            } else {
                var pos = KrillAlifbo.indexOf(ch);
                result += (pos !== -1) ? LotinAlifbo[pos] : ch;
            }
        }
        return result;
    }

    function toCyrillic(text) {
        text = changeApostrophe(text);
        var isAllUpper = (text.toUpperCase() === text);

        var complex = [
            ["Sh", "Ш"], ["sh", "ш"], ["SH", "Ш"],
            ["Ch", "Ч"], ["ch", "ч"], ["CH", "Ч"],
            ["Yo", "Ё"], ["yo", "ё"], ["YO", "Ё"],
            ["Yu", "Ю"], ["yu", "ю"], ["YU", "Ю"],
            ["Ya", "Я"], ["ya", "я"], ["YA", "Я"],
            ["Ye", "Е"], ["ye", "е"], ["YE", "Е"],
            ["Ts", "Ц"], ["ts", "ц"], ["TS", "Ц"],
            ["G‘", "Ғ"], ["g‘", "ғ"], ["O‘", "Ў"], ["o‘", "ў"],
            // Yangi lotin (2026)
            ["Ö", "Ў"], ["ö", "ў"], ["Ğ", "Ғ"], ["ğ", "ғ"],
            ["Ş", "Ш"], ["ş", "ш"], ["Ç", "Ч"], ["ç", "ч"],
            // Eski loyihalardagi belgilar ham qabul qilinadi
            ["Ō", "Ў"], ["ō", "ў"], ["Ŏ", "Ў"], ["ŏ", "ў"],
            ["Ḡ", "Ғ"], ["ḡ", "ғ"]
        ];
        for (var c = 0; c < complex.length; c++) {
            text = replaceAll(text, complex[c][0], complex[c][1]);
        }

        var out = "";
        for (var i = 0; i < text.length; i++) {
            var ch = text[i];
            var prev = (i > 0) ? text[i - 1] : null;

            // "e": so'z boshida yoki unlidan keyin — "э", undoshdan keyin — "е".
            if (ch.toLowerCase() === "e") {
                var prevLo = (prev !== null) ? prev.toLowerCase() : null;
                var eBoshida = (i === 0) || prev === " " || prev === "-"
                    || ["a", "e", "i", "o", "u"].indexOf(prevLo) !== -1;
                if (eBoshida) {
                    out += (ch === "E") ? "Э" : "э"; // Э / э
                } else {
                    out += (ch === "E") ? "Е" : "е"; // Е / е
                }
            } else {
                var pos = LotinAlifbo.indexOf(ch);
                out += (pos !== -1) ? KrillAlifbo[pos] : ch;
            }
        }

        // Qolgan apostroflar tutuq belgisi (ъ) sifatida.
        var aps = ["'", "`", "ʻ", "ʼ", "‘", "’"];
        for (var a = 0; a < aps.length; a++) {
            out = replaceAll(out, aps[a], isAllUpper ? "Ъ" : "ъ");
        }
        return out;
    }

    function toNewLatin(text) {
        text = toLatin(text);
        var map = [
            ["O‘", "Ö"], ["o‘", "ö"], ["G‘", "Ğ"], ["g‘", "ğ"],
            ["SH", "Ş"], ["Sh", "Ş"], ["sh", "ş"],
            ["CH", "Ç"], ["Ch", "Ç"], ["ch", "ç"]
        ];
        for (var i = 0; i < map.length; i++) {
            text = replaceAll(text, map[i][0], map[i][1]);
        }
        return text;
    }

    function fromNewLatin(text) {
        var map = [
            ["Ö", "O‘"], ["ö", "o‘"], ["Ğ", "G‘"], ["ğ", "g‘"],
            ["Ş", "Sh"], ["ş", "sh"], ["Ç", "Ch"], ["ç", "ch"]
        ];
        for (var i = 0; i < map.length; i++) {
            text = replaceAll(text, map[i][0], map[i][1]);
        }
        return text;
    }
