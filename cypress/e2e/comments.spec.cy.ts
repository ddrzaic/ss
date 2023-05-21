describe("Comments", () => {
  it("should add a comment", () => {
    cy.visit("http://localhost:3000/story/1");
    const input = cy.get('[data-testid="comment-input"]');
    input.type("Novi testni komentar!");
    const postButton = cy.get('[data-testid="post-comment-button"]');
    postButton.click();
    const commentSection = cy.get('[data-testid="comment-section"]');

    const children = commentSection.children();

    const lastComment = children.last().prev().prev().prev();
    lastComment.should("contain", "Novi testni komentar!");
    const deleteButton = lastComment.find('[data-testid="DeleteIcon"]');
    deleteButton.click();
    const confirmButton = cy
      .get('[data-testid="delete-comment-button"]')
      .last();
    confirmButton.click();
    lastComment.should("not.exist");
  });
});
