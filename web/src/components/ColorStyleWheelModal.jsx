import { useMemo, useState } from 'react';

const LABELS = ['BLUE', 'INDIGO', 'PURPLE', 'VIOLET', 'RED', 'BRICK', 'ORANGE', 'GOLD', 'YELLOW', 'LIME', 'GREEN', 'TEAL'];
const HUES = [220, 250, 275, 305, 355, 18, 28, 43, 54, 88, 130, 175];

function pt(cx, cy, r, degFromNorth) {
  const rad = (degFromNorth * Math.PI) / 180;
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
}

function annularSectorPath(cx, cy, rInner, rOuter, degStart, degEnd) {
  const p1 = pt(cx, cy, rOuter, degStart);
  const p2 = pt(cx, cy, rOuter, degEnd);
  const p3 = pt(cx, cy, rInner, degEnd);
  const p4 = pt(cx, cy, rInner, degStart);
  const delta = degEnd - degStart;
  const large = delta > 180 ? 1 : 0;
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${p4.x} ${p4.y}`,
    'Z',
  ].join(' ');
}

export default function ColorStyleWheelModal({ onClose }) {
  const [picked, setPicked] = useState(null);

  const { paths, labels } = useMemo(() => {
    const cx = 200;
    const cy = 200;
    const rMax = 168;
    const rWhite = 26;
    const nRings = 5;
    const nSeg = 12;
    const step = (rMax - rWhite) / nRings;
    const segSpan = 360 / nSeg;

    const pathList = [];
    for (let s = 0; s < nSeg; s++) {
      const hue = HUES[s];
      const mid = s * segSpan;
      const a0 = mid - segSpan / 2;
      const a1 = mid + segSpan / 2;
      for (let r = 0; r < nRings; r++) {
        const rOuter = rMax - r * step;
        const rInner = rMax - (r + 1) * step;
        const sat = 88 - r * 14;
        const light = 26 + r * 15;
        const fill = `hsl(${hue} ${sat}% ${light}%)`;
        pathList.push({
          key: `${s}-${r}`,
          d: annularSectorPath(cx, cy, rInner, rOuter, a0, a1),
          fill,
          family: LABELS[s],
          ring: r + 1,
        });
      }
    }

    const labelList = [];
    const lr = 188;
    for (let s = 0; s < nSeg; s++) {
      const mid = s * segSpan + segSpan / 2;
      const p = pt(cx, cy, lr, mid);
      labelList.push({
        key: `lb-${s}`,
        x: p.x,
        y: p.y,
        text: LABELS[s],
        rot: mid,
      });
    }

    return { paths: pathList, labels: labelList };
  }, []);

  return (
    <div className="color-wheel-overlay" onClick={onClose}>
      <div className="color-wheel-modal" onClick={(e) => e.stopPropagation()}>
        <div className="color-wheel-header">
          <h2 className="color-wheel-title">Color-coded style wheel</h2>
          <button type="button" className="color-wheel-close" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
        <p className="color-wheel-sub">Tap a shade to preview your style color (prototype).</p>

        <div className="color-wheel-svg-wrap">
          <svg viewBox="0 0 400 400" className="color-wheel-svg" role="img" aria-label="Color style wheel">
            {paths.map((p) => (
              <path
                key={p.key}
                d={p.d}
                fill={p.fill}
                stroke="rgba(255,255,255,0.45)"
                strokeWidth={0.6}
                className="color-wheel-segment"
                style={{ cursor: 'pointer' }}
                onClick={() => setPicked({ family: p.family, ring: p.ring, fill: p.fill })}
              />
            ))}
            <circle cx={200} cy={200} r={26} fill="#ffffff" stroke="rgba(255,255,255,0.5)" strokeWidth={0.8} />
            {labels.map((lb) => (
              <text
                key={lb.key}
                x={lb.x}
                y={lb.y}
                fill="#0a0a12"
                fontSize={9}
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${lb.rot}, ${lb.x}, ${lb.y})`}
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {lb.text}
              </text>
            ))}
          </svg>
        </div>

        {picked && (
          <div className="color-wheel-picked">
            <span
              className="color-wheel-swatch"
              style={{ background: picked.fill }}
              aria-hidden
            />
            <span>
              {picked.family} · ring {picked.ring} (outer = 1, center = 5)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
