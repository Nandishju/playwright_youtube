import React, {useMemo, useState} from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { Menu, Search, Mic, Home, Flame, PlaySquare, Clock3, ThumbsUp, Music2, Gamepad2, Trophy, MenuSquare, UserCircle, MoreVertical, Bell, Share2, Download, PlusCircle } from "lucide-react";
import { videos } from "./data/videos";

const categories=["All","Programming","Music","Gaming","Travel","Fitness","Cooking","Sports","Motivation"];

function Header({setOpen}) {
  const [q,setQ]=useState(""); const nav=useNavigate();
  const submit=e=>{e.preventDefault(); if(q.trim()) nav(`/search?q=${encodeURIComponent(q)}`)};
  return <header className="header">
    <button className="icon-btn" onClick={()=>setOpen(v=>!v)}><Menu/></button>
    <Link to="/" className="logo"><span className="logo-mark">▶</span><b>YouTube</b><sup>IN</sup></Link>
    <form className="search" onSubmit={submit}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search"/><button><Search/></button></form>
    <button className="icon-btn mic"><Mic/></button>
    <div className="head-actions"><button className="icon-btn"><PlusCircle/></button><button className="icon-btn"><Bell/></button><UserCircle className="profile"/></div>
  </header>
}

function Sidebar({open}) {
 return <aside className={`sidebar ${open?"open":""}`}>
   <SideLink to="/" icon={<Home/>} text="Home"/><SideLink to="/trending" icon={<Flame/>} text="Trending"/>
   <SideLink to="/subscriptions" icon={<PlaySquare/>} text="Subscriptions"/>
   <hr/><SideLink to="#" icon={<Clock3/>} text="History"/><SideLink to="#" icon={<ThumbsUp/>} text="Liked videos"/>
   <hr/><h4>EXPLORE</h4><SideLink to="#" icon={<Music2/>} text="Music"/><SideLink to="#" icon={<Gamepad2/>} text="Gaming"/><SideLink to="#" icon={<Trophy/>} text="Sports"/>
   <hr/><h4>MORE FROM YOUTUBE</h4><SideLink to="#" icon={<MenuSquare/>} text="YouTube Premium"/>
 </aside>
}
function SideLink({to,icon,text}) { return <Link to={to} className="side-link">{icon}<span>{text}</span></Link> }

function Card({v}) { return <Link to={`/watch/${v.id}`} className="card">
  <div className="thumb-wrap"><img src={v.thumb}/><span className="duration">{v.duration}</span></div>
  <div className="card-info"><img className="avatar" src={v.avatar}/><div><h3>{v.title}</h3><p>{v.channel}</p><p>{v.views} • {v.time}</p></div><MoreVertical className="more"/></div>
 </Link> }

function HomePage() {
 const [cat,setCat]=useState("All"); const list=cat==="All"?videos:videos.filter(v=>v.category===cat);
 return <><CategoryBar cat={cat} setCat={setCat}/><main className="content"><div className="grid">{list.map(v=><Card key={v.id} v={v}/>)}</div></main></>
}
function CategoryBar({cat,setCat}) { return <div className="category-bar">{categories.map(c=><button className={cat===c?"active":""} onClick={()=>setCat(c)} key={c}>{c}</button>)}</div> }

function Watch() {
 const {id}=useParams(); const v=videos.find(x=>x.id===id)||videos[0]; const related=videos.filter(x=>x.id!==v.id).slice(0,5);
 return <main className="watch-page"><div className="watch-main"><div className="player"><div className="play-big">▶</div></div>
 <h1>{v.title}</h1><div className="watch-meta"><div className="channel-info"><img src={v.avatar}/><div><b>{v.channel}</b><small>1.2M subscribers</small></div><button className="subscribe">Subscribe</button></div>
 <div className="actions"><button><ThumbsUp/> 24K</button><button><Share2/> Share</button><button><Download/> Download</button></div></div>
 <p className="description"><b>{v.views} • {v.time}</b><br/>This is a demo YouTube clone video page built with React. Replace this player with your preferred video source or YouTube embed.</p>
 <h2>Comments</h2><div className="comment"><img src="https://i.pravatar.cc/80?img=5"/><div><b>Great video!</b><p>This React project looks awesome. Keep creating!</p></div></div>
 </div><aside className="related">{related.map(x=><Card key={x.id} v={x}/>)}</aside></main>
}
function SearchPage(){const params=new URLSearchParams(location.search); const q=(params.get("q")||"").toLowerCase(); const list=videos.filter(v=>(v.title+" "+v.channel+" "+v.category).toLowerCase().includes(q)); return <main className="content search-page"><h2>Search results for “{q}”</h2><div className="search-list">{list.length?list.map(v=><Card key={v.id} v={v}/>):<p>No videos found.</p>}</div></main>}
function Trending(){return <><CategoryBar cat="All" setCat={()=>{}}/><main className="content"><h2>Trending</h2><div className="grid">{videos.slice().reverse().map(v=><Card key={v.id} v={v}/>)}</div></main></>}
function App(){const [open,setOpen]=useState(true); return <><Header setOpen={setOpen}/><Sidebar open={open}/><div className={`page ${open?"with-side":""}`}><Routes><Route path="/" element={<HomePage/>}/><Route path="/watch/:id" element={<Watch/>}/><Route path="/search" element={<SearchPage/>}/><Route path="/trending" element={<Trending/>}/><Route path="*" element={<HomePage/>}/></Routes></div></>}
export default App;