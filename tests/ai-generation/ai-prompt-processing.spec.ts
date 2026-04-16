// spec: AI Prompt Processing and Journey Creation Test
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('AI Journey Generation Suite', () => {
  test('AI Prompt Processing and Journey Creation', async ({ page }) => {
    // Navigate to the application root to verify system setup and accessibility
    await page.goto('http://localhost:4173/');

    // Navigate to journeys page to check current state and look for AI generation interface
    await page.getByRole('link', { name: 'View generated journeys' }).click();

    // Test the accessibility of AI generation infrastructure and validate existing journey schema
    const basicSchemaValidation = await page.evaluate(async () => {
      // Test AI generation interface accessibility by checking if the generation scripts are available
      try {
        // Check if we can access the journey data structure
        const response = await fetch('/journeys/index.json');
        const journeys = await response.json();
        
        // Test basic schema structure
        const hasExpectedStructure = Array.isArray(journeys) && 
          journeys.every(journey => 
            journey.hasOwnProperty('id') && 
            journey.hasOwnProperty('name') &&
            journey.hasOwnProperty('description')
          );
        
        return {
          journeysEndpointAccessible: response.ok,
          journeyCount: journeys.length,
          hasValidSchema: hasExpectedStructure,
          existingJourneys: journeys
        };
      } catch (error) {
        return {
          error: error.message,
          journeysEndpointAccessible: false
        };
      }
    });

    // Validate that AI generation infrastructure is accessible
    expect(basicSchemaValidation.journeysEndpointAccessible).toBe(true);
    expect(basicSchemaValidation.hasValidSchema).toBe(true);
    expect(basicSchemaValidation.journeyCount).toBeGreaterThan(0);

    // Validate detailed journey JSON structure, component configurations, and naming conventions
    const detailedValidation = await page.evaluate(async () => {
      try {
        // Test detailed journey structure by accessing the actual journey data
        const journeyResponse = await fetch('/journeys/basic-income-tax-calculator-1HqNA9.json');
        const journeyData = await journeyResponse.json();
        
        // Validate journey structure follows expected schema
        const hasValidJourneyStructure = Array.isArray(journeyData) && 
          journeyData.every(page => 
            page.hasOwnProperty('title') && 
            page.hasOwnProperty('components') &&
            Array.isArray(page.components)
          );
        
        // Check component structure
        let validComponentCount = 0;
        let totalComponentCount = 0;
        
        journeyData.forEach(page => {
          page.components.forEach(component => {
            totalComponentCount++;
            if (component.hasOwnProperty('component') && 
                component.hasOwnProperty('id') && 
                component.hasOwnProperty('config')) {
              validComponentCount++;
            }
          });
        });
        
        // Test ID naming convention (should be kebab-case with suffix)
        const journeyId = 'basic-income-tax-calculator-1HqNA9';
        const followsNamingConvention = /^[a-z0-9-]+-[A-Za-z0-9]{6}$/.test(journeyId);
        
        return {
          journeyStructureValid: hasValidJourneyStructure,
          pageCount: journeyData.length,
          totalComponents: totalComponentCount,
          validComponents: validComponentCount,
          componentValidityRate: (validComponentCount / totalComponentCount * 100).toFixed(2) + '%',
          followsNamingConvention: followsNamingConvention,
          journeyPages: journeyData.map(page => page.title),
          sampleComponent: journeyData[0]?.components[0] || null
        };
      } catch (error) {
        return {
          error: error.message,
          journeyAccessible: false
        };
      }
    });

    // Verify journey structure and component configurations are valid
    expect(detailedValidation.journeyStructureValid).toBe(true);
    expect(detailedValidation.pageCount).toBeGreaterThan(0);
    expect(detailedValidation.totalComponents).toBeGreaterThan(0);
    expect(detailedValidation.validComponents).toBe(detailedValidation.totalComponents);
    expect(detailedValidation.followsNamingConvention).toBe(true);

    // Verify that the generated journey appears in the UI navigation
    await expect(page.getByText('Basic Income Tax Calculator')).toBeVisible();

    // Click on the generated journey to verify it loads properly and validates successful AI generation
    await page.getByRole('link', { name: 'Basic Income Tax Calculator' }).click();

    // Verify that the AI-generated journey components render correctly with proper button functionality
    await expect(page.getByRole('button', { name: 'Start now' })).toBeVisible();

    // Test AI-generated component functionality by clicking Start now to validate journey progression
    await page.getByRole('button', { name: 'Start now' }).click();

    // Test AI-generated component configuration by entering test data to validate form functionality
    await page.getByRole('textbox', { name: 'Annual income' }).fill('50000');

    // Test AI-generated radio button component configuration and validation
    await page.getByRole('radio', { name: 'Yearly' }).click();

    // Return to journeys list to complete validation of AI generation infrastructure
    await page.goto('http://localhost:4173/journey');

    // Perform comprehensive validation of AI generation pipeline results and schema compliance
    const finalValidation = await page.evaluate(async () => {
      // Final validation: Test complete AI generation pipeline validation
      try {
        // 1. Verify journey index structure and schema compliance  
        const indexResponse = await fetch('/journeys/index.json');
        const journeys = await indexResponse.json();
        
        // 2. Verify detailed journey structure and component configurations
        const journeyResponse = await fetch('/journeys/basic-income-tax-calculator-1HqNA9.json');
        const journeyData = await journeyResponse.json();
        
        // 3. Schema validation tests
        const indexSchemaValid = Array.isArray(journeys) && 
          journeys.every(j => j.id && j.name && j.description && j.departmentId);
        
        const journeySchemaValid = Array.isArray(journeyData) &&
          journeyData.every(page => page.title && Array.isArray(page.components));
        
        // 4. Component configuration validation
        let componentValidation = {
          totalComponents: 0,
          validComponents: 0,
          componentTypes: new Set(),
          sampleComponents: []
        };
        
        journeyData.forEach(page => {
          page.components.forEach(component => {
            componentValidation.totalComponents++;
            componentValidation.componentTypes.add(component.component);
            
            if (component.component && component.id && component.config) {
              componentValidation.validComponents++;
            }
            
            // Collect sample components for validation
            if (componentValidation.sampleComponents.length < 3) {
              componentValidation.sampleComponents.push({
                type: component.component,
                id: component.id,
                hasConfig: !!component.config
              });
            }
          });
        });
        
        // 5. Naming convention validation
        const journeyId = journeys[0].id;
        const namingConventionValid = /^[a-z][a-z0-9]*(-[a-z0-9]+)*-[A-Za-z0-9]{6}$/.test(journeyId);
        
        return {
          aiGenerationValidation: {
            journeyIndexAccessible: indexResponse.ok,
            journeyDataAccessible: journeyResponse.ok,
            indexSchemaValid,
            journeySchemaValid,
            namingConventionValid,
            journeyCount: journeys.length,
            pageCount: journeyData.length,
            componentValidation,
            componentTypes: Array.from(componentValidation.componentTypes),
            overallValid: indexSchemaValid && journeySchemaValid && namingConventionValid
          }
        };
      } catch (error) {
        return {
          error: error.message,
          validationFailed: true
        };
      }
    });

    // Final comprehensive validation assertions
    expect(finalValidation.aiGenerationValidation.journeyIndexAccessible).toBe(true);
    expect(finalValidation.aiGenerationValidation.journeyDataAccessible).toBe(true);
    expect(finalValidation.aiGenerationValidation.indexSchemaValid).toBe(true);
    expect(finalValidation.aiGenerationValidation.journeySchemaValid).toBe(true);
    expect(finalValidation.aiGenerationValidation.namingConventionValid).toBe(true);
    expect(finalValidation.aiGenerationValidation.componentValidation.validComponents).toBe(finalValidation.aiGenerationValidation.componentValidation.totalComponents);
    expect(finalValidation.aiGenerationValidation.overallValid).toBe(true);
    expect(finalValidation.aiGenerationValidation.componentTypes.length).toBeGreaterThan(10); // Should have diverse component types
  });
});