import { boxesToHTML } from '../boxes.toHTML'

describe('utils/boxes.toHTML', () => {
  it('should parse centered prefix to HTML', () => {
    expect(boxesToHTML([{ t: 'container', c: [{ t: 'centered' }], jc: 'center', ai: 'center' }]))
      .toBe(`<div class="fb fb__0-container">
  <div class="fb fb__00-centered">
    <!-- centered -->

  </div>
</div>`)
  })

  it('should parse holy grail prefix to HTML', () => {
    expect(
      boxesToHTML([
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
    ).toBe(`<div class="fb fb__0-body">
  <div class="fb fb__00-header">
    <!-- header -->

  </div>
  <div class="fb fb__01-box">
    <div class="fb fb__010-sidebar">
      <!-- sidebar -->

    </div>
    <div class="fb fb__011-main">
      <!-- main -->

    </div>
    <div class="fb fb__012-sidebar">
      <!-- sidebar -->

    </div>
  </div>
  <div class="fb fb__02-footer">
    <!-- footer -->

  </div>
</div>`)
  })
})
