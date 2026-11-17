// A small spring playground; all motion stays inside the opening composition.
(()=>{
 const hero=document.querySelector('.hero'),stage=document.querySelector('.geometry'),ball=stage.querySelector('.circle'),bar=stage.querySelector('.bar'),half=stage.querySelector('.half');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover: hover) and (pointer: fine)');
 const hint=document.createElement('span');hint.className='interaction-hint';hint.textContent='拖动圆形，让灵感动起来 ↗';stage.append(hint);
 let x=0,y=0,vx=0,vy=0,tx=0,ty=0,px=0,py=0,drag=null,frame=0,visible=true;
 const limit=(n,m)=>Math.max(-m,Math.min(m,n));
 function paint(){ball.style.transform=`translate3d(${x}px,${y}px,0) rotate(${x*.14}deg)`;bar.style.transform=`translate3d(${-px*16}px,${-py*10}px,0) rotate(${-3+px*5}deg)`;half.style.transform=`translate3d(${px*12}px,${py*17}px,0) rotate(${px*7}deg)`;}
 function tick(){frame=0;if(!visible||reduced.matches)return;const bx=drag?tx:px*24,by=drag?ty:py*20;vx=(vx+(bx-x)*.075)*.79;vy=(vy+(by-y)*.075)*.79;x+=vx;y+=vy;paint();if(Math.abs(vx)+Math.abs(vy)+Math.abs(bx-x)+Math.abs(by-y)>.06)frame=requestAnimationFrame(tick);}
 function wake(){if(!frame&&!reduced.matches&&visible)frame=requestAnimationFrame(tick)}
 function reset(){px=py=0;wake()}
 hero.addEventListener('pointermove',e=>{if(!fine.matches||drag||reduced.matches)return;const r=hero.getBoundingClientRect();px=limit((e.clientX-r.left)/r.width*2-1,1);py=limit((e.clientY-r.top)/r.height*2-1,1);wake()});
 hero.addEventListener('pointerleave',()=>{if(!drag)reset()});
 function ripple(cx,cy){if(reduced.matches)return;const r=hero.getBoundingClientRect(),ring=document.createElement('i');ring.className='hero-ripple';ring.style.left=`${cx-r.left}px`;ring.style.top=`${cy-r.top}px`;hero.append(ring);ring.addEventListener('animationend',()=>ring.remove(),{once:true});}
 ball.addEventListener('pointerdown',e=>{if(e.button!==0||reduced.matches)return;drag={id:e.pointerId,startX:e.clientX,startY:e.clientY,x,y};tx=x;ty=y;ball.setPointerCapture(e.pointerId);ball.classList.add('dragging');hint.textContent='松开，看看灵感的回弹。';wake()});
 ball.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;tx=limit(drag.x+e.clientX-drag.startX,90);ty=limit(drag.y+e.clientY-drag.startY,70);wake()});
 function release(e){if(!drag||drag.id!==e.pointerId)return;drag=null;ball.classList.remove('dragging');hint.textContent='拖动圆形，让灵感动起来 ↗';ripple(e.clientX,e.clientY);reset();}
 ball.addEventListener('pointerup',release);ball.addEventListener('pointercancel',release);ball.addEventListener('lostpointercapture',()=>{if(drag){drag=null;ball.classList.remove('dragging');reset()}});
 ball.addEventListener('click',e=>{if(e.detail===0&&!reduced.matches){const r=ball.getBoundingClientRect();vy=-13;wake();ripple(r.left+r.width/2,r.top+r.height/2)}});
 hero.addEventListener('click',e=>{if(e.target.closest('a,button'))return;ripple(e.clientX,e.clientY);if(!reduced.matches){vx+=px*6;vy-=5;wake()}});
 new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)wake();else if(frame){cancelAnimationFrame(frame);frame=0}},{threshold:0}).observe(hero);
 reduced.addEventListener('change',()=>{if(frame)cancelAnimationFrame(frame);frame=0;drag=null;x=y=vx=vy=px=py=0;ball.classList.remove('dragging');paint()});
})();
