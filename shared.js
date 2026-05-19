function initNav(){
  const btn=document.getElementById('hamburger');
  const menu=document.getElementById('mobile-menu');
  if(!btn||!menu)return;
  btn.addEventListener('click',()=>{
    const open=menu.classList.toggle('open');
    btn.classList.toggle('active',open);
    btn.setAttribute('aria-expanded',open);
  });
  menu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click',()=>{
      menu.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded',false);
    });
  });
  document.addEventListener('click',e=>{
    if(!btn.contains(e.target)&&!menu.contains(e.target)){
      menu.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded',false);
    }
  });
}

function initReveal(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
  },{threshold:0.08});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}

function initTilt(sel){
  document.querySelectorAll(sel).forEach(card=>{
    const inner=card.querySelector('[data-tilt]');
    if(!inner)return;
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-0.5;
      const y=(e.clientY-r.top)/r.height-0.5;
      inner.style.transform=`perspective(700px) rotateX(${-y*14}deg) rotateY(${x*14}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave',()=>{
      inner.style.transform='perspective(700px) rotateX(3deg) rotateY(-1.5deg)';
    });
  });
}

function initFlip(sel){
  document.querySelectorAll(sel).forEach(c=>c.addEventListener('click',()=>c.classList.toggle('flipped')));
}

function setActiveLink(){
  const page=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-link').forEach(a=>{
    if(a.getAttribute('href')===page||(page===''&&a.getAttribute('href')==='index.html'))
      a.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  initNav();
  initReveal();
  setActiveLink();
});
