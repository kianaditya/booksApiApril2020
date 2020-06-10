
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

const Book = require('../../models/book')
const { factory, expect } = require('../test_helper')

describe('Book', () => {
  const DescribedModel = Book(sequelize, dataTypes)
  const subject = new DescribedModel()

  checkModelName(DescribedModel)('Book')
  checkPropertyExists(subject)('title')

  describe('contraints', () => {
    it('rejects null value for title', async () => {
      try {
        await factory.create('Book',
          {
            title: null
          }
        );
        expect.fail()
      } catch (error) {
        expect(error.errors)
          .to.containSubset([{ message: 'Book.title cannot be null' }])
      }
    });
  });

  describe('validations', () => {
    it('rejects empty string for title', async () => {
      try {
        await factory.create('Book',
          {
            title: ''
          }
        );
        expect.fail()
      } catch (error) {
        expect(error)
          .to.include({ message: 'Validation error: You need to set a title!' })
      }
    });
  });

});