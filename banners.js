(()=>{
  const dialog=document.querySelector('#bannerDialog'),viewer=document.querySelector('#bannerViewer');
  const rail=dialog.querySelector('.banner-rail'),background=dialog.querySelector('.banner-backdrop');
  let items=[],selection=[],index=0,filter='全部',trigger;
  const number=i=>String(i+1).padStart(2,'0');
  const asset=(p,thumb=false)=>`assets/banners/${p.slug}${thumb?'-thumb':''}.webp`;
  function renderRail(){
    rail.replaceChildren();
    selection.filter(i=>i!==index).forEach(i=>{
      const p=items[i],button=document.createElement('button');button.className='banner-card';button.setAttribute('aria-label',`选择 Banner ${number(i)}：${p.title}`);
      const img=document.createElement('img');img.src=asset(p,true);img.alt='';img.width=p.width;img.height=p.height;img.loading='lazy';
      const num=document.createElement('span');num.className='banner-card-number';num.textContent=number(i);num.setAttribute('aria-hidden','true');
      const copy=document.createElement('span');copy.className='banner-card-copy';
      const title=document.createElement('strong');title.textContent=p.title;
      const category=document.createElement('small');category.textContent=p.category+' / 查看作品';copy.append(title,category);
      button.append(img,num,copy);button.onclick=()=>{select(i);dialog.querySelector('.banner-expand').focus({preventScroll:true})};rail.append(button);
    });
    rail.scrollTop=0;
    dialog.querySelector('.banner-rail-label span:last-child').textContent=`${String(selection.length).padStart(2,'0')} WORKS`;
  }
  function select(i){
    if(!items.length)return;
    index=i;const p=items[index];
    background.src=asset(p);
    background.classList.remove('banner-image-enter');void background.offsetWidth;background.classList.add('banner-image-enter');
    dialog.querySelector('.banner-feature-number').textContent=number(index);
    dialog.querySelector('.banner-feature-title').textContent=p.title;
    dialog.querySelector('.banner-feature-category').textContent=p.category+' / SELECTED BANNER';
    dialog.querySelector('.banner-feature-description').textContent=p.description;
    dialog.querySelector('.banner-current').textContent=`${number(index)} / ${String(items.length).padStart(2,'0')}　${p.title}`;
    renderRail();
    if(viewer.open)renderViewer();
  }
  function step(delta){const at=selection.indexOf(index);select(selection[(at+delta+selection.length)%selection.length])}
  function renderViewer(){const p=items[index],img=viewer.querySelector('img');img.src=asset(p);img.alt=p.title;img.width=p.width;img.height=p.height;viewer.querySelector('h2').textContent=`${number(index)} / ${String(items.length).padStart(2,'0')}　${p.title}`;viewer.scrollTop=0}
  const ready=fetch('assets/banners/index.json').then(r=>{if(!r.ok)throw Error('Banner load failed');return r.json()}).then(data=>{items=data;selection=items.map((_,i)=>i);select(0)}).catch(()=>{rail.textContent='作品暂未加载成功，请刷新后重试。';dialog.querySelector('.banner-expand').disabled=true;dialog.querySelectorAll('.banner-prev,.banner-next,.banner-filters button').forEach(b=>b.disabled=true)});
  window.openBannerCase=button=>{trigger=button;dialog.showModal();dialog.scrollTop=0;document.body.classList.add('modal-open');ready.then(()=>{rail.scrollTop=0})};
  dialog.querySelectorAll('[data-banner-filter]').forEach(button=>button.onclick=()=>{filter=button.dataset.bannerFilter;selection=items.map((_,i)=>i).filter(i=>filter==='全部'||items[i].category===filter);dialog.querySelectorAll('[data-banner-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));select(selection.includes(index)?index:selection[0])});
  dialog.querySelector('.banner-prev').onclick=()=>step(-1);dialog.querySelector('.banner-next').onclick=()=>step(1);
  dialog.querySelector('.banner-expand').onclick=()=>{if(!items.length)return;renderViewer();viewer.showModal()};
  dialog.querySelector('.banner-close').onclick=()=>dialog.close();
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');trigger?.focus()});
  viewer.querySelector('.banner-viewer-close').onclick=()=>viewer.close();viewer.querySelector('.banner-viewer-prev').onclick=()=>step(-1);viewer.querySelector('.banner-viewer-next').onclick=()=>step(1);
  viewer.addEventListener('close',()=>dialog.querySelector('.banner-expand').focus());
  for(const target of [dialog,viewer])target.addEventListener('keydown',e=>{if(target===dialog&&viewer.open)return;if(e.key==='ArrowRight'){e.preventDefault();step(1)}if(e.key==='ArrowLeft'){e.preventDefault();step(-1)}});
})();
