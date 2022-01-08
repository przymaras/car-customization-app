/// <reference types="Cypress" />

import dummyTestData from "../dummyTestData.json";

describe("Car customization app, if fetch available", () => {
  before(() => {
    localStorage.clear();
    cy.visit("localhost:3000", {
      onBeforeLoad(win) {
        cy.stub(win, "fetch") //.withArgs('/favorite-fruits')
          .resolves({
            ok: true,
            json: () => dummyTestData,
          });
      },
    });
  });

  //   after(() => {
  //   });

  it("renders all data", () => {
    cy.contains("Loading ...").should("not.exist");

    cy.contains("TEST CKCONFIG").should("exist");
    cy.contains("Summary").should("exist");

    cy.contains("Model").should("exist");
    cy.contains("PRO RS3").should("exist");
    cy.contains("UBER RS2").should("exist");
    cy.contains("STANDARD").should("exist");
    cy.contains("WK").should("exist");

    cy.contains("Engine").should("exist");
    cy.contains("5.2L 532BHP").should("exist");
    cy.contains("4.2L 443BHP").should("exist");
    cy.contains("3.6L 374BHP").should("exist");
    cy.contains("2.0L 166BHP").should("exist");

    cy.contains("Gearbox").should("exist");
    cy.contains("automatic").should("exist");
    cy.contains("manual").should("exist");

    cy.contains("Color").should("exist");

    cy.get("[class*='ConfigCategory_container']").should("have.length", 4);

    cy.get("[class*='ConfigBtn_btn']").should("have.length", 14);
    cy.get("[class*='ConfigBtn_color']").should("have.length", 4);

    cy.get("[class*='SummaryRow_row']").should("have.length", 5);

    cy.get("[class*='Summary_image']").should("have.length", 1);

    cy.get("img").should("have.length", 1);
  });
});

describe("Car customization app, if fetch data not available", () => {
  before(() => {
    cy.visit("localhost:3000", {
      onBeforeLoad(win) {
        cy.stub(win, "fetch") //.withArgs('/favorite-fruits')
          .resolves({
            ok: false,
            json: () => [],
          });
      },
    });
  });

  //   after(() => {
  //   });

  it("don't renders data", () => {
    cy.contains("Error!").should("exist");
  });
});
