import { guestTest as test } from '../../../fixtures/app.fixture';

test('Cart page empty state', async ({ cartPage }) => {
  await cartPage.setUpApiEmptyCart();
  await cartPage.open();
  await cartPage.assertHasCorrectEmptyView();
});

test('Cart page with items', async ({ cartPage }) => {
  await cartPage.setUpApiWithOneItem();
  await cartPage.open();
  await cartPage.assertHasCorrectViewWithOneItem();
});
