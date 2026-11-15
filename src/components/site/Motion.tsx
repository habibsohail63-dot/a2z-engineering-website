import { useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';

/** Progressive enhancement: content stays visible if motion is unavailable. */
export function SiteMotion() {
  const pathname = useRouterState({ select: state => state.location.pathname });
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.section-top, .intro-grid, .service-item, .project-item, .value, .process-step, .history-layout, .detail-grid, .contact-layout, .image-story').forEach(element => {
      element.classList.add('motion-ready');
      observer.observe(element);
    });
    let frame = 0;
    const hero = document.querySelector<HTMLElement>('.hero, .page-hero');
    const scroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        if (hero && window.scrollY < hero.offsetHeight) hero.style.setProperty('--parallax', `${Math.min(window.scrollY * 0.16, 100)}px`);
        frame = 0;
      });
    };
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const heroMove = (event: PointerEvent) => {
      if (!finePointer) return;
      const sculpture = document.querySelector<HTMLElement>('.hero-orbital');
      if (!sculpture) return;
      const x = (event.clientX / window.innerWidth - .5) * 10;
      const y = (event.clientY / window.innerHeight - .5) * -8;
      sculpture.style.setProperty('--pointer-x', `${x}deg`);
      sculpture.style.setProperty('--pointer-y', `${y}deg`);
    };
    const move = (event: PointerEvent) => {
      if (!finePointer || !(event.target instanceof Element)) return;
      const item = event.target.closest<HTMLElement>('.service-image, .project-image');
      if (!item) return;
      const rect = item.getBoundingClientRect();
      item.style.setProperty('--tilt-x', `${((event.clientY - rect.top) / rect.height - .5) * -5}deg`);
      item.style.setProperty('--tilt-y', `${((event.clientX - rect.left) / rect.width - .5) * 5}deg`);
    };
    const reset = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const item = event.target.closest<HTMLElement>('.service-image, .project-image');
      if (item && (!(event.relatedTarget instanceof Node) || !item.contains(event.relatedTarget))) {
        item.style.setProperty('--tilt-x', '0deg'); item.style.setProperty('--tilt-y', '0deg');
      }
    };
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('pointermove', heroMove, { passive: true });
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerout', reset);
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('pointermove', heroMove);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerout', reset);
    };
  }, [pathname]);
  return null;
}