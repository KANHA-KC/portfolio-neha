"use client";

// Marquee whose items travel along an SVG path (CSS offset-path), driven by `motion`.
// Ported from the TSX/Tailwind original to this project's plain JS + CSS. Each item is
// its own component so its motion hooks follow the Rules of Hooks (the original called
// hooks inside `.map()`).

import { Children, useEffect, useId, useMemo, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity
} from "motion/react";

const wrap = (min, max, value) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

const cx = (...c) => c.filter(Boolean).join(" ");

function PathItem({
  child,
  path,
  baseOffset,
  position,
  easing,
  hidden,
  zIndex: z,
  cssVariableInterpolation,
  onEnter,
  onLeave,
  itemClassName
}) {
  // percentage along the path for this item
  const progress = useTransform(baseOffset, (v) => {
    const p = wrap(0, 100, v + position);
    return easing ? easing(p / 100) * 100 : p;
  });
  const offsetDistance = useTransform(progress, (p) => `${p}%`);
  const zIndex = useTransform(progress, (p) => (z ? Math.floor(z.base + (p / 100) * z.range) : undefined));

  // useTransform with an input/output map is a fixed number of hooks per item (the list is static per render)
  const vars = {};
  for (const { property, from, to } of cssVariableInterpolation) {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- interpolation list is constant for the component's life
    vars[property] = useTransform(progress, [0, 100], [from, to]);
  }

  return (
    <motion.div
      className={cx("msp-item", itemClassName)}
      style={{
        offsetPath: `path('${path}')`,
        offsetDistance,
        zIndex: z ? zIndex : undefined,
        ...vars
      }}
      aria-hidden={hidden || undefined}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {child}
    </motion.div>
  );
}

export default function MarqueeAlongSvgPath({
  children,
  className,
  itemClassName,

  // path
  path,
  showPath = false,

  // svg
  viewBox = "0 0 100 100",
  preserveAspectRatio = "xMidYMid meet",

  // marquee
  baseVelocity = 5, // % of the path per second
  direction = "normal",
  easing,
  slowdownOnHover = false,
  slowDownFactor = 0.3,
  slowDownSpringConfig = { damping: 50, stiffness: 400 },
  paused = false,

  // scroll
  useScrollVelocity = false,
  scrollAwareDirection = false,
  scrollVelocityFactor = 5, // speed multiplier gained per 1000px/s of scroll
  scrollSpringConfig = { damping: 50, stiffness: 400 },
  scrollContainer,

  // repetition
  repeat = 3,

  // drag
  draggable = false,
  dragSensitivity = 0.2,
  dragVelocityDecay = 0.96,
  dragAwareDirection = false,
  grabCursor = false,

  // z-index
  enableRollingZIndex = true,
  zIndexBase = 1,
  zIndexRange = 10,

  cssVariableInterpolation = [],

  // scale a fixed-size viewBox to fit the wrapper ("contain"), or to fill it and crop the overflow ("cover")
  responsive = false,
  fit = "contain"
}) {
  const container = useRef(null);
  const stage = useRef(null);
  const baseOffset = useMotionValue(0);
  const autoId = useId();

  const [, , vbW = 100, vbH = 100] = viewBox.split(" ").map(Number);

  useEffect(() => {
    if (!responsive) return;
    const update = () => {
      const wrapper = container.current;
      const el = stage.current;
      if (!wrapper || !el) return;
      const sx = wrapper.clientWidth / vbW;
      const sy = wrapper.clientHeight / vbH;
      const scale =
        fit === "contain-y"
          ? sy
          : fit === "none"
            ? 1
            : fit === "cover"
              ? Math.max(sx, sy)
              : Math.min(sx, sy);
      el.style.width = `${vbW}px`;
      el.style.height = `${vbH}px`;
      el.style.transformOrigin = "top left";
      el.style.transform = `translate(${(wrapper.clientWidth - vbW * scale) / 2}px, ${(wrapper.clientHeight - vbH * scale) / 2}px) scale(${scale})`;
    };
    update();
    const ro = new ResizeObserver(update);
    if (container.current) ro.observe(container.current);
    return () => ro.disconnect();
  }, [responsive, fit, vbW, vbH]);

  const items = useMemo(() => {
    const list = Children.toArray(children);
    return list.flatMap((child, childIndex) =>
      Array.from({ length: repeat }, (_, repeatIndex) => ({
        child,
        repeatIndex,
        itemIndex: repeatIndex * list.length + childIndex,
        key: `${childIndex}-${repeatIndex}`
      }))
    );
  }, [children, repeat]);

  // scroll → speed (window scroll unless a container is given)
  const { scrollY } = useScroll(scrollContainer ? { container: scrollContainer } : undefined);
  const smoothVelocity = useSpring(useVelocity(scrollY), scrollSpringConfig);
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, scrollVelocityFactor], { clamp: false });

  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const dragVelocity = useRef(0);
  const directionFactor = useRef(direction === "normal" ? 1 : -1);
  const hoverFactor = useMotionValue(1);
  const smoothHoverFactor = useSpring(hoverFactor, slowDownSpringConfig);

  useAnimationFrame((_, delta) => {
    if (paused) return;
    if (isDragging.current && draggable) {
      baseOffset.set(baseOffset.get() + dragVelocity.current);
      dragVelocity.current *= 0.9;
      if (Math.abs(dragVelocity.current) < 0.01) dragVelocity.current = 0;
      return;
    }

    hoverFactor.set(isHovered.current && slowdownOnHover ? slowDownFactor : 1);

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000) * smoothHoverFactor.get();

    if (useScrollVelocity) {
      const f = velocityFactor.get();
      if (scrollAwareDirection) {
        if (f < 0) directionFactor.current = -1;
        else if (f > 0) directionFactor.current = 1;
        moveBy += directionFactor.current * moveBy * f;
      } else {
        moveBy += moveBy * Math.abs(f);
      }
    }

    if (draggable) {
      moveBy += dragVelocity.current;
      if (dragAwareDirection && Math.abs(dragVelocity.current) > 0.1) directionFactor.current = Math.sign(dragVelocity.current);
      if (!isDragging.current && Math.abs(dragVelocity.current) > 0.01) dragVelocity.current *= dragVelocityDecay;
      else if (!isDragging.current) dragVelocity.current = 0;
    }

    baseOffset.set(baseOffset.get() + moveBy);
  });

  const last = useRef({ x: 0, y: 0 });
  const onPointerDown = (e) => {
    if (!draggable) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (grabCursor) e.currentTarget.style.cursor = "grabbing";
    isDragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    dragVelocity.current = 0;
  };
  const onPointerMove = (e) => {
    if (!draggable || !isDragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    const d = Math.hypot(dx, dy);
    dragVelocity.current = (dx > 0 ? d : -d) * dragSensitivity;
    last.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e) => {
    if (!draggable) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    isDragging.current = false;
    if (grabCursor) e.currentTarget.style.cursor = "grab";
  };

  const z = enableRollingZIndex ? { base: zIndexBase, range: zIndexRange } : null;

  return (
    <div
      ref={container}
      className={cx("msp", draggable && grabCursor && "msp--grab", className)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div ref={stage} className="msp-stage">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={vbW}
          height={vbH}
          viewBox={viewBox}
          preserveAspectRatio={preserveAspectRatio}
          className="msp-svg"
          aria-hidden="true"
        >
          <path id={`msp-${autoId}`} d={path} stroke={showPath ? "currentColor" : "none"} fill="none" />
        </svg>
        {items.map(({ child, repeatIndex, itemIndex, key }) => (
          <PathItem
            key={key}
            child={child}
            path={path}
            baseOffset={baseOffset}
            position={(itemIndex * 100) / items.length}
            easing={easing}
            hidden={repeatIndex > 0}
            zIndex={z}
            cssVariableInterpolation={cssVariableInterpolation}
            itemClassName={itemClassName}
            onEnter={() => (isHovered.current = true)}
            onLeave={() => (isHovered.current = false)}
          />
        ))}
      </div>
    </div>
  );
}
