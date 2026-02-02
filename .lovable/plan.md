
# Remove Wishlist Redundancy from Invest Page

## Problem Identified
The Invest page has **two separate Wishlist buttons**:
1. A **Quick Action button** (line 528) labeled "Wishlist" in the top-right area
2. An **Investment Section tab** (defined in `investSections` array at line 44) labeled "Wish List"

Both buttons navigate to the same `/wishlist` page, creating confusing UI redundancy.

## Recommended Solution
Remove the "Wish List" from the `investSections` array (the horizontal tab bar) since:
- The Wishlist is a utility feature, not an investment category like Mutual Funds, Bonds, or FDs
- The Quick Actions section (with Wishlist + Orders) provides a cleaner, more logical placement
- This aligns with standard UX patterns where wishlists are secondary actions, not primary navigation items

## Technical Changes

### File: `src/pages/Invest.tsx`

**Step 1: Remove "wishlist" from `investSections` array (lines 43-50)**

Remove this entry from the array:
```typescript
{ id: "wishlist", label: "Wish List", icon: Heart }
```

The array will then only contain the 5 investment types:
- Mutual Funds
- Company FD
- Bonds
- Gold & Silver
- PMS & AIF

**Step 2: Clean up unused navigation logic (lines 173-174)**

Remove the wishlist case from `handleSectionClick`:
```typescript
if (sectionId === "wishlist") navigate("/wishlist");
```

## Result
- Single, clear path to Wishlist via the Quick Actions "Wishlist" button
- Cleaner investment sections showing only actual asset classes
- Consistent with the navigation flow document where Wishlist is a utility within Invest, not a primary section
