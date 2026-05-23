(function(){
  var GATE_PASSPHRASE = 'byeolsatang';
  var GATE_STORAGE_KEY = 'nolticketChanceGatePassedV1';

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
    .gate-input-wrap{position:relative;}
    .gate-input-wrap label{font-size:12px;color:var(--muted,#6b6b8a);margin-bottom:4px;display:block;}
    .gate-input{box-sizing:border-box;width:100%;min-height:56px;background:var(--bg,#0a0a0f);border:1px solid var(--border,#1e1e2e);border-radius:12px;color:var(--text,#f0eeff);font-size:16px;font-family:'Noto Sans JP',system-ui,sans-serif;padding:14px 16px;outline:none;}
    .gate-input:focus{border-color:var(--accent,#ff3c6e);}
    .gate-btn{width:100%;margin-top:12px;padding:15px 16px;background:var(--accent,#ff3c6e);color:#fff;border:none;border-radius:12px;font-weight:800;font-size:15px;letter-spacing:.08em;cursor:pointer;}
    .gate-btn:hover{opacity:.85;}
    .gate-error{min-height:20px;margin-top:10px;color:var(--accent2,#ffb547);font-size:12px;line-height:1.6;}
    .gate-note{margin:16px 0 0;padding-top:16px;border-top:1px solid var(--border,#1e1e2e);font-size:11px;line-height:1.7;color:var(--muted,#6b6b8a);}
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

    if (error) error.textContent = '合言葉が違うようです。発信元の案内をもう一度確認してください。';
    input.focus();
    input.select();
  }

  function showProtectedContent(){
    var gate = document.getElementById('gate-screen');
    var protectedContent = document.getElementById('gate-protected-content');
    if (gate) gate.remove();
    if (protectedContent) protectedContent.hidden = false;
    document.documentElement.classList.remove('gate-loading');
  }

  function buildGate(){
    if (hasPassed()) {
      document.documentElement.classList.remove('gate-loading');
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
    gate.innerHTML = '<div class="gate-card"><div class="gate-label">Limited Access</div><div class="gate-title">合言葉の<br><span>のれん</span></div><p class="gate-lead">このページは、キャンセル料フェーズを観察するための限定公開メモです。合言葉を入力すると中に入れます。</p><div class="gate-input-wrap"><label for="gate-pass">合言葉</label><input class="gate-input" type="password" id="gate-pass" autocomplete="current-password" placeholder="合言葉を入力"></div><button class="gate-btn" type="button" id="gate-submit">入室する</button><div class="gate-error" id="gate-error" aria-live="polite"></div><p class="gate-note">※これはURLだけでそのまま使われることを避けるための軽い入口です。強いセキュリティではありません。</p></div>';

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
