/// <reference types="Cypress" />

import dummyTestData from "../dummyTestData.json";

describe("Car customization app, if fetch available", () => {
  beforeEach(() => {
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

  it("not allows to select not allowed configs", () => {
    cy.contains("PRO RS3").should("be.enabled");
    cy.contains("UBER RS2").should("be.enabled");
    cy.contains("STANDARD").should("be.enabled");
    cy.contains("WK").should("be.enabled");

    cy.contains("5.2L 532BHP").should("be.disabled");
    cy.contains("4.2L 443BHP").should("be.disabled");
    cy.contains("3.6L 374BHP").should("be.disabled");
    cy.contains("2.0L 166BHP").should("be.disabled");

    cy.contains("automatic").should("be.disabled");
    cy.contains("manual").should("be.disabled");

    cy.get("[class*='ConfigBtn_color']").each((item) => {
      cy.wrap(item).should("be.disabled");
    });

    cy.get("[class*='Summary_container']")
      .find("div:contains('Not selected')")
      .should("have.length", 4);

    // ============ //
    cy.contains("WK").click();

    cy.contains("PRO RS3").should("be.enabled");
    cy.contains("UBER RS2").should("be.enabled");
    cy.contains("STANDARD").should("be.enabled");
    cy.contains("WK").should("be.enabled");

    cy.contains("5.2L 532BHP").should("be.disabled");
    cy.contains("4.2L 443BHP").should("be.disabled");
    cy.contains("3.6L 374BHP").should("be.disabled");
    cy.contains("2.0L 166BHP").should("be.enabled");

    cy.contains("automatic").should("be.disabled");
    cy.contains("manual").should("be.disabled");

    cy.get("[class*='ConfigBtn_color']").each((item) => {
      cy.wrap(item).should("be.enabled");
    });

    cy.get("[class*='Summary_container']")
      .find("div:contains('Not selected')")
      .should("have.length", 3);

    // ============ //
    cy.contains("2.0L 166BHP").click();

    cy.contains("PRO RS3").should("be.enabled");
    cy.contains("UBER RS2").should("be.enabled");
    cy.contains("STANDARD").should("be.enabled");
    cy.contains("WK").should("be.enabled");

    cy.contains("5.2L 532BHP").should("be.disabled");
    cy.contains("4.2L 443BHP").should("be.disabled");
    cy.contains("3.6L 374BHP").should("be.disabled");
    cy.contains("2.0L 166BHP").should("be.enabled");

    cy.contains("automatic").should("be.disabled");
    cy.contains("manual").should("be.enabled");

    cy.get("[class*='ConfigBtn_color']").each((item) => {
      cy.wrap(item).should("be.enabled");
    });

    cy.get("[class*='Summary_container']")
      .find("div:contains('Not selected')")
      .should("have.length", 2);

    // ============ //
    cy.contains("manual").click();

    cy.contains("PRO RS3").should("be.enabled");
    cy.contains("UBER RS2").should("be.enabled");
    cy.contains("STANDARD").should("be.enabled");
    cy.contains("WK").should("be.enabled");

    cy.contains("5.2L 532BHP").should("be.disabled");
    cy.contains("4.2L 443BHP").should("be.disabled");
    cy.contains("3.6L 374BHP").should("be.disabled");
    cy.contains("2.0L 166BHP").should("be.enabled");

    cy.contains("automatic").should("be.disabled");
    cy.contains("manual").should("be.enabled");

    cy.get("[class*='ConfigBtn_color']").each((item) => {
      cy.wrap(item).should("be.enabled");
    });

    cy.get("[class*='Summary_container']")
      .find("div:contains('Not selected')")
      .should("have.length", 1);

    // ============ //
    cy.get("[class*='ConfigBtn_color']").click({ multiple: true });

    cy.contains("PRO RS3").should("be.enabled");
    cy.contains("UBER RS2").should("be.enabled");
    cy.contains("STANDARD").should("be.enabled");
    cy.contains("WK").should("be.enabled");

    cy.contains("5.2L 532BHP").should("be.disabled");
    cy.contains("4.2L 443BHP").should("be.disabled");
    cy.contains("3.6L 374BHP").should("be.disabled");
    cy.contains("2.0L 166BHP").should("be.enabled");

    cy.contains("automatic").should("be.disabled");
    cy.contains("manual").should("be.enabled");

    cy.get("[class*='ConfigBtn_color']").each((item) => {
      cy.wrap(item).should("be.enabled");
    });

    cy.get("[class*='Summary_container']")
      .find("div:contains('Not selected')")
      .should("have.length", 0);

    // ============ //
    cy.contains("PRO RS3").click();
    cy.contains("5.2L 532BHP").click();

    cy.contains("PRO RS3").should("be.enabled");
    cy.contains("UBER RS2").should("be.enabled");
    cy.contains("STANDARD").should("be.enabled");
    cy.contains("WK").should("be.enabled");

    cy.contains("5.2L 532BHP").should("be.enabled");
    cy.contains("4.2L 443BHP").should("be.enabled");
    cy.contains("3.6L 374BHP").should("be.enabled");
    cy.contains("2.0L 166BHP").should("be.enabled");

    cy.contains("automatic").should("be.enabled");
    cy.contains("manual").should("be.disabled");

    cy.get("[class*='ConfigBtn_color']").each((item) => {
      cy.wrap(item).should("be.enabled");
    });

    cy.get("[class*='Summary_container']")
      .find("div:contains('Not selected')")
      .should("have.length", 1);

    // ============ //
    cy.contains("STANDARD").click();

    cy.contains("PRO RS3").should("be.enabled");
    cy.contains("UBER RS2").should("be.enabled");
    cy.contains("STANDARD").should("be.enabled");
    cy.contains("WK").should("be.enabled");

    cy.contains("5.2L 532BHP").should("be.disabled");
    cy.contains("4.2L 443BHP").should("be.disabled");
    cy.contains("3.6L 374BHP").should("be.enabled");
    cy.contains("2.0L 166BHP").should("be.enabled");

    cy.contains("automatic").should("be.disabled");
    cy.contains("manual").should("be.disabled");

    cy.get("[class*='ConfigBtn_color']").each((item) => {
      cy.wrap(item).should("be.enabled");
    });

    cy.get("[class*='Summary_container']")
      .find("div:contains('Not selected')")
      .should("have.length", 2);
  });

  it("renders correctly summary and sums the price", () => {
    cy.contains("WK").click();
    cy.contains("2.0L 166BHP").click();
    cy.contains("manual").click();
    cy.get("[class*='ConfigBtn_color']").click({ multiple: true });

    cy.get("[class*='Summary_container']")
      .find("div:contains('Not selected')")
      .should("have.length", 0);

    cy.get("[class*='Summary_container']")
      .find("div:contains('WK')")
      .should("exist");

    cy.get("[class*='Summary_container']")
      .find("div:contains('2.0L 166BHP')")
      .should("exist");

    cy.get("[class*='Summary_container']")
      .find("div:contains('manual')")
      .should("exist");

    cy.get("[class*='Summary_container']")
      .find("div:contains('black')")
      .should("exist");

    cy.get("[class*='Summary_container']")
      .find("div:contains('$35')")
      .should("exist");
  });
});
