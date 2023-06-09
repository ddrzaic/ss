describe("homepage", () => {
  it("renders home page", async () => {
    cy.visit("http://localhost:3000");
    const storyCard = cy.get('[data-testid="story-card-0"]');
    storyCard.should("exist");
  });

  it("filters by category and author", async () => {
    cy.visit("http://localhost:3000");
    const categorySelect = cy.get("#category-select");
    categorySelect.click();
    cy.get("#category-select-option-1").click();
    cy.get("#name").type("Pero Perich");
    const card = cy.get('[data-testid="story-card-0"]');
    card.should("exist");
    card.should("contain", "The Crystal Caverns");
  });
});
