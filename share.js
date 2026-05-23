(function(){
  var APP_SHARE_URL = 'https://byeolsatang.github.io/nolticket-chance/';
  var SHARE_TEXT = 'キャンセル拾いチャンスメーター｜キャンセル料フェーズから戻り席チェックタイミングを可視化するツール';

  function addStyle(){
    if (document.getElementById('share-section-style')) return;
    var style = document.createElement('style');
    style.id = 'share-section-style';
    style.textContent = `
      .share-card{width:100%;max-width:480px;background:linear-gradient(135deg,rgba(74,240,196,.08),rgba(255,60,110,.08)),var(--surface,#12121a);border:1px solid var(--border,#1e1e2e);border-radius:16px;padding:18px 16px;margin:0 0 20px;color:var(--text,#f0eeff);}
      .page .share-card{max-width:none;margin:20px 0;}
      .share-kicker{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:3px;color:var(--accent3,#4af0c4);text-transform:uppercase;margin-bottom:8px;font-weight:800;}
      .share-title{font-size:18px;font-weight:900;line-height:1.45;margin-bottom:6px;}
      .share-text{font-size:12px;line-height:1.75;color:var(--muted,#6b6b8a);margin:0 0 13px;}
      .share-actions{display:flex;gap:8px;flex-wrap:wrap;}
      .share-actions a,.share-actions button{appearance:none;border:1px solid rgba(74,240,196,.34);background:rgba(74,240,196,.07);color:var(--accent3,#4af0c4);border-radius:999px;padding:9px 12px;font-size:12px;font-weight:800;text-decoration:none;cursor:pointer;font-family:'Noto Sans JP',system-ui,sans-serif;line-height:1.2;}
      .share-actions a:first-child{border-color:rgba(255,60,110,.36);background:rgba(255,60,110,.08);color:var(--accent,#ff3c6e);}
      .share-copy-message{min-height:18px;margin-top:8px;font-size:11px;color:var(--accent2,#ffb547);line-height:1.6;}
      @media(max-width:520px){.share-card{padding:16px 14px}.share-actions{display:grid;grid-template-columns:1fr 1fr}.share-actions button{grid-column:1 / -1}}
    `;
    document.head.appendChild(style);
  }

  function buildShareCard(kind){
    var title = kind === 'readme' ? 'この説明ページをシェアする' : 'このアプリをシェアする';
    var text = kind === 'readme'
      ? '合言葉ののれん付きで、計算ロジック説明ページも共有できます。'
      : '合言葉ののれん付きなので、必要な人に気軽にシェアできます。';
    var xUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(SHARE_TEXT) + '&url=' + encodeURIComponent(APP_SHARE_URL);
    var threadsUrl = 'https://www.threads.com/intent/post?text=' + encodeURIComponent(SHARE_TEXT + ' ' + APP_SHARE_URL);
    var card = document.createElement('div');
    card.className = 'share-card';
    card.id = kind === 'readme' ? 'readme-share-section' : 'app-share-section';
    card.innerHTML = '<div class="share-kicker">Share</div><div class="share-title">'+title+'</div><p class="share-text">'+text+' 合言葉はInstagramストーリーズで定期配信しています。</p><div class="share-actions"><a href="'+xUrl+'" target="_blank" rel="noopener noreferrer">Xでシェア</a><a href="'+threadsUrl+'" target="_blank" rel="noopener noreferrer">Threadsでシェア</a><button type="button" class="share-copy">リンクをコピー</button></div><div class="share-copy-message" aria-live="polite"></div>';
    card.querySelector('.share-copy').addEventListener('click', function(){ copyLink(APP_SHARE_URL, card.querySelector('.share-copy-message')); });
    return card;
  }

  function copyLink(url, messageEl){
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function(){ messageEl.textContent = 'リンクをコピーしました。'; }).catch(function(){ messageEl.textContent = 'ブラウザのURLをコピーしてください。'; });
    } else {
      messageEl.textContent = 'ブラウザのURLをコピーしてください。';
    }
  }

  function insertShareSections(){
    addStyle();
    if (/readme\.html$/i.test(location.pathname)) {
      if (document.getElementById('readme-share-section')) return;
      var hero = document.querySelector('.hero');
      if (hero && hero.parentNode) hero.parentNode.insertBefore(buildShareCard('readme'), hero.nextSibling);
      return;
    }
    if (document.getElementById('app-share-section')) return;
    var firstCard = document.querySelector('body > .card, #gate-protected-content > .card');
    if (firstCard && firstCard.parentNode) firstCard.parentNode.insertBefore(buildShareCard('app'), firstCard);
  }

  window.addEventListener('DOMContentLoaded', function(){ setTimeout(insertShareSections, 500); });
  window.addEventListener('load', function(){ setTimeout(insertShareSections, 500); });
})();
