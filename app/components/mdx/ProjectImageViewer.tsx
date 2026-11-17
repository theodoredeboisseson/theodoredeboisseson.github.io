'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import type PhotoSwipeLightbox from 'photoswipe/lightbox';
import { deduplicateProjectImages } from '@/lib/project-images';
import 'photoswipe/style.css';
import styles from './ProjectImageViewer.module.css';

export default function ProjectImageViewer({ children }: { children: ReactNode }) {
    const scope = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = scope.current;
        if (!root) return;
        let lightbox: PhotoSwipeLightbox | undefined;
        let opener: HTMLAnchorElement | undefined;
        let opening = false;
        let disposed = false;

        async function openImage(event: MouseEvent) {
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const trigger = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[data-project-image]') : null;
            if (!trigger || !root?.contains(trigger)) return;

            const images = deduplicateProjectImages(
                Array.from(root.querySelectorAll<HTMLAnchorElement>('a[data-project-image]')).map(anchor => ({
                    src: anchor.href,
                    width: Number(anchor.dataset.pswpWidth),
                    height: Number(anchor.dataset.pswpHeight),
                    alt: anchor.querySelector('img')?.alt ?? '',
                    caption: anchor.dataset.imageCaption,
                    element: anchor,
                    msrc: anchor.querySelector('img')?.currentSrc || anchor.href,
                }))
            );
            const index = images.findIndex(image => image.src === trigger.href);
            if (index < 0) return;
            event.preventDefault();
            if (opening || lightbox?.pswp) return;
            opening = true;
            opener = trigger;
            trigger.focus({ preventScroll: true });
            trigger.setAttribute('aria-busy', 'true');

            try {
                if (!lightbox) {
                    const [{ default: Lightbox }, { default: PhotoSwipe }] = await Promise.all([
                        import('photoswipe/lightbox'),
                        import('photoswipe'),
                    ]);
                    if (disposed) return;
                    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    lightbox = new Lightbox({
                        pswpModule: PhotoSwipe,
                        mainClass: styles.viewer,
                        bgOpacity: 1,
                        showHideAnimationType: reduceMotion ? 'none' : 'fade',
                        showAnimationDuration: reduceMotion ? 0 : 180,
                        hideAnimationDuration: reduceMotion ? 0 : 150,
                        zoomAnimationDuration: reduceMotion ? 0 : 220,
                        preload: [1, 1],
                        imageClickAction: 'zoom',
                        closeTitle: 'Fermer',
                        zoomTitle: 'Zoomer / dézoomer',
                        arrowPrevTitle: 'Image précédente',
                        arrowNextTitle: 'Image suivante',
                        errorMsg: 'Impossible de charger cette image.',
                        indexIndicatorSep: ' / ',
                        paddingFn: ({ x }) => ({
                            top: 64,
                            bottom: Math.max(64, (lightbox?.pswp?.element?.querySelector<HTMLElement>('[data-project-caption]')?.offsetHeight ?? 0) + 32),
                            left: x < 768 ? 16 : 72, right: x < 768 ? 16 : 72,
                        }),
                    });
                    lightbox.on('uiRegister', () => {
                        const pswp = lightbox?.pswp;
                        pswp?.element?.setAttribute('aria-label', 'Visionneuse d’images');
                        pswp?.on('keydown', ({ originalEvent }) => {
                            if (originalEvent.key !== 'Tab' || originalEvent.ctrlKey || originalEvent.altKey || originalEvent.metaKey || !pswp.element) return;
                            const controls = Array.from(pswp.element.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]'))
                                .filter(control => control.getClientRects().length > 0);
                            const first = controls[0];
                            const last = controls.at(-1);
                            const active = document.activeElement;
                            if (originalEvent.shiftKey ? active === first || active === pswp.element : active === last) {
                                originalEvent.preventDefault();
                                (originalEvent.shiftKey ? last : first)?.focus();
                            }
                        });
                        pswp?.ui?.registerElement({
                            name: 'project-caption',
                            className: styles.caption,
                            appendTo: 'root',
                            isButton: false,
                            onInit(element) {
                                element.setAttribute('data-project-caption', '');
                                element.setAttribute('aria-live', 'polite');
                                element.setAttribute('aria-atomic', 'true');
                                const update = () => {
                                    element.textContent = pswp.currSlide?.data.caption || pswp.currSlide?.data.alt || '';
                                    element.hidden = !element.textContent;
                                    requestAnimationFrame(() => {
                                        if (pswp.isOpen) pswp.updateSize(true);
                                    });
                                };
                                pswp.on('change', update);
                                update();
                            },
                        });
                    });
                    lightbox.on('destroy', () => {
                        if (!disposed && opener?.isConnected) opener.focus({ preventScroll: true });
                    });
                    lightbox.init();
                }
                images[index].element = trigger;
                lightbox.loadAndOpen(index, images);
            } catch {
                if (!disposed) window.location.assign(trigger.href);
            } finally {
                opening = false;
                trigger.removeAttribute('aria-busy');
            }
        }

        root.addEventListener('click', openImage);
        return () => {
            disposed = true;
            root.removeEventListener('click', openImage);
            lightbox?.destroy();
        };
    }, []);

    return <div ref={scope} className={styles.scope}>{children}</div>;
}
