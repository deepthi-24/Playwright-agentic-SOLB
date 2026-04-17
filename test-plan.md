# GOV.UK Prototype System Test Plan

## Application Overview

This test plan covers a comprehensive GOV.UK style prototyping application featuring a component library with 23+ Design System components and user journey prototypes. The application includes form validation, accessibility features, and multi-step user flows. Testing focuses on component functionality, user journey completion, form validation, accessibility compliance, and cross-browser compatibility.

## Test Scenarios

### 1. Component Library Testing

**Seed:** `seed.spec.ts`

#### 1.1. Component Library Navigation and Display

**File:** `tests/component-library/navigation-display.spec.ts`

**Steps:**
  1. Navigate to the application homepage at http://localhost:4173
  2. Verify the GOV.UK header is displayed correctly
  3. Click on 'View components' link
  4. Verify navigation to /components page is successful
  5. Verify 'Components' page heading is displayed
  6. Scroll through the entire page to view all components
  7. Verify all 23+ component sections are rendered (Accordion, BackLink, Breadcrumbs, Button, CharacterCount, Checkboxes, CookieBanner, DateInput, Details, ErrorMessage, ErrorSummary, ExitThisPage, Fieldset, FileUpload, GOVUKFooter, GOVUKHeader, InsetText, NotificationBanner, Pagination, Panel, PasswordInput, PhaseBanner, Radios, Select, ServiceNavigation, SkipLink, SummaryList, Table, Tabs, Tag, TaskList, TextInput, Textarea, Typography, WarningText)
  8. Verify each component has proper heading and example implementation

**Expected Results:**
  - Homepage loads successfully with proper GOV.UK styling
  - Components link is clickable and navigates correctly
  - All component examples are properly rendered and visible
  - No visual layout issues or missing components
  - Components follow GOV.UK Design System patterns

#### 1.2. Interactive Component Functionality

**File:** `tests/component-library/interactive-components.spec.ts`

**Steps:**
  1. Navigate to /components page
  2. Test Accordion component - click on 'Writing well for the web' section
  3. Verify accordion expands and content is revealed
  4. Test accordion collapse functionality
  5. Test CharacterCount component - type text in the textarea
  6. Verify character count updates dynamically
  7. Test Checkboxes component - select multiple waste transport options
  8. Verify checkbox selections work correctly
  9. Test CookieBanner - click 'Accept additional cookies' button
  10. Test DateInput component - enter day, month, year values
  11. Test Details component - expand 'Help with nationality' section
  12. Test File Upload component - click 'Upload a file' button
  13. Test Pagination component - click page numbers and navigation arrows
  14. Test Radios component - select different location options
  15. Test Select dropdown - choose different sorting options
  16. Test Tabs component if present - switch between different tabs

**Expected Results:**
  - Accordion sections open and close properly on click
  - Character counter shows correct remaining characters
  - Checkboxes can be selected and deselected independently
  - Cookie banner button triggers expected action
  - Date input accepts valid date formats
  - Details sections expand to show additional content
  - File upload triggers file selection dialog
  - Pagination navigation works correctly
  - Radio button selection is mutually exclusive
  - Select dropdown shows all options and allows selection
  - Interactive elements respond appropriately to user input

#### 1.3. Form Components Validation

**File:** `tests/component-library/form-validation.spec.ts`

**Steps:**
  1. Navigate to /components page
  2. Test TextInput component - enter valid text
  3. Test TextInput component - enter invalid characters if validation exists
  4. Test Textarea component - enter text exceeding character limit
  5. Verify character count warning behavior
  6. Test DateInput - enter invalid date formats (e.g. 32/13/2023)
  7. Test DateInput - leave required fields empty
  8. Test PasswordInput - verify password field masking
  9. Test form field focus and blur behavior
  10. Test keyboard navigation between form elements using Tab key
  11. Test form field error state styling if validation triggers

**Expected Results:**
  - Text inputs accept valid character sets
  - Invalid input is handled gracefully with proper feedback
  - Character limits are enforced with visual feedback
  - Date validation displays appropriate error messages
  - Password fields mask input appropriately
  - Tab navigation flows logically between form elements
  - Error states are visually distinct and accessible

### 2. User Journey Testing

**Seed:** `seed.spec.ts`

#### 2.1. Basic Income Tax Calculator - Happy Path

**File:** `tests/journeys/tax-calculator-happy-path.spec.ts`

**Steps:**
  1. Navigate to homepage at http://localhost:4173
  2. Click 'View generated journeys' link
  3. Verify navigation to journeys page /journey
  4. Verify 'Basic Income Tax Calculator' journey is listed
  5. Expand 'View pages' section to see journey structure
  6. Verify all 5 pages are listed: Start page, About your income, Your tax code and allowances, Check your details, Your tax estimate
  7. Click on 'Basic Income Tax Calculator' link to start journey
  8. Verify arrival on Start page with proper heading
  9. Read preparation information and requirements
  10. Click 'Start now' button
  11. Verify navigation to 'About your income' page
  12. Enter annual income: £45000
  13. Select income period: 'Yearly'
  14. Expand 'What income to include' for guidance
  15. Select 'Investments' from other income sources
  16. Click 'Continue' button
  17. Verify navigation to 'Your tax code and allowances' page
  18. Enter tax code: 1257L
  19. Select tax region: 'England'
  20. Select 'Personal allowance' for allowances
  21. Select 'Code BR' for tax code options
  22. Click 'Continue' button
  23. Verify navigation to 'Check your details' page
  24. Review displayed contact information
  25. Click 'Confirm' button
  26. Verify navigation to 'Your tax estimate' page
  27. Review tax breakdown table with income sources and calculations

**Expected Results:**
  - Journey navigation flows smoothly between all pages
  - Form data is accepted and saved correctly
  - Each page displays appropriate content and guidance
  - Form validation allows valid data submission
  - Final tax estimate page shows calculated results
  - All buttons and links function as expected
  - No console errors during journey completion
  - Tax calculation table displays relevant data

#### 2.2. Form Validation and Error Handling

**File:** `tests/journeys/tax-calculator-validation.spec.ts`

**Steps:**
  1. Navigate to Basic Income Tax Calculator journey
  2. Click 'Start now' from the start page
  3. On 'About your income' page, enter annual income: 45000
  4. Select 'Yearly' income period
  5. Do NOT select any other income sources
  6. Click 'Continue' button without selecting other income
  7. Verify error summary appears at top of page
  8. Verify error message: 'other_income: Select at least one option'
  9. Verify error links to the correct form field
  10. Click on error link to verify it focuses the problem field
  11. Select 'Investments' to resolve error
  12. Click 'Continue' to proceed to tax code page
  13. Enter tax code: 1257L and select 'England'
  14. Select 'Personal allowance' but do NOT select any tax code options
  15. Click 'Continue' without selecting student loan tax codes
  16. Verify validation error for 'studentLoanTaxCodes: Select at least one option'
  17. Verify error summary is displayed prominently
  18. Select 'Code BR' to resolve the error
  19. Click 'Continue' to successfully proceed
  20. Complete the rest of the journey to verify form state is maintained

**Expected Results:**
  - Form validation prevents submission with incomplete required data
  - Error messages are clear and specific to the missing field
  - Error summary appears at the top of the page
  - Error links successfully focus the relevant form fields
  - Visual error indicators are displayed on problem fields
  - Form data is preserved when validation errors occur
  - Users can correct errors and continue the journey
  - Validation errors follow GOV.UK Design System patterns

#### 2.3. Navigation and Back Functionality

**File:** `tests/journeys/tax-calculator-navigation.spec.ts`

**Steps:**
  1. Complete the tax calculator journey to 'Check your details' page
  2. Verify 'Back' button is present on each step after Start page
  3. Click 'Back' button on 'Check your details' page
  4. Verify navigation back to 'Your tax code and allowances' page
  5. Verify all previously entered form data is preserved
  6. Modify tax region from 'England' to 'Scotland'
  7. Click 'Continue' to return to 'Check your details'
  8. Verify the changed data is reflected
  9. Use browser back button to navigate backwards
  10. Verify application handles browser navigation correctly
  11. Navigate forward again and click 'Change your answers' button if available
  12. Test navigation using header GOV.UK logo to return to homepage
  13. Test skip links functionality - press Tab to reveal skip link
  14. Press Enter on skip link to verify main content focus

**Expected Results:**
  - Back buttons provide proper navigation to previous steps
  - Form data is preserved during backward and forward navigation
  - Modified data is saved and reflected correctly
  - Browser navigation controls work correctly with the application
  - Skip links function properly for accessibility
  - Header navigation returns users to appropriate starting points
  - No data loss occurs during navigation between steps

#### 2.4. Edge Cases and Data Validation

**File:** `tests/journeys/tax-calculator-edge-cases.spec.ts`

**Steps:**
  1. Start the Basic Income Tax Calculator journey
  2. Test income field with boundary values:
  3. Enter extremely low income: £1
  4. Enter extremely high income: £999999999
  5. Enter income with decimal places: £45000.50
  6. Enter non-numeric characters in income field
  7. Enter negative income value: -5000
  8. Test tax code field with various formats:
  9. Enter standard tax code: 1257L
  10. Enter emergency tax code: BR
  11. Enter unusual tax code format: 0T
  12. Leave tax code field completely empty
  13. Enter invalid characters in tax code field
  14. Test with multiple checkbox combinations:
  15. Select all other income sources simultaneously
  16. Test rapid clicking on form buttons
  17. Test form submission during page loading
  18. Test with JavaScript disabled if possible
  19. Test session timeout behavior if applicable

**Expected Results:**
  - System handles extreme income values gracefully
  - Input validation prevents submission of invalid data formats
  - Decimal values are handled appropriately for currency
  - Non-numeric input is rejected with appropriate feedback
  - Negative values are handled according to business rules
  - Various tax code formats are accepted or rejected appropriately
  - Multiple selections work correctly where applicable
  - Rapid interactions don't cause application errors
  - System provides appropriate feedback for all edge cases
  - Application degrades gracefully when JavaScript is unavailable

### 3. Accessibility and Cross-browser Testing

**Seed:** `seed.spec.ts`

#### 3.1. Accessibility Compliance Testing

**File:** `tests/accessibility/wcag-compliance.spec.ts`

**Steps:**
  1. Navigate to homepage and run automated accessibility scan
  2. Verify skip links are present and functional
  3. Test keyboard navigation through entire homepage
  4. Navigate to components page and test keyboard accessibility
  5. Tab through all interactive components using only keyboard
  6. Verify all form inputs have proper labels or aria-labels
  7. Test accordion, details, and expandable components with keyboard
  8. Verify focus indicators are visible on all interactive elements
  9. Test screen reader compatibility with form labels and errors
  10. Check color contrast ratios meet WCAG AA standards
  11. Verify heading structure follows logical hierarchy (h1, h2, h3)
  12. Test with browser zoom up to 200% for text scaling
  13. Navigate through tax calculator journey using only keyboard
  14. Verify error messages are properly associated with form fields
  15. Test aria-live regions for dynamic content updates

**Expected Results:**
  - All interactive elements are reachable via keyboard navigation
  - Skip links successfully move focus to main content
  - Form fields have proper labels and descriptions
  - Focus indicators are clearly visible and meet contrast requirements
  - Error messages are announced by screen readers
  - Heading structure creates logical page outline
  - Page content scales properly at high zoom levels
  - Dynamic content changes are communicated to assistive technology
  - No critical accessibility violations detected
  - Application follows GOV.UK accessibility guidelines

#### 3.2. Cross-browser Compatibility

**File:** `tests/cross-browser/browser-compatibility.spec.ts`

**Steps:**
  1. Test application functionality in Chrome/Chromium browser
  2. Test application functionality in Firefox browser
  3. Test application functionality in Safari browser (if available)
  4. Test application functionality in Edge browser
  5. Verify component rendering consistency across browsers
  6. Test form input behavior across different browsers
  7. Verify CSS styling consistency across browsers
  8. Test JavaScript functionality across browsers
  9. Complete full tax calculator journey in each browser
  10. Test responsive design on different screen sizes
  11. Verify mobile device compatibility
  12. Test with different operating systems (Windows, macOS, Linux)
  13. Check for browser-specific console errors or warnings

**Expected Results:**
  - Application functions identically across all supported browsers
  - Visual appearance remains consistent across browser environments
  - Form validation works correctly in all browsers
  - No browser-specific JavaScript errors occur
  - User journeys complete successfully in all environments
  - Responsive design adapts appropriately to different screen sizes
  - Mobile interaction patterns work correctly on touch devices
  - No significant performance differences between browsers

#### 3.3. Performance and User Experience

**File:** `tests/performance/ux-performance.spec.ts`

**Steps:**
  1. Measure page load times for homepage, components, and journey pages
  2. Test application performance with slow network conditions
  3. Verify loading states and progress indicators if present
  4. Test concurrent user interactions (rapid button clicking)
  5. Measure form submission response times
  6. Test application behavior with large amounts of test data
  7. Verify smooth scrolling and animations if present
  8. Test memory usage during extended application use
  9. Check for memory leaks during navigation
  10. Verify appropriate caching behavior for static assets
  11. Test offline behavior if Progressive Web App features exist
  12. Measure time to interactive for each major page

**Expected Results:**
  - Page load times are within acceptable thresholds (< 3 seconds)
  - Application remains responsive under slow network conditions
  - User interactions provide immediate feedback
  - No performance degradation during extended use
  - Memory usage remains stable during navigation
  - Static assets are cached appropriately for performance
  - Application provides good user experience across performance conditions
  - No blocking operations affect user interface responsiveness
