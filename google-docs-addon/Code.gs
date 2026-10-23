/**
 * Google Docs uchun o'zbek transliterator add-on'i.
 * Hujjat ochilganda "Transliterator" menyusini qo'shadi va
 * belgilangan matnni Kirill / Lotin / Yangi lotinga o'giradi.
 */

function onOpen() {
  DocumentApp.getUi()
    .createMenu('Transliterator')
    .addItem("Kirillga o'girish", 'toCyrillicSelection')
    .addItem("Lotinga o'girish", 'toLatinSelection')
    .addItem("Yangi lotinga o'girish", 'toNewLatinSelection')
    .addToUi();
}

function onInstall(e) {
  onOpen(e);
}

function toCyrillicSelection() {
  convertSelection(toCyrillic);
}

function toLatinSelection() {
  convertSelection(toLatin);
}

function toNewLatinSelection() {
  convertSelection(toNewLatin);
}

/**
 * Belgilangan matnni berilgan funksiya orqali o'giradi va o'rniga qo'yadi.
 * @param {function(string): string} fn
 */
function convertSelection(fn) {
  var doc = DocumentApp.getActiveDocument();
  var selection = doc.getSelection();
  var ui = DocumentApp.getUi();

  if (!selection) {
    ui.alert('Avval o\'girmoqchi bo\'lgan matnni belgilang.');
    return;
  }

  var elements = selection.getRangeElements();
  var changed = 0;

  for (var i = 0; i < elements.length; i++) {
    var rangeEl = elements[i];
    var el = rangeEl.getElement();
    if (!el.editAsText) continue;

    var textEl = el.editAsText();
    var content = textEl.getText();
    if (!content.length) continue;

    if (rangeEl.isPartial()) {
      var start = rangeEl.getStartOffset();
      var end = rangeEl.getEndOffsetInclusive();
      var sub = content.substring(start, end + 1);
      var conv = fn(sub);
      textEl.deleteText(start, end);
      textEl.insertText(start, conv);
      changed++;
    } else {
      textEl.setText(fn(content));
      changed++;
    }
  }

  if (changed === 0) {
    ui.alert('Belgilangan joyda o\'giriladigan matn topilmadi.');
  }
}
