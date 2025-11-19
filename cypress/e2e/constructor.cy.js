/* global cy */

describe("Конструктор бургера", () => {
  const ingredientModalContentSelector = '[data-testid="modal"]';
  const modalCloseButtonSelector = '[data-testid="modal-close"]';

  beforeEach(() => {
    cy.intercept("GET", "**/api/ingredients", {
      fixture: "ingredients.json",
    }).as("getIngredients");
    cy.intercept("GET", "**/api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "**/api/orders", { fixture: "order.json" }).as(
      "sendOrder",
    );
    window.localStorage.setItem("accessToken", "token");
    cy.visit("/");
    cy.wait("@getIngredients");
  });

  it("opening ingredient's modal", () => {
    const element = cy.checkIngredientsModalPreparation(
      ingredientModalContentSelector,
    );
    element.should("exist");
    cy.location("pathname").should("include", "/ingredients/");
    cy.get(ingredientModalContentSelector).should("be.visible");
    cy.contains("Краторная булка N-200i").should("be.visible");
  });

  it("closing ingredient's modal on close btn click", () => {
    const element = cy.checkIngredientsModalPreparation(
      ingredientModalContentSelector,
    );
    element.should("exist");
    cy.location("pathname").should("include", "/ingredients/");
    cy.get(ingredientModalContentSelector).should("exist");
    cy.get(modalCloseButtonSelector).click();
    cy.get(ingredientModalContentSelector).should("not.exist");
    cy.location("pathname").should("not.include", "/ingredients");
  });

  it("closing ingredient's modal on overlay click", () => {
    const element = cy.checkIngredientsModalPreparation(
      ingredientModalContentSelector,
    );
    element.should("exist");
    cy.location("pathname").should("include", "/ingredients/");
    cy.get(ingredientModalContentSelector).should("exist");
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get(ingredientModalContentSelector).should("not.exist");
    cy.location("pathname").should("not.include", "/ingredients");
  });

  it("moving bun ingredient to constructor", () => {
    cy.dragIngredientToConstructor("643d69a5c3f7b9001cfa093c");

    cy.checkBunAddedToConstructor("Краторная булка N-200i");
  });

  it("moving main ingredient to constructor", () => {
    cy.dragIngredientToConstructor("643d69a5c3f7b9001cfa093e");
    cy.dragIngredientToConstructor("643d69a5c3f7b9001cfa0942");

    cy.get('[data-testid="drop-area"]')
      .as("constructorDropZone")
      .should("exist");

    cy.get("@constructorDropZone").within(() => {
      cy.contains("Филе Люминесцентного тетраодонтимформа").should(
        "be.visible",
      );
      cy.contains("Соус Spicy-X").should("be.visible");
    });
  });

  it("checkOrderCreation", () => {
    const orderDetailModalSelector = '[data-testid="modal"]';

    cy.get(orderDetailModalSelector).should("not.exist");

    cy.dragIngredientToConstructor("643d69a5c3f7b9001cfa093c");
    cy.dragIngredientToConstructor("643d69a5c3f7b9001cfa093e");
    cy.dragIngredientToConstructor("643d69a5c3f7b9001cfa0942");

    cy.contains("Оформить заказ").click();
    cy.wait("@sendOrder");
    cy.get(orderDetailModalSelector).should("exist");
    cy.contains("87592").should("be.visible");

    cy.get(modalCloseButtonSelector).click();
    cy.checkConstructorIsEmpty();
  });
});
