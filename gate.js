(function(){
  var GATE_PASSPHRASE = 'byeolsatang';
  var GATE_STORAGE_KEY = 'nolticketChanceGatePassedV1';
  var INSTAGRAM_URL = 'https://www.instagram.com/byeolsatang__/';
  var INSTAGRAM_LABEL = 'Instagram @byeolsatang__';

  document.documentElement.classList.add('gate-loading');

  var style = document.createElement('style');
  style.textContent = `
    html.gate-loading body{visibility:hidden;}
    #gate-screen{width:100%;min-height:calc(100vh - 92px);display:flex;align-items:center;justify-content:center;padding:32px 16px;color:var(--text,#f0eeff);}
    #gate-protected-content{width:100%;}
    #gate-protected-content[hidden]{display:none!important;}
    .gate-card{width:100%;max-width:480px;background:linear-gradient(135deg,rgba(255,60,110,.12),rgba(74,240,196,.06)),var(--surface,#12121a);border:1px solid var(--border,#1e1e2e);border-radius:24px;padding:30px 22px;box-shadow:0 24px 80px rgba(0,0,0,.28);font-family:'Noto Sans JP',system-ui,sans-serif;}
    .gate-label{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:4px;color:var(--accent,#ff3c6e);text-transform:uppercase;margin-bottom:12px;}
    .gate-title{font-size:clamp(28px,7vw,38px);font-weight:900;line-height:1.18;letter-spacing:-1px;margin-bottom:12px;color:var(--text,#f0eeff);}
    .gate-title span{color:var(--accent,#ff3c6e);}
    .gate-lead{font-size:13px;color:var(--muted,#6b6b8a);line-height:1.8;margin:0 0 20px;}
    .gate-follow-box{background:rgba(74,240,196,.06);border:1px solid rgba(74,240,196,.22);border-radius:14px;padding:13px 14px;margin:0 0 18px;color:var(--text,#f0eeff);}
    .gate-follow-title{font-family:'Space Mono',monospace;font-size:11px;font-weight:800;color:var(--accent3,#4af0c4);letter-spacing:.16em;margin-bottom:6px;text-transform:uppercase;}
    .gate-follow-text{font-size:12px;line-height:1.7;color:var(--muted,#6b6b8a);margin:0;}
    .gate-follow-link{display:inline-block;margin-top:9px;color:var(--accent3,#4af0c4);font-size:12px;font-weight:800;text-decoration:none;}
    .gate-input-wrap{position:relative;}
    .gate-input-wrap label{font-size:12px;color:var(--muted,#6b6b8a);margin-bottom:4px;display:block;}
    .gate-input{box-sizing:border-box;width:100%;min-height:56px;background:var(--bg,#0a0a0f);border:1px solid var(--border,#1e1e2e);border-radius:12px;color:var(--text,#f0eeff);font-size:16px;font-family:'Noto Sans JP',system-ui,sans-serif;padding:14px 16px;outline:none;}
    .gate-input:focus{border-color:var(--accent,#ff3c6e);}
    .gate-btn{width:100%;margin-top:12px;padding:15px 16px;background:var(--accent,#ff3c6e);color:#fff;border:none;border-radius:12px;font-weight:800;font-size:15px;letter-spacing:.08em;cursor:pointer;}
    .gate-btn:hover{opacity:.85;}
    .gate-error{min-height:20px;margin-top:10px;color:var(--accent2,#ffb547);font-size:12px;line-height:1.6;}
    .gate-note{margin:16px 0 0;padding-top:16px;border-top:1px solid var(--border,#1e1e2e);font-size:11px;line-height:1.7;color:var(--muted,#6b6b8a);}
    #page-profile-card{width:100%;max-width:480px;margin:18px auto 0;}
    .gate-explain-list{margin-top:12px;}
    .gate-explain-list li{margin:6px 0;}
    .site-copyright{width:100%;max-width:480px;margin:14px auto 0;padding-top:12px;border-top:1px solid var(--border,#1e1e2e);font-family:'Space Mono',monospace;font-size:10px;color:var(--muted,#6b6b8a);line-height:1.6;text-align:center;}
    @media(max-width:520px){#gate-screen{min-height:calc(100vh - 84px);padding:24px 12px}.gate-card{padding:28px 20px}}
  `;
  document.head.appendChild(style);

  function normalizePass(value){
    return String(value || '').trim().toLowerCase();
  }

  function hasPassed(){
    try { return localStorage.getItem(GATE_STORAGE_KEY) === '1'; }
    catch(e) { return false; }
  }

  function savePassed(){
    try { localStorage.setItem(GATE_STORAGE_KEY, '1'); }
    catch(e) {}
  }

  function unlock(){
    var input = document.getElementById('gate-pass');
    var error = document.getElementById('gate-error');
    if (!input) return;

    if (normalizePass(input.value) === normalizePass(GATE_PASSPHRASE)) {
      savePassed();
      showProtectedContent();
      return;
    }

    if (error) error.textContent = '合言葉が違うようです。Instagramストーリーズの最新案内を確認してください。';
    input.focus();
    input.select();
  }

  function showProtectedContent(){
    var gate = document.getElementById('gate-screen');
    var protectedContent = document.getElementById('gate-protected-content');
    if (gate) gate.remove();
    if (protectedContent) protectedContent.hidden = false;
    document.documentElement.classList.remove('gate-loading');
    enhanceProtectedContent();
  }

  function buildGate(){
    if (hasPassed()) {
      document.documentElement.classList.remove('gate-loading');
      enhanceProtectedContent();
      return;
    }

    var body = document.body;
    var protectedContent = document.createElement('div');
    protectedContent.id = 'gate-protected-content';
    protectedContent.hidden = true;

    while (body.firstChild) {
      protectedContent.appendChild(body.firstChild);
    }

    var gate = document.createElement('div');
    gate.id = 'gate-screen';
    gate.innerHTML = '<div class="gate-card"><div class="gate-label">Limited Access</div><div class="gate-title">合言葉の<br><span>のれん</span></div><p class="gate-lead">このページは、キャンセル料フェーズを観察するための限定公開メモです。合言葉を入力すると中に入れます。</p><div class="gate-follow-box"><div class="gate-follow-title">FOLLOW ME</div><p class="gate-follow-text">合言葉は定期的に変更します。最新の合言葉は Instagram ストーリーズで配信しています。</p><a class="gate-follow-link" href="'+INSTAGRAM_URL+'" target="_blank" rel="noopener noreferrer">'+INSTAGRAM_LABEL+' をフォローする ↗</a></div><div class="gate-input-wrap"><label for="gate-pass">合言葉</label><input class="gate-input" type="text" id="gate-pass" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" inputmode="text" lang="ja" placeholder="合言葉を入力"></div><button class="gate-btn" type="button" id="gate-submit">入室する</button><div class="gate-error" id="gate-error" aria-live="polite"></div><p class="gate-note">※これはURLだけでそのまま使われることを避けるための軽い入口です。強いセキュリティではありません。</p></div>';

    body.appendChild(gate);
    body.appendChild(protectedContent);

    var button = document.getElementById('gate-submit');
    var input = document.getElementById('gate-pass');
    if (button) button.addEventListener('click', unlock);
    if (input) {
      input.addEventListener('keydown', function(e){ if (e.key === 'Enter') unlock(); });
      setTimeout(function(){ input.focus(); }, 250);
    }

    document.documentElement.classList.remove('gate-loading');
  }

  function enhanceProtectedContent(){
    overrideProfileCard();
    insertPersistentProfileFooter();
    insertReadmeGateExplanation();
    loadShareScript();
  }

  function loadShareScript(){
    if (document.getElementById('share-script')) return;
    var script = document.createElement('script');
    script.id = 'share-script';
    script.src = './share.js';
    script.defer = true;
    document.body.appendChild(script);
  }

  function createProfileCard(){
    var card = document.createElement('div');
    card.className = 'profile-card';
    card.id = 'page-profile-card';
    card.innerHTML = '<div class="profile-inner"><div class="profile-avatar"><img src="./image/img-profile.jpg" alt="kira profile"></div><div class="profile-body"><div class="profile-kicker">Created by</div><div class="profile-name">Kira</div><a class="profile-link" href="'+INSTAGRAM_URL+'" target="_blank" rel="noopener noreferrer">'+INSTAGRAM_LABEL+' ↗</a></div></div>';
    return card;
  }

  function insertPersistentProfileFooter(){
    if (/readme\.html$/i.test(location.pathname)) return;
    if (document.getElementById('page-profile-card')) return;

    var result = document.getElementById('result');
    if (!result || !result.parentNode) return;

    var profile = createProfileCard();
    result.parentNode.insertBefore(profile, result.nextSibling);

    var copyright = document.createElement('div');
    copyright.className = 'site-copyright';
    copyright.id = 'site-copyright';
    copyright.textContent = '© byeolsatang. Personal observation tool. Not affiliated with NOL Ticket.';
    profile.parentNode.insertBefore(copyright, profile.nextSibling);
  }

  function overrideProfileCard(){
    if (typeof window.buildProfileCard !== 'function') return;
    if (window.__profileCardEnhanced) return;
    window.__profileCardEnhanced = true;

    window.buildProfileCard = function(){
      return document.createTextNode('');
    };
  }

  function insertReadmeGateExplanation(){
    if (!/readme\.html$/i.test(location.pathname)) return;
    if (document.getElementById('gate-explanation-section')) return;

    var footer = document.querySelector('.footer');
    var page = document.querySelector('.page');
    if (!page) return;

    var section = document.createElement('section');
    section.id = 'gate-explanation-section';
    section.innerHTML = '<h2><span class="num">13</span>合言葉ののれんについて</h2><p>このページとアプリ本体には、簡易的な「合言葉ののれん」を設置しています。</p><p>これは強いセキュリティを目的としたものではありません。URLにたどり着いただけの人が、そのまま内容を読んだり使ったりできる状態を避けるための、軽い入口です。</p><ul class="muted gate-explain-list"><li>合言葉は定期的に変更します。</li><li>最新の合言葉は Instagram ストーリーズで配信しています。</li><li>ツールを使いたい方は、<a href="'+INSTAGRAM_URL+'" target="_blank" rel="noopener noreferrer" style="color:var(--accent3);font-weight:800;text-decoration:none;">'+INSTAGRAM_LABEL+'</a> をフォローして最新案内を確認してください。</li></ul><div class="note">この「のれん」は、完全に隠すための鍵ではなく、発信を見てくれている人に向けて入口を少しだけ絞るための仕組みです。</div>';

    if (footer) {
      page.insertBefore(section, footer);
    } else {
      page.appendChild(section);
    }
  }

  window.NolTicketGate = {
    unlock: unlock,
    reset: function(){ try { localStorage.removeItem(GATE_STORAGE_KEY); } catch(e) {} location.reload(); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildGate);
  } else {
    buildGate();
  }
})();
