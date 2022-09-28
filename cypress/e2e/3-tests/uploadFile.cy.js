import 'cypress-file-upload';

context('Upload files', () => {
    beforeEach(() => {
        cy.visit('https://fineuploader.com/demos.html')
    });
    it('Upload file', () => {
        cy.fixture('auto.jpg', 'base64')
        .then(fileContent => {
            cy.get('[name="qqfile"]').attachFile({
            fileContent,
            fileName: 'auto.jpg',
            mimeType: 'image/jpg'
            },
            {
                uploadType: 'input'
            });
        });
    })
});