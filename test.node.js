const C = require('./converter.js');
const cases = [
  ['toLatin', 'Ўзбекистон', 'O‘zbekiston'],
  ['toLatin', 'мактаб', 'maktab'],
  ['toLatin', 'шаҳар', 'shahar'],
  ['toLatin', 'Еркин', 'Yerkin'],
  ['toLatin', 'поезд', 'poyezd'],
  ['toLatin', 'бел', 'bel'],
  ['toLatin', 'функция', 'funksiya'],
  ['toLatin', 'лицей', 'litsey'],
  ['toLatin', 'цирк', 'sirk'],
  ['toLatin', 'ШАХ', 'SHAX'],
  ['toLatin', 'ёмғир', 'yomg‘ir'],
  ['toCyrillic', 'O‘zbekiston', 'Ўзбекистон'],
  ['toCyrillic', 'maktab', 'мактаб'],
  ['toCyrillic', 'shahar', 'шаҳар'],
  ['toCyrillic', 'Ekran', 'Экран'],
  ['toCyrillic', 'Yerkin', 'Еркин'],
  ["toCyrillic", "ma'no", 'маъно'],
  ['toCyrillic', 'Şahar', 'Шаҳар'],
  ['toCyrillic', 'Özbekiston', 'Ўзбекистон'],
  ['toNewLatin', 'Ўзбекистон', 'Özbekiston'],
  ['toNewLatin', 'Shahar', 'Şahar'],
  ['toNewLatin', 'Choy', 'Çoy'],
  ['toNewLatin', 'ШАҲАР', 'ŞAHAR'],
  ["toNewLatin", "o'g'il", 'öğil'],
  ['toNewLatin', 'oʻgʻil', 'öğil'],
  ['toNewLatin', 'o’g’il', 'öğil'],
  ['fromNewLatin', 'Özbekiston', 'O‘zbekiston'],
  ['fromNewLatin', 'Şahar', 'Shahar'],
];
let fail = 0;
for (const [m, inp, exp] of cases) {
  const got = C[m](inp);
  const ok = got === exp;
  if (!ok) fail++;
  console.log((ok ? 'OK  ' : 'FAIL') + `  ${m}(${JSON.stringify(inp)}) => ${JSON.stringify(got)}` + (ok ? '' : ` (kutilgan ${JSON.stringify(exp)})`));
}
// round-trip
const rt = 'Ўзбекистон мактаби';
const back = C.toCyrillic(C.toLatin(rt));
console.log((back === rt ? 'OK  ' : 'FAIL') + `  round-trip => ${JSON.stringify(back)}`);
if (back !== rt) fail++;
console.log(fail === 0 ? `\nALL ${cases.length + 1} PASS` : `\n${fail} FAIL`);
process.exit(fail === 0 ? 0 : 1);
