(() => {
"use strict";
const KEY="java-support-mode-v2";
const support = window.JAVA_SUPPORT_DATA || {};
const page = (location.pathname.match(/lesson(\d+)\.html$/i) || [])[1];
if (!page || !support[Number(page)]) return;
const lesson = support[Number(page)];
const code = "lesson-part-4";
const initial = new URLSearchParams(location.search).get("learn");
let mode="review";
try { mode=localStorage.getItem(KEY)==="guided" ? "guided" : "review"; } catch {}
if(initial==="guided"||initial==="review"){mode=initial;try{localStorage.setItem(KEY,mode);}catch{}}

const element=(tag,className,text)=>{
 const n=document.createElement(tag);
 if(className)n.className=className;
 if(text!==undefined)n.textContent=text;
 return n;
};
function saveMode(m){mode=m;try{localStorage.setItem(KEY,m);}catch{};applyMode();}
let panel;
function makeCard(){
 const host=document.querySelector(".hero");
 if(!host)return;
 const box=element("section","learn-support");
 box.id="learn-support";
 box.setAttribute("aria-label","自分に必要なJavaの理解サポート");
 const intro=element("div","learn-support-head");
 const content=element("div","learn-support-headline");
 content.append(element("span","learn-eyebrow","必要な説明だけ追加"),element("h2","", "今の理解度に合わせて読む"));
 const summary=element("p","learn-description","講義の本文はそのまま。初めてなら前提知識とコードの動きを開き、復習ならすぐ先へ進めます。");
 content.append(summary);
 const buttons=element("div","learn-mode-switch");
 buttons.setAttribute("role","group");
 buttons.setAttribute("aria-label","説明の量");
 const quick=element("button","learn-switch","さっと復習");
 const guided=element("button","learn-switch","基礎から理解");
 quick.type=guided.type="button";
 quick.addEventListener("click",()=>saveMode("review"));
 guided.addEventListener("click",()=>saveMode("guided"));
 buttons.append(quick,guided);
 intro.append(content,buttons);
 box.append(intro);
 panel=element("div","learn-panel");
 panel.id="learn-panel";
 panel.setAttribute("aria-label","この回の前提知識と学習の補助");
 const top=element("div","learn-start");
 top.append(element("h3","",lesson.title),element("p","",lesson.summary));
 const context=element("p","learn-connect",lesson.connects);
 top.append(context);
 if(Number(page)===2){
  const a=element("a","learn-starter-link","Javaを本当に初めて学ぶ人はこちら →");
  a.href="start.html";
  top.append(a);
 }
 panel.append(top);
 const terms=element("section","learn-block");
 terms.append(element("h3","", "分からない言葉だけ開く"));
 terms.append(element("p","learn-hint","知っている単語は開かなくてOK。忘れた言葉だけ確認できます。"));
 const termList=element("div","learn-terms");
 for(const [name,explanation] of lesson.basics){
  const details=element("details","learn-term");
  const summary=element("summary","",name);
  const body=element("p","",explanation);
  details.append(summary,body);
  termList.append(details);
 }
 terms.append(termList);
 panel.append(terms);
 const trace=element("section","learn-block");
 trace.append(element("h3","","実行の順番を1つずつ見る"));
 trace.append(element("p","learn-hint","短い説明用の抜粋です。実行する際は講義の全体コードを使ってください。"));
 const label=element("div","learn-code-label",Number(page)===11 ? "SQLの抜粋" : Number(page)===13 ? "動きの概念図（Javaコードではありません）" : "重要な行だけを抜粋");
 const pre=element("pre","learn-code",lesson.snippet);
 pre.setAttribute("tabindex","0");
 const player=element("div","learn-trace");
 const state=element("div","learn-trace-step","");
 state.setAttribute("aria-live","polite");
 const controls=element("div","learn-trace-controls");
 const prev=element("button","","← 前へ");
 const next=element("button","","次の動き →");
 prev.type=next.type="button";
 let step=0;
 function draw(){
  state.textContent=(step+1)+" / "+lesson.steps.length+"　"+lesson.steps[step];
  prev.disabled=step===0;
  next.disabled=step===lesson.steps.length-1;
  next.textContent=step===lesson.steps.length-1?"最後まで確認済み":"次の動き →";
 }
 prev.addEventListener("click",()=>{step=Math.max(0,step-1);draw();});
 next.addEventListener("click",()=>{step=Math.min(lesson.steps.length-1,step+1);draw();});
 controls.append(prev,next);
 player.append(state,controls);
 draw();
 trace.append(label,pre,player);
 panel.append(trace);
 const quiz=element("section","learn-block");
 quiz.append(element("h3","","理解チェック（1問）"));
 quiz.append(element("p","learn-question",lesson.question));
 const choices=element("div","learn-choices");
 choices.setAttribute("role","group");
 choices.setAttribute("aria-label","確認問題の選択肢");
 const feedback=element("p","learn-feedback","");
 feedback.setAttribute("role","status");
 feedback.setAttribute("aria-live","polite");
 lesson.choices.forEach((answer,index)=>{
  const option=element("button","learn-option",answer);
  option.type="button";
  option.addEventListener("click",()=>{
    choices.querySelectorAll("button").forEach(btn=>btn.setAttribute("aria-pressed","false"));
    option.setAttribute("aria-pressed","true");
    feedback.textContent=(index===lesson.answer?"正解！ ":"もう一度考えるなら：正解は「"+lesson.choices[lesson.answer]+"」。 ")+lesson.reason;
    feedback.className="learn-feedback "+(index===lesson.answer?"learn-correct":"learn-incorrect");
  });
  option.setAttribute("aria-pressed","false");
  choices.append(option);
 });
 quiz.append(choices,feedback);
 panel.append(quiz);
 const nextStep=element("div","learn-next");
 const deeper=element("a","","もう少し詳しく見る →");
 deeper.href=lesson.link || "concepts/index.html";
 deeper.textContent=lesson.linkText+" →";
 const practice=element("a","","講義の演習へ進む →");
 practice.href="#"+code;
 nextStep.append(deeper,practice);
 panel.append(nextStep);
 box.append(panel);
 host.after(box);
 function applyMode(){
  const show=mode==="guided";
  panel.hidden=!show;
  quick.setAttribute("aria-pressed",String(!show));
  guided.setAttribute("aria-pressed",String(show));
  box.dataset.mode=mode;
 }
 applyMode();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",makeCard);
else makeCard();
})();