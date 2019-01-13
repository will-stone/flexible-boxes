import { boxesToCSS } from '../boxes.toCSS'

describe('utils/boxes.toCSS', () => {
  it('should parse centered prefix to CSS', () => {
    expect(boxesToCSS([{ t: 'container', c: [{ t: 'centered' }], jc: 'center', ai: 'center' }]))
      .toBe(`.fb__0-container {
  display: flex;
  justify-content: center;
  align-items: center;
}`)
  })

  it('should parse holy grail prefix to CSS', () => {
    expect(
      boxesToCSS([
        {
          t: 'body',
          c: [
            { t: 'header' },
            {
              g: 1,
              c: [{ t: 'sidebar' }, { t: 'main', g: 1 }, { t: 'sidebar' }],
            },
            { t: 'footer', jc: 'center' },
          ],
          d: 'column',
        },
      ]),
    ).toBe(`.fb__0-body {
  display: flex;
  flex-direction: column;
}

.fb__01-box {
  flex-grow: 1;
  display: flex;
}

.fb__011-main {
  flex-grow: 1;
}`)
  })
})
