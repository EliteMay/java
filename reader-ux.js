(() => {
"use strict";
const PREFERENCE = "java-code-wrap-v1";
let defaultWrap = false;
try { defaultWrap = localStorage.getItem(PREFERENCE) === "true"; } catch {}
const lessonTitles = [
"第2回 変数・演算・配列",
"第3回 メソッド・値渡し",
"第4回 クラス・this",
"第5回 static・カプセル化",
"第6回 継承・super",
"第7回 インタフェース",
"第8回 List・Map",
"第9回 null・例外",
"第10回 ファイル・CSV",
"第11回 SQL・JDBC"
];
function makeLink(label, href) {
  const a = document.createElement("a");
  a.href = href;
  a.textContent = label;
  return a;
}
function initNavigation() {
 const nav = document.querySelector(".course-nav");
 if (!nav) return;
 const big = document.getElementById("bigbtn");
 if (big) nav.appendChild(big); // 固定された文字ボタンとナビの重なりを解消
 const chooser = document.createElement("select");
 chooser.className = "jump-select";
 chooser.setAttribute("aria-label", "講義を直接選択");
 const placeholder = new Option("講義を選択", "");
 chooser.add(placeholder);
 lessonTitles.forEach((title,i) => {
   const href = "lesson" + String(i+2).padStart(2,"0") + ".html";
   const option = new Option(title, href);
   chooser.add(option);
 });
 chooser.add(new Option("問題集", "problems.html"));
 const current = location.pathname.split("/").pop();
 if ([...chooser.options].some(option=>option.value === current)) {
   chooser.value = current;
 }
 chooser.addEventListener("change", () => {
   if (chooser.value) location.assign(chooser.value);
 });
 nav.appendChild(chooser);
 const footer = document.querySelector(".container > footer");
 if (footer) {
   const prev = [...nav.querySelectorAll("a[href]")].find(a => a.textContent.includes("前の講義"));
   const next = [...nav.querySelectorAll("a[href]")].find(a => a.textContent.includes("次の講義"));
   const bottom = document.createElement("nav");
   bottom.className = "lesson-bottom-nav";
   bottom.setAttribute("aria-label", "読み終えたあとの移動");
   if (prev) bottom.appendChild(makeLink("← 前の講義へ", prev.getAttribute("href")));
   bottom.appendChild(makeLink("講義一覧に戻る", "index.html"));
   if (next) bottom.appendChild(makeLink("次の講義へ →", next.getAttribute("href")));
   footer.before(bottom);
 }
}
function addToc(){
  const titles = [...document.querySelectorAll(".card > .card-title")]
    .filter(el => /^[①②③④⑤]/.test(el.textContent.trim()));
  if (titles.length !== 5) return;
  const toc = document.createElement("nav");
  toc.className = "lesson-toc";
  toc.setAttribute("aria-label", "この回の目次");
  const heading = document.createElement("strong");
  heading.textContent = "この回の目次・クリックで移動";
  const links = document.createElement("div");
  links.className = "lesson-toc-links";
  titles.forEach((el, i) => {
    const card = el.parentElement;
    card.id = "lesson-part-" + (i+1);
    links.appendChild(makeLink(el.textContent.trim(), "#"+card.id));
  });
  toc.append(heading,links);
  const hero = document.querySelector(".hero");
  if (hero) hero.before(toc);
}
function codeKind(pre) {
  const content = pre.textContent.trim();
  let heading = pre.previousElementSibling;
  // ファイル名が直前にある場合に優先
  while (heading && heading.classList.contains("code-toolbar")) heading = heading.previousElementSibling;
  const hint = heading?.classList.contains("fname") ? heading.textContent.toLowerCase() : "";
  if (/\.csv\b/.test(hint)) return "CSV";
  if (/\.sql\b/.test(hint)) return "SQL";
  if (/\.java\b/.test(hint)) return "Java";
  if (/^\s*(select|insert|update|delete|create)\b/i.test(content) && !content.includes("System.out")) return "SQL";
  if (/^(?:[^\n,]+,){2,}[^\n,]+/m.test(content) && !/\b(?:public|class|import|package|static)\b/.test(content)) return "CSV";
  return "Java";
}
async function copyText(text) {
 if (navigator.clipboard?.writeText) {
   await navigator.clipboard.writeText(text);
   return;
 }
 const node=document.createElement("textarea");
 node.value=text;
 node.style.position="fixed";node.style.opacity="0";
 document.body.appendChild(node);node.select();
 const success = document.execCommand("copy");
 node.remove();
 if(!success) throw Error("Copy unavailable");
}
function initCode(){
 document.querySelectorAll("pre.code").forEach((pre, index) => {
  if(!pre.id) pre.id = "lesson-code-" + index;
  const toolbar = document.createElement("div");
  toolbar.className="code-toolbar";
  toolbar.setAttribute("role","group");
  toolbar.setAttribute("aria-label","コードの操作");
  const kind=document.createElement("span");kind.className="code-language";
  kind.textContent=codeKind(pre);
  const wrap = document.createElement("button");
  wrap.type = "button";
  wrap.textContent = "折り返し";
  wrap.setAttribute("aria-pressed", String(defaultWrap));
  wrap.setAttribute("aria-label","コードの折り返し表示を切り替える");
  if(defaultWrap) pre.classList.add("reader-wrapped");
  wrap.addEventListener("click",()=>{
   const next=!pre.classList.contains("reader-wrapped");
   // 全コードをまとめて切り替える（ページ内で設定が揃う）
   document.querySelectorAll("pre.code").forEach(p=>p.classList.toggle("reader-wrapped",next));
   document.querySelectorAll(".code-toolbar button[data-wrap]").forEach(btn=>btn.setAttribute("aria-pressed",String(next)));
   try {localStorage.setItem(PREFERENCE,String(next));}catch{}
  });
  wrap.dataset.wrap="";
  const copy=document.createElement("button");
  copy.type="button";
  copy.textContent="コピー";
  copy.setAttribute("aria-label", kind.textContent + "のコードをコピー");
  copy.addEventListener("click", async()=>{
    const original=copy.textContent;
    try { await copyText(pre.textContent); copy.textContent="コピーしました"; }
    catch { copy.textContent="コピー失敗"; }
    window.setTimeout(()=>copy.textContent=original,1800);
  });
  toolbar.append(kind,wrap,copy);
  pre.before(toolbar);
  // 元から存在するコピー操作を重複させない。文言・出力など他の要素は保つ
  const row=pre.nextElementSibling;
  if (row?.classList.contains("btn-row")) {
    const buttons=[...row.querySelectorAll("button[data-copy]")].filter(b=>b.getAttribute("data-copy")===pre.id);
    buttons.forEach(btn=>btn.remove());
    const messages=[...row.querySelectorAll(".copy-msg")];
    if (!row.querySelector("button")) messages.forEach(msg=>msg.remove());
    if (!row.textContent.trim() && !row.children.length) row.remove();
  }
 });
}
document.addEventListener("DOMContentLoaded",()=>{
 initNavigation();
 addToc();
 initCode();
});
})();