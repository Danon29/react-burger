// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("drag", { prevSubject: "element" }, (subject, target) => {
  const dataTransfer = new DataTransfer();
  cy.wrap(subject)
    .trigger("dragstart", { dataTransfer })
    .then(() => {
      cy.get(target).trigger("drop", { dataTransfer });
    });
});

Cypress.Commands.add(
  "checkIngredientsModalPreparation",
  (modalContentSelector) => {
    cy.contains("Краторная булка N-200i").click();
    cy.location("pathname").should("include", "/ingredients/");
    cy.get('[data-testid="modal"]').should("be.visible");
    return cy.get(modalContentSelector || '[data-testid="modal"]');
  },
);

Cypress.Commands.add("dragIngredientToConstructor", (ingredientId) => {
  const dataTransfer = new DataTransfer();

  let ingredientText = "";
  if (ingredientId === "643d69a5c3f7b9001cfa093c") {
    ingredientText = "Краторная булка N-200i";
  } else if (ingredientId === "643d69a5c3f7b9001cfa093e") {
    ingredientText = "Филе Люминесцентного тетраодонтимформа";
  } else if (ingredientId === "643d69a5c3f7b9001cfa0942") {
    ingredientText = "Соус Spicy-X";
  }

  cy.contains(ingredientText)
    .parents()
    .first()
    .trigger("dragstart", { dataTransfer });

  cy.get("[data-testid='drop-area']")
    .trigger("dragover", { dataTransfer })
    .trigger("drop", { dataTransfer });

  cy.contains(ingredientText)
    .parents()
    .first()
    .trigger("dragend", { dataTransfer });
});

Cypress.Commands.add("checkBunAddedToConstructor", (bunName) => {
  cy.contains(`${bunName} (верх)`).should("be.visible");
});

Cypress.Commands.add("checkConstructorIsEmpty", () => {
  cy.contains("Перетащите булки и ингридиенты").should("be.visible");
});
