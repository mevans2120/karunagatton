# Modal Positioning Investigation

## Problem Statement

The carousel modal's positioning is broken - the close button appears at the top of the page (not viewport) and the thumbnail navigation appears at the bottom of the page (not viewport). The modal should be fixed to the viewport boundaries.

## Expected Behavior

- Modal should use `position: fixed` to cover the entire viewport
- Close button should be fixed to top of viewport
- Thumbnail navigation should be fixed to bottom of viewport
- Modal should render via React Portal directly to `document.body`

## Investigation Findings

### 1. CSS Properties That Break `position: fixed`

When a parent element has certain CSS properties, `position: fixed` children become positioned relative to that parent instead of the viewport. The following properties create this issue:

- `transform` (any value other than none)
- `perspective` (any value other than none)
- `filter` (any value other than none)
- `will-change: transform`
- `contain: layout | paint | strict`

### 2. Found CSS Issues

#### A. Hero Section Inline Styles (page.tsx:142-148)
```jsx
<section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary" style={{
  isolation: 'isolate',
  transform: 'translateZ(0)',     // ⚠️ BREAKS fixed positioning
  backfaceVisibility: 'hidden',
  perspective: '1000px',           // ⚠️ BREAKS fixed positioning
  willChange: 'transform'          // ⚠️ BREAKS fixed positioning
}}>
```
**Impact**: These are on the hero section, not the carousel section, so shouldn't directly affect the modal.

#### B. Critical CSS Global Rules (critical.css:33-39)
```css
.bg-primary {
  background-color: var(--primary);
  position: relative;
  overflow: hidden;
  transform: translateZ(0);        // ⚠️ BREAKS fixed positioning
  backface-visibility: hidden;
}
```
**Impact**: Any element with `bg-primary` class will have transform applied. The hero section has this class.

#### C. Sun Spot Animation (critical.css:92)
```css
.sun-spot {
  ...
  transform: translate3d(0, 0, 0); // ⚠️ BREAKS fixed positioning
  backface-visibility: hidden;
}
```
**Impact**: Sun spot elements in various sections have transforms.

#### D. Mobile-Specific CSS (globals.css:370-379)
```css
@media (max-width: 768px) {
  html {
    position: relative;
  }

  body {
    position: relative;
    top: 0;
    left: 0;
    transform: none !important;    // ⚠️ !important suggests overriding transforms
  }
}
```
**Impact**: The `!important` rule suggests there might be transforms being applied elsewhere that need overriding on mobile.

#### E. Page Content Wrapper (globals.css:183-187)
```css
.purple-dissolve, .page-content {
  position: relative;
  min-height: 100vh;
  width: 100%;
}
```
**Impact**: `position: relative` alone doesn't break fixed positioning, but combined with transforms could be problematic.

### 3. Carousel Section Structure

Current structure after fixes:
```jsx
<section className="relative py-12 bg-purple-50">
  <div className="absolute top-0 ..."><!-- Top wave SVG --></div>

  <div className="container mx-auto px-4">
    <Heading ... />
    <p ... />
  </div>

  <LazyPortraitCarousel />  <!-- No wrapper div anymore -->

  <div className="absolute bottom-0 ..."><!-- Bottom wave SVG --></div>
</section>
```

### 4. Portal Implementation

The modal uses React Portal correctly:
```jsx
{isModalOpen && typeof window !== 'undefined' && createPortal(
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
    ...
  </div>,
  document.body  // Renders directly to body
)}
```

### 5. Body Scroll Prevention

The component correctly manages body overflow:
```jsx
useEffect(() => {
  if (isModalOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
  return () => { document.body.style.overflow = 'unset'; };
}, [isModalOpen]);
```

## Root Cause Analysis

Despite using `createPortal(modal, document.body)`, the modal's fixed positioning is still broken. This suggests:

1. **Most Likely**: There's a transform or other breaking property on `<body>` or `<html>` elements themselves
2. **Possible**: The portal isn't rendering where expected
3. **Less Likely**: Browser-specific bug with portals and transforms

The mobile CSS shows `body { transform: none !important; }` which indicates transforms are being applied to the body element somewhere, likely dynamically via JavaScript.

## Potential Solutions

### Solution 1: Remove All Transforms from Body/HTML
Check for and remove any JavaScript that applies transforms to body/html elements.

### Solution 2: Use Absolute Positioning Fallback
Instead of relying on `fixed`, calculate viewport dimensions and use `position: absolute` with calculated top/left values.

### Solution 3: Force Override CSS
Add high-specificity CSS to ensure no transforms on body:
```css
html, body {
  transform: none !important;
  perspective: none !important;
  filter: none !important;
  will-change: auto !important;
}
```

### Solution 4: Move Portal Target
Create a dedicated portal root element that's guaranteed to have no transforms:
```jsx
// In _document.tsx or layout
<body>
  <div id="__next">...</div>
  <div id="modal-root"></div>  <!-- Portal target -->
</body>
```

### Solution 5: Inline !important Styles
Apply styles directly to modal with !important:
```jsx
<div
  className="z-50 flex items-center justify-center bg-black bg-opacity-95"
  style={{
    position: 'fixed !important',
    inset: '0 !important',
    transform: 'none !important'
  }}
>
```

## Verification Steps

1. Check computed styles on `<body>` and `<html>` in DevTools
2. Look for any JavaScript applying transforms dynamically
3. Verify portal is actually rendering to `document.body`
4. Check if issue occurs on all browsers or specific ones
5. Test with all transforms/perspective removed from CSS

## Recommended Fix Priority

1. **Immediate**: Add CSS override to ensure body/html have no transforms
2. **Short-term**: Identify and remove unnecessary transforms from hero section and other elements
3. **Long-term**: Refactor performance optimizations to not use transforms on parent containers