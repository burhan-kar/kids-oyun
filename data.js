// İçerik: konular ve kelimeler. Her kelime emoji + TR + EN.
// Lingokids'ten HİÇBİR içerik alınmadı; tamamen kendi listemiz.
const KONULAR = [
  { id:'hayvanlar', tr:'Hayvanlar', en:'Animals', emoji:'🐶', renk:'#ff6fa5',
    kelimeler:[
      {e:'🐶',tr:'köpek',en:'dog'},{e:'🐱',tr:'kedi',en:'cat'},{e:'🐸',tr:'kurbağa',en:'frog'},
      {e:'🦁',tr:'aslan',en:'lion'},{e:'🐘',tr:'fil',en:'elephant'},{e:'🐵',tr:'maymun',en:'monkey'},
      {e:'🐧',tr:'penguen',en:'penguin'},{e:'🐝',tr:'arı',en:'bee'},{e:'🐢',tr:'kaplumbağa',en:'turtle'},
      {e:'🦊',tr:'tilki',en:'fox'},{e:'🐰',tr:'tavşan',en:'rabbit'},{e:'🐄',tr:'inek',en:'cow'}
    ]},
  { id:'renkler', tr:'Renkler', en:'Colors', emoji:'🎨', renk:'#2bc7d4',
    kelimeler:[
      {e:'🔴',tr:'kırmızı',en:'red'},{e:'🔵',tr:'mavi',en:'blue'},{e:'🟡',tr:'sarı',en:'yellow'},
      {e:'🟢',tr:'yeşil',en:'green'},{e:'🟠',tr:'turuncu',en:'orange'},{e:'🟣',tr:'mor',en:'purple'},
      {e:'⚫',tr:'siyah',en:'black'},{e:'⚪',tr:'beyaz',en:'white'},{e:'🟤',tr:'kahverengi',en:'brown'},
      {e:'🩷',tr:'pembe',en:'pink'}
    ]},
  { id:'sayilar', tr:'Sayılar', en:'Numbers', emoji:'🔢', renk:'#ff9a3c',
    kelimeler:[
      {e:'1️⃣',tr:'bir',en:'one'},{e:'2️⃣',tr:'iki',en:'two'},{e:'3️⃣',tr:'üç',en:'three'},
      {e:'4️⃣',tr:'dört',en:'four'},{e:'5️⃣',tr:'beş',en:'five'},{e:'6️⃣',tr:'altı',en:'six'},
      {e:'7️⃣',tr:'yedi',en:'seven'},{e:'8️⃣',tr:'sekiz',en:'eight'},{e:'9️⃣',tr:'dokuz',en:'nine'},
      {e:'🔟',tr:'on',en:'ten'}
    ]},
  { id:'yiyecekler', tr:'Yiyecekler', en:'Food', emoji:'🍎', renk:'#3ec96b',
    kelimeler:[
      {e:'🍎',tr:'elma',en:'apple'},{e:'🍌',tr:'muz',en:'banana'},{e:'🍓',tr:'çilek',en:'strawberry'},
      {e:'🍉',tr:'karpuz',en:'watermelon'},{e:'🥕',tr:'havuç',en:'carrot'},{e:'🍞',tr:'ekmek',en:'bread'},
      {e:'🧀',tr:'peynir',en:'cheese'},{e:'🥛',tr:'süt',en:'milk'},{e:'🍪',tr:'kurabiye',en:'cookie'},
      {e:'🍇',tr:'üzüm',en:'grapes'}
    ]},
  { id:'aile', tr:'Aile', en:'Family', emoji:'👨‍👩‍👧', renk:'#5b4bdb',
    kelimeler:[
      {e:'👩',tr:'anne',en:'mother'},{e:'👨',tr:'baba',en:'father'},{e:'👶',tr:'bebek',en:'baby'},
      {e:'👧',tr:'kız',en:'girl'},{e:'👦',tr:'oğlan',en:'boy'},{e:'👵',tr:'babaanne',en:'grandma'},
      {e:'👴',tr:'dede',en:'grandpa'},{e:'🧒',tr:'çocuk',en:'child'}
    ]},
  { id:'tasitlar', tr:'Taşıtlar', en:'Vehicles', emoji:'🚗', renk:'#ff5c5c',
    kelimeler:[
      {e:'🚗',tr:'araba',en:'car'},{e:'🚌',tr:'otobüs',en:'bus'},{e:'✈️',tr:'uçak',en:'plane'},
      {e:'🚂',tr:'tren',en:'train'},{e:'🚲',tr:'bisiklet',en:'bike'},{e:'🚁',tr:'helikopter',en:'helicopter'},
      {e:'🚢',tr:'gemi',en:'ship'},{e:'🚜',tr:'traktör',en:'tractor'},{e:'🚑',tr:'ambulans',en:'ambulance'},
      {e:'🚒',tr:'itfaiye',en:'fire truck'}
    ]}
];

// Her konuda hangi oyunlar olacak
const OYUNLAR = [
  { tip:'secim',    tr:'Doğru olanı bul',  en:'Find it',        emoji:'👉' },
  { tip:'eslestir', tr:'Eşleştir',          en:'Match',          emoji:'🔗' },
  { tip:'dinle',    tr:'Dinle ve bul',      en:'Listen & find',  emoji:'🔊' },
  { tip:'hafiza',   tr:'Hafıza oyunu',      en:'Memory',         emoji:'🧠' }
];
