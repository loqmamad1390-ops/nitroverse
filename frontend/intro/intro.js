document.addEventListener("DOMContentLoaded", ()=>{

  const elQuote = document.querySelector("#quoteText");
  const elEnter = document.querySelector("#enterBtn");
  const elSkip  = document.querySelector("#skipBtn");
  const bgm     = document.getElementById("bgm");

  const lines = [
    "خوش آمدی آینده‌ساز ایران...",
    "اینجا آغاز یک مسیر معمولی نیست.",
    "اینجا جایی است که ذهن تو قدرت می‌گیرد.",
    "به نیتروورس خوش آمدی."
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let typing = false;

  function startMusic(){
    if(!bgm) return;
    if(bgm.dataset.started) return;
    bgm.dataset.started = "1";
    bgm.src = "assets/intro_epic.wav";
    bgm.volume = 0.75;
    bgm.play().catch(()=>{});
  }

  function typeNext(){
    if(lineIndex >= lines.length){
      elEnter.classList.remove("hidden");
      return;
    }

    if(charIndex < lines[lineIndex].length){
      elQuote.textContent += lines[lineIndex][charIndex++];
      setTimeout(typeNext, 24);
    }else{
      setTimeout(()=>{
        elQuote.textContent = "";
        lineIndex++;
        charIndex = 0;
        typeNext();
      }, 800);
    }
  }

  function startIntro(){
    if(typing) return;
    typing = true;
    startMusic();
    typeNext();
  }

  function finish(){
    if(bgm){
      bgm.pause();
      bgm.currentTime = 0;
    }
    window.location.href = "../index.html";
  }

  document.addEventListener("pointerdown", startIntro, {once:true});
  document.addEventListener("keydown", startIntro, {once:true});

  elEnter?.addEventListener("click", finish);
  elSkip?.addEventListener("click", finish);

});