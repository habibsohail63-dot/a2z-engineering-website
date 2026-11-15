import { useMemo, useState } from 'react';
import { ArrowUpRight, Calculator, Info } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Eyebrow } from './Sections';

const rates: Record<string, number> = {
  grey: 2600,
  turnkey: 6500,
  finishing: 2200,
  plaza: 3200,
};
const labels: Record<string, string> = {
  grey: 'Grey Structure Construction',
  turnkey: 'Complete Turnkey Project',
  finishing: 'Finishing Works',
  plaza: 'Plaza Construction',
};
const money = (n:number) => new Intl.NumberFormat('en-PK', { style:'currency', currency:'PKR', maximumFractionDigits:0 }).format(n);

export function CostCalculator() {
  const [type,setType] = useState('grey');
  const [area,setArea] = useState('5');
  const [unit,setUnit] = useState('marla');
  const [finish,setFinish] = useState('standard');
  const sqft = Number(area || 0) * (unit === 'marla' ? 225 : 1);
  const estimate = useMemo(() => {
    const multiplier = finish === 'premium' ? 1.25 : finish === 'economy' ? .85 : 1;
    return Math.max(0, sqft * rates[type] * multiplier);
  },[sqft,type,finish]);
  const valid = Number(area) > 0 && Number(area) <= 100000;
  return <section className="cost-calculator section" id="cost-estimator">
    <div className="site-container estimator-layout">
      <div className="estimator-copy">
        <Eyebrow>Project planning / Cost estimator</Eyebrow>
        <h2 className="section-heading">A clearer first step.<br/><em>Plan your project range.</em></h2>
        <p className="body-copy">Explore an initial construction budget indication using your project type and approximate covered area. Adjust the details to see how the estimate changes.</p>
        <div className="estimator-note"><Info size={18}/><span>This is an illustrative planning tool, not a quotation. Actual costs depend on drawings, site conditions, specifications, material rates, labour, approvals and the agreed scope. A2Z will need to assess your project before providing a quote.</span></div>
        <Link to="/contact" className="text-link">Discuss an accurate project estimate <ArrowUpRight size={18}/></Link>
      </div>
      <div className="estimator-card">
        <div className="estimator-card-head"><span><Calculator size={18}/> A2Z / Budget planner</span><span>PKR</span></div>
        <label className="estimator-label" htmlFor="project-type">Type of construction</label>
        <select id="project-type" value={type} onChange={e=>setType(e.target.value)}>{Object.entries(labels).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select>
        <div className="estimator-fields">
          <div><label className="estimator-label" htmlFor="area-size">Approximate area</label><input id="area-size" type="number" min="1" max="100000" value={area} onChange={e=>setArea(e.target.value)} /></div>
          <div><label className="estimator-label" htmlFor="area-unit">Area unit</label><select id="area-unit" value={unit} onChange={e=>setUnit(e.target.value)}><option value="marla">Marla (225 sq ft)</option><option value="sqft">Square feet</option></select></div>
        </div>
        <label className="estimator-label" htmlFor="finish-level">Specification allowance</label>
        <select id="finish-level" value={finish} onChange={e=>setFinish(e.target.value)}><option value="economy">Economy allowance</option><option value="standard">Standard allowance</option><option value="premium">Premium allowance</option></select>
        <div className="estimator-result"><span>Indicative planning amount</span><strong>{valid ? money(estimate) : 'Enter a valid area'}</strong><small>Approx. {Math.round(sqft).toLocaleString('en-PK')} sq ft · {labels[type]}</small></div>
        <a className="estimator-whatsapp" href={`https://wa.me/923005218901?text=${encodeURIComponent(`Hello A2Z Engineering Solutions, I used your budget planner. Project: ${labels[type]}; Area: ${area} ${unit}; indicative amount: ${money(estimate)}. I would like to discuss an accurate quotation.`)}`} target="_blank" rel="noopener noreferrer">Discuss this estimate on WhatsApp <ArrowUpRight size={17}/></a>
      </div>
    </div>
  </section>;
}
