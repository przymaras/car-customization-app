/// <reference types="Cypress" />

describe("Car customization app", () => {
  beforeEach(() => {
    // cy.visit("localhost:3000");
    cy.visit("localhost:3000", {
      onBeforeLoad(win) {
        cy.stub(win, "fetch") //.withArgs('/favorite-fruits')
          .resolves({
            ok: true,
            json: () => [],
          });
      },
    });
  });

  //   after(() => {
  //   });

  it("test 1", () => {
    expect(true).to.equal(true);
  });
});
