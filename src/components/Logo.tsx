import type { CSSProperties } from 'react';

/**
 * The CORE mark: three arcs and a core, flat caps, opening stepping inward.
 * Geometry is identical to the brand SVGs — do not adjust the radii or the
 * gap angles here without regenerating the brand assets too.
 */

type Props = {
  size?: number;
  /** draw the arcs in on mount — used once, in the hero */
  animate?: boolean;
  /** single-colour rendering for footers and dark chrome */
  tone?: 'colour' | 'white' | 'ink';
  className?: string;
};

// arc path helpers, precomputed for r = 84 / 55 / 30 with gaps 30° / 34° / 38°
/** CSS custom properties are not in the CSSProperties type; this is the
 *  standard escape hatch for them. */
const cssVar = (name: string, value: string | number): CSSProperties =>
  ({ [name]: value }) as unknown as CSSProperties;

const ARCS = [
  { d: 'M 172.74 58.00 A 84 84 0 1 0 172.74 142.00', w: 22, len: 440, tone: 'url(#coreSlate)' },
  { d: 'M 145.60 69.24 A 55 55 0 1 0 145.60 130.76', w: 20, len: 283, tone: 'url(#coreMantle)' },
  { d: 'M 123.64 81.53 A 30 30 0 1 0 123.64 118.47', w: 16, len: 152, tone: 'url(#coreEmber)' },
];

export default function Logo({ size = 40, animate = false, tone = 'colour', className }: Props) {
  const flat = tone === 'white' ? '#FFFFFF' : tone === 'ink' ? '#241C15' : null;
  const opacities = [1, 0.72, 0.5];

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="CORE Instrumentation and Monitoring"
    >
      {!flat && (
        <defs>
          <linearGradient id="coreSlate" x1="0.15" y1="0" x2="0.9" y2="1">
            <stop offset="0" stopColor="#6B8695" />
            <stop offset="1" stopColor="#22333C" />
          </linearGradient>
          <linearGradient id="coreMantle" x1="0.15" y1="0" x2="0.9" y2="1">
            <stop offset="0" stopColor="#C4762A" />
            <stop offset="1" stopColor="#8A4412" />
          </linearGradient>
          <linearGradient id="coreEmber" x1="0.15" y1="0" x2="0.9" y2="1">
            <stop offset="0" stopColor="#F79A38" />
            <stop offset="1" stopColor="#D25A10" />
          </linearGradient>
          <radialGradient id="coreCore" cx="38%" cy="32%" r="76%">
            <stop offset="0" stopColor="#FFF3C4" />
            <stop offset="0.5" stopColor="#FFDD80" />
            <stop offset="1" stopColor="#F5A21E" />
          </radialGradient>
        </defs>
      )}

      {ARCS.map((arc, i) => (
        <path
          key={arc.d}
          d={arc.d}
          fill="none"
          stroke={flat ?? arc.tone}
          strokeOpacity={flat ? opacities[i] : 1}
          strokeWidth={arc.w}
          strokeLinecap="butt"
          className={animate ? 'draw-arc' : undefined}
          style={animate ? cssVar('--len', arc.len) : undefined}
        />
      ))}

      <circle
        cx="100"
        cy="100"
        r="11"
        fill={flat ?? 'url(#coreCore)'}
        className={animate ? 'draw-core' : undefined}
      />
    </svg>
  );
}
