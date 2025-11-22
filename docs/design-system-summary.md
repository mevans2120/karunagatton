# Design System Plan - Executive Summary

**Date:** 2025-11-22  
**Full Plan:** See `design-system-plan.md` (1,734 lines)

---

## Critical Discovery

The original Tailwind refactoring plan (Phases 1-3) **cannot be implemented as written** because:

1. **Manual utilities in globals.css MUST stay** - They support critical CSS inlining strategy
2. **Critical CSS is intentional** - Site achieves 95+ Lighthouse score via inlined CSS in `<head>`
3. **Three-layer CSS architecture is deliberate** - Not a mistake to be "fixed"

**The Good News:** The codebase is well-structured. We can still build a design system, just differently.

---

## What We Found

### Codebase Stats
- 15 TypeScript/TSX files total
- 6 page files, 8 component files
- 484 lines in globals.css
- 99 lines in critical.css (inlined)
- 86 lines in tailwind.config.ts

### Color Usage
- `text-primary`: 19 uses
- `bg-primary`: 22 uses
- `bg-gray-50`: 15 uses (alternating sections)
- `text-white`: 24 uses
- 18 unique hard-coded hex colors across CSS

### Patterns Found
- **Button pattern:** 3 variants, 10+ uses
- **Heading pattern:** 6+ uses of `text-3xl md:text-4xl text-center font-light text-primary mb-16 fade-in-section font-heading`
- **Card pattern:** 9+ uses in offerings grid
- **Section pattern:** Every page uses `py-20` or `py-24` with `container mx-auto`

### The Three-Layer Architecture

**Layer 1: tailwind.config.ts**
- Source of truth for tokens
- Generates Tailwind utilities
- 86 lines

**Layer 2: critical.css**
- Inlined in `<head>` for instant LCP
- Contains hero section styles
- Manual utilities (`.flex`, `.items-center`, etc.)
- 99 lines → ~2.5KB inlined

**Layer 3: globals.css**
- Full stylesheet, loaded async
- Duplicates critical utilities (intentional!)
- Complex animations, mobile optimizations
- 484 lines

**Why this matters:** You can't remove manual utilities without breaking performance.

---

## Recommended Approach

### Phase 0: Foundation (2 hours)
- Document the critical CSS strategy
- Establish testing baseline
- Get team alignment
- **NO code changes**

### Phase 1: Token Layer (4-6 hours)
- Create `src/lib/tokens.ts` - single source of truth
- Update tailwind.config.ts to import tokens
- **Keep** manual utilities (document why)
- **Keep** three-layer architecture

### Phase 2: Component Extraction (8-12 hours)
- Extract Button component (3 variants)
- Extract Heading component (4 levels)
- Extract Card component (offerings/testimonials)
- Extract Section component (spacing wrapper)
- Update pages incrementally

### Phase 3: CSS Variable Unification (OPTIONAL, 6-8 hours)
- Build script to generate CSS vars from tokens
- Auto-sync critical.css and globals.css :root
- **Only if team wants** - manual updates work fine

### Phase 4: Documentation (4-6 hours)
- Design system usage guide
- Component API documentation
- Migration examples
- Critical CSS explanation

**Total Time:** 18-26 hours (core) or 24-34 hours (with optional Phase 3)

---

## What NOT to Do

1. **DON'T remove manual utilities** in globals.css (lines 226-257)
   - They support critical CSS
   - Performance depends on them
   
2. **DON'T remove critical.css inlining** in layout.tsx
   - This is why site has 95+ Lighthouse score
   
3. **DON'T try to eliminate CSS variable duplication** without build script
   - It exists in 3 places intentionally
   - Manual sync is fine for now
   
4. **DON'T do big-bang refactoring**
   - Update one page at a time
   - Test after each change

---

## Expected Outcomes

### After Phase 1 (Token Layer)
- Single source of truth for design tokens ✓
- No visual changes
- No performance impact
- Better maintainability

### After Phase 2 (Component Extraction)
- 4 reusable UI components
- ~150 lines of code saved
- Easier to maintain design consistency
- No visual changes
- No performance impact

### After Phase 4 (Documentation)
- Clear design system guidelines
- Component usage examples
- Faster onboarding for new developers

---

## Key Metrics to Maintain

| Metric | Current | Must Maintain |
|--------|---------|---------------|
| Lighthouse Performance | 95-98 | >90 |
| LCP | ~1.2s | <2.0s |
| First Load JS | 138 kB | <180 kB |
| Critical CSS Size | ~2.5 kB | <5 kB |

**Rule:** If any metric degrades, rollback immediately.

---

## Open Questions for Team

1. **Should we keep critical CSS inlining?**
   - Recommendation: YES (performance is excellent)

2. **What to do about manual utilities?**
   - Recommendation: KEEP, document why they exist

3. **Which components to extract in Phase 2?**
   - Recommendation: Button + Heading + Card (highest value)

4. **Should we auto-generate CSS variables?**
   - Recommendation: Not yet, manual updates are fine

5. **Do we need Storybook?**
   - Recommendation: Only if team size grows

---

## Next Steps

1. ✅ Review `design-system-plan.md` (full details)
2. ⬜ Discuss open questions with team
3. ⬜ Get consensus on which phases to implement
4. ⬜ Start with Phase 0 (documentation, no code changes)
5. ⬜ Proceed to Phase 1 when ready

---

## Quick Reference

**Full Plan:** `/Users/michaelevans/karunagatton/docs/design-system-plan.md`

**Key Sections:**
- Current State Analysis (component inventory, usage stats)
- Design System Proposal (token structure, components)
- Implementation Plan (4 phases, detailed tasks)
- Migration Guide (before/after code examples)
- Appendices (color matrix, performance budget, TypeScript patterns)

**Questions?** See Open Questions section in full plan.
