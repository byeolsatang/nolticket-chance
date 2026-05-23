(function(){
  var APP_SHARE_URL = 'https://byeolsatang.github.io/nolticket-chance/';
  var SHARE_TEXT = 'キャンセル拾いチャンスメーター｜キャンセル料フェーズから戻り席チェックタイミングを可視化するツール';
  var X_VIA_ACCOUNT = 'byeolsatang0309';
  var THREADS_ACCOUNT = '@byeolsatang__';
  var INSTAGRAM_URL = 'https://www.instagram.com/byeolsatang__/';

  function addStyle(){
    if (document.getElementById('share-section-style')) return;
    var style = document.createElement('style');
    style.id = 'share-section-style';
    style.textContent = `
      .share-card{width:100%;max-width:480px;background:rgba(18,18,26,.52);border:1px solid rgba(74,240,196,.14);border-radius:14px;padding:10px 12px;margin:-10px 0 22px;color:var(--text,#f0eeff);}
      .page .share-card{max-width:none;margin:18px 0;}
      .profile-card + .share-card{margin-top:12px;}
      .share-main{display:flex;align-items:center;justify-content:space-between;gap:10px;}
      .share-copy-block{min-width:0;flex:1;}
      .share-kicker{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:2px;color:var(--accent3,#4af0c4);text-transform:uppercase;margin-bottom:1px;font-weight:800;opacity:.78;}
      .share-title{font-size:12px;font-weight:800;line-height:1.35;color:var(--muted,#6b6b8a);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
      .share-text{display:none;}
      .share-text a{color:var(--accent3,#4af0c4);font-weight:800;text-decoration:none;}
      .share-actions{display:flex;align-items:center;gap:6px;flex-shrink:0;}
      .share-actions a,.share-actions button{appearance:none;width:34px;height:34px;display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(74,240,196,.24);background:rgba(74,240,196,.06);color:var(--accent3,#4af0c4);border-radius:999px;padding:0;font-size:12px;font-weight:900;text-decoration:none;cursor:pointer;font-family:'Space Mono','Noto Sans JP',system-ui,sans-serif;line-height:1;}
      .share-actions a:first-child{border-color:rgba(255,60,110,.28);background:rgba(255,60,110,.07);color:var(--accent,#ff3c6e);}
      .share-actions button{font-size:14px;}
      .share-copy-message{min-height:0;margin-top:5px;font-size:10px;color:var(--accent2,#ffb547);line-height:1.4;}
      @media(max-width:520px){.share-card{padding:9px 10px;margin:-10px 0 20px}.share-title{font-size:11px}.share-actions{gap:5px}.share-actions a,.share-actions button{width:32px;height:32px;font-size:11px}.share-actions button{font-size:13px}}
    `;
    document.head.appendChild(style);
  }

  function buildShareCard(kind){
    var isReadme = kind === 'readme';
    var title = isReadme ? 'この説明ページをシェア' : 'このアプリをシェア';
    var text = isReadme
      ? '計算ロジック説明ページをシェアできます。'
      : 'キャンセル料フェーズから、戻り席チェックの目安を見られるページです。';
    var xUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(SHARE_TEXT) + '&url=' + encodeURIComponent(APP_SHARE_URL) + '&via=' + encodeURIComponent(X_VIA_ACCOUNT);
    var threadsUrl = 'https://www.threads.com/intent/post?text=' + encodeURIComponent(SHARE_TEXT + ' ' + APP_SHARE_URL + ' ' + THREADS_ACCOUNT);
    var card = document.createElement('div');
    card.className = 'share-card';
    card.id = isReadme ? 'readme-share-section' : (kind === 'profile' ? 'profile-share-section' : 'app-share-section');
    card.innerHTML = '<div class="share-main"><div class="share-copy-block"><div class="share-kicker">Share</div><div class="share-title">'+title+'</div><p class="share-text">'+text+' 合言葉は <a href="'+INSTAGRAM_URL+'" target="_blank" rel="noopener noreferrer">Instagramストーリーズ</a> で定期配信しています。</p></div><div class="share-actions"><a href="'+xUrl+'" target="_blank" rel="noopener noreferrer" aria-label="Xでシェア" title="Xでシェア">𝕏</a><a href="'+threadsUrl+'" target="_blank" rel="noopener noreferrer" aria-label="Threadsでシェア" title="Threadsでシェア">＠</a><button type="button" class="share-copy" aria-label="リンクをコピー" title="リンクをコピー">⛓</button></div></div><div class="share-copy-message" aria-live="polite"></div>';
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

    if (!document.getElementById('app-share-section')) {
      var actionButton = document.querySelector('button.btn');
      if (actionButton && actionButton.parentNode) actionButton.parentNode.insertBefore(buildShareCard('app'), actionButton.nextSibling);
    }

    if (!document.getElementById('profile-share-section')) {
      var profile = document.querySelector('.profile-card');
      if (profile && profile.parentNode) profile.parentNode.insertBefore(buildShareCard('profile'), profile.nextSibling);
    }
  }

  window.addEventListener('DOMContentLoaded', function(){ setTimeout(insertShareSections, 500); });
  window.addEventListener('load', function(){ setTimeout(insertShareSections, 500); });
  document.addEventListener('click', function(){ setTimeout(insertShareSections, 800); });
})();
