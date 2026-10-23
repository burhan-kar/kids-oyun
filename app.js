/* Mete Öğreniyor — oyun mantığı. Çevrimdışı çalışır, veriler cihazda saklanır. */

let DURUM = JSON.parse(localStorage.getItem('mete')||'null') || {
  dil:'ikisi', yildiz:0, tamamlanan:{}, // tamamlanan: {"hayvanlar|secim":yildiz}
};
function kaydet(){ localStorage.setItem('mete', JSON.stringify(DURUM)); }

const UI = {
  tr:{ selam:'Merhaba Mete! 👋', basla:'Başla ▶', ipuc:'Bir konuya dokun ve oynamaya başla',
       devam:'Devam et', tebrik:'Tebrikler Mete!', ikisi:'İkisi birden', dinleBtn:'🔊 Tekrar dinle',
       dogruSes:['Aferin!','Harika!','Süper!','Çok iyi!','Bravo!'] },
  en:{ selam:'Hello Mete! 👋', basla:'Start ▶', ipuc:'Tap a topic and start playing',
       devam:'Continue', tebrik:'Well done Mete!', ikisi:'Both', dinleBtn:'🔊 Listen again',
       dogruSes:['Great!','Awesome!','Super!','Well done!','Yay!'] }
};
function L(){ return DURUM.dil==='en' ? UI.en : UI.tr; } // arayüz dili (ikisi -> tr arayüz)

// ---- ekran geçişi ----
function goster(id){
  document.querySelectorAll('.ekran').forEach(e=>e.classList.remove('aktif'));
  document.getElementById(id).classList.add('aktif');
  if(id!=='s08') document.querySelectorAll('.konfeti').forEach(c=>c.remove());
  yildizGuncelle();
  if(id==='s02') anaEkran();
  window.scrollTo(0,0);
}
function dilSec(d){ DURUM.dil=d; kaydet(); seslenHazir(); }

// ---- ses (tarayıcı konuşma sentezi, çevrimdışı çalışır) ----
let seslerYuklendi=false;
function seslenHazir(){ if('speechSynthesis'in window){ speechSynthesis.getVoices(); seslerYuklendi=true; } }
function sesliSoyle(metin, dil){
  if(!('speechSynthesis'in window)) return;
  try{
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(metin);
    u.lang = dil==='en' ? 'en-US' : 'tr-TR';
    u.rate=0.9; u.pitch=1.1;
    speechSynthesis.speak(u);
  }catch(e){}
}
// kelimeyi seçili dile göre seslendir
function kelimeSesle(k){
  if(DURUM.dil==='en'){ sesliSoyle(k.en,'en'); }
  else if(DURUM.dil==='ikisi'){ sesliSoyle(k.tr,'tr'); setTimeout(()=>sesliSoyle(k.en,'en'),900); }
  else { sesliSoyle(k.tr,'tr'); }
}
function kelimeYazi(k){
  if(DURUM.dil==='en') return k.en;
  if(DURUM.dil==='ikisi') return k.tr+' · '+k.en;
  return k.tr;
}

// ---- yıldız göstergeleri ----
function yildizGuncelle(){
  document.getElementById('yildiz-toplam').textContent=DURUM.yildiz;
  document.querySelectorAll('.yildiz-toplam2,.yildiz-toplam3').forEach(e=>e.textContent=DURUM.yildiz);
}

// ---- S02 ana ekran ----
function anaEkran(){
  document.getElementById('s02-selam').textContent=L().selam;
  document.getElementById('s02-ipuc').textContent=L().ipuc;
  yildizGuncelle();
  const kap=document.getElementById('konu-izgara'); kap.innerHTML='';
  KONULAR.forEach(k=>{
    const b=document.createElement('button');
    b.className='konu'; b.style.background=k.renk;
    const ad = DURUM.dil==='en'?k.en : (DURUM.dil==='ikisi'? k.tr : k.tr);
    b.innerHTML=`<span class="emoji">${k.emoji}</span><span>${ad}</span>`;
    b.onclick=()=>{ sesliSoyle(DURUM.dil==='en'?k.en:k.tr, DURUM.dil==='en'?'en':'tr'); aktiviteListe(k); };
    kap.appendChild(b);
  });
}

// ---- S03 aktivite listesi ----
let AKTIF_KONU=null;
function aktiviteListe(konu){
  AKTIF_KONU=konu;
  document.getElementById('s03-baslik').textContent = DURUM.dil==='en'?konu.en:konu.tr;
  const kap=document.getElementById('akt-liste'); kap.innerHTML='';
  OYUNLAR.forEach(o=>{
    const anahtar=konu.id+'|'+o.tip;
    const kazanilan=DURUM.tamamlanan[anahtar]||0;
    const b=document.createElement('button'); b.className='akt';
    const ad = DURUM.dil==='en'?o.en:o.tr;
    const rozet = kazanilan>0 ? '⭐'.repeat(Math.min(kazanilan,3)) : '▶️';
    b.innerHTML=`<span class="emoji">${o.emoji}</span><span class="ad">${ad}</span><span class="rozet">${rozet}</span>`;
    b.onclick=()=>oyunBaslat(konu,o.tip);
    kap.appendChild(b);
  });
  goster('s03');
}

// ---- oyun motoru ----
let OYUN={};
function oyunBaslat(konu,tip){
  OYUN={konu,tip,soru:0,toplam:5,dogruSayi:0,kazanilan:0,kartlar:null};
  document.getElementById('oyun-baslik').textContent = (DURUM.dil==='en'?konu.en:konu.tr);
  goster('s04');
  if(tip==='hafiza') hafizaKur();
  else if(tip==='eslestir') esleGetir();
  else soruGetir();
}
function oyundanCik(){ speechSynthesis && speechSynthesis.cancel(); aktiviteListe(OYUN.konu); }
function ilerlemeCiz(){
  const y=(OYUN.soru/OYUN.toplam)*100;
  document.getElementById('ilerleme-dolu').style.width=y+'%';
}
function karistir(a){ return a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]); }

// --- secim / dinle: bir hedef, 4 seçenek ---
function soruGetir(){
  if(OYUN.soru>=OYUN.toplam){ return oyunBitti(); }
  ilerlemeCiz();
  const kel=karistir([...OYUN.konu.kelimeler]);
  const hedef=kel[0];
  const secenekler=karistir([hedef, ...kel.slice(1,4)]);
  OYUN.hedef=hedef;
  const alan=document.getElementById('oyun-alan');
  const dinleModu = OYUN.tip==='dinle';

  const en = DURUM.dil==='en';
  // secim: büyük resim gösterilir, çocuk doğru KELİMEYİ seçer (dokununca kelime seslendirilir)
  // dinle: sadece ses çalar, çocuk doğru RESMİ seçer
  alan.innerHTML = `
    <div class="soru">
      ${ dinleModu
        ? `<button class="ses-btn" id="ses-tekrar">${L().dinleBtn}</button>
           <div class="alt" style="margin-top:12px">${en?'Find what you hear 👇':'Duyduğunu bul 👇'}</div>`
        : `<div class="buyuk">${hedef.e}</div>
           <div class="alt">${en?'What is this? 👇':'Bu ne? 👇'}</div>` }
    </div>
    <div class="secenekler" id="secenekler"></div>`;

  const sk=document.getElementById('secenekler');
  secenekler.forEach(s=>{
    const b=document.createElement('button'); b.className='sec-btn';
    b.innerHTML = dinleModu
      ? `<span class="em">${s.e}</span>`
      : `<span class="lb" style="font-size:22px">${kelimeYazi(s)}</span>`;
    b.onclick=()=>{ if(!dinleModu) kelimeSesle(s); cevapVer(b,s,hedef,()=>soruGetir()); };
    sk.appendChild(b);
  });

  if(dinleModu){
    const t=document.getElementById('ses-tekrar');
    t.onclick=()=>kelimeSesle(hedef);
    setTimeout(()=>kelimeSesle(hedef),400);
  } else {
    setTimeout(()=>sesliSoyle(en?'What is this?':'Bu ne?', en?'en':'tr'),300);
  }
}

// --- eşleştir: üstte kelime, altta emojiler ---
function esleGetir(){
  if(OYUN.soru>=OYUN.toplam){ return oyunBitti(); }
  ilerlemeCiz();
  const kel=karistir([...OYUN.konu.kelimeler]);
  const hedef=kel[0];
  const secenekler=karistir([hedef, ...kel.slice(1,4)]);
  OYUN.hedef=hedef;
  const alan=document.getElementById('oyun-alan');
  alan.innerHTML=`
    <div class="soru">
      <div class="metin">${kelimeYazi(hedef)}</div>
      <div class="alt">${DURUM.dil==='en'?'Find the picture 👇':'Resmini bul 👇'}</div>
    </div>
    <div class="secenekler" id="secenekler"></div>`;
  const sk=document.getElementById('secenekler');
  secenekler.forEach(s=>{
    const b=document.createElement('button'); b.className='sec-btn';
    b.innerHTML=`<span class="em">${s.e}</span>`;
    b.onclick=()=>cevapVer(b,s,hedef,()=>esleGetir());
    sk.appendChild(b);
  });
  setTimeout(()=>kelimeSesle(hedef),300);
}

function cevapVer(btn,secilen,hedef,sonra){
  const dogruMu = secilen===hedef;
  if(OYUN.kilitli) return;
  if(dogruMu){
    OYUN.kilitli=true; // çift dokunmayı engelle
    btn.classList.add('dogru');
    OYUN.dogruSayi++;
    const alkis=L().dogruSes[Math.floor(Math.random()*L().dogruSes.length)];
    setTimeout(()=>sesliSoyle(alkis, DURUM.dil==='en'?'en':'tr'), 500);
    OYUN.soru++;
    setTimeout(()=>{ OYUN.kilitli=false; sonra(); },1300);
  } else {
    btn.classList.add('yanlis');
    sesliSoyle(DURUM.dil==='en'?'Try again':'Tekrar dene', DURUM.dil==='en'?'en':'tr');
    setTimeout(()=>btn.classList.remove('yanlis'),400);
  }
}

// --- hafıza oyunu ---
function hafizaKur(){
  ilerlemeCiz();
  const sec=karistir([...OYUN.konu.kelimeler]).slice(0,4);
  let kartlar=[];
  sec.forEach(k=>{ kartlar.push({k,id:k.en+'a'}); kartlar.push({k,id:k.en+'b'}); });
  kartlar=karistir(kartlar);
  OYUN.kartlar=kartlar; OYUN.acik=[]; OYUN.eslesen=0;
  const alan=document.getElementById('oyun-alan');
  alan.innerHTML=`<div class="soru"><div class="alt">Aynı ikilileri bul 🧠</div></div>
    <div class="hafiza-izgara" id="hizgara"></div>`;
  const iz=document.getElementById('hizgara');
  kartlar.forEach((c,i)=>{
    const b=document.createElement('button'); b.className='h-kart';
    b.innerHTML=`<span class="on">?</span><span class="arka">${c.k.e}</span>`;
    b.dataset.i=i;
    b.onclick=()=>hafizaAc(b,c);
    iz.appendChild(b);
  });
}
function hafizaAc(btn,kart){
  if(btn.classList.contains('acik')||btn.classList.contains('eslesti')) return;
  if(OYUN.acik.length>=2) return;
  btn.classList.add('acik');
  kelimeSesle(kart.k);
  OYUN.acik.push({btn,kart});
  if(OYUN.acik.length===2){
    const [a,b]=OYUN.acik;
    if(a.kart.k===b.kart.k){
      setTimeout(()=>{ a.btn.classList.add('eslesti'); b.btn.classList.add('eslesti');
        a.btn.classList.remove('acik'); b.btn.classList.remove('acik');
        OYUN.acik=[]; OYUN.eslesen++;
        const alkis=L().dogruSes[Math.floor(Math.random()*L().dogruSes.length)];
        sesliSoyle(alkis, DURUM.dil==='en'?'en':'tr');
        document.getElementById('ilerleme-dolu').style.width=(OYUN.eslesen/4*100)+'%';
        if(OYUN.eslesen===4){ OYUN.dogruSayi=5; OYUN.soru=5; setTimeout(oyunBitti,700); }
      },500);
    } else {
      setTimeout(()=>{ a.btn.classList.remove('acik'); b.btn.classList.remove('acik'); OYUN.acik=[]; },800);
    }
  }
}

// --- oyun bitti / ödül ---
function oyunBitti(){
  const kazanilan=3; // tamamlama ödülü
  DURUM.yildiz+=kazanilan;
  const anahtar=OYUN.konu.id+'|'+OYUN.tip;
  DURUM.tamamlanan[anahtar]=Math.max(DURUM.tamamlanan[anahtar]||0, kazanilan);
  kaydet();
  document.getElementById('s08-tebrik').textContent=L().tebrik;
  document.getElementById('s08-kazanilan').textContent=kazanilan;
  const d=document.getElementById('s08-devam'); d.textContent=L().devam;
  d.onclick=()=>aktiviteListe(OYUN.konu);
  goster('s08');
  konfetiAt();
  sesliSoyle(L().tebrik, DURUM.dil==='en'?'en':'tr');
}
function konfetiAt(){
  const emojis=['⭐','🎉','🌟','✨','🎈'];
  for(let i=0;i<24;i++){
    const c=document.createElement('div'); c.className='konfeti';
    c.textContent=emojis[i%emojis.length];
    c.style.left=Math.random()*100+'vw';
    c.style.animationDuration=(1.6+Math.random()*1.4)+'s';
    c.style.animationDelay=(Math.random()*0.4)+'s';
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),3200);
  }
}

// ---- ebeveyn paneli (basit matematik kilidi) ----
let kilitCevap=0;
function ebeveynAc(){
  const a=2+Math.floor(Math.random()*6), b=2+Math.floor(Math.random()*6);
  kilitCevap=a+b;
  const ic=document.getElementById('ebeveyn-ic');
  ic.innerHTML=`
    <div class="kilit-kutu">
      <div>👨‍👩‍👦 Ebeveyn girişi</div>
      <div class="soru-m">${a} + ${b} = ?</div>
      <input class="kilit-giris" id="kilit-giris" type="number" inputmode="numeric" autocomplete="off">
      <br><button class="devam-btn" onclick="kilitDene()">Gir</button>
    </div>`;
  goster('s09');
  setTimeout(()=>document.getElementById('kilit-giris').focus(),200);
}
function kilitDene(){
  const v=parseInt(document.getElementById('kilit-giris').value,10);
  if(v===kilitCevap){ ebeveynPanel(); }
  else { const g=document.getElementById('kilit-giris'); g.value=''; g.style.borderColor='var(--kirmizi)';
    setTimeout(()=>g.style.borderColor='var(--mor)',600); }
}
function ebeveynPanel(){
  const ic=document.getElementById('ebeveyn-ic');
  const toplamOyun=KONULAR.length*OYUNLAR.length;
  const bitenOyun=Object.keys(DURUM.tamamlanan).length;
  // konu bazlı ilerleme
  let konuSatir='';
  KONULAR.forEach(k=>{
    const biten=OYUNLAR.filter(o=>DURUM.tamamlanan[k.id+'|'+o.tip]).length;
    konuSatir+=`<div class="satir"><span>${k.emoji} ${k.tr}</span><span>${biten}/${OYUNLAR.length}</span></div>`;
  });
  ic.innerHTML=`
    <div class="panel-kart">
      <h3>📊 İlerleme</h3>
      <div class="satir"><span>Toplam yıldız</span><span>⭐ ${DURUM.yildiz}</span></div>
      <div class="satir"><span>Tamamlanan oyun</span><span>${bitenOyun}/${toplamOyun}</span></div>
    </div>
    <div class="panel-kart">
      <h3>📚 Konulara göre</h3>
      ${konuSatir}
    </div>
    <div class="panel-kart">
      <h3>🌍 Dil</h3>
      <div class="anahtar" id="dil-anahtar">
        <button data-d="tr">🇹🇷 Türkçe</button>
        <button data-d="en">🇬🇧 English</button>
        <button data-d="ikisi">🌍 İkisi</button>
      </div>
    </div>
    <div class="panel-kart">
      <h3>🔄 Sıfırla</h3>
      <div class="satir"><span>Tüm ilerlemeyi sıfırla</span>
      <button class="anahtar" style="background:var(--kirmizi);color:#fff;border:none;border-radius:14px;padding:10px 16px;font-weight:800;cursor:pointer" onclick="sifirla()">Sıfırla</button></div>
    </div>`;
  const an=document.getElementById('dil-anahtar');
  an.querySelectorAll('button').forEach(b=>{
    if(b.dataset.d===DURUM.dil) b.classList.add('secili');
    b.onclick=()=>{ DURUM.dil=b.dataset.d; kaydet();
      an.querySelectorAll('button').forEach(x=>x.classList.remove('secili')); b.classList.add('secili'); };
  });
}
function sifirla(){
  if(confirm('Mete\'nin tüm ilerlemesi silinsin mi?')){
    DURUM={dil:DURUM.dil,yildiz:0,tamamlanan:{}}; kaydet(); ebeveynPanel();
  }
}

// başlangıç
seslenHazir();
if('speechSynthesis'in window){ speechSynthesis.onvoiceschanged=seslenHazir; }
// açılışta önceki dili uygula
document.getElementById('s01-ikisi').textContent='İkisi birden';
