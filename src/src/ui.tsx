// Standalone presentation components authored for this portable adaptation.
import React from 'react';
export {Link, NavLink, Routes, Route} from 'react-router-dom';
type Children = {children?: React.ReactNode};
export function AppCard({children}:Children){return <main className="app-card">{children}</main>}
export function Header({title,fact,intro}:{title:string;fact:string;intro:string}){return <header><p className="eyebrow">{fact}</p><h1>{title}</h1><p className="intro">{intro}</p></header>}
export function Group({label,children}:{label:string;heading?:boolean}&Children){return <section><h2>{label}</h2>{children}</section>}
export function Closing({children}:Children){return <footer>{children}</footer>}
export function Paragraph({children}:Children){return <p>{children}</p>}
export function Caption({children}:Children){return <p className="caption">{children}</p>}
export function TextLink({href,children}:{href:string}&Children){return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>}
export function Button({variant='primary',children,...props}:React.ButtonHTMLAttributes<HTMLButtonElement>&{variant?:string}){return <button type="button" className="demo-button" data-variant={variant} {...props}>{children}</button>}
export function ChoiceRow({label,options,value,onChange}:{label:string;options:{value:string;label:string}[];value:string;onChange:(v:string)=>void}){return <fieldset className="choice-row"><legend>{label}</legend><div>{options.map(o=><button type="button" className="demo-button" key={o.value} aria-pressed={value===o.value} onClick={()=>onChange(o.value)}>{o.label}</button>)}</div></fieldset>}
export function Slider({label,min,max,value,onChange,describe}:{label:string;min:number;max:number;value:number;onChange:(v:number)=>void;describe:(v:number)=>string}){const id=React.useId();return <div className="slider"><label htmlFor={id}>{label}: <strong>{describe(value)}</strong></label><input id={id} type="range" min={min} max={max} step={max>100?100:1} value={value} onChange={e=>onChange(Number(e.target.value))}/></div>}
export function Figure({src,alt,caption}:{src:string;alt:string;caption:string}){return <figure><img src={src} alt={alt}/><figcaption>{caption}</figcaption></figure>}
