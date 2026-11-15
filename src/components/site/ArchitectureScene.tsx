import { useEffect, useRef } from 'react';

/** Lightweight interactive architectural wireframe rendered from 3D vertices. */
export function ArchitectureScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0, y: 0 };
    let frame = 0;
    let raf = 0;
    let width = 0;
    let height = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - .5;
      pointer.y = (event.clientY - rect.top) / rect.height - .5;
    };
    const onLeave = () => { pointer.x = 0; pointer.y = 0; };
    const vertices: [number, number, number][] = [];
    const edges: [number, number][] = [];
    const addBox = (cx:number, cy:number, cz:number, sx:number, sy:number, sz:number) => {
      const start = vertices.length;
      for (const z of [-1,1]) for (const y of [-1,1]) for (const x of [-1,1]) vertices.push([cx+x*sx/2,cy+y*sy/2,cz+z*sz/2]);
      const local:[[number,number],[number,number],[number,number],[number,number],[number,number],[number,number],[number,number],[number,number],[number,number],[number,number],[number,number],[number,number]] = [[0,1],[0,2],[0,4],[1,3],[1,5],[2,3],[2,6],[3,7],[4,5],[4,6],[5,7],[6,7]];
      local.forEach(([a,b])=>edges.push([start+a,start+b]));
    };
    addBox(0,0,0,2.5,4.8,1.8); addBox(-.7,2.9,.05,1.05,1.1,1.8); addBox(.72,1.6,.04,.72,1.7,1.8); addBox(.1,-2.7,.08,2.9,.42,2.1);
    const draw = () => {
      frame += 1;
      context.clearRect(0,0,width,height);
      const angle = (reduced ? .28 : frame*.0032) + pointer.x*.35;
      const tilt = -.12 + pointer.y*.22;
      const cos = Math.cos(angle), sin = Math.sin(angle), ct = Math.cos(tilt), st = Math.sin(tilt);
      const projected = vertices.map(([x,y,z]) => {
        const rx=x*cos-z*sin, rz=x*sin+z*cos;
        const ry=y*ct-rz*st, depth=y*st+rz*ct;
        const perspective=5.8/(5.8+depth*.18);
        return [width*.5+rx*width*.19*perspective,height*.5-ry*height*.105*perspective,depth] as const;
      });
      const sorted=[...edges].sort((a,b)=>(projected[a[0]][2]+projected[a[1]][2])-(projected[b[0]][2]+projected[b[1]][2]));
      context.lineWidth=1.15;
      sorted.forEach(([a,b],i)=>{
        const p=projected[a],q=projected[b];
        context.beginPath(); context.moveTo(p[0],p[1]); context.lineTo(q[0],q[1]);
        context.strokeStyle=`rgba(220,190,132,${.34+Math.max(0,(p[2]+q[2])*.035)})`;
        context.shadowColor='rgba(198,164,106,.65)'; context.shadowBlur=i%3===0?10:3; context.stroke();
      });
      context.shadowBlur=0;
      // floor datum and subtle reference grid
      context.strokeStyle='rgba(198,164,106,.16)'; context.lineWidth=.7;
      for(let i=-4;i<=4;i++){context.beginPath();context.moveTo(width*.5+i*22,height*.83);context.lineTo(width*.5+i*58,height*.93);context.stroke();}
      if(!reduced) raf=window.requestAnimationFrame(draw);
    };
    resize(); draw();
    const observer = new ResizeObserver(resize); observer.observe(canvas);
    canvas.addEventListener('pointermove',onPointer); canvas.addEventListener('pointerleave',onLeave);
    return ()=>{cancelAnimationFrame(raf);observer.disconnect();canvas.removeEventListener('pointermove',onPointer);canvas.removeEventListener('pointerleave',onLeave);};
  },[]);
  return <canvas ref={canvasRef} className="architecture-canvas" aria-label="Interactive rotating three-dimensional architectural wireframe concept" role="img" />;
}
