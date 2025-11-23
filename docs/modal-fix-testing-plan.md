# Modal Fix Testing Plan

## Objective
Systematically identify and fix the exact cause of the modal's broken `position: fixed` behavior.

## Testing Methodology

### How to Test Each Change
1. Make the change
2. Save the file
3. Wait for hot reload
4. Open the carousel on the homepage
5. Click "View All" button
6. Check if:
   - Close button (X) is at top of **viewport** (not page)
   - Thumbnails are at bottom of **viewport** (not page)
   - Modal covers entire viewport
7. Document result before moving to next test

### Success Criteria
✅ Modal is fixed to viewport boundaries
✅ Can't scroll the page behind the modal
✅ Close button stays at viewport top when scrolling (if scrolling is possible)
✅ Thumbnails stay at viewport bottom

## Phase 1: Isolate Transform Issues

### Test 1.1: Remove Hero Section Transforms
**File:** `src/app/page.tsx` (lines ~142-148)

**Current:**
```jsx
<section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary" style={{
  isolation: 'isolate',
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
  perspective: '1000px',
  willChange: 'transform'
}}>
```

**Test:**
```jsx
<section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary">
```

**Expected:** Might not fix (hero is different section) but eliminates variable

---

### Test 1.2: Remove .bg-primary Transform
**File:** `src/app/critical.css` (lines ~33-39)

**Current:**
```css
.bg-primary {
  background-color: var(--primary);
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

**Test:**
```css
.bg-primary {
  background-color: var(--primary);
  position: relative;
  overflow: hidden;
  /* transform: translateZ(0); */
  /* backface-visibility: hidden; */
}
```

**Expected:** Unlikely to fix but good to test

---

### Test 1.3: Remove Sun Spot Transforms
**File:** `src/app/critical.css` (line ~92)

**Current:**
```css
.sun-spot {
  ...
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
```

**Test:**
```css
.sun-spot {
  ...
  /* transform: translate3d(0, 0, 0); */
  /* backface-visibility: hidden; */
}
```

**Expected:** Should not affect modal but eliminates variable

---

### Test 1.4: Check Body Transform Override
**File:** `src/app/globals.css` (lines ~370-379)

**Current:**
```css
@media (max-width: 768px) {
  body {
    position: relative;
    transform: none !important;
  }
}
```

**Test:** Temporarily comment out the entire media query
```css
/* @media (max-width: 768px) {
  body {
    position: relative;
    transform: none !important;
  }
} */
```

**Expected:** If modal works after this, body transforms are the issue

## Phase 2: Test Portal Rendering

### Test 2.1: Verify Portal Target
**Add debugging to:** `src/components/PortraitCarousel.tsx` (after line 114)

**Test:**
```jsx
{isModalOpen && typeof window !== 'undefined' && (() => {
  console.log('Portal target:', document.body);
  console.log('Body computed styles:', window.getComputedStyle(document.body).transform);
  console.log('HTML computed styles:', window.getComputedStyle(document.documentElement).transform);

  return createPortal(
    <div className="fixed inset-0 z-50 ...">
      ...
    </div>,
    document.body
  );
})()}
```

**Check Console:** Look for any transform values other than "none" or "matrix(1, 0, 0, 1, 0, 0)"

---

### Test 2.2: Try Different Portal Target
**Test:** Create a dedicated portal root

**Step 1:** Add to `src/app/page.tsx` at the very end (after last div):
```jsx
return (
  <>
    <div className="min-h-screen text-gray-800 bg-gray-50 w-full">
      {/* ... existing content ... */}
    </div>
    <div id="modal-portal-root"></div>
  </>
);
```

**Step 2:** Update `src/components/PortraitCarousel.tsx`:
```jsx
document.getElementById('modal-portal-root') || document.body
```

**Expected:** If this works, confirms body/html have transforms

## Phase 3: Dynamic Transform Detection

### Test 3.1: Check for JavaScript Transforms
**Add to:** `src/app/page.tsx` in a useEffect

```jsx
useEffect(() => {
  // Check for any mutations to body/html style
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        console.warn('Style changed on:', mutation.target.tagName);
        console.warn('New style:', (mutation.target as HTMLElement).style.transform);
      }
    });
  });

  observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

  return () => observer.disconnect();
}, []);
```

**Check Console:** Look for any transform changes during runtime

## Phase 4: Fallback Solutions

### Test 4.1: Force Inline Styles
**File:** `src/components/PortraitCarousel.tsx` (line ~115)

**Test:**
```jsx
<div
  className="z-50 flex items-center justify-center bg-black bg-opacity-95"
  style={{
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    transform: 'none',
    perspective: 'none'
  }}
>
```

**Expected:** Should work if issue is CSS specificity

---

### Test 4.2: Remove All Ancestor Transforms
**Temporary Nuclear Option:** Add to top of `src/app/globals.css`

```css
* {
  transform: none !important;
  perspective: none !important;
  filter: none !important;
}
```

**Expected:** If this fixes it, we know transforms are the issue

## Execution Order

1. **Start with Phase 2.1** - Add console logging to see computed styles
2. **Then Phase 3.1** - Check for dynamic transforms
3. **Then Phase 1** - Systematically remove transforms based on what you found
4. **Then Phase 2.2** - Try alternative portal target if needed
5. **Finally Phase 4** - Apply fixes based on findings

## Documentation Template

For each test, document:

```markdown
### Test: [Test Number and Name]
**Time:** [Timestamp]
**Change Made:** [Exact change]
**Result:** [Working/Not Working]
**Console Output:** [Any relevant console logs]
**Notes:** [Any observations]
```

## Final Solution

Once culprit is identified:

1. Document the exact cause
2. Implement minimal fix (not nuclear option)
3. Test on:
   - Mobile viewport (375px)
   - Tablet viewport (768px)
   - Desktop viewport (1440px)
4. Verify no side effects on other components
5. Create permanent fix PR