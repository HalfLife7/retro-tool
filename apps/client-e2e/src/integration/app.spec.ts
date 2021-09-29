import '@4tw/cypress-drag-drop'
describe('client', () => {
  let userData: any;

  before(() => {
    cy.exec('yarn prisma migrate reset --force').then(() => {
      cy.fixture('userData').then((data) => {
        userData = data
      })
    })
  })

  beforeEach(() => cy.visit('/'));
  it('will create a board', () => {
    cy.login(userData.user1Token)
    cy.contains('Create a board')

    const boardTitle = 'New Board Title'
    const columns = [
      'bad',
      'good',
      'better',
      'worse'
    ]

    // Fill out the board name
    cy.contains('Board Title')
    cy.getBySel('board_title')
      .type(boardTitle)
      .should('have.value', boardTitle)

    // Fill out the column names
    cy.contains('Column Names')
    cy.getBySel('column_names')
      .clear()
      .type(columns.join(', '))
      .should('have.value', columns.join(', '))

    // Click the create board button
    cy.getBySel('create_board_button')
      .click()

    cy.url().should('match', /boards\/.*/)

    cy.contains(boardTitle)
    for (const column of columns) {
      cy.contains(column)
    }
  });

  it('will add a card to a column', () => {
    cy.login(userData.user1Token)
    cy.visit(`/boards/${userData.board1.id}`)


    cy.getBySel('column-input-0')
      .type('This is some new card info{enter}')

    cy.getBySel('card-list-0').children().should('have.length', 1)

    cy.getBySel('column-input-0')
      .type('This is a second card with info{enter}')

    cy.getBySel('card-list-0').children().should('have.length', 2)
  })
});
