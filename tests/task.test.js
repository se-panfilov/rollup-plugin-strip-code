const stripCode = require('../index')


describe('stripCode.', () => {

  test('should has proper name', () => {
    expect(stripCode().name).toBe('stripCode')
  })

  test('should return proper oberct', () => {
    expect(typeof stripCode()).toBe('object')
  })

  describe('default settings.', () => {

    test('should remove code', () => {
      const obj = stripCode()

      const source = `whatever\n
      /* start_comment */ \n
      text to remove\n
      /* end_comment */`

      const result = obj.transform(source).code

      expect(result.trim()).toBe('whatever')
    })

    test('should not remove anything', () => {
      const obj = stripCode()

      const source = `whatever\n
      /* whatever_comment */ \n
      text to remove\n
      /* ends_comment */`

      const result = obj.transform(source).code

      expect(result.trim()).toBe(source)
    })

  })

  describe('override settings.', () => {

    test('should remove code with overrided options', () => {
      const obj = stripCode({
        start_comment: 'START.TESTS_ONLY',
        end_comment: 'END.TESTS_ONLY'
      })

      const source = `whatever\n
      /* START.TESTS_ONLY */ \n
      text to remove\n
      /* END.TESTS_ONLY */`

      const result = obj.transform(source).code

      expect(result.trim()).toBe('whatever')
    })

    test('should remove code with standart comments', () => {
      const obj = stripCode({
        start_comment: 'START.TESTS_ONLY',
        end_comment: 'END.TESTS_ONLY'
      })

      const source = `whatever\n
      /* start_comment */ \n
      text to remove\n
      /* end_comment */`

      const result = obj.transform(source).code

      expect(result.trim()).toBe(source)
    })

    test('should not remove anything', () => {
      const obj = stripCode({
        start_comment: 'START.TESTS_ONLY',
        end_comment: 'END.TESTS_ONLY'
      })

      const source = `whatever\n
      /* whatever_comment */ \n
      text to remove\n
      /* ends_comment */`

      const result = obj.transform(source).code

      expect(result.trim()).toBe(source)
    })

  })

})