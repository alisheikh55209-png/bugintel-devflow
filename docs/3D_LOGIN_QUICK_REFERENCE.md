# 3D Login Page - Quick Reference

## File Structure

```
components/
├── 3d-bug-model.tsx        # 3D animated bug geometry
├── 3d-particles.tsx         # Orbiting particle system
└── 3d-login-scene.tsx       # Main Three.js canvas & lighting

app/auth/
└── page.tsx                 # Updated login page with 3D scene
```

## Key Features

### 3D Bug Model
- **Component**: `3d-bug-model.tsx`
- **Geometry**: Capsule body, sphere head, cylinder legs, box wings
- **Colors**: Indigo, Purple, Cyan, Orange, Yellow
- **Animation**: Auto-rotation + floating motion
- **Materials**: Phong with emissive properties for glow

### Particle System
- **Component**: `3d-particles.tsx`
- **Count**: 300 particles
- **Pattern**: Orbital motion around bug
- **Animation**: Continuous rotation + height variation
- **Performance**: Uses PointsMaterial for efficiency

### Scene Management
- **Component**: `3d-login-scene.tsx`
- **Lights**: 4 light sources (ambient, 2x directional, point)
- **Controls**: Auto-rotating OrbitControls (no zoom/pan)
- **Responsive**: Adaptive camera based on viewport
- **Fallback**: Loading spinner during scene initialization

## Installation

All dependencies already installed:
```bash
pnpm add three @react-three/fiber @react-three/drei
```

## Usage

The 3D scene is automatically integrated into the login page:

```tsx
// app/auth/page.tsx
import { BugIntel3DScene } from '@/components/3d-login-scene';

export default function LoginPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {/* Form on left */}
      <LoginForm />
      
      {/* 3D Scene on right (desktop only) */}
      <div className="hidden lg:flex">
        <BugIntel3DScene />
      </div>
    </div>
  );
}
```

## Customization Snippets

### Change Bug Color
```tsx
// In 3d-bug-model.tsx
<meshPhongMaterial 
  color="#FF6B6B"  // Change to your color
  emissive="#FF6B6B"
  emissiveIntensity={0.3}
/>
```

### Adjust Rotation Speed
```tsx
// In 3d-bug-model.tsx useFrame
groupRef.current.rotation.y += 0.002;  // Slower
groupRef.current.rotation.y += 0.010;  // Faster
```

### Change Particle Count
```tsx
// In 3d-particles.tsx
const particlesCount = 500;  // More particles
const particlesCount = 100;  // Fewer particles
```

### Modify Lighting
```tsx
// In 3d-login-scene.tsx
<ambientLight intensity={0.8} color="#FF0000" />
<directionalLight intensity={1.5} position={[5, 5, 5]} />
```

## Performance Tips

1. **Desktop Only**: Scene automatically hidden on mobile
2. **Reduce Particles**: Lower `particlesCount` for lower-end devices
3. **Disable Auto-Rotation**: Set `autoRotate={false}` in OrbitControls
4. **Lower DPR**: Change `dpr={[1, 1]}` for older devices
5. **Monitor FPS**: Use Chrome DevTools Performance tab

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome  | ✅ Full | Best performance |
| Firefox | ✅ Full | Good performance |
| Safari  | ✅ Full | iOS 13+ |
| Mobile  | ❌ Disabled | Scene hidden for performance |
| IE      | ❌ None | WebGL required |

## Troubleshooting

### Scene Not Appearing
```
✓ Check console for WebGL errors
✓ Verify browser supports WebGL
✓ Check responsive breakpoint (lg breakpoint)
✓ Try force refresh (Ctrl+Shift+R)
```

### Low FPS / Jank
```
✓ Reduce particlesCount to 150-200
✓ Set dpr={[1, 1]} to reduce render quality
✓ Disable autoRotate on OrbitControls
✓ Check GPU usage in DevTools
```

### Scene Flickering
```
✓ Increase ambient light intensity
✓ Check for conflicting CSS animations
✓ Verify canvas alpha={true}
✓ Disable hardware acceleration temporarily
```

## CSS Classes

Utility classes for animation:
```css
.animate-slide-in-right    /* 250ms slide from right */
.animate-page-transition-in /* 300ms fade and slide in */
.animate-floating-up       /* 2s floating motion */
.animate-glow-pulse        /* 2s glow pulse */
.animation-delay-100       /* 50ms animation delay */
.animation-delay-200       /* 100ms animation delay */
```

## Color Palette (Used)

```
Primary:    #6366F1 (Indigo)
Secondary:  #22D3EE (Cyan)
Accent:     #A78BFA (Purple)
Orange:     #F59E0B (Legs)
Yellow:     #FCD34D (Eyes)
```

## API Reference

### BugIntel3DScene Component
```tsx
<BugIntel3DScene />
```
No props required - fully self-contained.

### BugModel Component
Used internally, rotates and floats automatically.

### ParticleSystem Component
Used internally, creates orbiting particles around bug.

## Next Steps

1. **Customize Colors**: Edit color values in 3d-bug-model.tsx
2. **Add Interactions**: Extend OrbitControls with click handlers
3. **Create Variants**: Make different bug models for other severity levels
4. **Add Sound**: Play audio on hover/click events
5. **Mobile 3D**: Consider enabling on iPad/tablet with lower particle count
