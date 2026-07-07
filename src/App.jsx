import { useState } from 'react'
import './index.css'
import { Component as LoginPage } from '@/components/ui/animated-characters-login-page'

/* ─── Icons ─── */
const Ic = {
  grid:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  form:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  bell:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px]"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  moon:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px]"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
  sun:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px]"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>,
  search:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[15px] h-[15px]"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  chev:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><polyline points="6 9 12 15 18 9"/></svg>,
  menu:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  arUp:     <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><polyline points="14 10 8 4 2 10"/></svg>,
  arDn:     <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><polyline points="2 6 8 12 14 6"/></svg>,
  dots:     <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>,
  cal:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  upload:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  trending: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  bag:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
  users:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  check:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"/></svg>,
  eye:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  eyeOff:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  clip:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>,
  info:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  alert:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  ok:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
}

/* ─── Data ─── */
const STATS = [
  { label:'Customers',  value:'3,782', delta:'+11.01%', up:true,  color:'#e8f0ff', ic:'#465fff', icon: Ic.users    },
  { label:'Orders',     value:'5,359', delta:'-9.05%',  up:false, color:'#fef3c7', ic:'#d97706', icon: Ic.bag      },
  { label:'Revenue',    value:'$94.5k',delta:'+18.2%',  up:true,  color:'#d1fae5', ic:'#059669', icon: Ic.trending  },
  { label:'Conversion', value:'5.27%', delta:'+2.4%',   up:true,  color:'#fce7f3', ic:'#db2777', icon: Ic.form     },
]
const BAR_DATA = [
  {m:'Jan',v:42},{m:'Feb',v:310},{m:'Mar',v:160},{m:'Apr',v:130},{m:'May',v:105},
  {m:'Jun',v:280},{m:'Jul',v:340},{m:'Aug',v:120},{m:'Sep',v:200},{m:'Oct',v:90},{m:'Nov',v:310},{m:'Dec',v:88},
]
const ORDERS = [
  {id:'#INV-001',name:'Alice Johnson',email:'alice@acme.io',plan:'Enterprise',amt:'$499',st:'Paid',   av:'AJ',ac:'#465fff'},
  {id:'#INV-002',name:'Bob Martinez', email:'bob@acme.io',  plan:'Pro',       amt:'$149',st:'Pending',av:'BM',ac:'#f59e0b'},
  {id:'#INV-003',name:'Clara Smith',  email:'clara@acme.io',plan:'Starter',   amt:'$29', st:'Paid',   av:'CS',ac:'#10b981'},
  {id:'#INV-004',name:'David Lee',    email:'david@acme.io',plan:'Enterprise',amt:'$499',st:'Failed', av:'DL',ac:'#ef4444'},
  {id:'#INV-005',name:'Eva Chen',     email:'eva@acme.io',  plan:'Pro',       amt:'$149',st:'Paid',   av:'EC',ac:'#8b5cf6'},
]
const ST_MAP = {
  Paid:    {bg:'#d1fae5',c:'#065f46'},
  Pending: {bg:'#fef3c7',c:'#92400e'},
  Failed:  {bg:'#fee2e2',c:'#991b1b'},
}

/* ─── Sparkline ─── */
function Spark({up}) {
  const pts = up?'M0,18 C18,12 40,14 60,7 C80,1 95,4 120,0':'M0,0 C20,6 40,2 60,10 C80,16 100,12 120,18'
  const c   = up?'#12b76a':'#f04438'
  return (
    <svg viewBox="0 0 120 20" className="w-20 h-5" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`spk${up}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c} stopOpacity=".25"/>
          <stop offset="100%" stopColor={c} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={pts+' L120,20 L0,20 Z'} fill={`url(#spk${up})`}/>
      <path d={pts} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

/* ─── Bar chart ─── */
function BarChart() {
  const max = Math.max(...BAR_DATA.map(d=>d.v))
  const [h, setH] = useState(null)
  return (
    <div style={{display:'flex',alignItems:'flex-end',gap:8,height:200,padding:'0 4px'}}>
      {BAR_DATA.map((d,i)=>(
        <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6,flex:1,height:'100%',justifyContent:'flex-end'}}
          onMouseEnter={()=>setH(i)} onMouseLeave={()=>setH(null)}>
          {h===i&&<div style={{background:'var(--t1)',color:'#fff',fontSize:10,fontWeight:700,padding:'3px 8px',borderRadius:6,whiteSpace:'nowrap'}}>{d.v}</div>}
          <div style={{width:'100%',borderRadius:'4px 4px 0 0',height:`${(d.v/max)*100}%`,minHeight:4,
            background:h===i?'var(--primary)':h!==null?'#e8eaf0':'#c7d2fe',transition:'background 0.15s'}}/>
          <span style={{fontSize:10,color:h===i?'var(--primary)':'var(--t3)',fontWeight:h===i?600:400}}>{d.m}</span>
        </div>
      ))}
    </div>
  )
}

/* ─── Half-donut Gauge ─── */
function Gauge({pct=75.55}) {
  const R=70,cx=90,cy=90,start=Math.PI,end=2*Math.PI,total=end-start
  const fillA=start+total*(pct/100)
  const toXY=a=>({x:cx+R*Math.cos(a),y:cy+R*Math.sin(a)})
  const s=toXY(start),e=toXY(fillA),bg=toXY(end)
  const la=fillA-start>Math.PI?1:0
  return (
    <svg viewBox="0 0 180 100" style={{width:200,height:110,overflow:'visible'}}>
      <path d={`M ${s.x} ${s.y} A ${R} ${R} 0 1 1 ${bg.x} ${bg.y}`} fill="none" stroke="#e8eaf0" strokeWidth="14" strokeLinecap="round"/>
      <path d={`M ${s.x} ${s.y} A ${R} ${R} 0 ${la} 1 ${e.x} ${e.y}`} fill="none" stroke="var(--primary)" strokeWidth="14" strokeLinecap="round"/>
      <text x={cx} y={cy-4} textAnchor="middle" fill="var(--t1)" fontSize="22" fontWeight="800" fontFamily="Inter,sans-serif">{pct}%</text>
      <text x={cx} y={cy+16} textAnchor="middle" fill="var(--success)" fontSize="12" fontWeight="600" fontFamily="Inter,sans-serif">+10%</text>
    </svg>
  )
}

/* ─── Input field component ─── */
function Field({label,hint,error,success,type='text',placeholder,required,disabled,icon,iconRight,children,...rest}){
  const [showPwd,setShow]=useState(false)
  const borderColor=error?'#f04438':success?'#12b76a':'var(--border-2)'
  const focusShadow=error?'0 0 0 3px rgba(240,68,56,0.12)':success?'0 0 0 3px rgba(18,183,106,0.12)':'0 0 0 3px rgba(70,95,255,0.12)'
  return (
    <div style={{display:'flex',flexDirection:'column',gap:6}}>
      {label&&(
        <label style={{fontSize:13,fontWeight:600,color:'var(--t1)'}}>
          {label}{required&&<span style={{color:'#f04438',marginLeft:2}}>*</span>}
        </label>
      )}
      <div style={{position:'relative',display:'flex',alignItems:'center'}}>
        {icon&&<span style={{position:'absolute',left:12,color:'var(--t3)',display:'flex',pointerEvents:'none'}}>{icon}</span>}
        {children ? children : (
          <input
            type={type==='password'&&showPwd?'text':type}
            placeholder={placeholder}
            disabled={disabled}
            style={{
              width:'100%', height:42, padding:`0 ${iconRight||type==='password'?'40px':'14px'} 0 ${icon?'40px':'14px'}`,
              border:`1px solid ${borderColor}`, borderRadius:10, fontSize:13.5,
              fontFamily:'inherit', color:disabled?'var(--t3)':'var(--t1)',
              background:disabled?'var(--bg)':'var(--surface)', outline:'none',
              transition:'border-color 0.15s, box-shadow 0.15s',
              cursor:disabled?'not-allowed':'text',
            }}
            onFocus={e=>{if(!disabled){e.target.style.borderColor=error?'#f04438':success?'#12b76a':'var(--primary)';e.target.style.boxShadow=focusShadow}}}
            onBlur={e=>{e.target.style.borderColor=borderColor;e.target.style.boxShadow='none'}}
            {...rest}
          />
        )}
        {type==='password'&&(
          <button type="button" onClick={()=>setShow(v=>!v)}
            style={{position:'absolute',right:12,border:'none',background:'transparent',cursor:'pointer',color:'var(--t3)',display:'flex',padding:0}}>
            {showPwd?Ic.eyeOff:Ic.eye}
          </button>
        )}
        {iconRight&&type!=='password'&&(
          <span style={{position:'absolute',right:12,color:'var(--t3)',display:'flex',pointerEvents:'none'}}>{iconRight}</span>
        )}
        {success&&type!=='password'&&!iconRight&&(
          <span style={{position:'absolute',right:12,color:'var(--success)',display:'flex'}}>{Ic.ok}</span>
        )}
      </div>
      {(hint||error)&&(
        <p style={{fontSize:11.5,color:error?'#f04438':'var(--t3)',display:'flex',alignItems:'center',gap:4}}>
          {error?Ic.alert:null}{error||hint}
        </p>
      )}
    </div>
  )
}

/* ─── Custom Checkbox ─── */
function Checkbox({label,checked,onChange,disabled,color='var(--primary)'}){
  return (
    <label style={{display:'inline-flex',alignItems:'center',gap:10,cursor:disabled?'not-allowed':'pointer',opacity:disabled?0.5:1}}>
      <span onClick={()=>!disabled&&onChange&&onChange(!checked)}
        style={{width:18,height:18,borderRadius:5,border:`2px solid ${checked?color:'var(--border-2)'}`,
          background:checked?color:'var(--surface)',display:'flex',alignItems:'center',justifyContent:'center',
          flexShrink:0,transition:'all 0.15s',cursor:disabled?'not-allowed':'pointer'}}>
        {checked&&<span style={{color:'#fff'}}>{Ic.check}</span>}
      </span>
      <span style={{fontSize:13.5,fontWeight:500,color:'var(--t1)'}}>{label}</span>
    </label>
  )
}

/* ─── Custom Radio ─── */
function Radio({label,checked,onChange,name,disabled}){
  return (
    <label style={{display:'inline-flex',alignItems:'center',gap:10,cursor:disabled?'not-allowed':'pointer',opacity:disabled?0.5:1}}>
      <span onClick={()=>!disabled&&onChange&&onChange()}
        style={{width:18,height:18,borderRadius:'50%',border:`2px solid ${checked?'var(--primary)':'var(--border-2)'}`,
          background:'var(--surface)',display:'flex',alignItems:'center',justifyContent:'center',
          flexShrink:0,transition:'all 0.15s',cursor:disabled?'not-allowed':'pointer'}}>
        {checked&&<span style={{width:8,height:8,borderRadius:'50%',background:'var(--primary)',display:'block'}}/>}
      </span>
      <span style={{fontSize:13.5,fontWeight:500,color:'var(--t1)'}}>{label}</span>
    </label>
  )
}

/* ─── Toggle switch ─── */
function Toggle({label,on,onChange,disabled,color='var(--primary)'}){
  return (
    <label style={{display:'inline-flex',alignItems:'center',gap:12,cursor:disabled?'not-allowed':'pointer',opacity:disabled?0.5:1}}>
      <span onClick={()=>!disabled&&onChange&&onChange(!on)}
        style={{width:44,height:24,borderRadius:99,background:on?color:'var(--border-2)',
          position:'relative',display:'inline-block',flexShrink:0,
          transition:'background 0.22s',cursor:disabled?'not-allowed':'pointer'}}>
        <span style={{position:'absolute',top:3,left:on?22:3,width:18,height:18,borderRadius:'50%',
          background:'#fff',boxShadow:'0 1px 4px rgba(0,0,0,0.2)',
          transition:'left 0.22s cubic-bezier(0.34,1.56,0.64,1)'}}/>
      </span>
      {label&&<span style={{fontSize:13.5,fontWeight:500,color:'var(--t1)'}}>{label}</span>}
    </label>
  )
}

/* ─── Select ─── */
function Select({label,options,required,hint,error}){
  const [val,setVal]=useState('')
  return (
    <div style={{display:'flex',flexDirection:'column',gap:6}}>
      {label&&<label style={{fontSize:13,fontWeight:600,color:'var(--t1)'}}>{label}{required&&<span style={{color:'#f04438',marginLeft:2}}>*</span>}</label>}
      <div style={{position:'relative'}}>
        <select value={val} onChange={e=>setVal(e.target.value)}
          style={{width:'100%',height:42,padding:'0 36px 0 14px',
            border:`1px solid ${error?'#f04438':'var(--border-2)'}`,borderRadius:10,fontSize:13.5,
            fontFamily:'inherit',color:val?'var(--t1)':'var(--t3)',
            background:'var(--surface)',outline:'none',appearance:'none',cursor:'pointer',
            transition:'border-color 0.15s, box-shadow 0.15s'}}
          onFocus={e=>{e.target.style.borderColor=error?'#f04438':'var(--primary)';e.target.style.boxShadow=error?'0 0 0 3px rgba(240,68,56,0.12)':'0 0 0 3px rgba(70,95,255,0.12)'}}
          onBlur={e=>{e.target.style.borderColor=error?'#f04438':'var(--border-2)';e.target.style.boxShadow='none'}}>
          <option value="" disabled>Select an option…</option>
          {options.map(o=><option key={o} value={o}>{o}</option>)}
        </select>
        <span style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',color:'var(--t3)',pointerEvents:'none',display:'flex'}}>
          {Ic.chev}
        </span>
      </div>
      {(hint||error)&&<p style={{fontSize:11.5,color:error?'#f04438':'var(--t3)',display:'flex',alignItems:'center',gap:4}}>{error?Ic.alert:null}{error||hint}</p>}
    </div>
  )
}

/* ─── Range slider ─── */
function RangeSlider({label,min=0,max=100,defaultValue=40}){
  const [v,setV]=useState(defaultValue)
  const pct=((v-min)/(max-min))*100
  return (
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      {label&&(
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <label style={{fontSize:13,fontWeight:600,color:'var(--t1)'}}>{label}</label>
          <span style={{fontSize:13,fontWeight:700,color:'var(--primary)'}}>{v}</span>
        </div>
      )}
      <div style={{position:'relative',height:6,borderRadius:99,background:'var(--border)',cursor:'pointer'}}>
        <div style={{position:'absolute',left:0,top:0,height:'100%',borderRadius:99,background:'var(--primary)',width:`${pct}%`,transition:'width 0.1s'}}/>
        <input type="range" min={min} max={max} value={v} onChange={e=>setV(+e.target.value)}
          style={{position:'absolute',inset:0,width:'100%',opacity:0,cursor:'pointer',height:'100%'}}/>
        <div style={{position:'absolute',top:'50%',left:`${pct}%`,transform:'translate(-50%,-50%)',
          width:18,height:18,borderRadius:'50%',background:'var(--primary)',border:'3px solid #fff',
          boxShadow:'0 2px 8px rgba(70,95,255,0.35)',transition:'left 0.1s'}}/>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--t3)'}}>
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  )
}

/* ─── File upload drop zone ─── */
function FileUpload(){
  const [drag,setDrag]=useState(false)
  const [file,setFile]=useState(null)
  return (
    <div
      onDragOver={e=>{e.preventDefault();setDrag(true)}}
      onDragLeave={()=>setDrag(false)}
      onDrop={e=>{e.preventDefault();setDrag(false);setFile(e.dataTransfer.files[0])}}
      style={{border:`2px dashed ${drag?'var(--primary)':'var(--border-2)'}`,borderRadius:12,
        padding:'32px 24px',textAlign:'center',background:drag?'var(--primary-light)':'var(--bg)',
        transition:'all 0.18s',cursor:'pointer'}}
      onClick={()=>document.getElementById('file-inp').click()}>
      <input id="file-inp" type="file" style={{display:'none'}} onChange={e=>setFile(e.target.files[0])}/>
      <div style={{width:48,height:48,borderRadius:12,background:drag?'rgba(70,95,255,0.15)':'var(--border)',
        display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px',color:drag?'var(--primary)':'var(--t3)'}}>
        {Ic.clip}
      </div>
      {file?(
        <p style={{fontSize:13,fontWeight:600,color:'var(--primary)'}}>{file.name}</p>
      ):(
        <>
          <p style={{fontSize:13.5,fontWeight:600,color:'var(--t1)',marginBottom:4}}>
            Drop files here or <span style={{color:'var(--primary)'}}>browse</span>
          </p>
          <p style={{fontSize:12,color:'var(--t3)'}}>PNG, JPG, PDF up to 10MB</p>
        </>
      )}
    </div>
  )
}

/* ─── Section card wrapper ─── */
function Section({title,desc,children}){
  return (
    <div className="card" style={{overflow:'visible'}}>
      <div style={{padding:'20px 24px 16px',borderBottom:'1px solid var(--border)'}}>
        <h3 style={{fontSize:15,fontWeight:700,color:'var(--t1)',marginBottom:3}}>{title}</h3>
        {desc&&<p style={{fontSize:12.5,color:'var(--t3)'}}>{desc}</p>}
      </div>
      <div style={{padding:'24px'}}>{children}</div>
    </div>
  )
}

/* ══════════════════════════════════════
   FORMS PAGE
══════════════════════════════════════ */
function FormsPage(){
  const [checks,setChecks]=useState({opt1:true,opt2:false,opt3:false,dis:false})
  const [radio,setRadio]=useState('opt1')
  const [toggles,setToggles]=useState({email:true,push:false,sms:false,dark:false})
  const [submitted,setSubmitted]=useState(false)

  return (
    <div style={{display:'flex',flexDirection:'column',gap:24}}>

      {/* Heading */}
      <div>
        <p style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--t3)',marginBottom:4}}>Components</p>
        <h1 style={{fontSize:24,fontWeight:800,color:'var(--t1)',letterSpacing:'-0.02em'}}>Form Elements</h1>
        <p style={{fontSize:13.5,color:'var(--t2)',marginTop:4}}>All available form components in one place.</p>
      </div>

      {/* Success toast */}
      {submitted&&(
        <div style={{display:'flex',alignItems:'center',gap:12,padding:'14px 18px',borderRadius:12,
          background:'#d1fae5',border:'1px solid #6ee7b7',color:'#065f46'}}>
          {Ic.ok}
          <span style={{fontSize:13.5,fontWeight:600}}>Form submitted successfully!</span>
          <button onClick={()=>setSubmitted(false)} style={{marginLeft:'auto',border:'none',background:'transparent',cursor:'pointer',color:'#065f46',fontSize:16,lineHeight:1}}>×</button>
        </div>
      )}

      {/* ── Row 1: Text inputs + Validation ── */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>

        <Section title="Input Fields" desc="Standard text inputs with labels and hints">
          <div style={{display:'flex',flexDirection:'column',gap:18}}>
            <Field label="Full Name" placeholder="e.g. John Doe" required hint="As shown on your government ID" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}/>
            <Field label="Email Address" type="email" placeholder="you@example.com" required icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}/>
            <Field label="Password" type="password" placeholder="Min 8 characters" required/>
            <Field label="Phone Number" placeholder="+1 (555) 000-0000" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>}/>
            <Field label="Website" placeholder="https://yoursite.com" iconRight={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>}/>
          </div>
        </Section>

        <Section title="Validation States" desc="Input states: default, success, error, disabled">
          <div style={{display:'flex',flexDirection:'column',gap:18}}>
            <Field label="Default Input" placeholder="Default state" hint="This is a helpful hint message."/>
            <Field label="Success State" placeholder="Valid input" success defaultValue="john@example.com" hint="Email address is valid ✓"/>
            <Field label="Error State" placeholder="Invalid input" error="This field is required." defaultValue="bad-email"/>
            <Field label="Disabled Input" placeholder="Cannot edit this field" disabled defaultValue="Locked value"/>
            <Field label="Search Input" placeholder="Search records…" icon={Ic.search}/>
            <Field label="Date Input" type="date" iconRight={Ic.cal}/>
          </div>
        </Section>
      </div>

      {/* ── Row 2: Textarea + Select ── */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>

        <Section title="Textarea" desc="Multi-line text input for long-form content">
          <div style={{display:'flex',flexDirection:'column',gap:18}}>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              <label style={{fontSize:13,fontWeight:600,color:'var(--t1)'}}>Message <span style={{color:'#f04438'}}>*</span></label>
              <textarea placeholder="Write your message here…" rows={4}
                style={{width:'100%',padding:'12px 14px',border:'1px solid var(--border-2)',borderRadius:10,
                  fontSize:13.5,fontFamily:'inherit',color:'var(--t1)',background:'var(--surface)',
                  outline:'none',resize:'vertical',minHeight:100,transition:'border-color 0.15s, box-shadow 0.15s'}}
                onFocus={e=>{e.target.style.borderColor='var(--primary)';e.target.style.boxShadow='0 0 0 3px rgba(70,95,255,0.12)'}}
                onBlur={e=>{e.target.style.borderColor='var(--border-2)';e.target.style.boxShadow='none'}}/>
              <p style={{fontSize:11.5,color:'var(--t3)'}}>Max 500 characters.</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              <label style={{fontSize:13,fontWeight:600,color:'var(--t1)'}}>Bio</label>
              <textarea placeholder="Tell us about yourself…" rows={3}
                style={{width:'100%',padding:'12px 14px',border:'1px solid var(--border-2)',borderRadius:10,
                  fontSize:13.5,fontFamily:'inherit',color:'var(--t1)',background:'var(--surface)',
                  outline:'none',resize:'vertical',transition:'border-color 0.15s, box-shadow 0.15s'}}
                onFocus={e=>{e.target.style.borderColor='var(--primary)';e.target.style.boxShadow='0 0 0 3px rgba(70,95,255,0.12)'}}
                onBlur={e=>{e.target.style.borderColor='var(--border-2)';e.target.style.boxShadow='none'}}/>
            </div>
          </div>
        </Section>

        <Section title="Select & Dropdown" desc="Single and grouped select menus">
          <div style={{display:'flex',flexDirection:'column',gap:18}}>
            <Select label="Country" required options={['United States','United Kingdom','Canada','Australia','Germany','France','Japan','India']} hint="Select your country of residence"/>
            <Select label="Plan" options={['Starter – $9/mo','Pro – $29/mo','Business – $79/mo','Enterprise – Custom']}/>
            <Select label="Department" options={['Engineering','Design','Marketing','Sales','Finance','HR','Legal']}/>
            <Select label="Priority" error="Please select a priority level." options={['Low','Medium','High','Critical']}/>
          </div>
        </Section>
      </div>

      {/* ── Row 3: Checkboxes, Radios, Toggles ── */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:20}}>

        <Section title="Checkboxes" desc="Multi-select option controls">
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <p style={{fontSize:12,fontWeight:600,color:'var(--t3)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:2}}>Permissions</p>
            <Checkbox label="Read access" checked={checks.opt1} onChange={v=>setChecks(c=>({...c,opt1:v}))}/>
            <Checkbox label="Write access" checked={checks.opt2} onChange={v=>setChecks(c=>({...c,opt2:v}))}/>
            <Checkbox label="Delete access" checked={checks.opt3} onChange={v=>setChecks(c=>({...c,opt3:v}))} color="#ef4444"/>
            <Checkbox label="Disabled option" checked={checks.dis} disabled/>
            <div style={{borderTop:'1px solid var(--border)',paddingTop:14,marginTop:4}}>
              <p style={{fontSize:12,fontWeight:600,color:'var(--t3)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:10}}>Agree to terms</p>
              <Checkbox label="I accept the Terms & Conditions" checked={checks.opt1} onChange={v=>setChecks(c=>({...c,opt1:v}))}/>
            </div>
          </div>
        </Section>

        <Section title="Radio Buttons" desc="Single-select option controls">
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <p style={{fontSize:12,fontWeight:600,color:'var(--t3)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:2}}>Billing Cycle</p>
            {['Monthly','Quarterly','Annually (Save 20%)'].map((o,i)=>(
              <Radio key={o} label={o} checked={radio===`opt${i+1}`} onChange={()=>setRadio(`opt${i+1}`)}/>
            ))}
            <div style={{borderTop:'1px solid var(--border)',paddingTop:14,marginTop:4}}>
              <p style={{fontSize:12,fontWeight:600,color:'var(--t3)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:10}}>Notification method</p>
              {['Email','SMS','Push notification','In-app only'].map((o,i)=>(
                <Radio key={o} label={o} checked={radio===`n${i}`} onChange={()=>setRadio(`n${i}`)} disabled={i===3}/>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Toggle Switches" desc="Binary on/off state controls">
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <p style={{fontSize:12,fontWeight:600,color:'var(--t3)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:2}}>Notification Preferences</p>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',borderRadius:10,border:'1px solid var(--border)',background:'var(--bg)'}}>
              <div>
                <p style={{fontSize:13.5,fontWeight:600,color:'var(--t1)'}}>Email Alerts</p>
                <p style={{fontSize:11.5,color:'var(--t3)'}}>Receive updates via email</p>
              </div>
              <Toggle on={toggles.email} onChange={v=>setToggles(t=>({...t,email:v}))}/>
            </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',borderRadius:10,border:'1px solid var(--border)',background:'var(--bg)'}}>
              <div>
                <p style={{fontSize:13.5,fontWeight:600,color:'var(--t1)'}}>Push Notifications</p>
                <p style={{fontSize:11.5,color:'var(--t3)'}}>Browser push alerts</p>
              </div>
              <Toggle on={toggles.push} onChange={v=>setToggles(t=>({...t,push:v}))} color="#8b5cf6"/>
            </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',borderRadius:10,border:'1px solid var(--border)',background:'var(--bg)'}}>
              <div>
                <p style={{fontSize:13.5,fontWeight:600,color:'var(--t1)'}}>SMS Alerts</p>
                <p style={{fontSize:11.5,color:'var(--t3)'}}>Text message updates</p>
              </div>
              <Toggle on={toggles.sms} onChange={v=>setToggles(t=>({...t,sms:v}))} color="#10b981"/>
            </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',borderRadius:10,border:'1px solid var(--border)',background:'var(--bg)'}}>
              <div>
                <p style={{fontSize:13.5,fontWeight:600,color:'var(--t1)'}}>Dark Mode</p>
                <p style={{fontSize:11.5,color:'var(--t3)'}}>Disabled in this plan</p>
              </div>
              <Toggle on={toggles.dark} disabled/>
            </div>
          </div>
        </Section>
      </div>

      {/* ── Row 4: Range Slider + File Upload ── */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
        <Section title="Range Sliders" desc="Numeric value selection with drag handle">
          <div style={{display:'flex',flexDirection:'column',gap:28}}>
            <RangeSlider label="Budget ($)" min={0} max={10000} defaultValue={4200}/>
            <RangeSlider label="Team Size" min={1} max={50} defaultValue={12}/>
            <RangeSlider label="Discount (%)" min={0} max={100} defaultValue={25}/>
            <RangeSlider label="Volume" min={0} max={100} defaultValue={70}/>
          </div>
        </Section>

        <Section title="File Upload" desc="Drag and drop or click to browse files">
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <FileUpload/>
            <div>
              <label style={{fontSize:13,fontWeight:600,color:'var(--t1)',display:'block',marginBottom:6}}>Profile Photo</label>
              <div style={{display:'flex',alignItems:'center',gap:14}}>
                <div style={{width:60,height:60,borderRadius:'50%',background:'linear-gradient(135deg,var(--primary),#7c3aed)',
                  display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:20,fontWeight:700,flexShrink:0}}>
                  AD
                </div>
                <div style={{flex:1}}>
                  <label htmlFor="photo-inp">
                    <div style={{display:'inline-flex',alignItems:'center',gap:6,padding:'8px 16px',
                      border:'1px solid var(--border-2)',borderRadius:8,cursor:'pointer',fontSize:13,
                      fontWeight:600,color:'var(--t2)',background:'var(--surface)',transition:'all 0.12s'}}>
                      {Ic.upload} Change photo
                    </div>
                  </label>
                  <input id="photo-inp" type="file" accept="image/*" style={{display:'none'}}/>
                  <p style={{fontSize:11.5,color:'var(--t3)',marginTop:6}}>JPG, GIF or PNG. Max size 2MB.</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* ── Full registration form example ── */}
      <Section title="Complete Form Example" desc="A full registration form combining all elements above">
        <form onSubmit={e=>{e.preventDefault();setSubmitted(true);window.scrollTo({top:0,behavior:'smooth'})}}
          style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>

          <Field label="First Name" placeholder="John" required/>
          <Field label="Last Name" placeholder="Doe" required/>
          <Field label="Email Address" type="email" placeholder="john@example.com" required
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}/>
          <Field label="Password" type="password" placeholder="Min 8 characters" required/>
          <Select label="Country" required options={['United States','United Kingdom','Canada','Australia','Germany','Japan','India']}/>
          <Select label="Plan" required options={['Starter – $9/mo','Pro – $29/mo','Business – $79/mo','Enterprise – Custom']}/>

          <div style={{gridColumn:'1/-1'}}>
            <label style={{fontSize:13,fontWeight:600,color:'var(--t1)',marginBottom:6,display:'block'}}>About yourself</label>
            <textarea placeholder="Tell us a bit about yourself and your project…" rows={3}
              style={{width:'100%',padding:'12px 14px',border:'1px solid var(--border-2)',borderRadius:10,
                fontSize:13.5,fontFamily:'inherit',color:'var(--t1)',background:'var(--surface)',outline:'none',resize:'none',
                transition:'border-color 0.15s, box-shadow 0.15s'}}
              onFocus={e=>{e.target.style.borderColor='var(--primary)';e.target.style.boxShadow='0 0 0 3px rgba(70,95,255,0.12)'}}
              onBlur={e=>{e.target.style.borderColor='var(--border-2)';e.target.style.boxShadow='none'}}/>
          </div>

          <div style={{gridColumn:'1/-1',display:'flex',flexDirection:'column',gap:12}}>
            <Checkbox label="I agree to the Terms of Service and Privacy Policy" checked={checks.opt1} onChange={v=>setChecks(c=>({...c,opt1:v}))}/>
            <Checkbox label="Subscribe me to product updates and announcements" checked={checks.opt2} onChange={v=>setChecks(c=>({...c,opt2:v}))}/>
          </div>

          <div style={{gridColumn:'1/-1',display:'flex',justifyContent:'flex-end',gap:12,paddingTop:8,borderTop:'1px solid var(--border)'}}>
            <button type="button"
              style={{padding:'10px 24px',borderRadius:10,border:'1px solid var(--border-2)',
                background:'var(--surface)',fontSize:13.5,fontWeight:600,color:'var(--t2)',
                cursor:'pointer',fontFamily:'inherit',transition:'all 0.12s'}}
              onMouseEnter={e=>e.currentTarget.style.background='var(--bg)'}
              onMouseLeave={e=>e.currentTarget.style.background='var(--surface)'}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{padding:'10px 28px',fontSize:13.5}}>
              Submit Form
            </button>
          </div>
        </form>
      </Section>

    </div>
  )
}

/* ══════════════════════════════════════
   DASHBOARD PAGE
══════════════════════════════════════ */
function DashboardPage(){
  return (
    <div style={{display:'flex',flexDirection:'column',gap:24}}>
      <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:16}}>
        <div>
          <p style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--t3)',marginBottom:4}}>Overview</p>
          <h1 style={{fontSize:24,fontWeight:800,color:'var(--t1)',letterSpacing:'-0.02em',lineHeight:1}}>Dashboard</h1>
        </div>
        <div style={{display:'flex',gap:10}}>
          <button id="date-btn" style={{display:'flex',alignItems:'center',gap:8,padding:'8px 16px',
            border:'1px solid var(--border)',borderRadius:10,background:'var(--surface)',
            fontSize:13,color:'var(--t2)',fontFamily:'inherit',cursor:'pointer',
            boxShadow:'var(--shadow-sm)',fontWeight:500,transition:'all 0.15s'}}
            onMouseEnter={e=>e.currentTarget.style.borderColor='var(--border-2)'}
            onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
            {Ic.cal} Jun 23 – Jun 29 {Ic.chev}
          </button>
          <button id="export-btn" className="btn-primary">{Ic.upload} Export</button>
        </div>
      </div>

      {/* Main grid */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:20,alignItems:'start'}}>

        {/* Left */}
        <div style={{display:'flex',flexDirection:'column',gap:20}}>
          {/* Stat cards */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            {STATS.slice(0,2).map((s,i)=>(
              <div key={i} className="card card-lift" style={{padding:'24px 24px 20px'}}>
                <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
                  <div style={{width:52,height:52,borderRadius:12,background:s.color,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <span style={{color:s.ic}}>{s.icon}</span>
                  </div>
                  <Spark up={s.up}/>
                </div>
                <p style={{fontSize:12,fontWeight:600,color:'var(--t3)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6}}>{s.label}</p>
                <p style={{fontSize:28,fontWeight:800,color:'var(--t1)',letterSpacing:'-0.03em',marginBottom:8,fontVariantNumeric:'tabular-nums'}}>{s.value}</p>
                <span style={{fontSize:12,fontWeight:600,color:s.up?'var(--success)':'var(--danger)',display:'inline-flex',alignItems:'center',gap:4}}>
                  <span style={{color:s.up?'var(--success)':'var(--danger)'}}>{s.up?Ic.arUp:Ic.arDn}</span>{s.delta}
                </span>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="card" style={{padding:'24px 24px 20px'}}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
              <div>
                <h3 style={{fontSize:16,fontWeight:700,color:'var(--t1)',marginBottom:3}}>Monthly Sales</h3>
                <p style={{fontSize:12,color:'var(--t3)'}}>Target you've set for each month</p>
              </div>
              <div style={{display:'flex',gap:6}}>
                {['1M','3M','6M','YTD'].map((t,i)=>(
                  <button key={t} style={{padding:'5px 12px',borderRadius:8,fontSize:12,fontWeight:600,cursor:'pointer',border:'none',
                    background:i===3?'var(--primary)':'transparent',color:i===3?'#fff':'var(--t3)',transition:'all 0.12s'}}>{t}</button>
                ))}
              </div>
              <button style={{border:'none',background:'transparent',color:'var(--t3)',cursor:'pointer'}}>{Ic.dots}</button>
            </div>
            <BarChart/>
          </div>

          {/* Orders table */}
          <div className="card">
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px 24px 16px',borderBottom:'1px solid var(--border)'}}>
              <div>
                <h3 style={{fontSize:16,fontWeight:700,color:'var(--t1)',marginBottom:2}}>Recent Orders</h3>
                <p style={{fontSize:12,color:'var(--t3)'}}>Latest 5 invoices</p>
              </div>
              <button id="view-all-btn" style={{fontSize:13,fontWeight:600,color:'var(--primary)',
                border:'1px solid var(--primary)',borderRadius:8,padding:'6px 14px',
                background:'transparent',cursor:'pointer',transition:'all 0.12s'}}
                onMouseEnter={e=>e.currentTarget.style.background='var(--primary-light)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                View all
              </button>
            </div>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
              <thead>
                <tr style={{borderBottom:'1px solid var(--border)'}}>
                  {['Invoice','Customer','Plan','Amount','Status'].map(h=>(
                    <th key={h} style={{padding:'11px 20px',textAlign:'left',fontSize:11,fontWeight:700,
                      textTransform:'uppercase',letterSpacing:'0.07em',color:'var(--t3)'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o,i)=>(
                  <tr key={o.id} className="trow" style={{borderBottom:i<ORDERS.length-1?'1px solid var(--border)':'none',cursor:'pointer'}}>
                    <td style={{padding:'14px 20px'}}><span style={{fontFamily:'monospace',fontWeight:700,fontSize:12,color:'var(--primary)'}}>{o.id}</span></td>
                    <td style={{padding:'14px 20px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <div className="avatar" style={{width:32,height:32,fontSize:11,background:o.ac,flexShrink:0}}>{o.av}</div>
                        <div>
                          <div style={{fontWeight:600,color:'var(--t1)',fontSize:13}}>{o.name}</div>
                          <div style={{fontSize:11,color:'var(--t3)'}}>{o.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{padding:'14px 20px',color:'var(--t2)'}}>{o.plan}</td>
                    <td style={{padding:'14px 20px',fontWeight:700,color:'var(--t1)',fontVariantNumeric:'tabular-nums'}}>{o.amt}</td>
                    <td style={{padding:'14px 20px'}}>
                      <span className="badge" style={{background:ST_MAP[o.st].bg,color:ST_MAP[o.st].c}}>
                        <span style={{width:5,height:5,borderRadius:'50%',background:ST_MAP[o.st].c,flexShrink:0}}/>
                        {o.st}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right */}
        <div style={{display:'flex',flexDirection:'column',gap:20}}>
          {/* Gauge */}
          <div className="card" style={{padding:'22px 20px 20px'}}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:4}}>
              <div>
                <h3 style={{fontSize:15,fontWeight:700,color:'var(--t1)'}}>Monthly Target</h3>
                <p style={{fontSize:11.5,color:'var(--t3)',marginTop:2}}>Target you've set for each month</p>
              </div>
              <button style={{border:'none',background:'transparent',color:'var(--t3)',cursor:'pointer'}}>{Ic.dots}</button>
            </div>
            <div style={{display:'flex',justifyContent:'center',margin:'16px 0 8px'}}><Gauge pct={75.55}/></div>
            <p style={{textAlign:'center',fontSize:12.5,color:'var(--t2)',lineHeight:1.6,marginBottom:20,padding:'0 8px'}}>
              You earn $3287 today, it's higher than last month.{' '}
              <span style={{color:'var(--primary)',fontWeight:600}}>Keep up your good work!</span>
            </p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderTop:'1px solid var(--border)',paddingTop:16,gap:8}}>
              {[{label:'Target',v:'$20K',up:false},{label:'Revenue',v:'$20K',up:true},{label:'Today',v:'$20K',up:true}].map((it,i)=>(
                <div key={i} style={{textAlign:'center'}}>
                  <p style={{fontSize:11,color:'var(--t3)',fontWeight:600,marginBottom:4}}>{it.label}</p>
                  <p style={{fontSize:15,fontWeight:800,color:'var(--t1)'}}>{it.v}</p>
                  <span style={{fontSize:11,fontWeight:600,color:it.up?'var(--success)':'var(--danger)',display:'inline-flex',alignItems:'center',gap:2,marginTop:2}}>{it.up?Ic.arUp:Ic.arDn}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Extra stat cards */}
          {STATS.slice(2).map((s,i)=>(
            <div key={i} className="card card-lift" style={{padding:'20px 20px 18px'}}>
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:12}}>
                <div style={{width:44,height:44,borderRadius:12,background:s.color,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <span style={{color:s.ic}}>{s.icon}</span>
                </div>
                <Spark up={s.up}/>
              </div>
              <p style={{fontSize:11.5,fontWeight:600,color:'var(--t3)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:4}}>{s.label}</p>
              <p style={{fontSize:24,fontWeight:800,color:'var(--t1)',letterSpacing:'-0.03em',marginBottom:6}}>{s.value}</p>
              <span style={{fontSize:12,fontWeight:600,color:s.up?'var(--success)':'var(--danger)',display:'inline-flex',alignItems:'center',gap:4}}>
                <span>{s.up?Ic.arUp:Ic.arDn}</span>{s.delta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════
   ROOT APP
════════════════════════════════ */
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [page,  setPage]  = useState('dashboard')
  const [sOpen, setSOpen] = useState(true)

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  const NAV = [
    { id:'dashboard', label:'Dashboard', icon: Ic.grid },
    { id:'forms',     label:'Forms',     icon: Ic.form },
  ]

  return (
    <div className="shell">

      {/* ═══ SIDEBAR ═══ */}
      <aside className="sidebar" style={{width: sOpen ? 240 : 70}}>

        {/* Logo */}
        <div style={{display:'flex',alignItems:'center',gap:10,padding:'18px 16px 14px',
          borderBottom:'1px solid var(--border)',minHeight:64,overflow:'hidden'}}>
          <div style={{width:34,height:34,borderRadius:10,background:'var(--primary)',
            display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
            boxShadow:'0 4px 12px rgba(70,95,255,0.35)'}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
              <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
              <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
            </svg>
          </div>
          {sOpen && <span style={{fontSize:16,fontWeight:800,color:'var(--t1)',whiteSpace:'nowrap',letterSpacing:'-0.02em'}}>AdminFlow</span>}
        </div>

        {/* Nav */}
        <nav style={{flex:1,padding:'12px 10px',display:'flex',flexDirection:'column',gap:2}}>
          {sOpen && <p style={{fontSize:10,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--t3)',padding:'0 10px',marginBottom:6}}>Menu</p>}
          {NAV.map(n=>{
            const active = page === n.id
            return (
              <button key={n.id} id={`nav-${n.id}`} onClick={()=>setPage(n.id)}
                className={`nv ${active?'active':''}`}
                title={!sOpen ? n.label : undefined}>
                <span style={{display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
                  color: active ? 'var(--primary)' : 'var(--t3)'}}>
                  {n.icon}
                </span>
                {sOpen && <span style={{flex:1}}>{n.label}</span>}
                {active && sOpen && (
                  <span style={{width:6,height:6,borderRadius:'50%',background:'var(--primary)',flexShrink:0}}/>
                )}
              </button>
            )
          })}
        </nav>

        {/* Promo */}
        {sOpen && (
          <div className="promo-card">
            <div style={{fontSize:13,fontWeight:700,color:'var(--t1)',marginBottom:6}}>#1 Admin Dashboard</div>
            <div style={{fontSize:11.5,color:'var(--t2)',lineHeight:1.6,marginBottom:12}}>
              Premium template with 500+ components and pages.
            </div>
            <button className="btn-primary" style={{width:'100%',fontSize:12.5}}>Upgrade Plan</button>
          </div>
        )}

        {/* Toggle collapse */}
        <button id="sidebar-toggle" onClick={()=>setSOpen(o=>!o)}
          style={{margin:'8px 10px 12px',display:'flex',alignItems:'center',
            justifyContent: sOpen ? 'flex-start' : 'center',
            gap:8,padding:'8px 10px',borderRadius:8,border:'1px solid var(--border)',
            background:'transparent',cursor:'pointer',color:'var(--t2)',
            fontSize:12.5,fontFamily:'inherit',fontWeight:500,overflow:'hidden',
            transition:'all 0.15s'}}
          onMouseEnter={e=>e.currentTarget.style.background='var(--bg)'}
          onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
          {Ic.menu}
          {sOpen && <span>Collapse</span>}
        </button>
      </aside>

      {/* ═══ MAIN ═══ */}
      <div style={{display:'flex',flexDirection:'column',flex:1,minWidth:0,overflow:'hidden'}}>

        {/* Topbar */}
        <header className="topbar">
          <button className="ibtn" id="topbar-menu" style={{flexShrink:0}} onClick={()=>setSOpen(o=>!o)}>{Ic.menu}</button>

          <div className="search-wrap">
            <span style={{color:'var(--t3)',flexShrink:0,display:'flex'}}>{Ic.search}</span>
            <input id="topbar-search" placeholder="Search or type command…"/>
            <kbd>⌘K</kbd>
          </div>

          <div style={{display:'flex',alignItems:'center',gap:10,marginLeft:'auto',flexShrink:0}}>
            <button className="ibtn" id="theme-btn" title="Toggle theme">{Ic.moon}</button>
            <button className="ibtn" id="notif-btn" style={{position:'relative'}}>
              {Ic.bell}
              <span style={{position:'absolute',top:6,right:6,width:8,height:8,
                borderRadius:'50%',background:'#f97316',border:'2px solid white'}}/>
            </button>
            <div style={{width:1,height:28,background:'var(--border-2)'}}/>
            <button style={{display:'flex',alignItems:'center',gap:10,padding:'4px 8px',
              border:'none',background:'transparent',cursor:'pointer',borderRadius:10,
              transition:'background 0.12s'}}
              onMouseEnter={e=>e.currentTarget.style.background='var(--bg)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div className="avatar" style={{width:34,height:34,fontSize:12}}>AD</div>
              {sOpen && (
                <div style={{textAlign:'left'}}>
                  <div style={{fontSize:13,fontWeight:600,color:'var(--t1)',lineHeight:1.2}}>Admin</div>
                  <div style={{fontSize:11,color:'var(--t3)'}}>Super Admin</div>
                </div>
              )}
              {Ic.chev}
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="scr" style={{flex:1,overflowY:'auto',padding:'28px 28px 48px'}}>
          {page === 'dashboard' && <DashboardPage/>}
          {page === 'forms'     && <FormsPage/>}
        </div>
      </div>
    </div>
  )
}
