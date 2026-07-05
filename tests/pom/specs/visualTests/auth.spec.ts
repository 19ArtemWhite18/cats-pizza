import { guestTest as test } from '../../../fixtures/app.fixture';

test('Sign in modal has correct view', async ({ homePage, authModal }) => {
  await homePage.open();
  await authModal.open();
  await authModal.assertSignInModalHasCorrectView();
});

test('Sign up modal has correct view', async ({ homePage, authModal }) => {
  await homePage.open();
  await authModal.open();
  await authModal.openRegisterButton();
  await authModal.assertSignUpModalHasCorrectView();
});
