export const qs = (sel, ctx = document) => ctx.querySelector(sel);
export const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

export const on = (el, evt, fn, opts) => el.addEventListener(evt, fn, opts);
export const off = (el, evt, fn, opts) => el.removeEventListener(evt, fn, opts);

/**
 * Delegação simples de eventos
 * @example delegate(board, 'click', '.square', handleClick)
 */
export function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, (e) => {
        const el = e.target.closest(selector);
        if (el && parent.contains(el)) handler.call(el, e, el);
    });
}

export const raf = (fn) => new Promise((res) => requestAnimationFrame(() => res(fn())));